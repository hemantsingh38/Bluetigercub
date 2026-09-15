"use client";

import clsx from "clsx";
import { ReactNode } from "react";

export type ScaleOption<T extends string> = { value: T; label: string; indicator: ReactNode };

export function OptionScale<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: ScaleOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  name: string;
}) {
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
              "flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors",
              selected ? "border-kotg-primary/40 bg-kotg-primary/10 text-kotg-primary" : "border-kotg-border text-kotg-black hover:border-kotg-primary/40"
            )}
          >
            {option.indicator}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function ColorDot({ color }: { color: string }) {
  return <span className="size-2 rounded-full" style={{ backgroundColor: color }} />;
}

export const SCOPE_UNDERSTANDING_OPTIONS: ScaleOption<"not-at-all" | "partially" | "mostly" | "completely">[] = [
  { value: "not-at-all", label: "Not at all", indicator: <ColorDot color="var(--color-kotg-red)" /> },
  { value: "partially", label: "Partially", indicator: <ColorDot color="var(--color-kotg-yellow)" /> },
  { value: "mostly", label: "Mostly", indicator: <ColorDot color="var(--color-kotg-primary)" /> },
  { value: "completely", label: "Completely", indicator: <ColorDot color="var(--color-kotg-green)" /> },
];

export const WORKLOAD_OPTIONS: ScaleOption<"overloaded" | "stretched" | "steady" | "balanced" | "thriving">[] = [
  { value: "overloaded", label: "Overloaded", indicator: <span>😣</span> },
  { value: "stretched", label: "Stretched", indicator: <span>😕</span> },
  { value: "steady", label: "Steady", indicator: <span>😐</span> },
  { value: "balanced", label: "Balanced", indicator: <span>🙂</span> },
  { value: "thriving", label: "Thriving", indicator: <span>😄</span> },
];
