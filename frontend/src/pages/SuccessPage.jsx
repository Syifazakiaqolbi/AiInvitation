export function SuccessPage({ data, onCopy, onCreateNew }) {
  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    onCopy?.('Link copied to clipboard!');
  };

  return (
    <div className="gradient-bg min-h-screen py-12 px-5">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <i className="fas fa-check text-3xl text-emerald-600"></i>
          </div>
          <h1 className="text-3xl md:text-4xl font-elegant text-gray-800 mb-2">
            Invitation Published!
          </h1>
          <p className="text-gray-500 text-sm">
            Your invitation is live. Share the personalized links below.
          </p>
        </div>

        {/* Main Link */}
        <div className="card-elevated rounded-2xl p-6 md:p-8 mb-6 animate-fade-in-up delay-200">
          <h2 className="text-lg font-elegant font-semibold text-gray-800 mb-4">
            Main Invitation Link
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={data?.main_link || ''}
              readOnly
              className="form-input flex-1 px-4 py-3 rounded-xl text-xs bg-gray-50 font-mono"
            />
            <button
              onClick={() => copyLink(data?.main_link)}
              className="btn-primary px-5 py-3 rounded-xl text-sm"
              title="Copy link"
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>
        </div>

        {/* Guest Links */}
        <div className="card-elevated rounded-2xl p-6 md:p-8 animate-fade-in-up delay-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-elegant font-semibold text-gray-800">
              Personalized Guest Links
            </h2>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {data?.total_guests || 0} guests
            </span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {data?.guest_links?.map((guest, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-user text-primary text-xs"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">{guest.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono truncate">{guest.link}</p>
                </div>
                <button
                  onClick={() => copyLink(guest.link)}
                  className="btn-primary px-3 py-2 rounded-lg text-xs flex-shrink-0"
                  title="Copy link"
                >
                  <i className="fas fa-copy"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3 justify-center animate-fade-in-up delay-400">
          <button
            onClick={() => window.print()}
            className="px-5 py-3 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition flex items-center gap-2"
          >
            <i className="fas fa-print text-xs"></i> Print Links
          </button>
          <button
            onClick={onCreateNew}
            className="btn-outline px-5 py-3 rounded-xl text-sm flex items-center gap-2"
          >
            <i className="fas fa-plus text-xs"></i> Create New
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
