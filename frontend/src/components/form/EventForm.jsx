import { useState, useRef } from 'react';
import { InlineSpinner } from '../ui/LoadingSpinner';

export function EventForm({ formData, onChange, onSubmit, loading, errors = {} }) {
  const [groomPhoto, setGroomPhoto] = useState(null);
  const [bridePhoto, setBridePhoto] = useState(null);
  const [musicFile, setMusicFile] = useState(null);
  
  const groomInputRef = useRef(null);
  const brideInputRef = useRef(null);
  const musicInputRef = useRef(null);

  const updateField = (key, value) => {
    onChange(key, value);
  };

  const handlePhotoUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'groom') {
          setGroomPhoto(reader.result);
          onChange('groomPhoto', reader.result);
        } else {
          setBridePhoto(reader.result);
          onChange('bridePhoto', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMusicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMusicFile(file.name);
      onChange('customMusic', file);
    }
  };

  const getInputClass = (field) => {
    return `form-input w-full px-4 py-3 rounded-xl text-sm ${errors[field] ? 'error' : ''}`;
  };

  return (
    <div className="card-elevated rounded-2xl p-6 md:p-8 animate-fade-in-up delay-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <i className="fas fa-pen-fancy text-primary text-sm"></i>
        </div>
        <h3 className="text-xl font-elegant font-semibold text-gray-800">Event Information</h3>
      </div>

      {/* Event Type & Theme */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Event Type <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.eventType}
            onChange={(e) => updateField('eventType', e.target.value)}
            className={getInputClass('eventType')}
          >
            <option value="Wedding">Wedding</option>
            <option value="Engagement">Engagement</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Graduation">Graduation</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Theme <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.theme}
            onChange={(e) => updateField('theme', e.target.value)}
            className={getInputClass('theme')}
          >
            <option value="elegant">Elegant</option>
            <option value="minimalist">Minimalist</option>
            <option value="modern">Modern</option>
            <option value="floral">Floral</option>
          </select>
        </div>
      </div>

      {/* Host Names */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Host Names <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.hostNames}
          onChange={(e) => updateField('hostNames', e.target.value)}
          placeholder="e.g., John & Jane"
          className={getInputClass('hostNames')}
        />
        {errors.hostNames && (
          <p className="text-xs text-red-500 mt-1">{errors.hostNames}</p>
        )}
        <p className="text-[11px] text-gray-400 mt-1">Use "&" to separate names for couple events</p>
      </div>

      {/* Date & Tone */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Date & Time <span className="text-red-400">*</span>
          </label>
          <input
            type="datetime-local"
            value={formData.dateTime}
            onChange={(e) => updateField('dateTime', e.target.value)}
            className={getInputClass('dateTime')}
          />
          {errors.dateTime && (
            <p className="text-xs text-red-500 mt-1">{errors.dateTime}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Tone <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.tone}
            onChange={(e) => updateField('tone', e.target.value)}
            className={getInputClass('tone')}
          >
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="poetic">Poetic</option>
            <option value="elegant">Elegant</option>
          </select>
        </div>
      </div>

      {/* Venue */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Venue Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.venueName}
          onChange={(e) => updateField('venueName', e.target.value)}
          placeholder="e.g., Grand Ballroom Hotel"
          className={getInputClass('venueName')}
        />
        {errors.venueName && (
          <p className="text-xs text-red-500 mt-1">{errors.venueName}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Venue Address <span className="text-red-400">*</span>
        </label>
        <textarea
          value={formData.venueAddress}
          onChange={(e) => updateField('venueAddress', e.target.value)}
          rows={2}
          placeholder="Full address of the venue"
          className={`${getInputClass('venueAddress')} resize-none`}
        />
        {errors.venueAddress && (
          <p className="text-xs text-red-500 mt-1">{errors.venueAddress}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Google Maps Link <span className="text-gray-300">(optional)</span>
        </label>
        <input
          type="url"
          value={formData.mapsLink}
          onChange={(e) => updateField('mapsLink', e.target.value)}
          placeholder="https://maps.google.com/..."
          className={getInputClass('mapsLink')}
        />
        {errors.mapsLink && (
          <p className="text-xs text-red-500 mt-1">{errors.mapsLink}</p>
        )}
      </div>

      {/* Dress Code */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Dress Code <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.dressCode}
          onChange={(e) => updateField('dressCode', e.target.value)}
          placeholder="e.g., Formal Attire, Casual Chic, Traditional"
          className={getInputClass('dressCode')}
        />
        {errors.dressCode && (
          <p className="text-xs text-red-500 mt-1">{errors.dressCode}</p>
        )}
      </div>

      {/* Language & Music */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Language <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.language}
            onChange={(e) => updateField('language', e.target.value)}
            className={getInputClass('language')}
          >
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Background Music
          </label>
          <select
            value={formData.music}
            onChange={(e) => updateField('music', e.target.value)}
            className={getInputClass('music')}
          >
            <option value="wedding1">Wedding Music 1</option>
            <option value="wedding2">Wedding Music 2</option>
            <option value="instrumental">Instrumental</option>
            <option value="none">No Music</option>
          </select>
        </div>
      </div>

      {/* Custom Music Upload */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Upload Custom Music <span className="text-gray-300">(optional)</span>
        </label>
        <input
          type="file"
          ref={musicInputRef}
          onChange={handleMusicUpload}
          accept="audio/*"
          className="hidden"
        />
        <div
          onClick={() => musicInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors
            ${musicFile ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}
        >
          <i className={`fas fa-music text-lg mb-1 ${musicFile ? 'text-primary' : 'text-primary/40'}`}></i>
          <p className="text-xs text-gray-400">
            {musicFile || 'Click to upload MP3, WAV, or OGG (max 15 MB)'}
          </p>
        </div>
      </div>

      {/* Couple Photo Upload */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Couple Photos <span className="text-gray-300">(optional)</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <input
              type="file"
              ref={groomInputRef}
              onChange={(e) => handlePhotoUpload('groom', e)}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => groomInputRef.current?.click()}
              className="w-28 h-28 mx-auto rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center bg-primary/5 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
            >
              {groomPhoto ? (
                <img src={groomPhoto} alt="Groom" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <i className="fas fa-camera text-primary/30 text-lg"></i>
                  <p className="text-[10px] text-gray-400 mt-1">Groom</p>
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            <input
              type="file"
              ref={brideInputRef}
              onChange={(e) => handlePhotoUpload('bride', e)}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => brideInputRef.current?.click()}
              className="w-28 h-28 mx-auto rounded-full border-2 border-dashed border-secondary/30 flex items-center justify-center bg-secondary/5 overflow-hidden cursor-pointer hover:border-secondary/50 transition-colors"
            >
              {bridePhoto ? (
                <img src={bridePhoto} alt="Bride" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <i className="fas fa-camera text-secondary/30 text-lg"></i>
                  <p className="text-[10px] text-gray-400 mt-1">Bride</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2.5 text-sm disabled:opacity-50"
      >
        {loading ? (
          <>
            <InlineSpinner />
            <span>AI is crafting your invitation...</span>
          </>
        ) : (
          <>
            <i className="fas fa-wand-magic-sparkles"></i>
            <span>Generate AI Invitation</span>
          </>
        )}
      </button>
    </div>
  );
}

export default EventForm;
