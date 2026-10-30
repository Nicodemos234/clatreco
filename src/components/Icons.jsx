const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };

export const HelpIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2.2">
    <path d="M9.2 9a3 3 0 1 1 4.3 2.7c-.9.4-1.5 1.2-1.5 2.1v.4" />
    <circle cx="12" cy="18" r=".6" fill="currentColor" />
  </svg>
);

export const MoonIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2.2">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);

export const SunIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2.2">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const StatsIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2.4">
    <path d="M6 20v-6M12 20V5M18 20v-9" />
  </svg>
);

export const GearIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
);

export const BackspaceIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2">
    <path d="M21 5H9l-6 7 6 7h12z" />
    <path d="M17 9l-6 6M11 9l6 6" />
  </svg>
);

export const ShareIcon = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2.2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);
