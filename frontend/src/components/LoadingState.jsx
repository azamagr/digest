export default function LoadingState() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading articles">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border-b border-line pb-8 animate-pulse">
          <div className="w-full aspect-[16/9] bg-line/60 rounded-lg" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-1/4 bg-line/60 rounded" />
            <div className="h-6 w-3/4 bg-line/60 rounded" />
            <div className="h-4 w-full bg-line/40 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
