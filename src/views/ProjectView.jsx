import React from "react";
import { C } from "@/constants/theme";
import { TodoSection } from "../components/features/project/TodoSection";
import { ChatPanel } from "../components/features/chat/ChatPanel";
import { InviteSection } from "../components/features/project/InviteSection";
import { ProjectMenu } from "../components/features/project/ProjectMenu";
import { Badge } from "../components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export const ProjectView = ({ project, teamMessages, aiMessages, onSendMessage, onTodoToggle, onTodoAdd, onTodoDelete, onInvite, onRevoke, planLimits, aiUsage, onUpgrade }) => {
  if (!project) return null;
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: C.surfaceElevated, padding: 20, borderRadius: 13, borderLeft: `3px solid ${project.color}` }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{project.name}</h3>
          <ProjectMenu project={project} onDelete={() => {}} onArchive={() => {}} />
        </div>
        <p style={{ color: C.ts, fontSize: 12 }}>{project.description}</p>
        <ProgressBar value={project.progress} color={project.color} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr 1fr", gap: 14 }}>
        <TodoSection todos={project.todos} onToggle={onTodoToggle} onAdd={onTodoAdd} onDelete={onTodoDelete} projectColor={project.color} />
        <ChatPanel teamMessages={teamMessages} aiMessages={aiMessages} onSend={onSendMessage} projectColor={project.color} planLimits={planLimits} aiUsage={aiUsage} onUpgrade={onUpgrade} />
        <InviteSection invites={project.invites} onInvite={onInvite} onRevoke={onRevoke} projectColor={project.color} />
      </div>
    </div>
  );
};