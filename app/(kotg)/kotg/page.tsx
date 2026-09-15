"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HealthStatusIcon, PlusIcon, XIcon } from "@/components/kotg/icons";
import { TextField } from "@/components/kotg/fields/text-field";
import { ProjectCard } from "@/components/kotg/project-card";
import { ReliabilityWidget } from "@/components/kotg/reliability-widget";
import { Button } from "@/components/kotg/ui/button";
import { Modal } from "@/components/kotg/ui/modal";
import { CURRENT_USER } from "@/lib/kotg/current-user";
import { useKotg } from "@/lib/kotg/store";

export default function KotgDashboardPage() {
  const router = useRouter();
  const {
    ready,
    projects,
    reliability,
    dueCount,
    justSubmittedProjectName,
    dismissJustSubmitted,
    addProject,
    setActiveProjectId,
  } = useKotg();
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [client, setClient] = useState("");

  useEffect(() => {
    if (!justSubmittedProjectName) return;
    const timer = setTimeout(dismissJustSubmitted, 6000);
    return () => clearTimeout(timer);
  }, [justSubmittedProjectName, dismissJustSubmitted]);

  function openProject(id: string) {
    setActiveProjectId(id);
    router.push("/kotg/project/scope-definition");
  }

  function handleAddProject() {
    if (!name.trim()) return;
    const id = addProject({ name: name.trim(), client: client.trim() || name.trim() });
    setAddOpen(false);
    setName("");
    setClient("");
    openProject(id);
  }

  if (!ready) {
    return <div className="flex flex-1 items-center justify-center text-kotg-text-muted">Loading…</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1328px] flex-1 flex-col gap-10 px-8 py-10 lg:flex-row">
      <div className="min-w-0 flex-1">
        {justSubmittedProjectName && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-lg bg-kotg-green/10 px-4 py-3 text-sm text-kotg-green">
            <span className="flex items-center gap-2 font-medium">
              <HealthStatusIcon status="good" size={16} />
              You have successfully submitted the snapshot
            </span>
            <button
              type="button"
              onClick={dismissJustSubmitted}
              aria-label="Dismiss"
              className="text-kotg-green hover:opacity-70"
            >
              <XIcon />
            </button>
          </div>
        )}

        <h1 className="font-kotg-display text-3xl text-kotg-black">Hello, {CURRENT_USER.firstName}</h1>
        {dueCount > 0 && (
          <p className="mt-1 text-kotg-text-muted">
            You have <span className="font-semibold text-kotg-red">{dueCount}</span> snapshot{dueCount === 1 ? "" : "s"}{" "}
            due.
          </p>
        )}

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-lg font-bold text-kotg-black">My Projects</h2>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-1 text-sm font-semibold text-kotg-primary hover:underline"
          >
            <PlusIcon /> Add Project
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {projects.length === 0 && (
            <p className="rounded-lg border border-dashed border-kotg-border p-8 text-center text-sm text-kotg-text-muted">
              No projects yet — add one to start your first monthly snapshot.
            </p>
          )}
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => openProject(project.id)} />
          ))}
        </div>
      </div>

      <ReliabilityWidget reliability={reliability} />

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Project"
        description="Start tracking a new project's monthly health snapshots."
        footer={
          <>
            <Button variant="secondary" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddProject} disabled={!name.trim()}>
              Create Project
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <TextField label="Project name" value={name} onChange={setName} placeholder="e.g. Acme Platform Modernization" />
          <TextField label="Client" value={client} onChange={setClient} placeholder="e.g. Acme Corp" />
        </div>
      </Modal>
    </div>
  );
}
