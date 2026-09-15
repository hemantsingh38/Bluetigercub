"use client";

import { ChevronDownSmallIcon, ChevronUpIcon } from "@/components/kotg/icons";

export function NumberField({
  value,
  onChange,
  placeholder,
  suffix,
  min = 0,
  max,
  className,
}: {
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  suffix?: string;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex h-11 items-center rounded border border-kotg-border bg-white px-3.5 focus-within:border-kotg-primary ${className ?? ""}`}
    >
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
        className="w-full bg-transparent text-sm text-kotg-black outline-none placeholder:text-kotg-text-muted [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      {suffix && <span className="shrink-0 text-sm text-kotg-text-muted">{suffix}</span>}
    </div>
  );
}

export function CountStepper({
  value,
  onChange,
  placeholder = "Enter Count",
  className,
}: {
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  className?: string;
}) {
  const step = (delta: number) => onChange(Math.max(0, (value ?? 0) + delta));

  return (
    <div
      className={`flex h-11 items-center rounded border border-kotg-border bg-white px-3.5 focus-within:border-kotg-primary ${className ?? ""}`}
    >
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
        className="w-full bg-transparent text-sm text-kotg-black outline-none placeholder:text-kotg-text-muted [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <div className="flex shrink-0 flex-col text-kotg-text-muted">
        <button type="button" aria-label="Increase count" onClick={() => step(1)} className="leading-none hover:text-kotg-primary">
          <ChevronUpIcon />
        </button>
        <button type="button" aria-label="Decrease count" onClick={() => step(-1)} className="leading-none hover:text-kotg-primary">
          <ChevronDownSmallIcon />
        </button>
      </div>
    </div>
  );
}
