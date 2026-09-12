import Image from "next/image";
import { basePath } from "@/lib/base-path";

// Real exported asset (see public/images/blue-tiger-cub-badge.png) — the
// cursive "Blue Tiger Cub" wordmark on a solid blue, torn-paper-edge badge,
// straight from the Figma design. Replaces the earlier SVG recreation now
// that Hemant has supplied the real file.
export function BlueTigerCubBadge({ className = "" }: { className?: string }) {
  return (
    <div
      data-testid="blue-tiger-cub-badge"
      className={`relative w-full ${className}`}
      style={{ aspectRatio: "337 / 142" }}
    >
      <Image
        src={`${basePath}/images/blue-tiger-cub-badge.png`}
        alt="Blue Tiger Cub — Creative, Bold, Playful"
        fill
        sizes="(min-width: 640px) 220px, 160px"
        className="object-contain"
      />
    </div>
  );
}
