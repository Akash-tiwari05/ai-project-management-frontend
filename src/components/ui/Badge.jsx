import React from "react";
import { C } from "../../constants/theme";

export default function Badge({ children, color = C.accent, small }) {
  return (
    <span style={{
      padding: small ? "1px 6px" : "2px 8px", borderRadius: 999,
      fontSize: small ? 10 : 11, fontWeight: 600,
      background: `${color}22`, color, border: `1px solid ${color}44`,
      letterSpacing: "0.03em", whiteSpace: "nowrap",
    }}>{children}</span>
  );
}