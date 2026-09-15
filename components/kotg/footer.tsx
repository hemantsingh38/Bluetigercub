// Text-based approximation of the Figma footer's Deloitte lockup — this
// environment can't reach figma.com to pull the exact logo export (see
// components/kotg/icons.tsx), and a full trademark logotype isn't
// something to freehand pixel-for-pixel, so the wordmark + green dot
// treatment used across Deloitte's own internal tools stands in for it.
export function KotgFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-kotg-border bg-white px-8 py-3 text-sm text-kotg-black">
      <div className="flex items-center gap-4">
        <span className="text-base font-bold tracking-tight">
          Deloitte<span className="text-kotg-green">.</span>
        </span>
        <span className="h-4 w-px bg-kotg-border" aria-hidden="true" />
        <span className="text-kotg-black">©DeloitteDigital {new Date().getFullYear()}. For internal use only.</span>
      </div>
      <div className="flex items-center gap-4 font-semibold">
        <a href="mailto:kotg-support@deloitte.com?subject=KOTG%20feedback" className="hover:text-kotg-primary">
          Provide Feedback
        </a>
        <span className="h-4 w-px bg-kotg-border" aria-hidden="true" />
        <a href="mailto:kotg-support@deloitte.com" className="hover:text-kotg-primary">
          Contact Us
        </a>
      </div>
    </footer>
  );
}
