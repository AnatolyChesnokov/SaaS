import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

interface SourcesStep {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    loading: boolean;
    handleSearch: () => void;
    setStep: (step: 'initial' | 'query' | 'schema' | 'sources' | 'extract' | 'deploy') => void;
    customUrl: string;
    setCustomUrl: (customUrl: string) => void;
    isTransitioning: boolean;
    transitionMessage: string;
    searchResults: { title: string; snippet: string; url: string; selected: boolean }[];
    toggleResult: (index: number) => void;
    handleSourcesSubmit: () => void;
}

export const SourcesStep = ({
    searchQuery,
    setSearchQuery,
    loading,
    handleSearch,
    setStep,
    customUrl,
    setCustomUrl,
    isTransitioning,
    transitionMessage,
    searchResults,
    toggleResult,
    handleSourcesSubmit
}: SourcesStep) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="max-w-5xl mx-auto space-y-6"
        >
            {/* Search bar */}
            <div className="sticky top-[104px] z-40 bg-gray-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for additional sources..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        disabled={!searchQuery || loading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-white/5 hover:bg-white/10 rounded-md text-white/60"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Custom URL input */}
            <div className="px-6 pb-6">
                <div
                    className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 border ${customUrl ? 'border-indigo-600' : 'border-white/10'}`}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter a custom URL..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
                            value={customUrl}
                            onChange={(e) => setCustomUrl(e.target.value)}
                        />
                        {customUrl && (
                            <div className="flex items-center space-x-2 text-indigo-600">
                                <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                                <span className="text-sm">Custom URL is set</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Search results */}
            <div className="px-6 pb-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    {isTransitioning ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="flex items-center justify-center mb-4">
                                <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">{transitionMessage}</h3>
                            <p className="text-white/60">Please wait while we process your request...</p>
                        </div>
                    ) : searchResults.length === 0 ? (
                        <div className="text-white/60 text-center py-8">
                            <p className="text-sm">No search results found. Please try a different query.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {searchResults.map((result, index) => (
                                <div
                                    key={index}
                                    className={`bg-white/5 hover:bg-white/10 rounded-lg p-4 cursor-pointer transition-all ${result.selected ? 'ring-2 ring-indigo-600' : ''
                                    }`}
                                    onClick={() => toggleResult(index)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 mr-4">
                                            <h4 className="font-medium text-white">{result.title}</h4>
                                            <p className="mt-1 text-sm text-white/60">{result.snippet}</p>
                                            <p className="mt-2 text-xs text-white/40">{result.url}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className={`p-1.5 rounded-md ${result.selected
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-white/5 hover:bg-white/10 text-white/60'
                                            }`}>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     strokeWidth="2">
                                                    {result.selected ? (
                                                        <path d="M5 13l4 4L19 7"/>
                                                    ) : (
                                                        <path d="M12 4v16m8-8H4"/>
                                                    )}
                                                </svg>
                                            </div>
                                            <a
                                                href={result.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 bg-white/5 hover:bg-white/10 text-white/60 rounded-md"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     strokeWidth="2">
                                                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-4">
                        <button
                            onClick={() => setStep('schema')}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleSourcesSubmit}
                            disabled={!searchResults.some(r => r.selected) || isTransitioning}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-600 rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}