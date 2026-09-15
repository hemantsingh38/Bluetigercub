"use client";

import { PlusIcon, XIcon } from "@/components/kotg/icons";
import { NumberField } from "@/components/kotg/fields/number-field";
import { SelectField } from "@/components/kotg/fields/select-field";
import { uid, type GenAiToolRow } from "@/lib/kotg/types";

const TOOL_OPTIONS = ["GitHub Copilot", "ChatGPT", "Claude", "Gemini", "Cursor", "Other"];
const ACTIVITY_OPTIONS = ["Code generation", "Code review", "Documentation", "Testing", "Debugging", "Research", "Other"];

function efficiency(row: GenAiToolRow): string {
  if (row.estHours == null || row.actualHours == null || row.estHours <= 0) return "–";
  return `${Math.round(((row.estHours - row.actualHours) / row.estHours) * 100)}%`;
}

function hoursSaved(row: GenAiToolRow): string {
  if (row.estHours == null || row.actualHours == null) return "–";
  return String(Math.max(0, row.estHours - row.actualHours));
}

export function GenAiToolsTable({ rows, onChange }: { rows: GenAiToolRow[]; onChange: (rows: GenAiToolRow[]) => void }) {
  function updateRow(id: string, patch: Partial<GenAiToolRow>) {
    onChange(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function addRow() {
    onChange([...rows, { id: uid(), toolName: "", activity: "", estHours: null, actualHours: null }]);
  }

  function removeRow(id: string) {
    onChange(rows.filter((row) => row.id !== id));
  }

  return (
    <div>
      <p className="mb-3 text-[15px] text-kotg-black">Which GenAI tools did you use in the last month?</p>
      <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_28px] items-center gap-x-3 gap-y-2 text-xs font-semibold text-kotg-text-muted">
        <span>Tool name</span>
        <span>Activities</span>
        <span>Est. hrs</span>
        <span>Actual hrs</span>
        <span>Efficiency</span>
        <span>Hours saved</span>
        <span />
        {rows.map((row) => (
          <div key={row.id} className="contents">
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
            <NumberField value={row.estHours} onChange={(v) => updateRow(row.id, { estHours: v })} placeholder="0" />
            <NumberField value={row.actualHours} onChange={(v) => updateRow(row.id, { actualHours: v })} placeholder="0" />
            <span className="text-sm font-medium text-kotg-black">{efficiency(row)}</span>
            <span className="text-sm font-medium text-kotg-black">{hoursSaved(row)}</span>
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
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-3 flex items-center gap-1 text-sm font-semibold text-kotg-primary hover:underline"
      >
        <PlusIcon /> Add Tool
      </button>
    </div>
  );
}
