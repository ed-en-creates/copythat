export function Logo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="6" width="13" height="15" rx="2.5" stroke="#EDEDEA" strokeWidth="1.6" />
      <rect x="8" y="1" width="13" height="15" rx="2.5" fill="var(--accent)" />
    </svg>
  );
}
export function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function Check({ color = 'currentColor', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flex: 'none', marginTop: 3 }}>
      <path d="M3 8.5l3.2 3L13 4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function CopyIcon({ color = '#0A0A0A' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="9" height="9" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
export function Lock({ color = '#0A0A0A' }) {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <rect x="1" y="7" width="12" height="8" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M4 7V5a3 3 0 016 0v2" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
export function PlayPause({ playing }) {
  return playing ? (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true"><rect x="1" y="1" width="3.4" height="12" rx="1" fill="#EDEDEA" /><rect x="7.6" y="1" width="3.4" height="12" rx="1" fill="#EDEDEA" /></svg>
  ) : (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true"><path d="M1 1.5v11l10-5.5L1 1.5z" fill="#EDEDEA" /></svg>
  );
}
export function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="#8A8A85" strokeWidth="1.5" /><path d="M12.5 12.5L16 16" stroke="#8A8A85" strokeWidth="1.5" strokeLinecap="round" /></svg>
  );
}
