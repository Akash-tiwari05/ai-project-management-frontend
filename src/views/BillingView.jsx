import React, { useState } from "react";
import { C, PLANS, COMPARE_ROWS } from "@/constants/theme";
import { Badge } from "../components/ui/Badge";

export const BillingView = ({ currentPlan, usageData, onOpenPayment, onCancelPlan }) => {
  const [billing, setBilling] = useState("monthly");

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      <h3>Tier License Control Center</h3>
      <div style={{ display: "flex", gap: 14, margin: "20px 0" }}>
        {Object.values(PLANS).map(p => (
          <div key={p.id} style={{ background: C.surfaceElevated, padding: 20, borderRadius: 12, flex: 1, border: currentPlan === p.id ? `2px solid ${p.color}` : "none" }}>
            <h4>{p.name} Tier</h4>
            <h2>${p.price}</h2>
            <button disabled={currentPlan === p.id} onClick={() => onOpenPayment(p)}>
              {currentPlan === p.id ? "Active Plan" : p.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};