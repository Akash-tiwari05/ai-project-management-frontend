import React from "react";
import { C, PLANS } from "@/constants/theme";
import Badge from "../../../ui/Badge";

const PlanCards = ({ currentPlan, billing, onOpenPayment }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
      {Object.values(PLANS).map((p, i) => {
        const isCurrent = currentPlan === p.id;
        const displayPrice = billing === "annual" && p.price > 0 ? (p.price * 0.8).toFixed(0) : p.price;
        return (
          <div key={p.id} style={{ background: C.surfaceElevated, borderRadius: 18, border: `1.5px solid ${isCurrent ? p.color + "77" : C.border}`, padding: "24px 20px", position: "relative", overflow: "hidden", transition: "transform 0.22s,box-shadow 0.22s,border-color 0.22s", boxShadow: isCurrent ? `0 0 48px ${p.glow}` : "none", animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}
            onMouseEnter={e => { if (!isCurrent) { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = p.color + "55"; e.currentTarget.style.boxShadow = `0 16px 40px ${p.glow}`; } }}
            onMouseLeave={e => { if (!isCurrent) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; } }}
          >
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% -10%, ${p.glow}, transparent 55%)`, pointerEvents: "none" }}/>

            {p.badge && !isCurrent && (
              <div style={{ position: "absolute", top: 14, right: 14, padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 800, background: `linear-gradient(135deg,${p.color},${p.color}cc)`, color: "#fff", letterSpacing: "0.05em" }}>{p.badge}</div>
            )}
            {isCurrent && (
              <div style={{ position: "absolute", top: 14, right: 14, padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}44` }}>✓ Current</div>
            )}

            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${p.color},${p.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: "#fff", boxShadow: `0 0 18px ${p.glow}` }}>{p.icon}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.tp, letterSpacing: "-0.025em" }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: C.tm, lineHeight: 1.3 }}>{p.tagline}</div>
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                  <span style={{ fontSize: 34, fontWeight: 900, color: p.color, letterSpacing: "-0.05em" }}>${displayPrice}</span>
                  <span style={{fontSize: 13, color: C.tm}}>{p.price > 0 ? "/month" : ""}</span>
                </div>
                {billing === "annual" && p.price > 0 && (
                  <div style={{ fontSize: 11, color: C.success, marginTop: 2 }}>Save ${(p.price * 0.2 * 12).toFixed(0)}/year · billed ${(p.price * 0.8 * 12).toFixed(0)} annually</div>
                )}
                {p.price === 0 && <div style={{ fontSize: 11, color: C.tm, marginTop: 2 }}>Free forever</div>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12 }}>
                    <span style={{ color: p.color, fontSize: 11, marginTop: 1, flexShrink: 0 }}>✓</span>
                    <span style={{ color: C.ts, lineHeight: 1.4 }}>{f.label}: <span style={{ color: C.tp, fontWeight: 600 }}>{f.value}</span></span>
                  </div>
                ))}
              </div>

              <button onClick={() => !isCurrent && p.price > 0 && onOpenPayment(p)} disabled={isCurrent}
                style={{ width: "100%", padding: "11px 0", borderRadius: 11, border: "none", cursor: isCurrent ? "default" : "pointer", fontSize: 13, fontWeight: 800, transition: "all 0.2s", background: isCurrent ? C.surfaceHigh : `linear-gradient(135deg,${p.color},${p.color}cc)`, color: isCurrent ? C.tm : "#fff", boxShadow: isCurrent ? "none" : `0 0 20px ${p.glow}`, letterSpacing: "0.01em" }}>
                {isCurrent ? "✓ Current Plan" : p.cta}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlanCards;