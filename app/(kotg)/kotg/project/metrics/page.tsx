"use client";

import { FormSection } from "@/components/kotg/fields/form-section";
import { CountStepper, NumberField } from "@/components/kotg/fields/number-field";
import { SelectField } from "@/components/kotg/fields/select-field";
import { TaggedTextarea } from "@/components/kotg/fields/tagged-textarea";
import { StepPageHeader } from "@/components/kotg/step-page-header";
import { useKotg } from "@/lib/kotg/store";
import { QUALITY_GATEWAY_STATUSES, type MetricsAnswers } from "@/lib/kotg/types";

export default function MetricsPage() {
  const { activeProjectId, getCurrentSnapshot, updateCurrentSnapshot } = useKotg();
  const snapshot = activeProjectId ? getCurrentSnapshot(activeProjectId) : undefined;
  if (!activeProjectId || !snapshot) return null;

  function set<K extends keyof MetricsAnswers>(key: K, value: MetricsAnswers[K]) {
    updateCurrentSnapshot(activeProjectId!, (snap) => ({
      ...snap,
      metrics: { ...snap.metrics, [key]: value },
    }));
  }

  const a = snapshot.metrics;

  return (
    <div>
      <StepPageHeader title="Metrics" />

      <div className="flex flex-col gap-8">
        <FormSection title="Code Coverage">
          <div className="flex flex-wrap gap-8">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-kotg-black">Actual</span>
              <NumberField
                value={a.codeCoverageActual}
                onChange={(v) => set("codeCoverageActual", v)}
                placeholder="0-100"
                suffix="%"
                max={100}
                className="w-52"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-kotg-black">Goal</span>
              <NumberField
                value={a.codeCoverageGoal}
                onChange={(v) => set("codeCoverageGoal", v)}
                placeholder="0-100"
                suffix="%"
                max={100}
                className="w-52"
              />
            </label>
          </div>
        </FormSection>

        <FormSection title="Code Reviews">
          <div className="flex flex-wrap gap-8">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-kotg-black">Critical</span>
              <CountStepper value={a.criticalCount} onChange={(v) => set("criticalCount", v)} className="w-52" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-kotg-black">Blocker</span>
              <CountStepper value={a.blockerCount} onChange={(v) => set("blockerCount", v)} className="w-52" />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-kotg-black">Quality Gateway Status</span>
            <SelectField
              value={a.qualityGatewayStatus}
              onChange={(v) => set("qualityGatewayStatus", v as MetricsAnswers["qualityGatewayStatus"])}
              options={[...QUALITY_GATEWAY_STATUSES]}
              placeholder="Select category"
              className="w-72"
            />
          </label>

          <div>
            <p className="mb-2 text-sm text-kotg-black">
              <span className="italic text-kotg-text-muted">(Conditional) </span>Remarks
            </p>
            <TaggedTextarea
              value={a.remarks}
              onChange={(v) => set("remarks", v)}
              placeholder="Explain what the metrics don't capture (blockers, limitations, or plans to close gaps)"
            />
          </div>
        </FormSection>
      </div>
    </div>
  );
}
