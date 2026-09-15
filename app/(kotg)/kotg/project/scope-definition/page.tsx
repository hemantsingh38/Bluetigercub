"use client";

import { FormSection } from "@/components/kotg/fields/form-section";
import { OptionScale, SCOPE_UNDERSTANDING_OPTIONS } from "@/components/kotg/fields/option-scale";
import { Question } from "@/components/kotg/fields/question";
import { YesNoReservations, type YnrValue } from "@/components/kotg/fields/yes-no-reservations";
import { StepPageHeader } from "@/components/kotg/step-page-header";
import { useKotg } from "@/lib/kotg/store";
import type { ScopeDefinitionAnswers } from "@/lib/kotg/types";

export default function ScopeDefinitionPage() {
  const { activeProjectId, getCurrentSnapshot, updateCurrentSnapshot } = useKotg();
  const snapshot = activeProjectId ? getCurrentSnapshot(activeProjectId) : undefined;
  if (!activeProjectId || !snapshot) return null;

  function set<K extends keyof ScopeDefinitionAnswers>(key: K, value: ScopeDefinitionAnswers[K]) {
    updateCurrentSnapshot(activeProjectId!, (snap) => ({
      ...snap,
      scopeDefinition: { ...snap.scopeDefinition, [key]: value },
    }));
  }

  const a = snapshot.scopeDefinition;

  return (
    <div>
      <StepPageHeader title="Scope/ Definition" />

      <div className="flex flex-col gap-8">
        <FormSection title="Scope - SOW">
          <Question number={1} label="Is the SOW signed off with all standard sections for the active scope of work?">
            <YesNoReservations name="sowSignedOff" value={a.sowSignedOff} onChange={(v: YnrValue) => set("sowSignedOff", v)} />
          </Question>
          <Question number={2} label="Have all change orders/CRs for additional scope been approved since SOW sign-off?">
            <YesNoReservations
              name="changeOrdersApproved"
              value={a.changeOrdersApproved}
              onChange={(v: YnrValue) => set("changeOrdersApproved", v)}
            />
          </Question>
          <Question
            number={3}
            label="If PII/PHI/client-confidential information applies, have all delivery practitioners been trained on confidentiality requirements?"
          >
            <YesNoReservations
              name="confidentialityTraining"
              value={a.confidentialityTraining}
              onChange={(v: YnrValue) => set("confidentialityTraining", v)}
            />
          </Question>
        </FormSection>

        <FormSection title="Scope - Definition">
          <Question number={1} label="How well defined and understood is the project scope — functional and process?">
            <OptionScale
              name="scopeUnderstanding"
              options={SCOPE_UNDERSTANDING_OPTIONS}
              value={a.scopeUnderstanding}
              onChange={(v) => set("scopeUnderstanding", v)}
            />
          </Question>
          <Question number={2} label="Are the technical stack and architecture clearly defined?">
            <YesNoReservations
              name="techStackDefined"
              value={a.techStackDefined}
              onChange={(v: YnrValue) => set("techStackDefined", v)}
            />
          </Question>
          <Question number={3} label="Do we have a consolidated project plan with effort estimated and agreed by the team?">
            <YesNoReservations
              name="consolidatedPlan"
              value={a.consolidatedPlan}
              onChange={(v: YnrValue) => set("consolidatedPlan", v)}
            />
          </Question>
        </FormSection>
      </div>
    </div>
  );
}
