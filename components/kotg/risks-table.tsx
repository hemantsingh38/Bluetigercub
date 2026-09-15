"use client";

import { useState } from "react";
import { MoreVerticalIcon } from "@/components/kotg/icons";
import { PriorityDot } from "@/components/kotg/ui/badge";
import type { RiskEntry } from "@/lib/kotg/types";

export function RisksTable({
  risks,
  onEdit,
  onDelete,
}: {
  risks: RiskEntry[];
  onEdit: (risk: RiskEntry) => void;
  onDelete: (id: string) => void;
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-lg border border-kotg-border">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-kotg-border bg-kotg-fill text-kotg-primary">
            <th className="w-28 px-4 py-3 font-semibold">Type</th>
            <th className="w-28 px-4 py-3 font-semibold">Priority</th>
            <th className="px-4 py-3 font-semibold">Description</th>
            <th className="px-4 py-3 font-semibold">Mitigation Plan</th>
            <th className="w-10 px-2 py-3" />
          </tr>
        </thead>
        <tbody>
          {risks.map((risk) => (
            <tr key={risk.id} className="border-b border-kotg-border last:border-0 align-top">
              <td className="px-4 py-3 text-kotg-black">{risk.type}</td>
              <td className="px-4 py-3">
                <PriorityDot priority={risk.priority} />
              </td>
              <td className="px-4 py-3 text-kotg-black">{risk.description}</td>
              <td className="px-4 py-3 text-kotg-black">{risk.mitigationPlan || "—"}</td>
              <td className="relative px-2 py-3">
                <button
                  type="button"
                  aria-label="Row actions"
                  onClick={() => setOpenMenuId(openMenuId === risk.id ? null : risk.id)}
                  className="text-kotg-text-muted hover:text-kotg-primary"
                >
                  <MoreVerticalIcon />
                </button>
                {openMenuId === risk.id && (
                  <div className="absolute right-2 top-9 z-10 w-32 rounded-md border border-kotg-border bg-white py-1 text-sm shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        onEdit(risk);
                        setOpenMenuId(null);
                      }}
                      className="block w-full px-3 py-1.5 text-left hover:bg-kotg-fill"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(risk.id);
                        setOpenMenuId(null);
                      }}
                      className="block w-full px-3 py-1.5 text-left text-kotg-red hover:bg-kotg-fill"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
