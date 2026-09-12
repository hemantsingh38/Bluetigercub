import type { ReactNode } from "react";

/**
 * Shared chrome for the rebuilt Emerson UI illustrations below. These are
 * original recreations, not edited screenshots — see the note in
 * components/mock-ui/emerson-screens.tsx for why.
 */
export function ScreenFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-accent/15 bg-white shadow-[0_1px_2px_rgba(23,103,231,0.06),0_8px_24px_rgba(23,103,231,0.08)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-accent/10 bg-diagram-bg px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-accent/20" />
        <span className="h-2 w-2 rounded-full bg-accent/20" />
        <span className="h-2 w-2 rounded-full bg-accent/20" />
      </div>
      <div className="p-4 text-[11px] sm:p-5 sm:text-xs">{children}</div>
    </div>
  );
}
