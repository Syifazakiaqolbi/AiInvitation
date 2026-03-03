export function VariationPicker({ variations, selectedIndex, onSelect }) {
  if (!variations || variations.length === 0) return null;

  return (
    <div className="card-elevated rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <i className="fas fa-palette text-primary text-sm"></i>
        </div>
        <h3 className="text-xl font-elegant font-semibold text-gray-800">Choose Your Style</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {variations.map((v, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(idx)}
            className={`
              variation-card p-4 rounded-xl border-2 cursor-pointer transition-all
              ${selectedIndex === idx 
                ? 'selected border-primary bg-amber-50/50' 
                : 'border-gray-200 hover:border-primary/50'}
            `}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`
                w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold
                ${selectedIndex === idx ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {idx + 1}
              </div>
              <span className="font-medium text-gray-700">Style {idx + 1}</span>
              {selectedIndex === idx && (
                <i className="fas fa-check-circle text-primary text-sm ml-auto"></i>
              )}
            </div>
            
            <h4 className="font-script text-lg text-gray-800 mb-2 line-clamp-1">
              {v.hero?.headline || 'Untitled'}
            </h4>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {v.hero?.subheadline || 'No description'}
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full capitalize">
                {v.style || 'elegant'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VariationPicker;
