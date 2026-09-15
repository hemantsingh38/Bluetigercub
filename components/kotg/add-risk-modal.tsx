"use client";

import { useState } from "react";
import clsx from "clsx";
import { TaggedTextarea } from "@/components/kotg/fields/tagged-textarea";
import { Button } from "@/components/kotg/ui/button";
import { Modal } from "@/components/kotg/ui/modal";
import { uid, type RiskEntry, type RiskPriority, type RiskType } from "@/lib/kotg/types";

const RISK_TYPES: RiskType[] = ["Risk", "Issue"];
const PRIORITIES: { value: RiskPriority; color: string }[] = [
  { value: "Low", color: "var(--color-kotg-green)" },
  { value: "Medium", color: "var(--color-kotg-yellow)" },
  { value: "High", color: "var(--color-kotg-red)" },
];

const EMPTY: Omit<RiskEntry, "id"> = { type: "Risk", priority: "Medium", description: "", mitigationPlan: "" };

export function AddRiskModal({
  open,
  onClose,
  onSave,
  editingRisk,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (risk: RiskEntry) => void;
  editingRisk?: RiskEntry | null;
}) {
  // No effect resetting the draft on open/editingRisk changes: the parent
  // remounts this component with a fresh `key` each time it opens (see
  // risks-assurance/page.tsx), so this lazy initializer is all that's
  // needed to start clean or pre-filled for an edit.
  const [draft, setDraft] = useState<Omit<RiskEntry, "id">>(() => (editingRisk ? { ...editingRisk } : EMPTY));

  function handleSave() {
    if (!draft.description.trim()) return;
    onSave({ id: editingRisk?.id ?? uid(), ...draft });
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingRisk ? "Edit Risk" : "Add Risk"}
      widthClassName="max-w-[600px]"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={!draft.description.trim()}>
            {editingRisk ? "Save Changes" : "Add Risk"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-8">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-kotg-black">Risk Type</span>
            <select
              value={draft.type}
              onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value as RiskType }))}
              className="h-10 w-44 rounded border border-kotg-border px-3 text-sm text-kotg-black outline-none focus:border-kotg-primary"
            >
              {RISK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-kotg-black">Priority</span>
            <div className="flex gap-4 pt-2">
              {PRIORITIES.map((p) => (
                <label key={p.value} className="flex cursor-pointer items-center gap-1.5 text-sm text-kotg-black">
                  <input
                    type="radio"
                    name="risk-priority"
                    checked={draft.priority === p.value}
                    onChange={() => setDraft((d) => ({ ...d, priority: p.value }))}
                    className="sr-only"
                  />
                  <span
                    className={clsx("size-3 rounded-full border-2", draft.priority === p.value ? "" : "border-kotg-border")}
                    style={draft.priority === p.value ? { backgroundColor: p.color, borderColor: p.color } : undefined}
                  />
                  {p.value}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-kotg-black">Description</p>
          <TaggedTextarea
            value={draft.description}
            onChange={(v) => setDraft((d) => ({ ...d, description: v }))}
            maxLength={500}
            numbered
            quickTags={[{ label: "Key team member rolling off", template: "The team lacks a __ needed for upcoming work, which may slow delivery or affect quality." }]}
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-kotg-black">Mitigation Plan</p>
          <TaggedTextarea
            value={draft.mitigationPlan}
            onChange={(v) => setDraft((d) => ({ ...d, mitigationPlan: v }))}
            placeholder="What you'll do, who owns it, by when..."
            maxLength={500}
          />
        </div>
      </div>
    </Modal>
  );
}
