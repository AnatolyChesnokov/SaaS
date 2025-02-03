import { motion } from "framer-motion";
import { LoadingSpinner } from "@/components/spinner";

interface QueryStep {
    query: string;
    setQuery: (q: string) => void;
    loading: boolean;
    setStep: (step: 'initial' | 'query' | 'schema' | 'sources' | 'extract' | 'deploy') => void;
    handleQuerySubmit: () => void;
}

export const QueryStep = ({ query, setQuery, loading, handleQuerySubmit, setStep }: QueryStep) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="max-w-3xl mx-auto p-6"
        >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                {loading ? (
                    <LoadingSpinner message="Processing your query..."/>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-lg font-medium text-white">Describe Your API</h2>
                        <p className="text-white/60">Tell us what data you want to extract</p>

                        <div className="mt-4">
                      <textarea
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="w-full h-96 bg-gray-900/50 text-white font-mono text-sm rounded-lg border border-white/10 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
                          placeholder="Enter your query here..."
                      />
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <button
                                onClick={() => setStep('initial')}
                                className="px-4 py-2 text-white/60 hover:text-white transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleQuerySubmit}
                                disabled={!query || loading}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-600 rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
