export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen font-mono">
      <div className="text-xs text-muted-foreground animate-pulse">
        <span className="text-green-500">$</span> loading...
      </div>
    </div>
  );
}
