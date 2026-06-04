import { useState } from "react";
import { INIT_PROJECTS, INIT_TEAM_MSGS, INIT_AI_MSGS } from "../constants/theme";

export default function useProjectSystem() {
  const [view, setView] = useState("dashboard");
  const [activePid, setActivePid] = useState(1);
  const [projects, setProjects] = useState(INIT_PROJECTS);
  const [teamMsgs, setTeamMsgs] = useState(INIT_TEAM_MSGS);
  const [aiMsgs, setAiMsgs] = useState(INIT_AI_MSGS);
  const [showModal, setShowModal] = useState(false);
  const [aiCursor, setAiCursor] = useState(false);

  const activeProject = projects.find(p => p.id === activePid);

  const updateProject = (id, updater) => setProjects(ps => ps.map(p => p.id === id ? updater(p) : p));

  const handleSend = (text, type) => {
    const newMsg = { id: Date.now(), ...(type === "ai" ? { role: "user", text, time: "Now" } : { user: "YO", name: "You", text, time: "Now", avatar: "YO" }) };
    if (type === "ai") {
      setAiMsgs(prev => ({ ...prev, [activePid]: [...(prev[activePid] || []), newMsg] }));
      setTimeout(() => {
        setAiMsgs(prev => ({
          ...prev, [activePid]: [...(prev[activePid] || []), {
            id: Date.now() + 1, role: "ai", time: "Now",
            text: `Analyzing **${activeProject?.name}** — currently at **${activeProject?.progress}%**.\n\n${activeProject?.todos?.filter(t => !t.done).length} tasks remaining. Is there something specific I can help with?`,
          }],
        }));
      }, 2300);
    } else {
      setTeamMsgs(prev => ({ ...prev, [activePid]: [...(prev[activePid] || []), newMsg] }));
    }
  };

  const handleTodoToggle = (todoId) => updateProject(activePid, p => ({ ...p, todos: p.todos.map(t => t.id === todoId ? { ...t, done: !t.done } : t) }));
  const handleTodoAdd = (text, priority) => updateProject(activePid, p => ({ ...p, todos: [...p.todos, { id: Date.now(), text, done: false, assignee: "YO", priority }] }));
  const handleTodoDelete = (todoId) => updateProject(activePid, p => ({ ...p, todos: p.todos.filter(t => t.id !== todoId) }));
  const handleInvite = (email, role) => updateProject(activePid, p => ({ ...p, invites: [...p.invites, { id: Date.now(), email, role, status: "pending", sent: "just now" }] }));
  const handleRevoke = (inviteId) => updateProject(activePid, p => ({ ...p, invites: p.invites.filter(i => i.id !== inviteId) }));
  
  const handleCreateProject = (data) => {
    setProjects(ps => [...ps, data]);
    setTeamMsgs(prev => ({ ...prev, [data.id]: [] }));
    setAiMsgs(prev => ({ ...prev, [data.id]: [] }));
    setActivePid(data.id);
    setView("project");
  };

  return {
    view, setView,
    activePid, setActivePid,
    projects, activeProject,
    teamMsgs, aiMsgs,
    showModal, setShowModal,
    aiCursor, setAiCursor,
    handleSend,
    handleTodoToggle,
    handleTodoAdd,
    handleTodoDelete,
    handleInvite,
    handleRevoke,
    handleCreateProject,
  };
}