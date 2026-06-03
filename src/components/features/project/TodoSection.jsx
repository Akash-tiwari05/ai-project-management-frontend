import React, { useState } from "react";
import { C } from "../../../constants/theme";
import ProgressBar from "../../ui/ProgressBar";
import Avatar from "../../ui/Avatar";

export default function TodoSection({ todos, onToggle, onAdd, onDelete, projectColor }) {
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const done = todos.filter(t => t.done).length;

  const filtered = todos.filter(t => filter === "all" ? true : filter === "done" ? t.done : !t.done);
  const priColor = { high: C.danger, medium: C.warning, low: C.success };

  return (
    <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: `${projectColor || C.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: projectColor || C.accent }}>✓</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.tp }}>Tasks</div>
            <div style={{ fontSize: 10, color: C.tm }}>{done}/{todos.length} completed</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {["all", "todo", "done"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "3px 9px", borderRadius: 999, border: "none", cursor: "pointer",
              fontSize: 10, fontWeight: 600, transition: "all 0.2s",
              background: filter === f ? `${projectColor || C.accent}33` : "transparent",
              color: filter === f ? projectColor || C.accent : C.tm,
            }}>{f === "all" ? "All" : f === "todo" ? "Todo" : "Done"}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "8px 16px 0" }}>
        <ProgressBar value={todos.length ? (done / todos.length) * 100 : 0} color={projectColor || C.accent} height={4} />
      </div>

      <div style={{ padding: "8px 12px", maxHeight: 220, overflowY: "auto" }}>
        {filtered.map((todo, i) => (
          <div key={todo.id} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "7px 6px",
            borderRadius: 8, marginBottom: 2,
            background: "transparent", transition: "background 0.15s",
            animation: `fadeUp 0.3s ease ${i * 0.04}s both`,
          }}
            onMouseEnter={e => e.currentTarget.style.background = C.surfaceElevated}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <button onClick={() => onToggle(todo.id)} style={{
              width: 16, height: 16, borderRadius: 5, border: `1.5px solid`,
              borderColor: todo.done ? projectColor || C.accent : C.border,
              background: todo.done ? projectColor || C.accent : "transparent",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "all 0.2s", fontSize: 9, color: "#fff",
            }}>{todo.done ? "✓" : ""}</button>
            <span style={{ flex: 1, fontSize: 12, color: todo.done ? C.tm : C.tp, textDecoration: todo.done ? "line-through" : "none", transition: "all 0.2s" }}>{todo.text}</span>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: priColor[todo.priority] || C.tm, flexShrink: 0 }} />
            <Avatar initials={todo.assignee} color={projectColor} size={18} />
            <button onClick={() => onDelete(todo.id)} style={{
              background: "none", border: "none", cursor: "pointer", color: C.tm, fontSize: 12,
              opacity: 0, transition: "opacity 0.2s", padding: "0 2px",
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = C.danger; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0; }}
            >×</button>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ padding: "16px 0", textAlign: "center", color: C.tm, fontSize: 12 }}>No tasks here</div>}
      </div>

      <div style={{ padding: "8px 12px 12px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 6 }}>
        <input value={newTodo} onChange={e => setNewTodo(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && newTodo.trim()) { onAdd(newTodo.trim(), newPriority); setNewTodo(""); }}}
          placeholder="Add a task..." style={{
            flex: 1, border: `1px solid ${C.border}`, outline: "none", background: C.surfaceElevated,
            color: C.tp, fontSize: 11, padding: "6px 10px", borderRadius: 7,
          }} />
        <select value={newPriority} onChange={e => setNewPriority(e.target.value)} style={{
          background: C.surfaceElevated, border: `1px solid ${C.border}`, color: C.ts, fontSize: 10,
          borderRadius: 7, padding: "0 6px", cursor: "pointer", outline: "none",
        }}>
          <option value="high">High</option>
          <option value="medium">Med</option>
          <option value="low">Low</option>
        </select>
        <button onClick={() => { if (newTodo.trim()) { onAdd(newTodo.trim(), newPriority); setNewTodo(""); }}} style={{
          padding: "6px 10px", borderRadius: 7, border: "none", cursor: "pointer",
          background: `linear-gradient(135deg, ${projectColor || C.accent}, ${C.accentLight})`,
          color: "#fff", fontSize: 11, fontWeight: 600,
          boxShadow: `0 0 10px ${C.accentGlow}`,
        }}>+</button>
      </div>
    </div>
  );
}