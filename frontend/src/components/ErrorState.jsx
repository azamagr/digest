export default function ErrorState({ message, onRetry }) {
  return (
    <div className="text-center py-16">
      <p className="text-ink font-medium">Couldn't load articles.</p>
      <p className="text-sm text-muted mt-1">{message}</p>
      <button onClick={onRetry} className="text-wine font-medium mt-4 hover:underline">
        Try again
      </button>
    </div>
  );
}
