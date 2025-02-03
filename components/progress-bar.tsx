import { CheckIcon } from "@heroicons/react/24/outline";
import { Fragment } from 'react'

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

export const ProgressBar_unstable = ({ getStepStatus, steps }: { getStepStatus: (step: number) => string, steps: { number: number; title: string; description: string }[] }) => {
  return (
    <div className="sticky top-0 z-50 w-full py-6 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center justify-between gap-0">
            {steps.map((stepItem, index) => (
              <Fragment key={stepItem.number}>
                <li className="relative flex flex-col items-center flex-1">
                  {getStepStatus(stepItem.number) === 'complete' ? (
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0 border-2 rounded-full font-semibold text-sm relative z-10 transition-colors duration-300 border-indigo-600 bg-indigo-600 text-white">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1.6em"
                           width="1.6em" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
                      </svg>
                    </div>
                  ) : getStepStatus(stepItem.number) === 'current' ? (
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0 border-2 rounded-full font-semibold text-sm relative z-10 transition-colors duration-300 border-indigo-600 text-gray-300">
                      <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-900 flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-transparent" />
                    </div>
                  )}
                  <div className="mt-2 text-center">
                    <span className="text-sm font-medium text-white whitespace-nowrap">{stepItem.title}</span>
                    <span className="text-xs text-white/40 block mt-1">{stepItem.description}</span>
                  </div>
                </li>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-700 mx-1 relative">
                    <div
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${getStepStatus(stepItem.number) === 'complete' ? 'w-full bg-indigo-600' : 'w-0'}`} />
                  </div>
                )}
              </Fragment>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};
