export function Toast({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => onDismiss(toast.id)}
          className={`
            px-4 py-3 rounded-xl shadow-lg cursor-pointer
            transform transition-all duration-300
            toast-enter
            ${toast.type === 'error' ? 'bg-red-600 text-white' : ''}
            ${toast.type === 'success' ? 'bg-gray-800 text-white' : ''}
            ${toast.type === 'info' ? 'bg-blue-600 text-white' : ''}
            ${!toast.type ? 'bg-gray-800 text-white' : ''}
          `}
        >
          <div className="flex items-center gap-2">
            {toast.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
            {toast.type === 'success' && <i className="fas fa-check-circle"></i>}
            {toast.type === 'info' && <i className="fas fa-info-circle"></i>}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Toast;
