import { motion } from "framer-motion";
import { LoadingSpinner } from "@/components/spinner";

interface SchemaStep {
    schemaStr: string;
    setSchemaStr: (schema: string) => void;
    loading: boolean;
    setStep: (step: 'initial' | 'query' | 'schema' | 'sources' | 'extract' | 'deploy') => void;
    handleSchemaSubmit: () => void;
}

export const SchemaStep = ({ schemaStr, setSchemaStr, loading, handleSchemaSubmit, setStep }: SchemaStep) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="max-w-3xl mx-auto p-6"
        >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                {loading ? (
                    <LoadingSpinner message="Generating schema..."/>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-lg font-medium text-white">Generate Schema</h2>
                        <p className="text-white/60">Review and edit the generated schema for your data extraction</p>

                        <div className="mt-4">
                      <textarea
                          value={schemaStr}
                          onChange={(e) => setSchemaStr(e.target.value)}
                          className="w-full h-96 bg-gray-900/50 text-white font-mono text-sm rounded-lg border border-white/10 p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                          placeholder="Enter your JSON schema here..."
                      />
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <button
                                onClick={() => setStep('query')}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSchemaSubmit}
                                disabled={!schemaStr || loading}
                                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
