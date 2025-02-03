import { motion } from "framer-motion";

export const Transition = ({ message }: { message: string }) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-[60] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center"
        >
            <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                    <svg className="animate-spin h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{message}</h3>
                <p className="text-white/60">Please wait while we process your request...</p>
            </div>
        </motion.div>
    );
};