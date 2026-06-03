import React from "react";
import { C } from "../../../constants/theme";

export default function ChatToggle({ isAI, onToggle }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: C.surfaceElevated, borderRadius: 999, padding: "3px",
      border: `1px solid ${C.border}`,
    }}>
      <button onClick={() => onToggle(false)} style={{
        padding: "5px 12px", borderRadius: 999, border: "none", cursor: "pointer",
        fontSize: 11, fontWeight: 600, transition: "all 0.25s ease",
        background: !isAI ? `linear-gradient(135deg, ${C.accent}, ${C.accentLight})` : "transparent",
        color: !isAI ? "#fff" : C.tm,
        boxShadow: !isAI ? `0 0 12px ${C.accentGlow}` : "none",
      }}>◎ Team</button>
      <button onClick={() => onToggle(true)} style={{
        padding: "5px 12px", borderRadius: 999, border: "none", cursor: "pointer",
        fontSize: 11, fontWeight: 600, transition: "all 0.25s ease",
        background: isAI ? `linear-gradient(135deg, ${C.ai}, ${C.accent})` : "transparent",
        color: isAI ? "#fff" : C.tm,
        boxShadow: isAI ? `0 0 12px ${C.aiGlow}` : "none",
      }}>✦ AI</button>
    </div>
  );
}