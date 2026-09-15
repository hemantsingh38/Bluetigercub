"use client";

import clsx from "clsx";
import { CheckIcon, XIcon } from "@/components/kotg/icons";
import type { YnrValue } from "@/lib/kotg/types";

export type { YnrValue };

const OPTIONS: { value: YnrValue; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "reservations", label: "Yes with reservations" },
];

function OptionIcon({ value, selected }: { value: YnrValue; selected: boolean }) {
  if (value === "yes") return <CheckIcon size={14} className={selected ? "text-kotg-primary" : "text-kotg-text-muted"} />;
  if (value === "no") return <XIcon size={14} className={selected ? "text-kotg-primary" : "text-kotg-text-muted"} />;
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={selected ? "text-kotg-primary" : "text-kotg-text-muted"} aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 5.5V8.5L10 9.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function YesNoReservations({
  value,
  onChange,
  name,
  includeReservations = true,
}: {
  value: YnrValue | null;
  onChange: (value: YnrValue) => void;
  name: string;
  /** Some questions in the Figma file (GenAI usage, client VDI) only ever show Yes/No. */
  includeReservations?: boolean;
}) {
  const options = includeReservations ? OPTIONS : OPTIONS.filter((o) => o.value !== "reservations");
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={clsx(
              "flex h-9 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors",
              selected
                ? "border-kotg-primary/30 bg-kotg-primary/10 text-kotg-primary"
                : "border-kotg-border text-kotg-black hover:border-kotg-primary/40"
            )}
          >
            <OptionIcon value={option.value} selected={selected} />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
