"use client";

import { CalendarIcon, ChevronRightIcon, HealthStatusIcon } from "@/components/kotg/icons";
import { Button } from "@/components/kotg/ui/button";
import { shortMonthLabel } from "@/lib/kotg/seed";
import type { Project } from "@/lib/kotg/types";

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const current = project.snapshots.at(-1);
  const history = project.snapshots.slice(0, -1).filter((s) => s.status === "submitted");
  const visibleHistory = history.slice(-3).reverse();
  const overflowCount = history.length - visibleHistory.length;
  const due = current && current.status !== "submitted";

  return (
    <div className="rounded-lg border border-kotg-border bg-white p-6">
      <button type="button" onClick={onOpen} className="flex w-full items-center justify-between gap-3 text-left">
        <span className="flex items-center gap-3">
          <span className="font-kotg-display text-lg text-kotg-black">{project.name}</span>
          <span className="flex items-center gap-1.5 rounded-full bg-kotg-fill px-2.5 py-1 text-xs text-kotg-text-muted">
            <CalendarIcon />
            Ends in {project.endsInDays} days
          </span>
        </span>
        <ChevronRightIcon className="shrink-0 text-kotg-text-muted" />
      </button>

      <div className="mt-5">
        <p className="text-sm font-semibold text-kotg-black">Health Trend</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {visibleHistory.length === 0 && <span className="text-sm text-kotg-text-muted">No submitted snapshots yet</span>}
          {visibleHistory.map((snap) => (
            <span key={snap.id} className="flex items-center gap-1.5 rounded-full bg-kotg-fill px-2.5 py-1 text-xs text-kotg-black">
              <HealthStatusIcon status={snap.healthStatus ?? "good"} />
              {shortMonthLabel(snap.cycleLabel)}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="rounded-full bg-kotg-fill px-2.5 py-1 text-xs text-kotg-text-muted">+{overflowCount}</span>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        {due ? (
          <span className="text-sm text-kotg-text-muted">Snapshot due for {current?.cycleLabel}</span>
        ) : (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-kotg-green">
            <HealthStatusIcon status="good" /> Snapshot filled
          </span>
        )}
        <Button variant="secondary" onClick={onOpen} className="h-9 px-4 text-sm">
          {due ? `Edit ${shortMonthLabel(current!.cycleLabel)} Snapshot` : "View Snapshot"}
        </Button>
      </div>
    </div>
  );
}
