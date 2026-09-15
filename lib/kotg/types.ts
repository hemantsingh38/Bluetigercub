export type YnrValue = "yes" | "no" | "reservations";
export type ScopeUnderstanding = "not-at-all" | "partially" | "mostly" | "completely";
export type Workload = "overloaded" | "stretched" | "steady" | "balanced" | "thriving";

export type ScopeDefinitionAnswers = {
  sowSignedOff: YnrValue | null;
  changeOrdersApproved: YnrValue | null;
  confidentialityTraining: YnrValue | null;
  scopeUnderstanding: ScopeUnderstanding | null;
  techStackDefined: YnrValue | null;
  consolidatedPlan: YnrValue | null;
};

export type GenAiToolRow = {
  id: string;
  toolName: string;
  activity: string;
  estHours: number | null;
  actualHours: number | null;
};

export type ResourcesBudgetAnswers = {
  teamSizeConsistent: YnrValue | null;
  workload: Workload | null;
  onTrackBudget: YnrValue | null;
  scopeWithinSchedule: YnrValue | null;
  nonBillableInline: YnrValue | null;
  thirdPartyControls: YnrValue | null;
  bridgeLetterRemunerated: YnrValue | null;
  usedGenAi: "yes" | "no" | null;
  genAiTools: GenAiToolRow[];
  operatesInClientVdi: "yes" | "no" | null;
};

export type DeliveryQualityAnswers = {
  environmentsReady: YnrValue | null;
  designSignedOff: YnrValue | null;
  backlogGroomed: YnrValue | null;
  qaCoversMigration: YnrValue | null;
  performanceTesting: YnrValue | null;
  securityTesting: YnrValue | null;
  codingStandardsAgreed: YnrValue | null;
  requiresArbReview: YnrValue | null;
  archApprovedByArb: YnrValue | null;
};

export const QUALITY_GATEWAY_STATUSES = ["Great", "Good", "Needs Attention", "Critical"] as const;
export type QualityGatewayStatus = (typeof QUALITY_GATEWAY_STATUSES)[number];

export type MetricsAnswers = {
  codeCoverageActual: number | null;
  codeCoverageGoal: number | null;
  criticalCount: number | null;
  blockerCount: number | null;
  qualityGatewayStatus: QualityGatewayStatus | null;
  remarks: string;
};

export type RiskType = "Risk" | "Issue";
export type RiskPriority = "Low" | "Medium" | "High";

export type RiskEntry = {
  id: string;
  type: RiskType;
  priority: RiskPriority;
  description: string;
  mitigationPlan: string;
};

export type RisksAssuranceAnswers = {
  risks: RiskEntry[];
  keyAsks: string;
};

export type ProjectDetails = {
  projectManager: string;
  ppmd: string;
  resourceCount: string;
  bulge: string;
  startDate: string;
  endDate: string;
  projectName: string;
  wbsCode: string;
};

export type SnapshotStatus = "not-started" | "in-progress" | "submitted";
export type HealthStatus = "good" | "watch" | "risk";

export type Snapshot = {
  id: string;
  cycleLabel: string;
  status: SnapshotStatus;
  detailsConfirmed: boolean;
  submittedAt: string | null;
  healthStatus: HealthStatus | null;
  scopeDefinition: ScopeDefinitionAnswers;
  resourcesBudget: ResourcesBudgetAnswers;
  deliveryQuality: DeliveryQualityAnswers;
  metrics: MetricsAnswers;
  risksAssurance: RisksAssuranceAnswers;
};

export type Project = {
  id: string;
  name: string;
  client: string;
  endsInDays: number;
  details: ProjectDetails;
  snapshots: Snapshot[];
};

export type Reliability = {
  badgesEarned: number;
  totalBadges: number;
  streakMonths: number;
};

export function emptyScopeDefinition(): ScopeDefinitionAnswers {
  return {
    sowSignedOff: null,
    changeOrdersApproved: null,
    confidentialityTraining: null,
    scopeUnderstanding: null,
    techStackDefined: null,
    consolidatedPlan: null,
  };
}

export function emptyResourcesBudget(): ResourcesBudgetAnswers {
  return {
    teamSizeConsistent: null,
    workload: null,
    onTrackBudget: null,
    scopeWithinSchedule: null,
    nonBillableInline: null,
    thirdPartyControls: null,
    bridgeLetterRemunerated: null,
    usedGenAi: null,
    genAiTools: [],
    operatesInClientVdi: null,
  };
}

export function emptyDeliveryQuality(): DeliveryQualityAnswers {
  return {
    environmentsReady: null,
    designSignedOff: null,
    backlogGroomed: null,
    qaCoversMigration: null,
    performanceTesting: null,
    securityTesting: null,
    codingStandardsAgreed: null,
    requiresArbReview: null,
    archApprovedByArb: null,
  };
}

export function emptyMetrics(): MetricsAnswers {
  return {
    codeCoverageActual: null,
    codeCoverageGoal: null,
    criticalCount: null,
    blockerCount: null,
    qualityGatewayStatus: null,
    remarks: "",
  };
}

export function emptyRisksAssurance(): RisksAssuranceAnswers {
  return { risks: [], keyAsks: "" };
}

export function createEmptySnapshot(cycleLabel: string): Snapshot {
  return {
    id: uid(),
    cycleLabel,
    status: "not-started",
    detailsConfirmed: false,
    submittedAt: null,
    healthStatus: null,
    scopeDefinition: emptyScopeDefinition(),
    resourcesBudget: emptyResourcesBudget(),
    deliveryQuality: emptyDeliveryQuality(),
    metrics: emptyMetrics(),
    risksAssurance: emptyRisksAssurance(),
  };
}

export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
