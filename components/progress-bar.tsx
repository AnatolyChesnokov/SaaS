import { CheckIcon } from "@heroicons/react/24/outline";

export const ProgressBar = ({ getStepStatus, steps }: { getStepStatus: (step: number) => string, steps: { number: number; title: string; description: string }[] }) => {
    return (
        <div className="sticky top-0 z-50 w-full py-6 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-5xl mx-auto px-6">
                <nav aria-label="Progress">
                    <ol role="list" className="flex items-center justify-between">
                        {steps.map((stepItem) => (
                            <li key={stepItem.number} className="relative">
                                <div className="flex flex-col items-center">
                                    {getStepStatus(stepItem.number) === 'complete' ? (
                                        <div
                                            className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                                            <CheckIcon className="w-5 h-5 text-white" aria-hidden="true"/>
                                        </div>
                                    ) : getStepStatus(stepItem.number) === 'current' ? (
                                        <div
                                            className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-gray-900 flex items-center justify-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-indigo-600"/>
                                        </div>
                                    ) : (
                                        <div
                                            className="h-8 w-8 rounded-full border-2 border-gray-700 bg-gray-900 flex items-center justify-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-transparent"/>
                                        </div>
                                    )}
                                    <div className="mt-3 flex flex-col items-center">
                                        <span className="text-sm font-medium text-white">{stepItem.title}</span>
                                        <span
                                            className="text-xs text-white/40 mt-1 text-center">{stepItem.description}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </div>
    );
};
