export function KotgLogo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-kotg-display text-xl font-semibold tracking-wide text-kotg-primary ${className ?? ""}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2 21 6v6c0 5.25-3.75 8.9-9 10-5.25-1.1-9-4.75-9-10V6l9-4Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M8.5 12.5 11 15l4.5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      KOTG
    </span>
  );
}
