import { motion } from "framer-motion";
import { getApiUrl } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/spinner";
import { RouteInput } from "@/components/route-input";

interface DeployStep {
    isDeployed: boolean;
    deployedRoute: string;
    routeInput: string;
    apiKey: string;
    setRouteInput: (q: string) => void;
    handleDeploy: () => void;
    loading: boolean;
    warning: string | null;
    setStep: (step: 'initial' | 'query' | 'schema' | 'sources' | 'extract' | 'deploy') => void;
}

export const DeployStep = ({ isDeployed, routeInput, setRouteInput, loading, warning, handleDeploy, setStep, deployedRoute, apiKey }: DeployStep) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="max-w-3xl mx-auto p-6 space-y-8"
        >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                {loading ? (
                    <LoadingSpinner message="Deploying your API..."/>
                ) : (
                    <div>
                        <h3 className="text-lg font-medium text-white mb-4">Deploy Your API</h3>

                        <div className="space-y-6">
                            <div>
                            </div>
                            {!isDeployed ? (
                                <div className="space-y-6">
                                    <RouteInput
                                        value={routeInput}
                                        onChange={setRouteInput}
                                        warning={warning}
                                    />
                                    <div className="flex justify-between items-center pt-4">
                                        <button
                                            onClick={() => setStep('extract')}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleDeploy}
                                            disabled={!routeInput || loading}
                                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Deploy API
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                                        <div className="flex items-center space-x-2 text-emerald-500">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                            </svg>
                                            <span className="font-medium">API Successfully Deployed!</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <p className="text-sm text-white/60">Your API is ready! Here's your endpoint:</p>
                                        <div className="p-4 bg-white/5 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <code className="text-sm text-emerald-500">
                                                    {getApiUrl(deployedRoute)}
                                                </code>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => window.open(getApiUrl(deployedRoute), '_blank')}
                                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-md text-white/60"
                                                        title="Open in browser"
                                                    >
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                             strokeWidth="2">
                                                            <path
                                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(getApiUrl(deployedRoute))}
                                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-md text-white/60"
                                                        title="Copy to clipboard"
                                                    >
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                             strokeWidth="2">
                                                            <path
                                                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-2">
                                            <label className="block text-sm text-white/60">
                                                cURL Command
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <code
                                                    className="flex-1 px-4 py-3 bg-white/5 rounded-lg text-white font-mono text-sm overflow-x-auto">
                                                    {`curl -X GET "${getApiUrl(deployedRoute)}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`}
                                                </code>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(
                                                        `curl -X GET "${getApiUrl(deployedRoute)}" \\\n  -H "Authorization: Bearer ${apiKey}" \\\n  -H "Content-Type: application/json"`
                                                    )}
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-md text-white/60"
                                                    title="Copy to clipboard"
                                                >
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                         strokeWidth="2">
                                                        <path
                                                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
