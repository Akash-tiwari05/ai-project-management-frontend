import { useState } from "react";
import { INIT_PROJECTS, INIT_TEAM, INIT_AI, PLANS } from "../constants/theme";

export function useProjectSystem() {
  const [view, setView] = useState("dashboard");
  const [activePid, setActivePid] = useState(1);
  const [projects, setProjects] = useState(INIT_PROJECTS);
  const [teamMsgs, setTeamMsgs] = useState(INIT_TEAM);
  const [aiMsgs, setAiMsgs] = useState(INIT_AI);
  const [currentPlan, setCurrentPlan] = useState("free");
  const [aiUsage, setAiUsage] = useState(47);
  const [showModal, setShowModal] = useState(false);
  const [paymentTarget, setPaymentTarget] = useState(null);

  const planLimits = PLANS[currentPlan].limits;
  const activeProject = projects.find(p => p.id === activePid);
  const usageData = { projects: projects.length, aiTokens: aiUsage };

  const updateProject = (id, fn) => setProjects(ps => ps.map(p => p.id === id ? fn(p) : p));

  const handleSend = (text, type) => {
    const newMsg = { id: Date.now(), ...(type === "ai" ? { role: "user", text, time: "Now" } : { user: "YO", name: "You", text, time: "Now", avatar: "YO" }) };
    if (type === "ai") {
      if (aiUsage >= planLimits.aiTokens) return;
      setAiMsgs(prev => ({ ...prev, [activePid]: [...(prev[activePid] || []), newMsg] }));
      setAiUsage(u => u + 20);
      setTimeout(() => {
        const reply = { id: Date.now() + 1, role: "ai", time: "Now", text: `Response engine placeholder calculations.` };
        setAiMsgs(prev => ({ ...prev, [activePid]: [...(prev[activePid] || []), reply] }));
      }, 1000);
    } else {
      setTeamMsgs(prev => ({ ...prev, [activePid]: [...(prev[activePid] || []), newMsg] }));
    }
  };

  const handleTodoToggle = id => updateProject(activePid, p => ({ ...p, todos: p.todos.map(t => t.id === id ? { ...t, done: !t.done } : t) }));
  const handleTodoAdd = (text, priority) => updateProject(activePid, p => ({ ...p, todos: [...p.todos, { id: Date.now(), text, done: false, assignee: "YO", priority }] }));
  const handleTodoDelete = id => updateProject(activePid, p => ({ ...p, todos: p.todos.filter(t => t.id !== id) }));
  const handleInvite = (email, role) => updateProject(activePid, p => ({ ...p, invites: [...p.invites, { id: Date.now(), email, role, status: "pending", sent: "just now" }] }));
  const handleRevoke = id => updateProject(activePid, p => ({ ...p, invites: p.invites.filter(i => i.id !== id) }));
  
  const handleCreateProject = data => {
    setProjects(ps => [...ps, data]);
    setActivePid(data.id);
    setView("project");
  };

  return {
    view, setView, activePid, setActivePid, projects, teamMsgs, aiMsgs, currentPlan, setCurrentPlan, aiUsage, showModal, setShowModal, paymentTarget, setPaymentTarget, planLimits, activeProject, usageData,
    handleSend, handleTodoToggle, handleTodoAdd, handleTodoDelete, handleInvite, handleRevoke, handleCreateProject
  };
}