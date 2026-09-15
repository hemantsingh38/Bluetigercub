import { createEmptySnapshot, uid, type HealthStatus, type Project, type Snapshot } from "@/lib/kotg/types";

function monthLabel(monthsAgo: number, from: Date): string {
  const d = new Date(from.getFullYear(), from.getMonth() - monthsAgo, 1);
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export function shortMonthLabel(cycleLabel: string): string {
  const d = new Date(`1 ${cycleLabel}`);
  if (Number.isNaN(d.getTime())) return cycleLabel;
  return `${d.toLocaleString("en-US", { month: "short" })}'${String(d.getFullYear()).slice(2)}`;
}

function submittedSnapshot(cycleLabel: string, health: HealthStatus): Snapshot {
  const base = createEmptySnapshot(cycleLabel);
  return {
    ...base,
    status: "submitted",
    detailsConfirmed: true,
    submittedAt: new Date().toISOString(),
    healthStatus: health,
  };
}

export function buildSeedProjects(now: Date = new Date()): Project[] {
  const dellHistory: HealthStatus[] = ["risk", "watch", "good", "good", "watch", "good"];
  const dell: Project = {
    id: uid(),
    name: "Dell Technologies",
    client: "Dell Technologies",
    endsInDays: 30,
    details: {
      projectManager: "Anmol Kapoor",
      ppmd: "Ravish Garg",
      resourceCount: "12",
      bulge: "None",
      startDate: monthLabel(6, now),
      endDate: monthLabel(-6, now),
      projectName: "Dell Technologies",
      wbsCode: "WBS-20250901",
    },
    snapshots: [
      ...dellHistory.map((health, i) => submittedSnapshot(monthLabel(dellHistory.length - i, now), health)),
      createEmptySnapshot(monthLabel(0, now)),
    ],
  };

  const loremHistory: HealthStatus[] = ["good", "good", "good", "watch", "good", "good"];
  const lorem: Project = {
    id: uid(),
    name: "Lorem Ipsum",
    client: "Lorem Ipsum Client",
    endsInDays: 30,
    details: {
      projectManager: "Anmol Kapoor",
      ppmd: "Ravish Garg",
      resourceCount: "8",
      bulge: "None",
      startDate: monthLabel(7, now),
      endDate: monthLabel(-5, now),
      projectName: "Lorem Ipsum",
      wbsCode: "WBS-20250815",
    },
    snapshots: [
      ...loremHistory.map((health, i) => submittedSnapshot(monthLabel(loremHistory.length - i, now), health)),
      submittedSnapshot(monthLabel(0, now), "good"),
    ],
  };

  return [dell, lorem];
}
