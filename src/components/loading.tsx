export function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <h2 className="text-pink-500 text-[24px] font-semibold animate-pulse">
                로딩 중...
            </h2>

            <div className="flex gap-2">
                <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-4 h-4 bg-pink-300 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
}