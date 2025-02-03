import { motion } from "framer-motion";
import { LoadingSpinner } from "@/components/spinner";

interface ExtractStep {
    query: string;
    extractedData: string;
    setRouteInput: (q: string) => void;
    loading: boolean;
    setStep: (step: 'initial' | 'query' | 'schema' | 'sources' | 'extract' | 'deploy') => void;
}

export const ExtractStep = ({ extractedData, setRouteInput, loading, query, setStep }: ExtractStep) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="max-w-3xl mx-auto p-6"
        >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                {loading ? (
                    <LoadingSpinner message="Extracting data from sources..."/>
                ) : (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white">Extracted Data</h3>
                        <div className="space-y-4">
                            {extractedData && (
                                <pre
                                    className="w-full h-96 bg-gray-900/50 p-4 rounded-lg font-mono text-sm text-white overflow-auto">
                          {JSON.stringify(extractedData, null, 2)}
                        </pre>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setStep('sources')}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => {
                                    setStep('deploy');
                                    setRouteInput(query.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
                                }}
                                disabled={!extractedData || loading}
                                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Deploy API
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
