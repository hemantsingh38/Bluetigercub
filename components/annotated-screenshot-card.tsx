import type { ReactNode } from "react";

export function AnnotatedScreenshotCard({
  caption,
  note,
  children,
}: {
  caption: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      {children}
      <div>
        <p className="text-sm font-medium text-text-primary">{caption}</p>
        {note && <p className="text-xs text-text-body/50">{note}</p>}
      </div>
    </div>
  );
}

/** Small hand-drawn-style connector between steps in a screenshot gallery. */
export function FlowArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 16"
      className={`h-4 w-10 shrink-0 text-accent/40 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 8 C 14 3, 26 13, 38 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 3 L38 8 L32 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
