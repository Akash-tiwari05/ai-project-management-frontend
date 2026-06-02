import React from "react";
import { C } from "../../constants/theme";
import Avatar from "../ui/Avatar";
import ProgressBar from "../ui/ProgressBar";

export default function Sidebar({ projects, activePid, setActivePid, view, setView, onNewProject }) {
  const navItems = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "projects", icon: "◈", label: "Projects" },
    { id: "team", icon: "◎", label: "Team" },
    { id: "timeline", icon: "⊟", label: "Timeline" },
  ];
  return (
    <div style={{ width: 228, background: C.surface, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", height: "100vh", flexShrink: 0 }}>
      <div style={{ padding: "18px 16px 14px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${C.accent},${C.ai})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, boxShadow: `0 0 16px ${C.accentGlow}` }}>✦</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.tp, letterSpacing: "-0.03em" }}>AIPMS</div>
            <div style={{ fontSize: 9, color: C.tm, letterSpacing: "0.1em" }}>AI PROJECT SYSTEM</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "10px 10px 0" }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setView(item.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 10px",
            borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2, textAlign: "left",
            fontSize: 12, fontWeight: 500, transition: "all 0.2s",
            background: view === item.id ? C.accentGlow : "transparent",
            color: view === item.id ? C.accentLight : C.ts,
            borderLeft: view === item.id ? `2px solid ${C.accent}` : "2px solid transparent",
          }}>
            <span style={{ fontSize: 13 }}>{item.icon}</span>{item.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 10px 0" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: C.tm, letterSpacing: "0.1em", padding: "0 2px 6px", textTransform: "uppercase" }}>Projects ({projects.length})</div>
        {projects.map((p, i) => (
          <button key={p.id} onClick={() => { setActivePid(p.id); setView("project"); }} style={{
            width: "100%", padding: "9px 10px", borderRadius: 8, border: "none", cursor: "pointer",
            textAlign: "left", marginBottom: 2,
            background: activePid === p.id && view === "project" ? `${p.color}18` : "transparent",
            borderLeft: activePid === p.id && view === "project" ? `2px solid ${p.color}` : "2px solid transparent",
            transition: "all 0.2s", animation: `fadeUp 0.4s ease ${i * 0.05}s both`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: C.tp, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{p.name}</span>
            </div>
            <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ flex: 1 }}><ProgressBar value={p.progress} color={p.color} height={3} /></div>
              <span style={{ fontSize: 9, color: C.tm }}>{p.progress}%</span>
            </div>
          </button>
        ))}

        <button onClick={onNewProject} style={{
          width: "100%", marginTop: 4, padding: "8px 10px", borderRadius: 8,
          border: `1px dashed ${C.borderLight}`, cursor: "pointer", background: "transparent",
          color: C.tm, fontSize: 11, fontWeight: 600, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.ai; e.currentTarget.style.color = C.aiLight; e.currentTarget.style.background = C.aiGlow; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderLight; e.currentTarget.style.color = C.tm; e.currentTarget.style.background = "transparent"; }}
        >
          <span>✦</span> New Project
        </button>
      </div>

      <div style={{ padding: 10, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 8px" }}>
          <Avatar initials="YO" color={C.accent} size={28} />
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.tp, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>You (Owner)</div>
            <div style={{ fontSize: 9, color: C.tm }}>Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}