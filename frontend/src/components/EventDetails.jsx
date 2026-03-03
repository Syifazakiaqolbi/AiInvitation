export function EventDetails({ variation, mapsLink, dateTime, dressCode, language }) {
  const addToCalendar = () => {
    if (!dateTime) return;
    
    const date = new Date(dateTime);
    const endDate = new Date(date.getTime() + 3 * 60 * 60 * 1000); // +3 hours
    
    const formatDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(variation?.event?.title || 'Event')}&dates=${formatDate(date)}/${formatDate(endDate)}&location=${encodeURIComponent(variation?.event?.venue || '')}&details=${encodeURIComponent('You are invited!')}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="inv-section py-20 px-6 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 text-center relative pattern-overlay">
      <div className="relative z-10 max-w-3xl mx-auto reveal visible">
        <p className="text-primary font-semibold tracking-[0.25em] text-[11px] uppercase mb-3">
          {language === 'id' ? 'Simpan Tanggal' : 'Save The Date'}
        </p>
        
        <h2 className="text-3xl md:text-4xl font-elegant font-semibold text-gray-800 mb-10">
          {variation?.event?.title || 'Wedding Ceremony'}
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Date & Time Card */}
          <div className="card-elevated rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-calendar-days text-primary text-lg"></i>
            </div>
            <p className="text-lg font-elegant font-semibold text-gray-800">
              {variation?.event?.date || 'Event Date'}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {variation?.event?.time || 'Event Time'}
            </p>
          </div>

          {/* Venue Card */}
          <div className="card-elevated rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-location-dot text-secondary text-lg"></i>
            </div>
            <p className="font-elegant font-semibold text-gray-800">
              {variation?.event?.venue || 'Venue Name'}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {variation?.event?.address || 'Venue Address'}
            </p>
          </div>
        </div>

        {/* Dress Code */}
        <div className="card-elevated rounded-2xl p-5 mt-5 inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <i className="fas fa-shirt text-primary text-sm"></i>
          </div>
          <div className="text-left">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              {language === 'id' ? 'Kode Pakaian' : 'Dress Code'}
            </p>
            <p className="text-sm font-medium text-gray-700">
              {dressCode || 'Formal Attire'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {mapsLink && (
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition shadow-md"
            >
              <i className="fas fa-map-location-dot text-xs"></i>
              {language === 'id' ? 'Buka Maps' : 'Open Maps'}
            </a>
          )}
          <button
            onClick={addToCalendar}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition shadow-md"
          >
            <i className="fas fa-calendar-plus text-xs"></i>
            {language === 'id' ? 'Tambah ke Kalender' : 'Add to Calendar'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
