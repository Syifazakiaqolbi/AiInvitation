export function InvitationPreview({ variation, formData }) {
  if (!variation) {
    return (
      <div className="card-elevated rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <i className="fas fa-eye text-primary text-sm"></i>
          </div>
          <h3 className="text-xl font-elegant font-semibold text-gray-800">Preview</h3>
        </div>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-300">
          <i className="fas fa-image text-3xl mb-2"></i>
          <p className="text-sm">Select a style above to see a preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <i className="fas fa-eye text-primary text-sm"></i>
        </div>
        <h3 className="text-xl font-elegant font-semibold text-gray-800">Preview</h3>
      </div>
      
      <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-amber-50 rounded-xl p-8 text-center relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 left-0 w-20 h-20 opacity-10">
          <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
            <path d="M0 0 C60 0, 120 60, 120 120 L100 120 C100 70, 50 0, 0 0Z" fill="currentColor" className="text-primary" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10 rotate-180">
          <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
            <path d="M0 0 C60 0, 120 60, 120 120 L100 120 C100 70, 50 0, 0 0Z" fill="currentColor" className="text-primary" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <p className="text-primary font-semibold tracking-[0.2em] text-[10px] uppercase mb-2">
            {formData.eventType || 'Event'}
          </p>
          
          <h2 className="text-3xl md:text-4xl font-script text-gray-800 mb-4">
            {variation.hero?.headline || formData.hostNames || 'Your Names'}
          </h2>
          
          <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            {variation.hero?.subheadline || 'Your invitation message will appear here...'}
          </p>
          
          <div className="ornament-divider my-4">
            <i className="fas fa-diamond text-primary/30 text-[6px]"></i>
          </div>
          
          <div className="space-y-1">
            <p className="font-elegant font-semibold text-gray-800">
              {variation.event?.title || 'Event Title'}
            </p>
            <p className="text-gray-600 text-sm">
              {variation.event?.date || 'Event Date'}
            </p>
            <p className="text-gray-500 text-sm">
              {variation.event?.venue || formData.venueName || 'Venue Name'}
            </p>
          </div>
          
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 rounded-full">
            <i className="fas fa-shirt text-primary text-xs"></i>
            <span className="text-xs font-medium text-gray-600">
              {formData.dressCode || 'Dress Code'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationPreview;
