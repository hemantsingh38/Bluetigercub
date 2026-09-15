"use client";

import { useState } from "react";
import { TextField } from "@/components/kotg/fields/text-field";
import { Button } from "@/components/kotg/ui/button";
import { Modal } from "@/components/kotg/ui/modal";
import { useKotg } from "@/lib/kotg/store";
import type { ProjectDetails } from "@/lib/kotg/types";

const FIELD_ROWS: { key: keyof ProjectDetails; label: string }[] = [
  { key: "projectManager", label: "Project Manager" },
  { key: "ppmd", label: "PPMD" },
  { key: "resourceCount", label: "Resource Count" },
  { key: "bulge", label: "Bulge" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "projectName", label: "Project Name" },
  { key: "wbsCode", label: "WBS Code" },
];

export function ConfirmProjectDetailsModal({
  projectId,
  details,
  open,
  onClose,
}: {
  projectId: string;
  details: ProjectDetails;
  open: boolean;
  onClose: () => void;
}) {
  const { confirmProjectDetails } = useKotg();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(details);

  function startEditing() {
    setDraft(details);
    setEditing(true);
  }

  function handleConfirm() {
    confirmProjectDetails(projectId, details);
    onClose();
  }

  function handleSaveEdits() {
    confirmProjectDetails(projectId, draft);
    setEditing(false);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Confirm Project Details"
      description="Review the details below. Edit anything that's changed since last month."
      widthClassName="max-w-[620px]"
      footer={
        editing ? (
          <>
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdits}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={startEditing}>
              Edit Details
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        )
      }
    >
      {editing ? (
        <div className="grid grid-cols-2 gap-4">
          {FIELD_ROWS.map((row) => (
            <TextField
              key={row.key}
              label={row.label}
              value={draft[row.key]}
              onChange={(value) => setDraft((prev) => ({ ...prev, [row.key]: value }))}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {FIELD_ROWS.map((row) => (
            <div key={row.key}>
              <p className="text-xs text-kotg-text-muted">{row.label}</p>
              <p className="mt-0.5 font-semibold text-kotg-black">{details[row.key] || "—"}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
