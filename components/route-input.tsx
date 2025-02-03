export const RouteInput = ({ value, onChange, warning }: { value: string; onChange: (value: string) => void; warning: string | null }) => (
    <div className="relative">
        <div className="flex items-center space-x-2">
            <div className="text-white/60">/api/</div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter your API route"
                className="flex-1 bg-white/5 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
        </div>
        {warning && (
            <div className="mt-2 text-amber-400 text-sm">
                {warning}
            </div>
        )}
    </div>
);
