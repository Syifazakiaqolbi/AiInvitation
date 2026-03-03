export function OrnamentDivider({ icon = 'fa-diamond', className = '' }) {
  return (
    <div className={`ornament-divider ${className}`}>
      <i className={`fas ${icon} text-primary/30 text-[8px]`}></i>
    </div>
  );
}

export default OrnamentDivider;
