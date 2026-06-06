import React, { useState, useEffect, useRef } from "react";

// Restored all global seed assets and configurations securely
import { C, PLANS, INIT_PROJECTS, INIT_TEAM, INIT_AI } from "@/constants/theme";

// Restored feature component modules
import Sidebar from "./components/shared/Sidebar";
import DashboardView from "./components/shared/DashboardView";
import ProjectView from "./components/features/project/ProjectView";
import BillingView from "./components/features/modal/BillingView";
import StatusDot from "./components/ui/StatusDot";
import PaymentModal from "./components/features/modal/PaymentModal";
import NewProjectModal from "./components/features/project/NewProjectModal";
import NotificationPanel from "./components/shared/NotificationPanel";

export default function App() {
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
  const activeProject = projects.find(p=>p.id===activePid);
  const usageData = { projects: projects.length, aiTokens: aiUsage };

  const updateProject = (id, fn) => setProjects(ps=>ps.map(p=>p.id===id?fn(p):p));

  const handleSend = (text, type) => {
    const newMsg = {id:Date.now(),...(type==="ai"?{role:"user",text,time:"Now"}:{user:"YO",name:"You",text,time:"Now",avatar:"YO"})};
    if(type==="ai"){
      if(aiUsage>=planLimits.aiTokens) return;
      setAiMsgs(prev=>({...prev,[activePid]:[...(prev[activePid]||[]),newMsg]}));
      setAiUsage(u=>u+Math.floor(Math.random()*30+10));
      setTimeout(()=>{
        const reply = {id:Date.now()+1,role:"ai",time:"Now",text:`Analyzing **${activeProject?.name}** — currently at **${activeProject?.progress}%**.\n\n${activeProject?.todos?.filter(t=>!t.done).length||0} tasks pending. What would you like to know?`};
        setAiMsgs(prev=>({...prev,[activePid]:[...(prev[activePid]||[]),reply]}));
        setAiUsage(u=>u+Math.floor(Math.random()*60+40));
      },2400);
    } else {
      setTeamMsgs(prev=>({...prev,[activePid]:[...(prev[activePid]||[]),newMsg]}));
    }
  };

  const handleTodoToggle = id => updateProject(activePid,p=>({...p,todos:p.todos.map(t=>t.id===id?{...t,done:!t.done}:t)}));
  const handleTodoAdd = (text,priority) => updateProject(activePid,p=>({...p,todos:[...p.todos,{id:Date.now(),text,done:false,assignee:"YO",priority}]}));
  const handleTodoDelete = id => updateProject(activePid,p=>({...p,todos:p.todos.filter(t=>t.id!==id)}));
  const handleInvite = (email,role) => updateProject(activePid,p=>({...p,invites:[...p.invites,{id:Date.now(),email,role,status:"pending",sent:"just now"}]}));
  const handleRevoke = id => updateProject(activePid,p=>({...p,invites:p.invites.filter(i=>i.id!==id)}));
  const handleCreateProject = data => { setProjects(ps=>[...ps,data]); setTeamMsgs(prev=>({...prev,[data.id]:[]})); setAiMsgs(prev=>({...prev,[data.id]:[]})); setActivePid(data.id); setView("project"); };
  
  const handleDeleteProject = () => {
    const remaining = projects.filter(p => p.id !== activePid);
    setProjects(remaining);
    setTeamMsgs(prev => { const n={...prev}; delete n[activePid]; return n; });
    setAiMsgs(prev => { const n={...prev}; delete n[activePid]; return n; });
    
    if (remaining.length > 0) { 
      setActivePid(remaining[0].id); 
      setView("project"); 
    } else { 
      setActivePid(null); // Fixed clearing out pointer reference target securely
      setView("dashboard"); 
    }
  };
  
  const handleArchiveProject = () => {
    setProjects(ps => ps.map(p => p.id === activePid ? {...p, status:"completed"} : p));
  };
  const handleUpgradePlan = planId => { setCurrentPlan(planId); setAiUsage(0); };
  const handleGoToBilling = () => setView("billing");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;font-family:'Plus Jakarta Sans',sans-serif;}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:999px}
        button,input,select,textarea{font-family:inherit}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(24px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes scaleIn{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.75)}}
        @keyframes typingDot{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-4px);opacity:1}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 18px rgba(139,92,246,0.2)}50%{box-shadow:0 0 40px rgba(139,92,246,0.4)}}
      `}</style>

      {paymentTarget && <PaymentModal plan={paymentTarget} onClose={()=>setPaymentTarget(null)} onSuccess={handleUpgradePlan}/>}
      {showModal && <NewProjectModal onClose={()=>setShowModal(false)} onCreate={handleCreateProject} planLimits={planLimits} projectCount={projects.length} onUpgrade={handleGoToBilling}/>}

      <div style={{display:"flex",height:"100vh",background:C.bg,color:C.tp,overflow:"hidden"}}>
        <Sidebar projects={projects} activePid={activePid} setActivePid={id=>{setActivePid(id);setView("project");}} view={view} setView={setView} onNewProject={()=>setShowModal(true)} currentPlan={currentPlan}/>

        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {/* Topbar */}
          <div style={{height:50,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",padding:"0 22px",gap:10,background:C.surface,flexShrink:0}}>
            <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
              {view==="project"&&activeProject&&(<><button onClick={()=>setView("dashboard")} style={{background:"none",border:"none",cursor:"pointer",color:C.tm,fontSize:12}}>← Dashboard</button><span style={{color:C.border}}>/</span><div style={{width:7,height:7,borderRadius:"50%",background:activeProject.color}}/><span style={{fontSize:12,fontWeight:700,color:C.tp}}>{activeProject.name}</span><StatusDot status={activeProject.status}/></>)}
              {view==="billing"&&<span style={{fontSize:13,fontWeight:700,color:C.tp}}>Plans & Billing</span>}
              {view==="dashboard"&&<span style={{fontSize:13,fontWeight:700,color:C.tp}}>Dashboard</span>}
              {!["project","billing","dashboard"].includes(view)&&<span style={{fontSize:13,fontWeight:700,color:C.tp,textTransform:"capitalize"}}>{view}</span>}
            </div>

            {/* AI usage pill */}
            {/* Fixed parsing interpolation to string string literal wrappers explicitly */}
            <div style={{display:"flex",alignItems:"center",gap:6,background:C.surfaceElevated,borderRadius:8,padding:"4px 10px",border:(aiUsage/planLimits.aiTokens > 0.8) ? `1px solid ${C.warning}44` : `1px solid ${C.border}`}}>
              <span style={{fontSize:11,color:aiUsage/planLimits.aiTokens>0.8?C.warning:C.ai}}>✦</span>
              <span style={{fontSize:11,color:C.ts}}>{aiUsage.toLocaleString()}</span>
              <span style={{fontSize:10,color:C.tm}}>/</span>
              <span style={{fontSize:11,color:C.ts,fontWeight:600}}>{planLimits.aiTokens===Infinity?"∞":planLimits.aiTokens.toLocaleString()}</span>
              <span style={{fontSize:10,color:C.tm}}>tokens</span>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:5,background:C.surfaceElevated,borderRadius:8,padding:"5px 9px",border:`1px solid ${C.border}`}}>
              <span style={{fontSize:11,color:C.tm}}>🔍</span>
              <input placeholder="Search…" style={{border:"none",outline:"none",background:"transparent",color:C.tp,fontSize:11,width:110}}/>
            </div>

            {/* Notification Bell */}
            <NotificationPanel onGoToBilling={handleGoToBilling} />

            <button onClick={()=>setShowModal(true)} style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",fontSize:11,fontWeight:800,background:`linear-gradient(135deg,${C.ai},${C.accent})`,color:"#fff",display:"flex",alignItems:"center",gap:5,animation:"glowPulse 3s ease infinite"}}>
              ✦ New Project
            </button>
          </div>

          {/* Content */}
          <div style={{flex:1,overflow:"hidden",display:"flex"}}>
            {view==="dashboard"&&<DashboardView projects={projects} setActivePid={setActivePid} setView={setView} currentPlan={currentPlan} aiUsage={aiUsage}/>}
            {view==="project"&&<ProjectView project={activeProject} teamMessages={teamMsgs[activePid]||[]} aiMessages={aiMsgs[activePid]||[]} onSendMessage={handleSend} onTodoToggle={handleTodoToggle} onTodoAdd={handleTodoAdd} onTodoDelete={handleTodoDelete} onInvite={handleInvite} onRevoke={handleRevoke} planLimits={planLimits} aiUsage={aiUsage} onUpgrade={handleGoToBilling} onDeleteProject={handleDeleteProject} onArchiveProject={handleArchiveProject}/>}
            {view==="billing"&&<BillingView currentPlan={currentPlan} usageData={usageData} onOpenPayment={setPaymentTarget} onCancelPlan={()=>handleUpgradePlan("free")}/>}
            {!["dashboard","project","billing"].includes(view)&&(
              <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:10}}>
                <div style={{fontSize:36,opacity:0.3}}>◈</div>
                <div style={{fontSize:15,fontWeight:700,color:C.tp,textTransform:"capitalize"}}>{view}</div>
                <div style={{fontSize:12,color:C.tm}}>Connect your backend to populate this view</div>
              </div>
            )}
          </div>

          {/* Copyright Footer */}
          <div style={{
            height:36, borderTop:`1px solid ${C.border}`,
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"0 22px", background:C.surface, flexShrink:0,
          }}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:16,height:16,borderRadius:4,background:`linear-gradient(135deg,${C.accent},${C.ai})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff",fontWeight:900}}>✦</div>
              <span style={{fontSize:10,color:C.tm}}>AIPMS · AI Project Management System</span>
            </div>
            <span style={{fontSize:10,color:C.tm,letterSpacing:"0.01em"}}>
              © {new Date().getFullYear()} All rights reserved by{" "}
              <span style={{
                color:C.accentLight, fontWeight:700,
                background:`linear-gradient(90deg,${C.accentLight},${C.aiLight})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>Akash</span>
            </span>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              {["Privacy","Terms","Support"].map(l=>(
                <span key={l} style={{fontSize:10,color:C.tm,cursor:"pointer",transition:"color 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.color=C.ts}
                  onMouseLeave={e=>e.currentTarget.style.color=C.tm}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}