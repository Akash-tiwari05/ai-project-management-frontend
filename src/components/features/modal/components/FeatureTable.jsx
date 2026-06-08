import React from "react";
import { C, PLANS, COMPARE_ROWS } from "@/constants/theme";

const FeatureTable = ({ currentPlan }) => (
  <div style={{ background: C.surfaceElevated, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden", animation: "fadeUp 0.5s ease 0.28s both" }}>
    <div style={{ padding: "16px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 800, color: C.tp }}>Full Feature Comparison</span>
    </div>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            <th style={{ padding: "12px 22px", textAlign: "left", color: C.tm, fontWeight: 600, fontSize: 11, width: "40%" }}>Feature</th>
            {Object.values(PLANS).map(p => (
              <th key={p.id} style={{ padding: "12px 16px", textAlign: "center", width: "20%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: p.color }}>{p.icon} {p.name}</span>
                  <span style={{ color: C.tm, fontWeight: 400, fontSize: 10 }}>${p.price}{p.price > 0 ? "/mo" : ""}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "transparent" : C.surfaceHigh }}>
              <td style={{ padding: "11px 22px", color: C.ts, fontSize: 12 }}>{row.label}</td>
              {["free", "pro", "prime"].map(pid => {
                const val = row[pid];
                const isNo = val === "—";
                const isYes = val === "✓" || val.includes("✓");
                const pc = PLANS[pid].color;
                return (
                  <td key={pid} style={{ padding: "11px 16px", textAlign: "center" }}>
                    <span style={{ fontSize: isNo ? 16 : 12, fontWeight: isNo ? 400 : 600, color: isNo ? C.tm : isYes ? pc : currentPlan === pid ? pc : C.tp }}>{val}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FeatureTable;