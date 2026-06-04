import React, { useState } from "react";
import { C, PROJECT_COLORS, SKILL_SUGGESTIONS, ROLES } from "../../../constants/theme";
import Badge from "../../ui/Badge";

export default function NewProjectModal({ onClose, onCreateProject, aiCursor, setAiCursor }) {
  const [step, setStep] = useState(0); 
  const [form, setForm] = useState({ name: "", description: "", github: "", priority: "medium", color: PROJECT_COLORS[0], skillTags: [], status: "planning" });
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const fset = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSkillInput = (v) => {
    setSkillInput(v);
    if (v.length > 0) setSuggestions(SKILL_SUGGESTIONS.filter(s => s.toLowerCase().includes(v.toLowerCase()) && !form.skillTags.includes(s)).slice(0, 5));
    else setSuggestions([]);
  };

  const addSkill = (s) => {
    if (s && !form.skillTags.includes(s)) fset("skillTags", [...form.skillTags, s]);
    setSkillInput(""); setSuggestions([]);
  };

  const removeSkill = (s) => fset("skillTags", form.skillTags.filter(t => t !== s));

  const simulateAIGenerate = () => {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    setAiCursor(true);
    setTimeout(() => {
      const names = ["Smart Dashboard", "DevOps Pipeline", "AI Analytics", "Auth Service", "Data Lake", "Real-time Chat"];
      const descs = [
        "An intelligent platform leveraging AI to automate workflows and boost productivity.",
        "End-to-end CI/CD pipeline with automated testing, deployment, and monitoring.",
        "Real-time analytics with AI-powered insights and predictive modeling.",
      ];
      const skills = SKILL_SUGGESTIONS.sort(() => 0.5 - Math.random()).slice(0, 4);
      setForm({
        name: names[Math.floor(Math.random() * names.length)],
        description: descs[Math.floor(Math.random() * descs.length)],
        github: "",
        priority: "medium",
        color: PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)],
        skillTags: skills,
        status: "planning",
      });
      setGenerating(false);
      setAiCursor(false);
      setStep(1);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onCreateProject({
      ...form,
      id: Date.now(),
      progress: 0,
      dueDate: new Date(Date.now() + 90 * 864e5).toISOString().split("T")[0],
      team: ["YO"],
      tasks: { total: 0, done: 0 },
      tags: form.skillTags.slice(0, 3),
      todos: [],
      invites: [],
    });
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, animation: "fadeIn 0.2s ease" }}>
      <div style={{
        background: C.surface, borderRadius: 18, border: `1px solid ${C.border}`,
        width: 520, maxHeight: "85vh", overflowY: "auto",
        boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 60px ${C.aiGlow}`,
        animation: "slideUp 0.3s cubic-bezier(.34,1.56,.64,1)",
      }}>
        <div style={{ padding: "20px 22px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${C.ai},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: `0 0 16px ${C.aiGlow}` }}>✦</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.tp, letterSpacing: "-0.02em" }}>New Project</div>
              <div style={{ fontSize: 10, color: C.tm }}>AI-assisted setup</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.tm, fontSize: 18, width: 28, height: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.surfaceElevated; e.currentTarget.style.color = C.tp; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.tm; }}
          >×</button>
        </div>

        <div style={{ padding: "18px 22px 22px" }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.surfaceElevated, borderRadius: 10, padding: 3, border: `1px solid ${C.border}` }}>
            {[{ icon: "✦", label: "AI Generate" }, { icon: "✎", label: "Manual Form" }].map((tab, i) => (
              <button key={i} onClick={() => setStep(i)} style={{
                flex: 1, padding: "7px 0", borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, transition: "all 0.25s",
                background: step === i ? `linear-gradient(135deg,${C.ai},${C.accent})` : "transparent",
                color: step === i ? "#fff" : C.tm,
                boxShadow: step === i ? `0 0 14px ${C.aiGlow}` : "none",
              }}>{tab.icon} {tab.label}</button>
            ))}
          </div>

          {step === 0 && (
            <div style={{ animation: "fadeUp 0.3s ease" }}>
              <div style={{ background: C.surfaceElevated, borderRadius: 12, padding: 16, border: `1px solid ${C.border}`, marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: C.aiLight, fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                  <span>✦</span> Describe your project idea
                </div>
                <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
                  placeholder="e.g. A real-time collaboration tool for remote teams with video chat, shared docs, and task management..."
                  style={{
                    width: "100%", background: "transparent", border: "none", outline: "none",
                    color: C.tp, fontSize: 13, lineHeight: 1.6, resize: "none", height: 90,
                    fontFamily: "inherit",
                  }} />
              </div>
              <button onClick={simulateAIGenerate} disabled={generating || !aiPrompt.trim()} style={{
                width: "100%", padding: "11px 0", borderRadius: 10, border: "none", cursor: generating || !aiPrompt.trim() ? "not-allowed" : "pointer",
                background: generating || !aiPrompt.trim() ? C.border : `linear-gradient(135deg,${C.ai},${C.accent})`,
                color: generating || !aiPrompt.trim() ? C.tm : "#fff",
                fontSize: 13, fontWeight: 700, transition: "all 0.2s",
                boxShadow: !generating && aiPrompt.trim() ? `0 0 20px ${C.aiGlow}` : "none",
              }}>
                {generating ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Generating with AI...
                  </span>
                ) : "✦ Generate Project with AI"}
              </button>
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer", color: C.tm, fontSize: 11, textDecoration: "underline" }}>
                  Skip — fill manually
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.3s ease" }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: C.ts, display: "block", marginBottom: 5, letterSpacing: "0.04em" }}>PROJECT NAME *</label>
                <input value={form.name} onChange={e => fset("name", e.target.value)} placeholder="e.g. API Gateway v3"
                  style={{ width: "100%", background: C.surfaceElevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.tp, fontSize: 13, outline: "none", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = C.accent}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: C.ts, display: "block", marginBottom: 5, letterSpacing: "0.04em" }}>DESCRIPTION</label>
                <textarea value={form.description} onChange={e => fset("description", e.target.value)} placeholder="Brief description of the project goals..."
                  style={{ width: "100%", background: C.surfaceElevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", color: C.tp, fontSize: 13, outline: "none", resize: "none", height: 72, fontFamily: "inherit", transition: "border-color 0.2s", lineHeight: 1.5 }}
                  onFocus={e => e.target.style.borderColor = C.accent}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: C.ts, display: "block", marginBottom: 5, letterSpacing: "0.04em" }}>GITHUB REPOSITORY</label>
                <div style={{ display: "flex", alignItems: "center", background: C.surfaceElevated, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", transition: "border-color 0.2s" }}
                  onFocusCapture={e => e.currentTarget.style.borderColor = C.accent}
                  onBlurCapture={e => e.currentTarget.style.borderColor = C.border}
                >
                  <span style={{ padding: "9px 10px", color: C.tm, fontSize: 11, borderRight: `1px solid ${C.border}`, background: C.surfaceHigh, whiteSpace: "nowrap" }}>github.com/</span>
                  <input value={form.github.replace("https://github.com/", "")} onChange={e => fset("github", e.target.value ? `https://github.com/${e.target.value}` : "")}
                    placeholder="org/repo-name"
                    style={{ flex: 1, background: "transparent", border: "none", padding: "9px 12px", color: C.tp, fontSize: 13, outline: "none" }} />
                  {form.github && <a href={form.github} target="_blank" rel="noreferrer" style={{ padding: "0 10px", color: C.accent, fontSize: 11, textDecoration: "none" }}>↗</a>}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: C.ts, display: "block", marginBottom: 5, letterSpacing: "0.04em" }}>REQUIRED SKILLS</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 7 }}>
                  {form.skillTags.map(s => (
                    <span key={s} style={{
                      display: "flex", alignItems: "center", gap: 4,
                      padding: "3px 8px 3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                      background: `${form.color}22`, color: form.color, border: `1px solid ${form.color}44`,
                    }}>
                      {s}
                      <button onClick={() => removeSkill(s)} style={{ background: "none", border: "none", cursor: "pointer", color: form.color, fontSize: 12, lineHeight: 1, padding: 0 }}>×</button>
                    </span>
                  ))}
                </div>
                <div style={{ position: "relative" }}>
                  <input value={skillInput} onChange={e => handleSkillInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && skillInput.trim()) addSkill(skillInput.trim()); }}
                    placeholder="Type a skill and press Enter..."
                    style={{ width: "100%", background: C.surfaceElevated, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", color: C.tp, fontSize: 12, outline: "none" }} />
                  {suggestions.length > 0 && (
                    <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 8, zIndex: 10, overflow: "hidden" }}>
                      {suggestions.map(s => (
                        <button key={s} onClick={() => addSkill(s)} style={{
                          display: "block", width: "100%", textAlign: "left", padding: "8px 12px",
                          background: "none", border: "none", cursor: "pointer", color: C.ts, fontSize: 12, transition: "all 0.15s",
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = C.surfaceElevated; e.currentTarget.style.color = C.tp; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.ts; }}
                        >{s}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: C.ts, display: "block", marginBottom: 5, letterSpacing: "0.04em" }}>PROJECT COLOR</label>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {PROJECT_COLORS.map(col => (
                      <button key={col} onClick={() => fset("color", col)} style={{
                        width: 22, height: 22, borderRadius: "50%", background: col, border: `2px solid`,
                        borderColor: form.color === col ? "#fff" : "transparent", cursor: "pointer", transition: "all 0.15s",
                        boxShadow: form.color === col ? `0 0 10px ${col}` : "none",
                      }} />
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: C.ts, display: "block", marginBottom: 5, letterSpacing: "0.04em" }}>PRIORITY</label>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["low", "medium", "high"].map(p => (
                      <button key={p} onClick={() => fset("priority", p)} style={{
                        flex: 1, padding: "6px 0", borderRadius: 7, border: "none", cursor: "pointer",
                        fontSize: 10, fontWeight: 700, textTransform: "uppercase", transition: "all 0.2s",
                        background: form.priority === p ? (p === "high" ? C.danger : p === "medium" ? C.warning : C.success) + "33" : C.surfaceElevated,
                        color: form.priority === p ? (p === "high" ? C.danger : p === "medium" ? C.warning : C.success) : C.tm,
                        border: `1px solid ${form.priority === p ? (p === "high" ? C.danger : p === "medium" ? C.warning : C.success) + "44" : C.border}`,
                      }}>{p}</button>
                    ))}
                  </div>
                </div>
              </div>

              {form.name && (
                <div style={{ background: C.surfaceElevated, borderRadius: 10, padding: "10px 14px", border: `1px solid ${form.color}33`, borderLeft: `3px solid ${form.color}` }}>
                  <div style={{ fontSize: 10, color: C.tm, marginBottom: 5, letterSpacing: "0.06em" }}>PREVIEW</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: form.color, boxShadow: `0 0 8px ${form.color}` }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.tp }}>{form.name}</span>
                    <Badge color={form.priority === "high" ? C.danger : form.priority === "medium" ? C.warning : C.success} small>{form.priority}</Badge>
                  </div>
                  {form.skillTags.length > 0 && <div style={{ display: "flex", gap: 4, marginTop: 7, flexWrap: "wrap" }}>{form.skillTags.map(s => <Badge key={s} color={form.color} small>{s}</Badge>)}</div>}
                </div>
              )}

              <button onClick={handleSubmit} disabled={!form.name.trim()} style={{
                width: "100%", padding: "12px 0", borderRadius: 10, border: "none",
                cursor: form.name.trim() ? "pointer" : "not-allowed",
                background: form.name.trim() ? `linear-gradient(135deg, ${form.color}, ${C.accentLight})` : C.border,
                color: form.name.trim() ? "#fff" : C.tm,
                fontSize: 14, fontWeight: 700, letterSpacing: "0.02em",
                boxShadow: form.name.trim() ? `0 0 24px ${form.color}44` : "none",
                transition: "all 0.2s",
              }}>Create Project →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}