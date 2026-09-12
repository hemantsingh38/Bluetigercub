/**
 * Recreated in code rather than from a source asset: the reference image is
 * a cursive "Blue Tiger Cub" wordmark inside a solid blue, torn-paper-edge
 * badge (see PORTFOLIO_BUILD_BRIEF.md section 2, "Illustration & motif").
 * The blob path below approximates the torn edge; nudge the path if you
 * want it to hug the reference more closely.
 */
export function BlueTigerCubBadge({ className = "" }: { className?: string }) {
  return (
    // Height comes from the text content + padding below, not a fixed
    // aspect-ratio: Allison (like most script webfonts) carries a much
    // taller internal line-height than its nominal font-size, so a fixed
    // ratio clipped the caption's descenders. The SVG background simply
    // stretches to match whatever height the content settles on.
    <div data-testid="blue-tiger-cub-badge" className={`relative w-full ${className}`}>
      <svg
        viewBox="0 0 300 130"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M10,6 C48,-2 92,8 132,2 C172,-4 232,6 290,0 C296,18 292,46 298,68 C294,94 296,112 286,126 C242,132 188,120 148,128 C102,134 52,124 12,130 C4,110 8,88 2,64 C-4,38 4,18 10,6 Z"
          fill="var(--color-accent)"
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center gap-1 px-6 py-7 text-center text-white sm:py-8">
        <span className="font-script text-3xl sm:text-4xl">Blue Tiger Cub</span>
        <span className="font-caption text-[10px] uppercase tracking-[0.3em] sm:text-[11px]">
          Creative, Bold, Playful
        </span>
      </div>
    </div>
  );
}
