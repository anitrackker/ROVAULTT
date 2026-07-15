export const ThemedBackdrop = () => {
  return (
    <svg className="viewport-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a0c16" />
          <stop offset="100%" stopColor="#121626" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#sky)" />
      
      {/* Massive Vault Bucks Watermark */}
      <g transform="translate(200, 100) scale(20)" opacity="0.015">
        <line x1="7" y1="1.5" x2="7" y2="18.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="13" y1="1.5" x2="13" y2="18.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
        <polyline points="3,3 10,17 17,3" stroke="#fff" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
};
