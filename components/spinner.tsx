export const LoadingSpinner = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center space-y-4 p-12">
        <div className="relative">
            <div className="w-12 h-12 border-4 border-white/10 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-t-indigo-600 border-r-indigo-600 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
        </div>
        <p className="text-white/60 text-sm">{message}</p>
    </div>
);
