import React from "react";
import { C } from "../../constants/theme";
import StatusDot from "../ui/StatusDot";

export default function Topbar({ view, setView, activeProject, setShowModal }) {
  return (
    <div style={{ height: 50, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "0 22px", gap: 12, background: C.surface, flexShrink: 0 }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
        {view === "project" && activeProject && (
          <>
            <button onClick={() => setView("dashboard")} style={{ background: "none", border: "none", cursor: "pointer", color: C.tm, fontSize: 12 }}>← Dashboard</button>
            <span style={{ color: C.border }}>/</span>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: activeProject.color }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.tp }}>{activeProject.name}</span>
            <StatusDot status={activeProject.status} />
          </>
        )}
        {view !== "project" && <span style={{ fontSize: 13, fontWeight: 700, color: C.tp, textTransform: "capitalize" }}>{view}</span>}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 5, background: C.surfaceElevated, borderRadius: 8, padding: "5px 9px", border: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, color: C.tm }}>🔍</span>
        <input placeholder="Search..." style={{ border: "none", outline: "none", background: "transparent", color: C.tp, fontSize: 11, width: 120 }} />
      </div>

      <button onClick={() => setShowModal(true)} style={{
        padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 11,
        fontWeight: 700, background: `linear-gradient(135deg,${C.ai},${C.accent})`,
        color: "#fff", boxShadow: `0 0 16px ${C.aiGlow}`,
        display: "flex", alignItems: "center", gap: 5,
        animation: "glowPulse 3s ease infinite",
      }}>✦ New Project</button>
    </div>
  );
}