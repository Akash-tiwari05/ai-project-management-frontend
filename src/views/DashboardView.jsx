import React from "react";
import { C } from "../constants/theme";
import Badge from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import StatusDot from "../components/ui/StatusDot";
import Avatar from "../components/ui/Avatar";

export default function DashboardView({ projects, setActivePid, setView }) {
  const totalTasks = projects.reduce((a, p) => a + p.tasks.total, 0);
  const doneTasks = projects.reduce((a, p) => a + p.tasks.done, 0);
  const stats = [
    { label: "Projects", value: projects.length, icon: "◈", color: C.accent },
    { label: "Active", value: projects.filter(p => p.status === "active").length, icon: "◉", color: C.success },
    { label: "Tasks Done", value: `${doneTasks}/${totalTasks}`, icon: "✓", color: C.ai },
    { label: "Avg Progress", value: `${Math.round(projects.reduce((a, p) => a + p.progress, 0) / projects.length)}%`, icon: "⟳", color: C.warning },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.tp, marginBottom: 3, letterSpacing: "-0.03em" }}>Good morning ✦</h1>
        <p style={{ color: C.ts, fontSize: 13 }}>Here's an overview of your projects.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: C.surfaceElevated, borderRadius: 12, padding: "16px 18px", border: `1px solid ${C.border}`, animation: `fadeUp 0.5s ease ${i*0.07}s both`, transition: "transform 0.2s, border-color 0.2s", cursor: "default" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = s.color + "55"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.border; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 10, color: C.tm, letterSpacing: "0.06em", marginBottom: 7, textTransform: "uppercase" }}>{s.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.tp, letterSpacing: "-0.04em" }}>{s.value}</div>
              </div>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: `${s.color}22`, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
        {projects.map((p, i) => (
          <div key={p.id} onClick={() => { setActivePid(p.id); setView("project"); }} style={{
            background: C.surfaceElevated, borderRadius: 13, padding: 18, border: `1px solid ${C.border}`,
            cursor: "pointer", animation: `fadeUp 0.5s ease ${0.25 + i*0.07}s both`,
            transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = p.color + "55"; e.currentTarget.style.boxShadow = `0 8px 24px ${p.color}22`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: C.tp }}>{p.name}</span>
              <StatusDot status={p.status} />
            </div>
            <p style={{ fontSize: 12, color: C.ts, lineHeight: 1.5, marginBottom: 10 }}>{p.description}</p>
            <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
              {p.skillTags?.slice(0, 3).map(t => <Badge key={t} color={p.color} small>{t}</Badge>)}
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: C.tm }}>Progress</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: p.color }}>{p.progress}%</span>
              </div>
              <ProgressBar value={p.progress} color={p.color} height={5} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 10, color: C.tm }}>✓ {p.tasks.done}/{p.tasks.total} tasks</span>
              <div style={{ display: "flex" }}>
                {p.team.slice(0, 3).map((t, idx) => (
                  <div key={idx} style={{ marginLeft: idx > 0 ? -7 : 0 }}>
                    <Avatar initials={t} color={p.color} size={22} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}