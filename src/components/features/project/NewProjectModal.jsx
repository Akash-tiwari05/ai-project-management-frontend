import React, { useState } from "react";
import { C, PROJECT_COLORS, SKILL_SUGGESTIONS } from "@/constants/theme";
import { Badge } from "../../ui/Badge";

export const NewProjectModal = ({ onClose, onCreate, planLimits, projectCount, onUpgrade }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", description: "", github: "", priority: "medium", color: PROJECT_COLORS[0], skillTags: [], status: "planning" });
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const atLimit = projectCount >= planLimits.projects;
  const fset = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addSkill = s => {
    if (s && !form.skillTags.includes(s)) fset("skillTags", [...form.skillTags, s]);
    setSkillInput(""); setSuggestions([]);
  };

  if (atLimit) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
        <div style={{ background: C.surface, borderRadius: 20, width: 440, padding: 30, textAlign: "center" }}>
          <h3>Project slot limit reached</h3>
          <button onClick={onClose}>Close</button>
          <button onClick={onUpgrade}>Upgrade</button>
        </div>
      </div>
    );
  }

  const simulateAI = () => {
    setGenerating(true);
    setTimeout(() => {
      setForm({ name: "AI Generated System", description: "Automated generation outline layout template.", github: "", priority: "medium", color: PROJECT_COLORS[1], skillTags: ["React", "TypeScript"], status: "planning" });
      setGenerating(false); setStep(1);
    }, 1500);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: C.surface, borderRadius: 20, width: 520, padding: 22 }}>
        {step === 0 ? (
          <div>
            <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Describe concept..." style={{ width: "100%", height: 80, background: C.surfaceElevated, color: "#fff" }} />
            <button onClick={simulateAI}>{generating ? "Generating..." : "Generate with AI"}</button>
          </div>
        ) : (
          <div>
            <input value={form.name} onChange={e => fset("name", e.target.value)} placeholder="Project Name" style={{ width: "100%", padding: 8, marginBottom: 10 }} />
            <button onClick={() => onCreate({ ...form, id: Date.now(), progress: 0, team: ["YO"], tasks: { total: 0, done: 0 }, todos: [], invites: [] })}>Create Workspace</button>
          </div>
        )}
      </div>
    </div>
  );
};