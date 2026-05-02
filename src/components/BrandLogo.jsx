export function BrandLogo({ compact = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label="Rajnish Store">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 shrink-0"
        role="img"
        aria-label="Rajnish Store logo"
      >
        <rect x="4" y="4" width="40" height="40" rx="16" fill="#263238" />
        <path d="M15 21H33L31.9 34.2C31.8 35.2 30.9 36 29.9 36H18.1C17.1 36 16.2 35.2 16.1 34.2L15 21Z" fill="#FBFAF7" />
        <path d="M18 21C18 17.7 20.7 15 24 15C27.3 15 30 17.7 30 21" stroke="#FBFAF7" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M20 27.5H24.4C26.1 27.5 27.2 26.6 27.2 25.2C27.2 23.9 26.1 23 24.4 23H20V33" stroke="#B86B2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24.4 27.5L28.2 33" stroke="#B86B2B" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M35 13.5C36.8 13.5 37.5 12.8 37.5 11C37.5 12.8 38.2 13.5 40 13.5C38.2 13.5 37.5 14.2 37.5 16C37.5 14.2 36.8 13.5 35 13.5Z" fill="#F3EEE4" />
      </svg>
      {!compact && (
        <span>
          <span className="block font-display text-2xl font-bold leading-none tracking-tight text-charcoal">Rajnish</span>
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-slate">Amazon Finds</span>
        </span>
      )}
    </span>
  );
}
