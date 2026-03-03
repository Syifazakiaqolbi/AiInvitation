export function StepProgress({ currentStep }) {
  return (
    <div className="flex justify-center mb-10 animate-fade-in-up delay-200">
      <div className="flex items-center gap-3">
        {/* Step 1 */}
        <div className="flex items-center gap-2">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shadow-md transition-colors
            ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}
          `}>
            {currentStep > 1 ? <i className="fas fa-check text-xs"></i> : '1'}
          </div>
          <span className={`text-sm font-semibold ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
            Details
          </span>
        </div>

        {/* Connector */}
        <div className={`w-16 h-0.5 rounded-full transition-colors ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>

        {/* Step 2 */}
        <div className="flex items-center gap-2">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
            ${currentStep >= 2 ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-400'}
          `}>
            2
          </div>
          <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
            Preview
          </span>
        </div>
      </div>
    </div>
  );
}

export default StepProgress;
