"use client";

import { useState } from "react";
import clsx from "clsx";
import { CalculatorIcon, PlusIcon, XIcon } from "@/components/kotg/icons";
import { NumberField } from "@/components/kotg/fields/number-field";
import { SelectField } from "@/components/kotg/fields/select-field";
import { HoursCalculatorModal } from "@/components/kotg/hours-calculator-modal";
import { InfoTooltip } from "@/components/kotg/ui/info-tooltip";
import { uid, type GenAiToolRow } from "@/lib/kotg/types";

const TOOL_OPTIONS = ["GitHub Copilot", "ChatGPT", "Claude", "Gemini", "Cursor", "Other"];
const ACTIVITY_OPTIONS = ["Code generation", "Code review", "Documentation", "Testing", "Debugging", "Research", "Other"];

function isComputed(row: Pick<GenAiToolRow, "estHours" | "actualHours">): boolean {
  return row.estHours != null && row.actualHours != null && row.estHours > 0;
}

function efficiencyPct(estHours: number, actualHours: number): number {
  return Math.round(((estHours - actualHours) / estHours) * 100);
}

function EfficiencyPill({ estHours, actualHours }: { estHours: number | null; actualHours: number | null }) {
  if (estHours == null || actualHours == null || estHours <= 0) {
    return <span className="text-sm font-medium text-kotg-text-muted">–</span>;
  }
  const pct = efficiencyPct(estHours, actualHours);
  const positive = pct >= 0;
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        positive ? "bg-kotg-green/15 text-kotg-green" : "bg-kotg-red/15 text-kotg-red"
      )}
    >
      {positive ? "+" : ""}
      {pct}%
    </span>
  );
}

function HoursSaved({ estHours, actualHours }: { estHours: number | null; actualHours: number | null }) {
  if (estHours == null || actualHours == null) return <span className="text-sm font-medium text-kotg-text-muted">–</span>;
  const diff = estHours - actualHours;
  return (
    <span className={clsx("text-sm font-semibold", diff >= 0 ? "text-kotg-green" : "text-kotg-red")}>{diff}</span>
  );
}

type CalcTarget = { rowId: string; field: "estHours" | "actualHours" } | null;

export function GenAiToolsTable({ rows, onChange }: { rows: GenAiToolRow[]; onChange: (rows: GenAiToolRow[]) => void }) {
  const [calcTarget, setCalcTarget] = useState<CalcTarget>(null);

  function updateRow(id: string, patch: Partial<GenAiToolRow>) {
    onChange(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function addRow() {
    onChange([...rows, { id: uid(), toolName: "", activity: "", estHours: null, actualHours: null }]);
  }

  function removeRow(id: string) {
    onChange(rows.filter((row) => row.id !== id));
  }

  const computedRows = rows.filter(isComputed) as { estHours: number; actualHours: number }[];
  const totalEst = computedRows.reduce((sum, r) => sum + r.estHours, 0);
  const totalActual = computedRows.reduce((sum, r) => sum + r.actualHours, 0);
  const totalSaved = totalEst - totalActual;
  const showSummary = computedRows.length > 0;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-[15px] text-kotg-black">Which GenAI tools did you use in the last month?</p>
        {showSummary && (
          <div className="flex divide-x divide-kotg-border rounded-md border border-kotg-border bg-kotg-fill text-center">
            <div className="px-4 py-1.5">
              <p className="text-xs text-kotg-text-muted">Efficiency</p>
              <EfficiencyPill estHours={totalEst} actualHours={totalActual} />
            </div>
            <div className="px-4 py-1.5">
              <p className="text-xs text-kotg-text-muted">Hours Saved</p>
              <p className="text-sm font-bold text-kotg-black">{totalSaved}</p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-kotg-border">
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_28px] items-center gap-x-3 px-4 py-3 text-xs font-semibold text-kotg-text-muted">
          <span>Tool name</span>
          <span>Activities</span>
          <span className="flex items-center gap-1">
            Est. hrs
            <InfoTooltip text="Est. hrs is the time this activity would normally take without GenAI assistance." />
          </span>
          <span className="flex items-center gap-1">
            Actual hrs
            <InfoTooltip text="Actual hrs is the real time spent completing this activity, including GenAI assistance." />
          </span>
          <span>Efficiency</span>
          <span>Hours saved</span>
          <span />
        </div>
        {rows.map((row, i) => (
          <div
            key={row.id}
            className={clsx(
              "grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_28px] items-center gap-x-3 px-4 py-3",
              i > 0 && "border-t border-kotg-border"
            )}
          >
            <SelectField
              value={row.toolName || null}
              onChange={(v) => updateRow(row.id, { toolName: v })}
              options={TOOL_OPTIONS}
              placeholder="Search or select"
            />
            <SelectField
              value={row.activity || null}
              onChange={(v) => updateRow(row.id, { activity: v })}
              options={ACTIVITY_OPTIONS}
              placeholder="Search or select"
            />
            <div className="flex items-center gap-1.5">
              <NumberField value={row.estHours} onChange={(v) => updateRow(row.id, { estHours: v })} placeholder="0" />
              <button
                type="button"
                aria-label="Calculate Est. Hrs"
                title="Calculate from resources, sessions and time spent"
                onClick={() => setCalcTarget({ rowId: row.id, field: "estHours" })}
                className="shrink-0 text-kotg-text-muted hover:text-kotg-primary"
              >
                <CalculatorIcon />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <NumberField value={row.actualHours} onChange={(v) => updateRow(row.id, { actualHours: v })} placeholder="0" />
              <button
                type="button"
                aria-label="Calculate Actual Hrs"
                title="Calculate from resources, sessions and time spent"
                onClick={() => setCalcTarget({ rowId: row.id, field: "actualHours" })}
                className="shrink-0 text-kotg-text-muted hover:text-kotg-primary"
              >
                <CalculatorIcon />
              </button>
            </div>
            <EfficiencyPill estHours={row.estHours} actualHours={row.actualHours} />
            <HoursSaved estHours={row.estHours} actualHours={row.actualHours} />
            <button
              type="button"
              aria-label="Remove tool"
              onClick={() => removeRow(row.id)}
              className="text-kotg-text-muted hover:text-kotg-red"
            >
              <XIcon />
            </button>
          </div>
        ))}
        <div className="border-t border-kotg-border px-4 py-3">
          <button
            type="button"
            onClick={addRow}
            className="flex items-center gap-1 text-sm font-semibold text-kotg-primary hover:underline"
          >
            <PlusIcon /> Add Tool
          </button>
        </div>
      </div>

      <HoursCalculatorModal
        open={calcTarget != null}
        onClose={() => setCalcTarget(null)}
        targetLabel={calcTarget?.field === "actualHours" ? "Actual Hrs" : "Est. Hrs"}
        onCalculate={(hours) => {
          if (calcTarget) updateRow(calcTarget.rowId, { [calcTarget.field]: hours });
        }}
      />
    </div>
  );
}
