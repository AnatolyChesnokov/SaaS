import { motion } from "framer-motion";

export const Toast = ({ error, setError }: { error: string; setError: (message: string | null) => void }) => {
    return (
        <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            className="fixed top-4 right-4 z-50 max-w-md bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg"
        >
            <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12" y2="16"/>
                </svg>
                <div className="flex-1 text-sm">{error}</div>
                <button
                    onClick={() => setError(null)}
                    className="text-white/60 hover:text-white"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </motion.div>
    );
};