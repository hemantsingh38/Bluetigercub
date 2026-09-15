"use client";

import { ChevronDownIcon } from "@/components/kotg/icons";

export function SelectField({
  value,
  onChange,
  options,
  placeholder,
  className,
}: {
  value: string | null;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={`relative flex h-11 items-center rounded border border-kotg-border bg-white px-3.5 focus-within:border-kotg-primary ${className ?? ""}`}>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent text-sm text-kotg-black outline-none"
      >
        <option value="" disabled className="text-kotg-text-muted">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3.5 text-kotg-text-muted" />
    </div>
  );
}
