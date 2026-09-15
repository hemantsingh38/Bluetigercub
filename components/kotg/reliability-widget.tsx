"use client";

import { useState } from "react";
import { StarBadgeIcon } from "@/components/kotg/icons";
import { Modal } from "@/components/kotg/ui/modal";
import type { Reliability } from "@/lib/kotg/types";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ReliabilityWidget({ reliability }: { reliability: Reliability }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const progress = reliability.badgesEarned / reliability.totalBadges;

  return (
    <aside className="w-full max-w-xs rounded-xl bg-gradient-to-b from-kotg-primary/5 to-kotg-primary/10 p-6 text-center">
      <div className="relative mx-auto flex size-28 items-center justify-center">
        <svg width="112" height="112" viewBox="0 0 96 96" className="absolute inset-0 -rotate-90">
          <circle cx="48" cy="48" r={RADIUS} fill="none" stroke="var(--color-kotg-border)" strokeWidth="4" />
          <circle
            cx="48"
            cy="48"
            r={RADIUS}
            fill="none"
            stroke="var(--color-kotg-primary)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          />
        </svg>
        <StarBadgeIcon size={60} />
      </div>

      <p className="mt-4 font-kotg-display text-base font-medium text-kotg-black">Reliability Pillar</p>

      <div className="mt-4 flex flex-col gap-2 text-left">
        <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm">
          <span className="text-kotg-text-muted">🏅 Badges</span>
          <span className="font-semibold text-kotg-black">
            {reliability.badgesEarned} of {reliability.totalBadges}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm">
          <span className="text-kotg-text-muted">🔥 Streaks</span>
          <span className="font-semibold text-kotg-black">{reliability.streakMonths} Months</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setDetailsOpen(true)}
        className="mt-4 text-sm font-semibold text-kotg-primary hover:underline"
      >
        View Details
      </button>

      <Modal open={detailsOpen} onClose={() => setDetailsOpen(false)} title="Reliability Pillar">
        <div className="space-y-3 text-left text-sm text-kotg-text-muted">
          <p>
            Your Reliability Pillar tracks how consistently you submit accurate, on-time monthly snapshots across
            every project you own.
          </p>
          <p>
            <span className="font-semibold text-kotg-black">Badges</span> unlock every 3 months of consecutive
            on-time submissions. You&apos;ve earned {reliability.badgesEarned} of {reliability.totalBadges}.
          </p>
          <p>
            <span className="font-semibold text-kotg-black">Streaks</span> count total snapshots submitted without a
            miss — currently {reliability.streakMonths} months.
          </p>
        </div>
      </Modal>
    </aside>
  );
}
