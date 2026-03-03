export function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-fade-in-up">
      <div className="flex items-start gap-3">
        <i className="fas fa-exclamation-circle text-red-500 mt-0.5 flex-shrink-0"></i>
        <div className="flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorBanner;
