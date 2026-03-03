export function Header() {
  return (
    <header className="py-4 px-6 border-b border-primary/10 bg-white/60 backdrop-blur-lg sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
            <i className="fas fa-envelope-open-text text-white text-sm"></i>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 font-elegant leading-tight">AI Invitation</h1>
            <p className="text-[10px] text-primary font-medium tracking-widest uppercase">Generator</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-primary/60">
          <i className="fas fa-wand-magic-sparkles text-sm"></i>
          <span className="text-xs font-medium hidden sm:inline">Powered by AI</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
