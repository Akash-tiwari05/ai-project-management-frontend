import React from "react";
import { C } from "../../constants/theme";

export default function Avatar({ initials, color, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: `linear-gradient(135deg, ${color || C.accent}, ${color ? color + "99" : C.accentLight})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.34, fontWeight: 800, color: "#fff", letterSpacing: "0.02em",
    }}>{initials}</div>
  );
}