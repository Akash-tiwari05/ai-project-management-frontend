import React from "react";
import { C } from "@/constants/theme";
import Badge from "../../../ui/Badge";
import UsageBar from "../../../ui/UsageBar";

const BillingHeader = ({ currentPlan, plan, usageData, onCancelPlan }) => (
  <div style={{ background: C.surfaceElevated, borderRadius: 16, padding: "20px 24px", border: `1px solid ${plan.color}55`, borderLeft: `4px solid ${plan.color}`, marginBottom: 24, animation: "fadeUp 0.4s ease", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 0% 60%, ${plan.glow}, transparent 55%)`, pointerEvents: "none" }}/>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, position: "relative", marginBottom: 18 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${plan.color},${plan.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: "#fff" }}>{plan.icon}</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.tp, letterSpacing: "-0.02em" }}>
              {plan.name} Plan
              <span style={{ marginLeft: 8, padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: currentPlan === "free" ? `${C.tm}22` : `${C.success}22`, color: currentPlan === "free" ? C.tm : C.success, border: `1px solid ${currentPlan === "free" ? C.tm + "33" : C.success + "33"}` }}>{currentPlan === "free" ? "Free Tier" : "Active"}</span>
            </div>
            <div style={{ fontSize: 12, color: C.ts }}>{plan.tagline}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[`${plan.limits.projects} projects`, `${plan.limits.aiTokens.toLocaleString()} AI tokens/${plan.limits.aiPeriod}`, plan.limits.members === Infinity ? "Unlimited members" : `${plan.limits.members} members/proj`].map((t, i) => (
            <Badge key={i} color={plan.color}>{t}</Badge>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 32, fontWeight: 900, color: plan.color, letterSpacing: "-0.05em" }}>${plan.price}<span style={{ fontSize: 14, color: C.tm, fontWeight: 400 }}>{plan.price > 0 ? "/mo" : ""}</span></div>
        {currentPlan !== "free" && <div style={{ fontSize: 11, color: C.tm, marginTop: 2 }}>Renews {new Date(Date.now() + 14 * 864e5).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>}
      </div>
    </div>

    <div style={{ paddingTop: 16, borderTop: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px", position: "relative" }}>
      <UsageBar used={usageData.projects} total={plan.limits.projects} color={plan.color} label="Projects used" />
      <UsageBar used={usageData.aiTokens} total={plan.limits.aiTokens === Infinity ? Infinity : plan.limits.aiTokens} color={C.ai} label={`AI tokens (${plan.limits.aiPeriod})`} />
    </div>

    {currentPlan !== "free" && (
      <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onCancelPlan} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 11, color: C.tm, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.danger; e.currentTarget.style.color = C.danger; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.tm; }}>
          Cancel subscription
        </button>
      </div>
    )}
  </div>
);

export default BillingHeader;