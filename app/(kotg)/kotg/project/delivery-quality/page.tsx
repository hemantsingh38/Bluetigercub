"use client";

import { FormSection } from "@/components/kotg/fields/form-section";
import { Question } from "@/components/kotg/fields/question";
import { YesNoReservations, type YnrValue } from "@/components/kotg/fields/yes-no-reservations";
import { StepPageHeader } from "@/components/kotg/step-page-header";
import { useKotg } from "@/lib/kotg/store";
import type { DeliveryQualityAnswers } from "@/lib/kotg/types";

export default function DeliveryQualityPage() {
  const { activeProjectId, getCurrentSnapshot, updateCurrentSnapshot } = useKotg();
  const snapshot = activeProjectId ? getCurrentSnapshot(activeProjectId) : undefined;
  if (!activeProjectId || !snapshot) return null;

  function set<K extends keyof DeliveryQualityAnswers>(key: K, value: DeliveryQualityAnswers[K]) {
    updateCurrentSnapshot(activeProjectId!, (snap) => ({
      ...snap,
      deliveryQuality: { ...snap.deliveryQuality, [key]: value },
    }));
  }

  const a = snapshot.deliveryQuality;

  return (
    <div>
      <StepPageHeader title="Delivery Quality" />

      <div className="flex flex-col gap-8">
        <FormSection title="Readiness" subtitle="Are we set up to build and go live?">
          <Question label="Do we have all required environments through Go-Live?">
            <YesNoReservations
              name="environmentsReady"
              value={a.environmentsReady}
              onChange={(v: YnrValue) => set("environmentsReady", v)}
            />
          </Question>
          <Question conditional label="Has the client signed off on design (UX/VD) before development?">
            <YesNoReservations
              name="designSignedOff"
              value={a.designSignedOff}
              onChange={(v: YnrValue) => set("designSignedOff", v)}
            />
          </Question>
          <Question label="Is the backlog groomed and client-signed-off for the next two sprints?">
            <YesNoReservations
              name="backlogGroomed"
              value={a.backlogGroomed}
              onChange={(v: YnrValue) => set("backlogGroomed", v)}
            />
          </Question>
        </FormSection>

        <FormSection title="Testing" subtitle="Is quality coverage in place?">
          <Question conditional label="Does your QA plan cover data migration?">
            <YesNoReservations
              name="qaCoversMigration"
              value={a.qaCoversMigration}
              onChange={(v: YnrValue) => set("qaCoversMigration", v)}
            />
          </Question>
          <Question label="Is performance testing planned or in place?">
            <YesNoReservations
              name="performanceTesting"
              value={a.performanceTesting}
              onChange={(v: YnrValue) => set("performanceTesting", v)}
            />
          </Question>
          <Question label="Is security testing planned or in place?">
            <YesNoReservations
              name="securityTesting"
              value={a.securityTesting}
              onChange={(v: YnrValue) => set("securityTesting", v)}
            />
          </Question>
        </FormSection>

        <FormSection title="Governance" subtitle="Are standards and architecture oversight covered?">
          <Question label="Have coding standards been agreed with the client and shared with the team?">
            <YesNoReservations
              name="codingStandardsAgreed"
              value={a.codingStandardsAgreed}
              onChange={(v: YnrValue) => set("codingStandardsAgreed", v)}
            />
          </Question>
          <Question label="Does this project require an Architecture Review Board (ARB) review?">
            <YesNoReservations
              name="requiresArbReview"
              value={a.requiresArbReview}
              onChange={(v: YnrValue) => set("requiresArbReview", v)}
            />
          </Question>
          <Question label="Has the architecture been reviewed and approved by the ARB?">
            <YesNoReservations
              name="archApprovedByArb"
              value={a.archApprovedByArb}
              onChange={(v: YnrValue) => set("archApprovedByArb", v)}
            />
          </Question>
        </FormSection>
      </div>
    </div>
  );
}
