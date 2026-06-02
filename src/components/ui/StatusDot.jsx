import React from "react";
import { C } from "../../constants/theme";

export default function StatusDot({ status }) {
  const map = { 
    active: [C.success, "Active"], 
    planning: [C.warning, "Planning"], 
    review: [C.accentLight, "In Review"], 
    completed: [C.tm, "Done"] 
  };
  const [col, label] = map[status] || [C.tm, status];
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{ 
        width: 6, height: 6, borderRadius: "50%", background: col, 
        boxShadow: `0 0 6px ${col}`, display: "inline-block", 
        animation: status === "active" ? "pulse 2s ease infinite" : "none" 
      }} />
      <span style={{ fontSize: 11, color: C.ts }}>{label}</span>
    </span>
  );
}