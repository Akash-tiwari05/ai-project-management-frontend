import React from "react";
import { C } from "../../constants/theme";

export default function ProgressBar({ value, color = C.accent, height = 4 }) {
  return (
    <div style={{ background: C.border, borderRadius: 999, height, overflow: "hidden" }}>
      <div style={{
        width: `${value}%`, height: "100%", borderRadius: 999,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        transition: "width 1s cubic-bezier(.4,0,.2,1)",
        boxShadow: `0 0 10px ${color}55`,
      }} />
    </div>
  );
}