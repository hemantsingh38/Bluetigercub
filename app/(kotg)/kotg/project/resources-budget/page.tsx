"use client";

import { FormSection } from "@/components/kotg/fields/form-section";
import { OptionScale, WORKLOAD_OPTIONS } from "@/components/kotg/fields/option-scale";
import { Question } from "@/components/kotg/fields/question";
import { YesNoReservations, type YnrValue } from "@/components/kotg/fields/yes-no-reservations";
import { GenAiToolsTable } from "@/components/kotg/genai-tools-table";
import { StepPageHeader } from "@/components/kotg/step-page-header";
import { useKotg } from "@/lib/kotg/store";
import type { GenAiToolRow, ResourcesBudgetAnswers } from "@/lib/kotg/types";

export default function ResourcesBudgetPage() {
  const { activeProjectId, getCurrentSnapshot, updateCurrentSnapshot } = useKotg();
  const snapshot = activeProjectId ? getCurrentSnapshot(activeProjectId) : undefined;
  if (!activeProjectId || !snapshot) return null;

  function set<K extends keyof ResourcesBudgetAnswers>(key: K, value: ResourcesBudgetAnswers[K]) {
    updateCurrentSnapshot(activeProjectId!, (snap) => ({
      ...snap,
      resourcesBudget: { ...snap.resourcesBudget, [key]: value },
    }));
  }

  const a = snapshot.resourcesBudget;

  return (
    <div>
      <StepPageHeader title="Resources & Budget" />

      <div className="flex flex-col gap-8">
        <FormSection title="Resources - Deloitte">
          <Question label="Is the internal team size and composition consistent with effort?">
            <YesNoReservations
              name="teamSizeConsistent"
              value={a.teamSizeConsistent}
              onChange={(v: YnrValue) => set("teamSizeConsistent", v)}
            />
          </Question>
          <Question label="How is the team's workload and morale?">
            <OptionScale name="workload" options={WORKLOAD_OPTIONS} value={a.workload} onChange={(v) => set("workload", v)} />
          </Question>
        </FormSection>

        <FormSection title="Budget/Schedule">
          <Question label="Is the project on track against the planned budget?">
            <YesNoReservations name="onTrackBudget" value={a.onTrackBudget} onChange={(v: YnrValue) => set("onTrackBudget", v)} />
          </Question>
          <Question label="Will we deliver the remaining scope within the planned schedule?">
            <YesNoReservations
              name="scopeWithinSchedule"
              value={a.scopeWithinSchedule}
              onChange={(v: YnrValue) => set("scopeWithinSchedule", v)}
            />
          </Question>
          <Question label="Any hours billed to a non-billable code are in-line with the approved pricing model?">
            <YesNoReservations
              name="nonBillableInline"
              value={a.nonBillableInline}
              onChange={(v: YnrValue) => set("nonBillableInline", v)}
            />
          </Question>
          <Question conditional label="If we are accountable for third party delivery, are there adequate controls in place?">
            <YesNoReservations
              name="thirdPartyControls"
              value={a.thirdPartyControls}
              onChange={(v: YnrValue) => set("thirdPartyControls", v)}
            />
          </Question>
          <Question
            conditional
            label={
              <>
                If the Project is on <span className="text-kotg-primary underline">Bridge letter</span>, have the efforts
                been remunerated?
              </>
            }
          >
            <YesNoReservations
              name="bridgeLetterRemunerated"
              value={a.bridgeLetterRemunerated}
              onChange={(v: YnrValue) => set("bridgeLetterRemunerated", v)}
            />
          </Question>
        </FormSection>

        <FormSection title="GenAI Usage (Monthly)">
          <Question label="Did you use any GenAI tools in your project in the last month?">
            <YesNoReservations
              name="usedGenAi"
              value={a.usedGenAi}
              includeReservations={false}
              onChange={(v) => set("usedGenAi", v as "yes" | "no")}
            />
          </Question>

          {a.usedGenAi === "yes" && (
            <GenAiToolsTable rows={a.genAiTools} onChange={(rows: GenAiToolRow[]) => set("genAiTools", rows)} />
          )}

          <Question label="Will this project operate in a client VDI?">
            <YesNoReservations
              name="operatesInClientVdi"
              value={a.operatesInClientVdi}
              includeReservations={false}
              onChange={(v) => set("operatesInClientVdi", v as "yes" | "no")}
            />
          </Question>
        </FormSection>
      </div>
    </div>
  );
}
