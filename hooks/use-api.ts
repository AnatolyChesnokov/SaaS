import { useState, useEffect } from "react"
import { z } from "zod"
import FirecrawlApp from "@mendable/firecrawl-js"
import { JsonSchema, ScrapeResult, SearchResult } from "@/types"

// Constants
export const EXAMPLE_QUERY = "Extract company details from websites";

// Initialize Firecrawl
export const firecrawl = new FirecrawlApp({
    apiKey: process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY || "",
})

// Utility functions
export const getApiUrl = (path: string) => {
    const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || "http://localhost:3000"
    return `${apiRoute}${path}`
}

// Steps configuration
export const steps = [
    { number: 1, title: 'Describe Your API', description: 'Tell us what data you want to extract' },
    { number: 2, title: 'Generate Schema', description: 'Create the data structure' },
    { number: 3, title: 'Configure Sources', description: 'Select data sources' },
    { number: 4, title: 'Extract Data', description: 'Get your data' },
    { number: 5, title: 'Deploy API', description: 'Get your API endpoint' }
];

export function useApi() {
    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Transition state
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionMessage, setTransitionMessage] = useState('');

    // Step State
    const [step, setStep] = useState<'initial' | 'query' | 'schema' | 'sources' | 'extract' | 'deploy'>('initial');
    const [currentStep, setCurrentStep] = useState(1);

    // Data State
    const [query, setQuery] = useState('');
    const [schemaStr, setSchemaStr] = useState('');
    const [proposedSearchQuery, setProposedSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [extractedData, setExtractedData] = useState<any>(null);
    const [routeInput, setRouteInput] = useState('');
    const [deployedRoute, setDeployedRoute] = useState('');
    const [apiKey] = useState('sk_' + Math.random().toString(36).substr(2, 10));
    const [isDeployed, setIsDeployed] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [warning, setWarning] = useState<string | null>(null);
    const [cronSchedule, setCronSchedule] = useState('0 5 * * *');
    const [searchQuery, setSearchQuery] = useState('');

    // Add state for custom URL input
    const [customUrl, setCustomUrl] = useState('');

    const getStepFromState = (state: 'initial' | 'query' | 'schema' | 'sources' | 'extract' | 'deploy') => {
        switch (state) {
            case 'initial': return 1;
            case 'query': return 2;
            case 'schema': return 3;
            case 'sources': return 4;
            case 'extract': return 5;
            case 'deploy': return 6;
            default: return 1;
        }
    };

    useEffect(() => {
        setCurrentStep(getStepFromState(step));
    }, [step]);

    // Update current step when step changes
    useEffect(() => {
        setCurrentStep(getStepFromState(step));
    }, [step]);

    // Fetch routes on mount
    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        try {
            const response = await fetch(getApiUrl('/api/routes'));
            await response.json();
        } catch (e) {
            console.error('Failed to fetch routes:', e);
        }
    };

    // Handle step submissions
    const handleQuerySubmit = async () => {
        if (!query || loading) return;

        setLoading(true);
        setStep('schema');
        setCurrentStep(3);

        // Call API to generate schema
        fetch('/api/generate-schema', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
            .then(res => res.json())
            .then(data => {
                setSchemaStr(JSON.stringify(data.schema, null, 2));
            })
            .catch(error => {
                console.error('Error generating schema:', error);
                setError('Failed to generate schema. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleExtractData = async () => {
        const selectedUrls = [
            ...searchResults.filter(r => r.selected).map(r => r.url),
            ...(customUrl ? [customUrl] : [])
        ];

        if (selectedUrls.length === 0) {
            setError('Please select at least one source');
            return;
        }

        setLoading(true);
        setError(null);
        setIsTransitioning(true);
        setTransitionMessage('Extracting data from sources...');

        try {
            const schemaRequest = JSON.parse(schemaStr) as JsonSchema;

            console.log('OpenAI Generated Schema:', schemaRequest);

            // Convert JSON Schema to Zod schema
            const convertJsonSchemaToZod = (schema: JsonSchema) => {
                if (!schema.properties) {
                    throw new Error('Invalid schema: missing properties');
                }

                const zodSchema: Record<string, z.ZodType> = {};
                Object.entries(schema.properties).forEach(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        const propType = value.type;
                        zodSchema[key] = propType === 'string' ? z.string() :
                            propType === 'boolean' ? z.boolean() :
                                propType === 'number' ? z.number() :
                                    propType === 'integer' ? z.number().int() :
                                        z.any();

                        if (value.description) {
                            zodSchema[key] = zodSchema[key].describe(value.description);
                        }
                    }
                });

                return z.object(zodSchema);
            };

            const zodSchema = convertJsonSchemaToZod(schemaRequest);
            console.log('Converted Zod Schema:', zodSchema);

            const scrapeResult: ScrapeResult = await firecrawl.extract(selectedUrls, {
                prompt: query,
                schema: zodSchema
            });

            console.log('Scrape Result:', scrapeResult);

            if (!scrapeResult.success) {
                let errorMessage: string;
                const err: unknown = scrapeResult.error;

                if (err && typeof err === 'object' && 'message' in err) {
                    errorMessage = (err as { message: string }).message;
                } else if (err && typeof err === 'object') {
                    try {
                        errorMessage = JSON.stringify(err);
                    } catch {
                        errorMessage = 'Unknown error occurred';
                    }
                } else {
                    errorMessage = String(err);
                }
                throw new Error(errorMessage);
            }

            setExtractedData(scrapeResult.data);
            setStep('extract');
            setCurrentStep(5);
        } catch (error) {
            console.error('Full error:', error);
            let errorMessage: string;

            if (error && typeof error === 'object' && 'message' in error) {
                errorMessage = (error as { message: string }).message;
            } else if (error && typeof error === 'object') {
                try {
                    errorMessage = JSON.stringify(error);
                } catch {
                    errorMessage = 'Unknown error occurred';
                }
            } else {
                errorMessage = String(error);
            }
            setError(`Extraction failed: ${errorMessage}`);
        } finally {
            setLoading(false);
            setIsTransitioning(false);
        }
    };

    const handleSchemaSubmit = async () => {
        if (!schemaStr || loading) return;

        setLoading(true);
        setError(null);
        setIsTransitioning(true);
        setTransitionMessage('Validating schema...');

        try {
            // Use the original query for now
            setProposedSearchQuery(query);
            setStep('sources');
            setCurrentStep(4);
        } catch (error) {
            console.error('Error:', error);
            if (error instanceof SyntaxError) {
                setError('Invalid JSON schema. Please check the format.');
            } else {
                setError(error instanceof Error ? error.message : 'Failed to process schema');
            }
        } finally {
            setLoading(false);
            setIsTransitioning(false);
        }
    };

    const handleNewSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            // Call Serper API
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: proposedSearchQuery }),
            });

            if (!response.ok) {
                throw new Error('Search request failed');
            }

            const data = await response.json();

            if (data.organic && data.organic.length > 0) {
                setSearchResults(data.organic.map((r: any, index: number) => ({
                    title: r.title,
                    url: r.link,
                    snippet: r.snippet,
                    favicon: `https://www.google.com/s2/favicons?domain=${new URL(r.link).hostname}`,
                    selected: index === 0
                })));
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSourcesSubmit = async () => {
        if (!searchResults.some(r => r.selected) && !customUrl) {
            setError('Please select at least one source or enter a custom URL');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await handleExtractData();
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to extract data from sources');
        } finally {
            setLoading(false);
            setIsTransitioning(false);
        }
    };

    const toggleResult = (index: number) => {
        setSearchResults(prev =>
            prev.map((result, i) =>
                i === index ? { ...result, selected: !result.selected } : result
            )
        );
    };

    useEffect(() => {
        if (step === 'sources' && searchResults.length === 0 && query) {
            handleNewSearch();
        }
    }, [step]);

    useEffect(() => {
        if (step === 'sources') {
            handleSearch();
        }
    }, [step]);

    const handleSearch = async () => {
        setSearchResults([]);
        setIsTransitioning(true);
        setTransitionMessage('Searching for relevant sources...');

        try {
            // Call Serper API
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: proposedSearchQuery || query }),
            });

            if (!response.ok) {
                throw new Error('Search request failed');
            }

            const data = await response.json();

            if (data.organic && data.organic.length > 0) {
                setSearchResults(data.organic.map((r: any, index: number) => ({
                    title: r.title,
                    url: r.link,
                    snippet: r.snippet,
                    favicon: `https://www.google.com/s2/favicons?domain=${new URL(r.link).hostname}`,
                    selected: index === 0
                })));
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsTransitioning(false);
        }
    };

    const getStepStatus = (stepId: number) => {
        if (currentStep === stepId) {
            return 'current';
        }

        return currentStep > stepId ? 'complete' : 'upcoming';
    };

    const checkRouteExists = async (route: string) => {
        try {
            const response = await fetch('/api/routes');
            const data = await response.json();
            if (data.success && data.routes) {
                return data.routes.some((r: any) => r.route === route);
            }
        } catch (e) {
            console.error('Failed to check routes:', e);
        }
        return false;
    };

    // Check if route exists when route input changes
    useEffect(() => {
        const checkRoute = async () => {
            if (!routeInput) {
                setWarning(null);
                return;
            }
            const exists = await checkRouteExists(routeInput);
            if (exists) {
                setWarning('This route already exists and will be overwritten.');
            } else {
                setWarning(null);
            }
        };

        checkRoute();
    }, [routeInput]);

    // Reset deployment state when going back
    useEffect(() => {
        if (step !== 'deploy') {
            setIsDeployed(false);
            setWarning(null);
        }
    }, [step]);

    const handleDeploy = async () => {
        if (!extractedData || loading) return;

        setLoading(true);
        setError(null);
        setIsTransitioning(true);
        setTransitionMessage('Deploying your API...');

        try {
            // Clean the route string
            const cleanRoute = routeInput
                .toLowerCase()
                .replace(/[^a-z0-9-_\s]/g, '') // Remove special chars except spaces, hyphens, underscores
                .replace(/\s+/g, '-') // Convert spaces to hyphens
                .replace(/-+/g, '-') // Convert multiple hyphens to single hyphen
                .trim();

            // Format the request body according to the API schema
            const requestBody = {
                key: cleanRoute,
                data: {
                    data: extractedData,
                    metadata: {
                        query: query,
                        schema: JSON.parse(schemaStr),
                        sources: [
                            ...searchResults.filter(r => r.selected).map(r => r.url),
                            ...(customUrl ? [customUrl] : [])
                        ],
                        lastUpdated: new Date().toISOString()
                    }
                },
                route: cleanRoute
            };

            const response = await fetch('/api/deploy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to deploy API');
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.error || 'Failed to deploy API');
            }

            setDeployedRoute(`/api/results/${cleanRoute}`);
            setIsDeployed(true);
            setStep('deploy');
            setCurrentStep(5);
        } catch (error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'Failed to deploy API');
        } finally {
            setLoading(false);
            setIsTransitioning(false);
        }
    };

    return {
        step,
        error,
        loading,
        isTransitioning,
        transitionMessage,
        showSettings,
        setShowSettings,
        query,
        setQuery,
        schemaStr,
        setSchemaStr,
        searchResults,
        extractedData,
        routeInput,
        setRouteInput,
        deployedRoute,
        apiKey,
        isDeployed,
        warning,
        cronSchedule,
        customUrl,
        setCustomUrl,
        toggleResult,
        handleSearch,
        handleDeploy,
        setError,
        searchQuery,
        setSearchQuery,
        getStepStatus,
        handleSourcesSubmit,
        handleQuerySubmit,
        handleSchemaSubmit,
        setCronSchedule,
        setStep
    }
}
