import OrnamentDivider from './ui/OrnamentDivider';

export function Footer({ variation, onShare, language = 'en' }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "You're Invited!",
        text: 'Check out this invitation!',
        url: window.location.href,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    
    if (onShare) onShare();
  };

  return (
    <section className="inv-section py-24 px-6 text-center relative pattern-overlay">
      {/* Decorative Corners */}
      <svg className="deco-corner-tl animate-ornament" viewBox="0 0 120 120" fill="none">
        <path d="M0 0 C60 0, 120 60, 120 120 L100 120 C100 70, 50 0, 0 0Z" fill="currentColor" className="text-primary" />
      </svg>
      <svg className="deco-corner-br animate-ornament" viewBox="0 0 120 120" fill="none">
        <path d="M0 0 C60 0, 120 60, 120 120 L100 120 C100 70, 50 0, 0 0Z" fill="currentColor" className="text-primary" />
      </svg>

      <div className="relative z-10 max-w-lg mx-auto reveal visible">
        <p className="text-gray-600 leading-relaxed text-sm">
          {variation?.closing?.message || 
            'It would be our greatest joy to have you celebrate this special moment with us. Your presence and blessings mean the world.'}
        </p>

        <p className="text-gray-600 mt-4 text-sm">
          {language === 'id' ? 'Dengan cinta dan syukur,' : 'With love and gratitude,'}
        </p>

        <h2 className="text-5xl md:text-6xl font-script text-gray-800 mt-6">
          {variation?.closing?.signature || 'The Couple'}
        </h2>

        <OrnamentDivider className="my-8" icon="fa-heart" />

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition shadow-md"
        >
          <i className="fas fa-share-nodes text-xs"></i>
          {language === 'id' ? 'Bagikan Undangan' : 'Share Invitation'}
        </button>

        <p className="text-[10px] text-gray-400 mt-6 tracking-wider">
          Created with AI Invitation Generator
        </p>
      </div>
    </section>
  );
}

export default Footer;
