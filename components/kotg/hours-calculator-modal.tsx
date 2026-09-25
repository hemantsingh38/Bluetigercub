"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/components/kotg/icons";
import { Button } from "@/components/kotg/ui/button";
import { Modal } from "@/components/kotg/ui/modal";

type Draft = {
  resources: number | null;
  sessions: number | null;
  avgTimeSpent: number | null;
  daysLogged: number | null;
};

const EMPTY: Draft = { resources: null, sessions: null, avgTimeSpent: null, daysLogged: null };

function CalcField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  return (
    <label className="flex flex-1 flex-col gap-1.5">
      <span className="text-xs font-semibold text-kotg-black">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
        className="h-10 w-full rounded border border-kotg-border bg-white px-3 text-sm text-kotg-black outline-none focus:border-kotg-primary placeholder:text-kotg-text-muted [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </label>
  );
}

// Derives hours from headcount/usage inputs instead of asking for a raw
// number. The multiplication is (resources × sessions × avg time spent) —
// "Days Logged" is captured alongside it (matching the Figma reference's
// four fields) but isn't part of the total: sessions already means total
// sessions across the period, not a per-day rate, so folding days back in
// would double-count. It's the one combination that reproduces the
// reference's own worked example (10 resources × 4 sessions × 2 hrs = 80).
export function HoursCalculatorModal({
  open,
  onClose,
  targetLabel,
  onCalculate,
}: {
  open: boolean;
  onClose: () => void;
  targetLabel: "Est. Hrs" | "Actual Hrs";
  onCalculate: (hours: number) => void;
}) {
  const [draft, setDraft] = useState<Draft>(EMPTY);

  const ready = draft.resources != null && draft.sessions != null && draft.avgTimeSpent != null;

  function handleCalculate() {
    if (!ready) return;
    const total = (draft.resources ?? 0) * (draft.sessions ?? 0) * (draft.avgTimeSpent ?? 0);
    onCalculate(Math.round(total));
    setDraft(EMPTY);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setDraft(EMPTY);
        onClose();
      }}
      title={`Calculate ${targetLabel}`}
      widthClassName="max-w-[560px]"
    >
      <div className="flex flex-wrap items-end gap-3">
        <CalcField
          label="No. of Resources"
          placeholder="Input Number"
          value={draft.resources}
          onChange={(v) => setDraft((d) => ({ ...d, resources: v }))}
        />
        <span className="pb-2.5 text-kotg-text-muted">×</span>
        <CalcField
          label="No. of sessions"
          placeholder="Input Number"
          value={draft.sessions}
          onChange={(v) => setDraft((d) => ({ ...d, sessions: v }))}
        />
        <span className="pb-2.5 text-kotg-text-muted">×</span>
        <CalcField
          label="Avg Time Spent"
          placeholder="Input Hrs"
          value={draft.avgTimeSpent}
          onChange={(v) => setDraft((d) => ({ ...d, avgTimeSpent: v }))}
        />
        <span className="pb-2.5 text-kotg-text-muted">×</span>
        <CalcField
          label="Days Logged"
          placeholder="Input Days"
          value={draft.daysLogged}
          onChange={(v) => setDraft((d) => ({ ...d, daysLogged: v }))}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="primary" onClick={handleCalculate} disabled={!ready} icon={<ArrowRightIcon size={20} />}>
          Calculate
        </Button>
      </div>
    </Modal>
  );
}
