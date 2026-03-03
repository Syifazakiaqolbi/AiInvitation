export function LoadingSpinner({ message = 'Loading...', subMessage = '' }) {
  return (
    <div className="py-10 text-center">
      <div className="spinner mx-auto mb-4"></div>
      <p className="text-sm text-gray-500 font-medium">{message}</p>
      {subMessage && (
        <p className="text-xs text-gray-400 mt-1">{subMessage}</p>
      )}
    </div>
  );
}

export function InlineSpinner({ className = '' }) {
  return (
    <div className={`spinner spinner-sm ${className}`}></div>
  );
}

export default LoadingSpinner;
