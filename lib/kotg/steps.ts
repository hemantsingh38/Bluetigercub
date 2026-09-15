export type StepKey =
  | "scope-definition"
  | "resources-budget"
  | "delivery-quality"
  | "metrics"
  | "risks-assurance";

export type StepConfig = { key: StepKey; label: string; path: string };

// Order + labels confirmed from the Figma left-nav Stepper component
// (fileKey 6QmN3jieuQ8wQueqtONZh2, node I12411:19808;7333:2335).
export const STEPS: StepConfig[] = [
  { key: "scope-definition", label: "Scope/ Definition", path: "/kotg/project/scope-definition" },
  { key: "resources-budget", label: "Resources & Budget", path: "/kotg/project/resources-budget" },
  { key: "delivery-quality", label: "Delivery Quality", path: "/kotg/project/delivery-quality" },
  { key: "metrics", label: "Metrics", path: "/kotg/project/metrics" },
  { key: "risks-assurance", label: "Risks & Assurance", path: "/kotg/project/risks-assurance" },
];

export function stepIndex(key: StepKey): number {
  return STEPS.findIndex((s) => s.key === key);
}

export function nextStep(key: StepKey): StepConfig | null {
  return STEPS[stepIndex(key) + 1] ?? null;
}

export function previousStep(key: StepKey): StepConfig | null {
  return STEPS[stepIndex(key) - 1] ?? null;
}

export function isLastStep(key: StepKey): boolean {
  return stepIndex(key) === STEPS.length - 1;
}
