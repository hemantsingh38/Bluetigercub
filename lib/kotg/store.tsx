"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { computeHealthStatus } from "@/lib/kotg/compute-health";
import { buildSeedProjects } from "@/lib/kotg/seed";
import { createEmptySnapshot, uid, type Project, type ProjectDetails, type Reliability, type Snapshot } from "@/lib/kotg/types";

const STORAGE_KEY = "kotg.store.v1";
const DEFAULT_RELIABILITY: Reliability = { badgesEarned: 2, totalBadges: 4, streakMonths: 6 };

type StoredState = { projects: Project[]; reliability: Reliability; activeProjectId: string | null };

// This app is static-exported (see next.config.ts) with no server to keep
// in sync with, and its only real state lives in the browser's
// localStorage — so the store is modeled as a plain external store
// (module-level cache + listeners) read via useSyncExternalStore, which is
// the idiomatic, hydration-safe way to read a browser-only source: React
// renders getServerSnapshot() first (a fixed empty value, identical on the
// server and on the client's initial hydration pass, so there's nothing to
// mismatch) and swaps in the real getSnapshot() value right after —
// without a setState-in-effect render.
const SERVER_SNAPSHOT: StoredState = { projects: [], reliability: DEFAULT_RELIABILITY, activeProjectId: null };

let cache: StoredState | null = null;
const listeners = new Set<() => void>();

function readFromLocalStorage(): StoredState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredState;
  } catch {
    // storage unavailable or corrupt — fall through to a fresh seed
  }
  return { projects: buildSeedProjects(), reliability: DEFAULT_RELIABILITY, activeProjectId: null };
}

function getSnapshot(): StoredState {
  if (!cache) cache = readFromLocalStorage();
  return cache;
}

function getServerSnapshot(): StoredState {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function commit(next: StoredState) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode / quota) — state still works for this session
  }
  listeners.forEach((listener) => listener());
}

function setStored(updater: (prev: StoredState) => StoredState) {
  commit(updater(getSnapshot()));
}

function nextMonthLabel(cycleLabel: string): string {
  const parsed = new Date(`1 ${cycleLabel}`);
  const base = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  const next = new Date(base.getFullYear(), base.getMonth() + 1, 1);
  return next.toLocaleString("en-US", { month: "long", year: "numeric" });
}

type KotgContextValue = {
  ready: boolean;
  projects: Project[];
  reliability: Reliability;
  activeProjectId: string | null;
  justSubmittedProjectName: string | null;
  dueCount: number;
  setActiveProjectId: (id: string) => void;
  addProject: (input: { name: string; client: string }) => string;
  getProject: (id: string) => Project | undefined;
  getCurrentSnapshot: (projectId: string) => Snapshot | undefined;
  confirmProjectDetails: (projectId: string, details: ProjectDetails) => void;
  updateCurrentSnapshot: (projectId: string, updater: (snapshot: Snapshot) => Snapshot) => void;
  submitCurrentSnapshot: (projectId: string) => void;
  dismissJustSubmitted: () => void;
};

const KotgContext = createContext<KotgContextValue | null>(null);

export function KotgProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = state !== SERVER_SNAPSHOT;
  const [justSubmittedProjectName, setJustSubmittedProjectName] = useState<string | null>(null);

  const setActiveProjectId = useCallback((id: string) => {
    setStored((prev) => ({ ...prev, activeProjectId: id }));
  }, []);

  const getProject = useCallback((id: string) => state.projects.find((p) => p.id === id), [state.projects]);

  const getCurrentSnapshot = useCallback(
    (projectId: string) => getProject(projectId)?.snapshots.at(-1),
    [getProject]
  );

  const addProject = useCallback(({ name, client }: { name: string; client: string }) => {
    const id = uid();
    const cycleLabel = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });
    const project: Project = {
      id,
      name,
      client,
      endsInDays: 90,
      details: {
        projectManager: "",
        ppmd: "",
        resourceCount: "",
        bulge: "None",
        startDate: "",
        endDate: "",
        projectName: name,
        wbsCode: "",
      },
      snapshots: [createEmptySnapshot(cycleLabel)],
    };
    setStored((prev) => ({ ...prev, projects: [...prev.projects, project] }));
    return id;
  }, []);

  const replaceCurrentSnapshot = useCallback((projectId: string, updater: (snapshot: Snapshot) => Snapshot) => {
    setStored((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => {
        if (project.id !== projectId) return project;
        const snapshots = [...project.snapshots];
        const current = snapshots.at(-1);
        if (!current) return project;
        snapshots[snapshots.length - 1] = updater(current);
        return { ...project, snapshots };
      }),
    }));
  }, []);

  const confirmProjectDetails = useCallback(
    (projectId: string, details: ProjectDetails) => {
      setStored((prev) => ({
        ...prev,
        projects: prev.projects.map((project) => (project.id === projectId ? { ...project, details } : project)),
      }));
      replaceCurrentSnapshot(projectId, (snap) => ({
        ...snap,
        detailsConfirmed: true,
        status: snap.status === "not-started" ? "in-progress" : snap.status,
      }));
    },
    [replaceCurrentSnapshot]
  );

  const updateCurrentSnapshot = useCallback(
    (projectId: string, updater: (snapshot: Snapshot) => Snapshot) => {
      replaceCurrentSnapshot(projectId, (snap) => {
        const next = updater(snap);
        return { ...next, status: next.status === "not-started" ? "in-progress" : next.status };
      });
    },
    [replaceCurrentSnapshot]
  );

  const submitCurrentSnapshot = useCallback(
    (projectId: string) => {
      const project = getProject(projectId);
      if (!project) return;
      setJustSubmittedProjectName(project.name);
      setStored((prev) => ({
        ...prev,
        projects: prev.projects.map((p) => {
          if (p.id !== projectId) return p;
          const snapshots = [...p.snapshots];
          const current = snapshots.at(-1);
          if (!current) return p;
          const submitted: Snapshot = {
            ...current,
            status: "submitted",
            submittedAt: new Date().toISOString(),
            healthStatus: computeHealthStatus(current),
          };
          snapshots[snapshots.length - 1] = submitted;
          snapshots.push(createEmptySnapshot(nextMonthLabel(current.cycleLabel)));
          return { ...p, snapshots };
        }),
        reliability: {
          ...prev.reliability,
          streakMonths: prev.reliability.streakMonths + 1,
          badgesEarned:
            (prev.reliability.streakMonths + 1) % 3 === 0
              ? Math.min(prev.reliability.totalBadges, prev.reliability.badgesEarned + 1)
              : prev.reliability.badgesEarned,
        },
      }));
    },
    [getProject]
  );

  const dismissJustSubmitted = useCallback(() => setJustSubmittedProjectName(null), []);

  const dueCount = useMemo(
    () => state.projects.filter((p) => p.snapshots.at(-1)?.status !== "submitted").length,
    [state.projects]
  );

  const value: KotgContextValue = {
    ready,
    projects: state.projects,
    reliability: state.reliability,
    activeProjectId: state.activeProjectId,
    justSubmittedProjectName,
    dueCount,
    setActiveProjectId,
    addProject,
    getProject,
    getCurrentSnapshot,
    confirmProjectDetails,
    updateCurrentSnapshot,
    submitCurrentSnapshot,
    dismissJustSubmitted,
  };

  return <KotgContext.Provider value={value}>{children}</KotgContext.Provider>;
}

export function useKotg() {
  const ctx = useContext(KotgContext);
  if (!ctx) throw new Error("useKotg must be used within a KotgProvider");
  return ctx;
}
