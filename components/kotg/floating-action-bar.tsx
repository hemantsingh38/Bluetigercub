"use client";

import { ArrowRightIcon } from "@/components/kotg/icons";
import { Button } from "@/components/kotg/ui/button";

type FloatingActionBarProps = {
  onSaveDraft: () => void;
  onBack: () => void;
  onPrimary: () => void;
  primaryLabel: "Next" | "Submit";
  primaryDisabled?: boolean;
};

export function FloatingActionBar({ onSaveDraft, onBack, onPrimary, primaryLabel, primaryDisabled }: FloatingActionBarProps) {
  return (
    <div className="sticky bottom-8 z-20 ml-auto flex w-fit items-center gap-4 rounded-[36px] border border-kotg-border-alt bg-white/95 p-4 shadow-[2px_1px_2.5px_rgba(4,100,155,0.1),7px_5px_4.5px_rgba(4,100,155,0.09),16px_12px_6px_rgba(4,100,155,0.05)] backdrop-blur">
      <Button variant="ghost" onClick={onSaveDraft}>
        Save Draft
      </Button>
      <Button variant="secondary" onClick={onBack}>
        Back
      </Button>
      <Button
        variant="primary"
        onClick={onPrimary}
        disabled={primaryDisabled}
        icon={primaryLabel === "Next" ? <ArrowRightIcon size={24} /> : undefined}
      >
        {primaryLabel}
      </Button>
    </div>
  );
}
