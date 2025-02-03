'use client';

import { AnimatePresence } from 'framer-motion';
import { steps, useApi } from "@/hooks/use-api";
import { Transition } from "@/components/transition";
import { Toast } from "@/components/toast";
import { LoadingSpinner } from "@/components/spinner";
import { ProgressBar } from "@/components/progress-bar";
import { InitialStep } from "@/components/steps/initial";
import { QueryStep } from "@/components/steps/query";
import { SchemaStep } from "@/components/steps/schema";
import { SourcesStep } from "@/components/steps/source";
import { ExtractStep } from "@/components/steps/extract";
import { DeployStep } from "@/components/steps/deploy";
import { SettingsButton } from "@/components/settings-button";
import { SettingsPanel } from "@/components/settings-pannel";

export default function Home() {
  const {
    step,
    error,
    loading,
    isTransitioning,
    transitionMessage,
    showSettings,
    setShowSettings,
    query,
    setQuery,
    schemaStr,
    setSchemaStr,
    searchResults,
    extractedData,
    routeInput,
    setRouteInput,
    deployedRoute,
    apiKey,
    isDeployed,
    warning,
    cronSchedule,
    customUrl,
    setCustomUrl,
    toggleResult,
    handleSearch,
    handleDeploy,
    setError,
    searchQuery,
    setSearchQuery,
    getStepStatus,
    handleSourcesSubmit,
    handleQuerySubmit,
    handleSchemaSubmit,
    setCronSchedule,
    setStep
  } = useApi();

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Full-screen loading transition */}
        {isTransitioning && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <LoadingSpinner message={transitionMessage}/>
            </div>
        )}

        {/* Progress Steps */}
        {step !== 'initial' && (
            <ProgressBar steps={steps} getStepStatus={getStepStatus}/>
        )}

        {/* Main content */}
        <div className="relative">
          {/* Full-screen loading transition */}
          <AnimatePresence>
            {isTransitioning && (
                <Transition message={transitionMessage} />
            )}
          </AnimatePresence>


          {/* Error Toast */}
          <AnimatePresence>
            {error && (
                <Toast error={error} setError={setError} />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step === 'initial' && (
                <InitialStep
                    query={query}
                    setQuery={setQuery}
                    loading={loading}
                    handleQuerySubmit={handleQuerySubmit}
                />
            )}
            {step === 'query' && (
                <QueryStep
                    query={query}
                    setQuery={setQuery}
                    loading={loading}
                    handleQuerySubmit={handleQuerySubmit}
                    setStep={setStep}
                />
            )}
            {step === 'schema' && (
              <SchemaStep
                  schemaStr={schemaStr}
                  setSchemaStr={setSchemaStr}
                  loading={loading}
                  handleSchemaSubmit={handleSchemaSubmit}
                  setStep={setStep}
              />
            )}
            {step === 'sources' && (
              <SourcesStep
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  loading={loading}
                  handleSearch={handleSearch}
                  setStep={setStep}
                  customUrl={customUrl}
                  setCustomUrl={setCustomUrl}
                  isTransitioning={isTransitioning}
                  transitionMessage={transitionMessage}
                  searchResults={searchResults}
                  toggleResult={toggleResult}
                  handleSourcesSubmit={handleSourcesSubmit}
              />
            )}
            {step === 'extract' && (
                <ExtractStep
                    extractedData={extractedData}
                    setRouteInput={setRouteInput}
                    loading={loading}
                    query={query}
                    setStep={setStep}
                />
            )}
            {step === 'deploy' && (
                <DeployStep
                    isDeployed={isDeployed}
                    routeInput={routeInput}
                    setRouteInput={setRouteInput}
                    loading={loading}
                    warning={warning}
                    handleDeploy={handleDeploy}
                    setStep={setStep}
                    deployedRoute={deployedRoute}
                    apiKey={apiKey}
                />
            )}
          </AnimatePresence>
        </div>

        {/* Settings Button */}
        <SettingsButton setShowSettings={setShowSettings}/>

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel
              routeInput={routeInput}
              setShowSettings={setShowSettings}
              cronSchedule={cronSchedule}
              setCronSchedule={setCronSchedule}
              setError={setError}
          />
         )}
        {step === 'deploy' && (
            <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/10">
            </div>
        )}
      </div>
  );
}
