"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@/components/kotg/icons";
import { TextField } from "@/components/kotg/fields/text-field";
import { ProjectCard } from "@/components/kotg/project-card";
import { Button } from "@/components/kotg/ui/button";
import { Modal } from "@/components/kotg/ui/modal";
import { useKotg } from "@/lib/kotg/store";

export default function KotgAllProjectsPage() {
  const router = useRouter();
  const { ready, projects, addProject, setActiveProjectId } = useKotg();
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [client, setClient] = useState("");

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
    <div className="mx-auto w-full max-w-[1328px] flex-1 px-8 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-kotg-display text-3xl text-kotg-black">All Projects</h1>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-1 text-sm font-semibold text-kotg-primary hover:underline"
        >
          <PlusIcon /> Add Project
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={() => openProject(project.id)} />
        ))}
      </div>

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
