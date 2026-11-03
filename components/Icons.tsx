export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <circle cx="8.5" cy="8.5" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12.4 12.4 L16.2 16.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
    </svg>
  );
}

export function DirectoryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.2" fill="currentColor" opacity="0.92" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.2" fill="currentColor" opacity="0.55" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.2" fill="currentColor" opacity="0.55" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.2" fill="currentColor" opacity="0.92" />
    </svg>
  );
}

export function ResearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="5" y="3.5" width="14" height="17" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.5 9h7M8.5 12.5h7M8.5 16h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

export function LearnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4.5 18.5 V7.2 L12 4.5 L19.5 7.2 V18.5 L12 16.1 Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="miter" />
      <path d="M12 4.5 V16.1" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <path d="M3 8h9M8.5 4.2 L12.8 8 L8.5 11.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
