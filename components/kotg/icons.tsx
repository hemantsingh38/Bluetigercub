// Hand-authored inline SVGs standing in for the Figma file's icon exports.
// Figma's own SVG asset URLs are short-lived (~7 days) and this environment
// can't reach figma.com to fetch+commit the bytes, so these generic UI
// glyphs (arrows, check, chevron, plus/x, paperclip, mic) are redrawn at
// the same visual weight instead of linking an expiring URL.

type IconProps = {
  className?: string;
  size?: number;
};

export function ArrowLeftIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UpRightArrowIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M13.5 4.5L6.5 12L2.5 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function XIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronUpDownIcon({ className, size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className} aria-hidden="true">
      <path d="M3 5L6 2.5L9 5M3 7L6 9.5L9 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronUpIcon({ className, size = 10 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className} aria-hidden="true">
      <path d="M2 6.5L5 3.5L8 6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownSmallIcon({ className, size = 10 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className} aria-hidden="true">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PaperclipIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M11.5 6.5L6.914 11.086a2 2 0 1 1-2.828-2.829l5.243-5.243a3.333 3.333 0 1 1 4.714 4.715L8.5 13.172"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MicIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="2" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4 7.5a4 4 0 0 0 8 0M8 11.5v2.5M6 14h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function MoreVerticalIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="8" cy="3" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="8" cy="13" r="1.25" />
    </svg>
  );
}

export function CalendarIcon({ className, size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="3.5" width="12" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2 6.5H14M5 2V4.5M11 2V4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

/** Small colored status glyph used for the dashboard health-trend chips. */
export function HealthStatusIcon({
  status,
  className,
  size = 12,
}: {
  status: "good" | "watch" | "risk";
  className?: string;
  size?: number;
}) {
  const color =
    status === "good" ? "var(--color-kotg-green)" : status === "watch" ? "var(--color-kotg-yellow)" : "var(--color-kotg-red)";

  if (status === "good") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill={color} />
        <path d="M11.5 5.5L7 10L4.5 7.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "watch") {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
        <path d="M8 1.5L15 14H1L8 1.5Z" fill={color} />
        <path d="M8 6.5V9.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="8" cy="11.5" r="0.75" fill="white" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M4 1.5V14.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4 2H11.5L9.5 4.25L11.5 6.5H4V2Z" fill={color} />
    </svg>
  );
}

// Recreates the Figma Reliability Pillar badge (a scalloped metal seal
// around a faceted star) as hand-authored SVG — the exact asset export
// isn't fetchable in this environment (see the note at the top of this
// file), so this matches the reference's shape language and palette
// (silver seal, navy face, a two-tone faceted star) rather than being a
// pixel copy of the source PNG.
export function StarBadgeIcon({ className, size = 72 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
      <path
        d="M36.0,2.0 50.2,11.3 65.4,19.0 64.5,36.0 65.4,53.0 50.3,60.7 36.0,70.0 21.8,60.7 6.6,53.0 7.5,36.0 6.6,19.0 21.7,11.3 Z"
        fill="url(#kotg-badge-seal)"
        stroke="#8A93A6"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="36" r="24.5" fill="url(#kotg-badge-face)" stroke="#1B2033" strokeWidth="1" />
      <circle cx="36" cy="36" r="24.5" fill="none" stroke="#7C86A8" strokeWidth="0.75" strokeOpacity="0.5" />
      <path d="M36,21.0 39.6,31.0 50.3,31.4 41.9,37.9 44.8,48.1 36,42.2 Z" fill="#7A82D6" stroke="#565FBD" strokeWidth="0.5" strokeLinejoin="round" />
      <path d="M36,21.0 32.4,31.0 21.7,31.4 30.1,37.9 27.2,48.1 36,42.2 Z" fill="#E3E6FA" stroke="#B9BEEA" strokeWidth="0.5" strokeLinejoin="round" />
      <path d="M36,21.0 36,42.2" stroke="#F5F6FF" strokeWidth="0.75" strokeOpacity="0.6" />
      <defs>
        <linearGradient id="kotg-badge-seal" x1="7" y1="2" x2="65" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F1F3F8" />
          <stop offset="0.5" stopColor="#C3CADC" />
          <stop offset="1" stopColor="#9BA4BE" />
        </linearGradient>
        <linearGradient id="kotg-badge-face" x1="12" y1="12" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B4270" />
          <stop offset="1" stopColor="#232849" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function InfoIcon({ className, size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 7.25V11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="8" cy="4.75" r="0.9" fill="currentColor" />
    </svg>
  );
}
