import { motion } from "framer-motion";
import { EXAMPLE_QUERY } from "@/hooks/use-api";

interface InitialStep {
    query: string;
    setQuery: (q: string) => void;
    loading: boolean;
    handleQuerySubmit: () => void;
}

export const InitialStep = ({query, setQuery, loading, handleQuerySubmit}: InitialStep) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="min-h-screen flex flex-col items-center justify-center p-4 max-w-2xl mx-auto"
        >
            <motion.h1
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2}}
                className="text-4xl font-bold text-white mb-2"
            >
                LLM API Engine
            </motion.h1>
            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.4}}
                className="text-white/60 text-lg mb-12 text-center"
            >
                Build and deploy AI-powered APIs in seconds.
            </motion.p>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.6}}
                className="w-full"
            >
                <div className="relative">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && query && !loading) {
                                handleQuerySubmit();
                            }
                        }}
                        placeholder={EXAMPLE_QUERY}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    />
                    <button
                        onClick={handleQuerySubmit}
                        disabled={!query || loading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
