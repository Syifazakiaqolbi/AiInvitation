import OrnamentDivider from './ui/OrnamentDivider';

export function HeroSection({ names, variation, eventType }) {
  const namesList = names?.split('&').map(n => n.trim()) || ['', ''];
  const name1 = namesList[0] || 'Name';
  const name2 = namesList[1] || '';

  return (
    <section className="inv-section min-h-screen flex flex-col items-center justify-center p-6 text-center relative pattern-overlay">
      {/* Decorative Corners */}
      <svg className="deco-corner-tl animate-ornament" viewBox="0 0 120 120" fill="none">
        <path d="M0 0 C60 0, 120 60, 120 120 L100 120 C100 70, 50 0, 0 0Z" fill="currentColor" className="text-primary" />
      </svg>
      <svg className="deco-corner-br animate-ornament" viewBox="0 0 120 120" fill="none">
        <path d="M0 0 C60 0, 120 60, 120 120 L100 120 C100 70, 50 0, 0 0Z" fill="currentColor" className="text-primary" />
      </svg>

      <div className="relative z-10 reveal visible">
        <p className="text-primary font-semibold tracking-[0.3em] text-[11px] uppercase mb-6">
          The {eventType || 'Wedding'} Of
        </p>
        
        <h1 className="font-script text-gray-800 leading-tight text-5xl md:text-7xl lg:text-8xl">
          {name1}
        </h1>
        
        {name2 && (
          <>
            <p className="text-3xl md:text-4xl text-primary/60 font-script my-2">&</p>
            <h1 className="font-script text-gray-800 leading-tight text-5xl md:text-7xl lg:text-8xl">
              {name2}
            </h1>
          </>
        )}
        
        <OrnamentDivider className="my-8" />
        
        <div className="max-w-md mx-auto">
          <p className="text-gray-500 text-sm mb-3">Peace be upon you</p>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {variation?.hero?.subheadline || 'With immense joy and gratitude, we invite you to celebrate the beginning of our new journey together.'}
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 animate-chevron">
        <i className="fas fa-chevron-down text-primary/40 text-lg"></i>
      </div>
    </section>
  );
}

export default HeroSection;
