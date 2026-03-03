export function GuestListInput({ value, onChange, error }) {
  const guestCount = value.split('\n').filter(line => line.trim()).length;

  return (
    <div className="card-elevated rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <i className="fas fa-users text-primary text-sm"></i>
        </div>
        <h3 className="text-xl font-elegant font-semibold text-gray-800">Guest List</h3>
      </div>
      
      <p className="text-sm text-gray-500 mb-3">
        Enter one name per line. Each guest receives a personalized link.
      </p>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder="Mr. Ahmad Santoso&#10;Mrs. Siti Nurhaliza&#10;Mr. Budi Pratama&#10;Ms. Dewi Lestari"
        className={`form-input w-full px-4 py-3 rounded-xl text-sm font-mono resize-none ${error ? 'error' : ''}`}
      />
      
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
      
      <p className="text-xs text-gray-400 mt-2">
        <span className={`font-semibold ${guestCount > 0 ? 'text-primary' : ''}`}>
          {guestCount}
        </span> guest{guestCount !== 1 ? 's' : ''}
      </p>
    </div>
  );
}

export default GuestListInput;
