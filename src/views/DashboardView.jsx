import React from "react";
import { C } from "@/constants/theme";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusDot } from "../components/ui/StatusDot";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

export const DashboardView = ({ projects, setActivePid, setView, currentPlan, aiUsage }) => {
  const plan = PLANS[currentPlan];
  const pct = plan.limits.aiTokens === Infinity ? 0 : Math.min(100, (aiUsage / plan.limits.aiTokens) * 100);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      <h2>Workspace Executive Summary Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginTop: 20 }}>
        {projects.map(p => (
          <div key={p.id} onClick={() => { setActivePid(p.id); setView("project"); }} style={{ background: C.surfaceElevated, padding: 16, borderRadius: 12, cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <h4>{p.name}</h4>
              <StatusDot status={p.status} />
            </div>
            <p style={{ fontSize: 12, color: C.ts, margin: "8px 0" }}>{p.description}</p>
            <ProgressBar value={p.progress} color={p.color} />
          </div>
        ))}
      </div>
    </div>
  );
};