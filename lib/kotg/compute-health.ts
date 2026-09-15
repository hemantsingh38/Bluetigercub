import type { DeliveryQualityAnswers, HealthStatus, ResourcesBudgetAnswers, ScopeDefinitionAnswers, Snapshot } from "@/lib/kotg/types";

function countYnr(values: (string | null)[]) {
  let no = 0;
  let reservations = 0;
  for (const v of values) {
    if (v === "no") no += 1;
    if (v === "reservations") reservations += 1;
  }
  return { no, reservations };
}

function scopeValues(a: ScopeDefinitionAnswers) {
  return [a.sowSignedOff, a.changeOrdersApproved, a.confidentialityTraining, a.techStackDefined, a.consolidatedPlan];
}

function resourcesValues(a: ResourcesBudgetAnswers) {
  return [a.teamSizeConsistent, a.onTrackBudget, a.scopeWithinSchedule, a.nonBillableInline, a.thirdPartyControls, a.bridgeLetterRemunerated];
}

function deliveryValues(a: DeliveryQualityAnswers) {
  return [
    a.environmentsReady,
    a.designSignedOff,
    a.backlogGroomed,
    a.qaCoversMigration,
    a.performanceTesting,
    a.securityTesting,
    a.codingStandardsAgreed,
    a.requiresArbReview,
    a.archApprovedByArb,
  ];
}

/** Rolls all five steps' answers into one traffic-light status for the dashboard health trend. */
export function computeHealthStatus(snapshot: Snapshot): HealthStatus {
  const { no, reservations } = countYnr([
    ...scopeValues(snapshot.scopeDefinition),
    ...resourcesValues(snapshot.resourcesBudget),
    ...deliveryValues(snapshot.deliveryQuality),
  ]);

  const hasHighRisk = snapshot.risksAssurance.risks.some((r) => r.priority === "High");
  const hasMediumRisk = snapshot.risksAssurance.risks.some((r) => r.priority === "Medium");
  const gateway = snapshot.metrics.qualityGatewayStatus;
  const gatewayPoor = gateway === "Needs Attention" || gateway === "Critical";

  if (no >= 2 || hasHighRisk || gateway === "Critical") return "risk";
  if (no >= 1 || reservations >= 2 || hasMediumRisk || gatewayPoor) return "watch";
  return "good";
}
