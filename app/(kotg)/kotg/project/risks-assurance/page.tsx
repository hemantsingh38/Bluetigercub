"use client";

import { useState } from "react";
import { AddRiskModal } from "@/components/kotg/add-risk-modal";
import { FormSection } from "@/components/kotg/fields/form-section";
import { TaggedTextarea } from "@/components/kotg/fields/tagged-textarea";
import { PlusIcon } from "@/components/kotg/icons";
import { RisksTable } from "@/components/kotg/risks-table";
import { StepPageHeader } from "@/components/kotg/step-page-header";
import { Button } from "@/components/kotg/ui/button";
import { useKotg } from "@/lib/kotg/store";
import type { RiskEntry } from "@/lib/kotg/types";

const KEY_ASK_TAGS = [
  { label: "Budget", template: "Need additional budget for " },
  { label: "Client Escalation", template: "Need help escalating to the client on " },
  { label: "Scope / Delivery", template: "Need a scope/delivery decision on " },
  { label: "Tool Access", template: "Need access / licenses for [tool] on " },
];

export default function RisksAssurancePage() {
  const { activeProjectId, getCurrentSnapshot, updateCurrentSnapshot } = useKotg();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRisk, setEditingRisk] = useState<RiskEntry | null>(null);
  // Bumped on every open so <AddRiskModal key={openToken}> always remounts
  // fresh instead of resetting its draft via an effect (see that component).
  const [openToken, setOpenToken] = useState(0);

  const snapshot = activeProjectId ? getCurrentSnapshot(activeProjectId) : undefined;
  if (!activeProjectId || !snapshot) return null;

  const risks = snapshot.risksAssurance.risks;

  function setRisks(next: RiskEntry[]) {
    updateCurrentSnapshot(activeProjectId!, (snap) => ({
      ...snap,
      risksAssurance: { ...snap.risksAssurance, risks: next },
    }));
  }

  function setKeyAsks(value: string) {
    updateCurrentSnapshot(activeProjectId!, (snap) => ({
      ...snap,
      risksAssurance: { ...snap.risksAssurance, keyAsks: value },
    }));
  }

  function handleSaveRisk(risk: RiskEntry) {
    const exists = risks.some((r) => r.id === risk.id);
    setRisks(exists ? risks.map((r) => (r.id === risk.id ? risk : r)) : [...risks, risk]);
  }

  return (
    <div>
      <StepPageHeader title="Risks & Assurance" />

      <div className="flex flex-col gap-8">
        <FormSection
          title="Potential Risks"
          badge="Recommended to fill"
          action={
            risks.length > 0 ? (
              <Button
                variant="secondary"
                className="h-9 px-4 text-sm"
                icon={<PlusIcon size={14} />}
                iconPosition="left"
                onClick={() => {
                  setEditingRisk(null);
                  setOpenToken((t) => t + 1);
                  setModalOpen(true);
                }}
              >
                Add Risks
              </Button>
            ) : undefined
          }
        >
          {risks.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg bg-kotg-fill px-6 py-10 text-center">
              <p className="text-sm text-kotg-text-muted">List any potential concern, issues or risks that you may foresee.</p>
              <Button
                variant="secondary"
                className="h-9 px-4 text-sm"
                icon={<PlusIcon size={14} />}
                iconPosition="left"
                onClick={() => {
                  setEditingRisk(null);
                  setOpenToken((t) => t + 1);
                  setModalOpen(true);
                }}
              >
                Add Risk
              </Button>
            </div>
          ) : (
            <RisksTable
              risks={risks}
              onEdit={(risk) => {
                setEditingRisk(risk);
                setOpenToken((t) => t + 1);
                setModalOpen(true);
              }}
              onDelete={(id) => setRisks(risks.filter((r) => r.id !== id))}
            />
          )}
        </FormSection>

        <FormSection title="Key asks from management">
          <TaggedTextarea
            value={snapshot.risksAssurance.keyAsks}
            onChange={setKeyAsks}
            placeholder="Type your asks..."
            numbered
            quickTags={KEY_ASK_TAGS}
            rows={4}
          />
        </FormSection>
      </div>

      <AddRiskModal
        key={openToken}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveRisk}
        editingRisk={editingRisk}
      />
    </div>
  );
}
