"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ConfirmProjectDetailsModal } from "@/components/kotg/confirm-project-details-modal";
import { FloatingActionBar } from "@/components/kotg/floating-action-bar";
import { KotgSidebar, type StepStatus } from "@/components/kotg/sidebar";
import { STEPS, isLastStep, nextStep, previousStep, stepIndex, type StepKey } from "@/lib/kotg/steps";
import { useKotg } from "@/lib/kotg/store";

export default function KotgProjectLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, activeProjectId, getProject, getCurrentSnapshot, submitCurrentSnapshot } = useKotg();
  const [detailsDismissed, setDetailsDismissed] = useState(false);

  const currentStep = useMemo<StepKey | null>(() => STEPS.find((s) => s.path === pathname)?.key ?? null, [pathname]);

  useEffect(() => {
    if (!ready) return;
    if (!activeProjectId || !getProject(activeProjectId)) {
      router.replace("/kotg");
    }
  }, [ready, activeProjectId, getProject, router]);

  if (!ready || !activeProjectId) {
    return <div className="flex flex-1 items-center justify-center text-kotg-text-muted">Loading…</div>;
  }

  const project = getProject(activeProjectId);
  const snapshot = getCurrentSnapshot(activeProjectId);
  if (!project || !snapshot || !currentStep) {
    return <div className="flex flex-1 items-center justify-center text-kotg-text-muted">Loading…</div>;
  }

  const currentIndex = stepIndex(currentStep);
  const stepStatuses = Object.fromEntries(
    STEPS.map((step, i) => [step.key, i < currentIndex ? "complete" : i === currentIndex ? "current" : "upcoming"])
  ) as Record<StepKey, StepStatus>;
  const progressPercent = (currentIndex / STEPS.length) * 100;

  function handleBack() {
    const prev = previousStep(currentStep as StepKey);
    router.push(prev ? prev.path : "/kotg");
  }

  function handlePrimary() {
    if (isLastStep(currentStep as StepKey)) {
      submitCurrentSnapshot(project!.id);
      router.push("/kotg");
      return;
    }
    const next = nextStep(currentStep as StepKey);
    if (next) router.push(next.path);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-1">
      <KotgSidebar
        projectName={project.details.projectName || project.name}
        cycleLabel={snapshot.cycleLabel}
        currentStep={currentStep}
        stepStatuses={stepStatuses}
        progressPercent={progressPercent}
      />
      <div className="flex min-w-0 flex-1 flex-col px-12 py-10">
        <div className="flex-1">{children}</div>
        <FloatingActionBar
          onSaveDraft={() => router.push("/kotg")}
          onBack={handleBack}
          onPrimary={handlePrimary}
          primaryLabel={isLastStep(currentStep) ? "Submit" : "Next"}
        />
      </div>

      {currentStep === "scope-definition" && (
        <ConfirmProjectDetailsModal
          projectId={project.id}
          details={project.details}
          open={!snapshot.detailsConfirmed && !detailsDismissed}
          onClose={() => setDetailsDismissed(true)}
        />
      )}
    </div>
  );
}
