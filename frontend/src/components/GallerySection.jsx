import { useRef } from 'react';

export function GallerySection({ images = [], editable = false, onChange, language = 'en' }) {
  const inputRefs = useRef([]);

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file && onChange) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = { src: reader.result, alt: `Gallery ${index + 1}` };
        onChange(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (index) => {
    if (editable && inputRefs.current[index]) {
      inputRefs.current[index].click();
    }
  };

  const cells = [0, 1, 2, 3, 4, 5];

  return (
    <section className="inv-section py-20 px-6 bg-white/60 text-center">
      <div className="max-w-4xl mx-auto reveal visible">
        <p className="text-primary font-semibold tracking-[0.25em] text-[11px] uppercase mb-3">
          {language === 'id' ? 'Momen Kami' : 'Our Moments'}
        </p>
        
        <h2 className="text-2xl md:text-3xl font-elegant font-semibold text-gray-800 mb-10">
          {language === 'id' ? 'Galeri' : 'Gallery'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {cells.map((idx) => {
            const image = images[idx];
            const isOddRow = idx % 2 === 1;
            const isHiddenOnMobile = idx >= 3;

            return (
              <div
                key={idx}
                onClick={() => triggerUpload(idx)}
                className={`
                  gallery-cell
                  ${isOddRow ? 'bg-gradient-to-br from-secondary/5 to-primary/5' : 'bg-gradient-to-br from-primary/5 to-secondary/5'}
                  ${isHiddenOnMobile ? 'hidden md:flex' : ''}
                  ${editable ? 'cursor-pointer hover:opacity-80' : ''}
                `}
              >
                {editable && (
                  <input
                    type="file"
                    ref={(el) => (inputRefs.current[idx] = el)}
                    onChange={(e) => handleImageUpload(idx, e)}
                    accept="image/*"
                    className="hidden"
                  />
                )}

                {image?.src ? (
                  <img src={image.src} alt={image.alt || `Gallery ${idx + 1}`} />
                ) : (
                  <i className={`fas ${editable ? 'fa-plus' : 'fa-image'} text-2xl ${isOddRow ? 'text-secondary/20' : 'text-primary/20'}`}></i>
                )}

                {editable && image?.src && (
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <i className="fas fa-camera text-white text-xl"></i>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {editable && images.filter(img => img?.src).length === 0 && (
          <p className="text-xs text-gray-400 mt-4">
            Click a cell to upload a photo
          </p>
        )}
      </div>
    </section>
  );
}

export default GallerySection;
