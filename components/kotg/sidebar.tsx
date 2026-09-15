"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, CheckIcon } from "@/components/kotg/icons";
import { STEPS, type StepKey } from "@/lib/kotg/steps";

export type StepStatus = "complete" | "current" | "upcoming";

type KotgSidebarProps = {
  projectName: string;
  cycleLabel: string;
  currentStep: StepKey;
  stepStatuses: Record<StepKey, StepStatus>;
  progressPercent: number;
  backHref?: string;
};

export function KotgSidebar({
  projectName,
  cycleLabel,
  currentStep,
  stepStatuses,
  progressPercent,
  backHref = "/kotg",
}: KotgSidebarProps) {
  const router = useRouter();

  return (
    <aside className="flex w-[360px] shrink-0 flex-col border-r border-kotg-border bg-gradient-to-b from-white via-white to-kotg-primary/5 px-8 py-11">
      <button
        type="button"
        onClick={() => router.push(backHref)}
        aria-label="Back to dashboard"
        className="mb-4 flex size-8 items-center justify-center rounded-full text-kotg-primary hover:bg-kotg-primary/10"
      >
        <ArrowLeftIcon />
      </button>

      <h1 className="font-kotg-display text-[28px] leading-tight text-kotg-black">{projectName}</h1>
      <p className="mt-2 font-kotg-sans text-[15px] font-semibold text-kotg-black">{cycleLabel}</p>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-kotg-border">
          <div
            className="h-full rounded-full bg-kotg-green transition-[width]"
            style={{ width: `${Math.max(4, progressPercent)}%` }}
          />
        </div>
        <span className="text-xs text-kotg-black">{Math.round(progressPercent)}%</span>
      </div>

      <ol className="mt-8 flex flex-col">
        {STEPS.map((step, i) => {
          const status = stepStatuses[step.key];
          const isLast = i === STEPS.length - 1;
          return (
            <li key={step.key} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[13px] top-7 h-[calc(100%-4px)] w-px ${
                    status === "complete" ? "bg-kotg-green" : "border-l border-dashed border-kotg-border-alt"
                  }`}
                />
              )}
              <StepCircle status={status} index={i + 1} />
              <Link
                href={step.path}
                aria-current={step.key === currentStep ? "step" : undefined}
                className={`-mt-0.5 font-kotg-display text-lg transition-colors hover:text-kotg-primary ${
                  status === "current" ? "font-medium text-kotg-black" : "text-kotg-text-step"
                }`}
              >
                {step.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

function StepCircle({ status, index }: { status: StepStatus; index: number }) {
  if (status === "complete") {
    return (
      <span className="z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-kotg-green bg-kotg-green text-white">
        <CheckIcon size={14} />
      </span>
    );
  }
  if (status === "current") {
    return (
      <span className="z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-kotg-primary bg-kotg-primary text-sm font-medium text-white">
        {index}
      </span>
    );
  }
  return (
    <span className="z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-kotg-text-step bg-white text-sm font-medium text-kotg-text-step">
      {index}
    </span>
  );
}
