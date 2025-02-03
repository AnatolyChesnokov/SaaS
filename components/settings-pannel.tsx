import { XMarkIcon } from "@heroicons/react/24/outline";
import { CronScheduler } from "@/components/cron-scheduler";

interface SettingsPanel {
    setShowSettings: (show: boolean) => void;
    cronSchedule: string;
    setCronSchedule: (cronSchedule: string) => void;
    routeInput: string;
    setError: (error: string) => void;
}

export const SettingsPanel = ({
    setShowSettings,
    cronSchedule,
    setCronSchedule,
    routeInput,
    setError
}: SettingsPanel) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-4xl relative">
                <button
                    onClick={() => setShowSettings(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <XMarkIcon className="w-6 h-6"/>
                </button>
                <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
                <div className="space-y-6">
                    <div className="pt-4 border-t border-white/10">
                        <CronScheduler
                            initialValue={cronSchedule}
                            onScheduleChange={async (schedule) => {
                                setCronSchedule(schedule);
                                try {
                                    const response = await fetch('/api/update-cron', {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify({
                                            schedule,
                                            path: `/api/results/${routeInput}`
                                        })
                                    });
                                    if (!response.ok) throw new Error('Failed to update cron schedule');
                                } catch (error) {
                                    console.error('Error updating cron schedule:', error);
                                    setError('Failed to update cron schedule');
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
