import { useState } from 'react';
import OrnamentDivider from './ui/OrnamentDivider';

export function RSVPForm({ language = 'en', guestName = '', invitationSlug = '' }) {
  const [formData, setFormData] = useState({
    name: guestName,
    status: 'attending',
    message: '',
  });
  const [wishes, setWishes] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const labels = {
    en: {
      title: 'RSVP & Wishes',
      subtitle: 'Confirm attendance and send your wishes',
      name: 'Your name',
      attending: 'Will Attend',
      notAttending: 'Cannot Attend',
      maybe: 'Maybe',
      wishPlaceholder: 'Write your wishes...',
      submit: 'Send RSVP',
      recentWishes: 'Recent Wishes',
      thankYou: 'Thank you for your response!',
    },
    id: {
      title: 'RSVP & Ucapan',
      subtitle: 'Konfirmasi kehadiran dan kirim ucapan',
      name: 'Nama Anda',
      attending: 'Akan Hadir',
      notAttending: 'Tidak Dapat Hadir',
      maybe: 'Mungkin',
      wishPlaceholder: 'Tulis ucapan Anda...',
      submit: 'Kirim RSVP',
      recentWishes: 'Ucapan Terbaru',
      thankYou: 'Terima kasih atas respons Anda!',
    },
  };

  const t = labels[language] || labels.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) return;

    // Add to local wishes
    if (formData.message.trim()) {
      setWishes(prev => [
        { name: formData.name, message: formData.message, status: formData.status },
        ...prev,
      ]);
    }

    setSubmitted(true);
    
    // Reset after showing thank you
    setTimeout(() => {
      setFormData(prev => ({ ...prev, message: '' }));
    }, 2000);
  };

  return (
    <section className="inv-section py-20 px-6 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 relative pattern-overlay">
      <div className="max-w-lg mx-auto relative z-10 reveal visible">
        <div className="card-elevated rounded-3xl p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-envelope text-secondary text-xl"></i>
            </div>
            <h2 className="text-2xl font-elegant font-semibold text-gray-800">
              {t.title}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
          </div>

          {submitted ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-600 text-2xl"></i>
              </div>
              <p className="text-gray-700 font-medium">{t.thankYou}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={t.name}
                required
                className="form-input w-full px-4 py-3 rounded-xl text-sm"
              />

              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="form-input w-full px-4 py-3 rounded-xl text-sm"
              >
                <option value="attending">{t.attending}</option>
                <option value="not-attending">{t.notAttending}</option>
                <option value="maybe">{t.maybe}</option>
              </select>

              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder={t.wishPlaceholder}
                rows={3}
                className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg transition-all"
              >
                {t.submit}
              </button>
            </form>
          )}

          {/* Wishes List */}
          {wishes.length > 0 && (
            <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
              <OrnamentDivider className="my-2" />
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider text-center">
                {t.recentWishes}
              </p>

              <div className="space-y-2">
                {wishes.map((wish, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-800">{wish.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        wish.status === 'attending' ? 'bg-green-100 text-green-700' :
                        wish.status === 'not-attending' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {wish.status === 'attending' ? t.attending :
                         wish.status === 'not-attending' ? t.notAttending : t.maybe}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{wish.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RSVPForm;
