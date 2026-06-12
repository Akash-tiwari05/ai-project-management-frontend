import React from "react";
// Restored tracking core constants
import { C } from "@/constants/theme";
// Restored default layout sub-packages safely
import StatusDot from "../../ui/StatusDot";
import ProjectMenu from "./ProjectMenu";
import Badge from "../../ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import TodoSection from "./TodoSection";
import ChatPanel from "../chat/ChatPanel";
import InviteSection from "./InviteSection";
import Avatar from "@/components/ui/Avatar";

const ProjectView = ({project,teamMessages = [],aiMessages = [],onSendMessage,onTodoToggle,onTodoAdd,onTodoDelete,onInvite,onRevoke,planLimits,aiUsage,onUpgrade,onDeleteProject,onArchiveProject}) => {
  if(!project) return null;
  
  // Safe-navigation checks for nested structure properties to shield the app layout engine from async initialization gaps
  const tasksDone = project?.tasks?.done || 0;
  const tasksTotal = project?.tasks?.total || 0;
  const teamCount = project?.team?.length || 0;
  const rawDate = project?.due_date ? project.due_date.split("-").slice(1).join("/") : "—";

  return (
    <div style={{flex:1,overflowY:"auto",padding:22,display:"flex",flexDirection:"column",gap:14}}>
      <div style={{background:C.surfaceElevated,borderRadius:13,padding:"18px 20px",border:`1px solid ${C.border}`,borderLeft:`3px solid ${project.color}`,animation:"fadeUp 0.4s ease"}}>
        {/* Top row: title + three-dot menu */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:4}}>
          <div style={{display:"flex",alignItems:"center",gap:9,flexWrap:"wrap",flex:1}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:project.color,boxShadow:`0 0 10px ${project.color}`,flexShrink:0}}/>
            <h2 style={{fontSize:18,fontWeight:800,color:C.tp,letterSpacing:"-0.03em"}}>{project.name}</h2>
            <StatusDot status={project.status}/>
          </div>
          <ProjectMenu project={project} onDelete={onDeleteProject} onArchive={onArchiveProject} />
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
          <div style={{flex:1}}>
            <p style={{color:C.ts,fontSize:12,marginBottom:10,lineHeight:1.5}}>{project.description}</p>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {project.skill_tags?.map(t=><Badge key={t} color={project.color}>{t}</Badge>)}
              {project.github_url&&<a href={project.github_url} target="_blank" rel="noreferrer" style={{padding:"2px 8px",borderRadius:999,fontSize:11,fontWeight:600,background:`${C.success}22`,color:C.success,border:`1px solid ${C.success}44`,textDecoration:"none"}}>⎇ GitHub ↗</a>}
            </div>
          </div>
          <div style={{display:"flex",gap:22,textAlign:"center"}}>
            {[["Tasks",`${tasksDone}/${tasksTotal}`],["Team",teamCount],["Due",rawDate]].map(([l,v],i)=>(
              <div key={i}><div style={{fontSize:17,fontWeight:800,color:C.tp,letterSpacing:"-0.03em"}}>{v}</div><div style={{fontSize:9,color:C.tm,letterSpacing:"0.07em",textTransform:"uppercase"}}>{l}</div></div>
            ))}
          </div>
        </div>
        <div style={{marginTop:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{fontSize:11,color:C.tm}}>Overall Progress</span><span style={{fontSize:12,fontWeight:700,color:project.color}}>{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} color={project.color} height={6}/>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1.7fr 1fr",gap:14,minHeight:460,animation:"fadeUp 0.5s ease 0.1s both"}}>
        <TodoSection todos={project.todos} onToggle={onTodoToggle} onAdd={onTodoAdd} onDelete={onTodoDelete} projectColor={project.color}/>
        <ChatPanel teamMessages={teamMessages} aiMessages={aiMessages} onSend={onSendMessage} projectColor={project.color} planLimits={planLimits} aiUsage={aiUsage} onUpgrade={onUpgrade}/>
        <InviteSection invites={project.invites} onInvite={onInvite} onRevoke={onRevoke} projectColor={project.color}/>
      </div>

      <div style={{background:C.surfaceElevated,borderRadius:13,padding:"14px 18px",border:`1px solid ${C.border}`,animation:"fadeUp 0.5s ease 0.2s both"}}>
        <div style={{fontSize:10,fontWeight:700,color:C.tm,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>Team</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {project.team?.map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:7,background:C.surface,padding:"5px 11px 5px 7px",borderRadius:999,border:`1px solid ${C.border}`}}>
              <Avatar initials={t} color={project.color} size={20}/><span style={{fontSize:11,color:C.tp,fontWeight:500}}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectView;