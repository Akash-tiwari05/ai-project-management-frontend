import React from "react";
import { C, PROJECT_COLORS, SKILL_SUGGESTIONS } from "@/constants/theme";

const StepManualForm = ({ form, fset, skillInput, setSkillInput, suggestions, setSuggestions, addSkill, onCreate, onClose }) => (
  <div style={{display:"flex",flexDirection:"column",gap:13,animation:"fadeUp 0.3s ease"}}>
    <div>
      <label style={{fontSize:10,fontWeight:700,color:C.ts,display:"block",marginBottom:5,letterSpacing:"0.05em"}}>PROJECT NAME *</label>
      <input value={form.name} onChange={e=>fset("name",e.target.value)} placeholder="e.g. API Gateway v3" style={{width:"100%",background:C.surfaceElevated,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",color:C.tp,fontSize:13,outline:"none"}} onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
    </div>
    <div>
      <label style={{fontSize:10,fontWeight:700,color:C.ts,display:"block",marginBottom:5,letterSpacing:"0.05em"}}>DESCRIPTION</label>
      <textarea value={form.description} onChange={e=>fset("description",e.target.value)} placeholder="What does this project do?" style={{width:"100%",background:C.surfaceElevated,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",color:C.tp,fontSize:13,outline:"none",resize:"none",height:68,fontFamily:"inherit",lineHeight:1.5}}/>
    </div>
    <div>
      <label style={{fontSize:10,fontWeight:700,color:C.ts,display:"block",marginBottom:5,letterSpacing:"0.05em"}}>GITHUB REPOSITORY</label>
      <div style={{display:"flex",alignItems:"center",background:C.surfaceElevated,border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>
        <span style={{padding:"9px 10px",color:C.tm,fontSize:11,borderRight:`1px solid ${C.border}`,background:C.surfaceHigh,whiteSpace:"nowrap"}}>github.com/</span>
        <input value={form.github.replace("https://github.com/","")} onChange={e=>fset("github",e.target.value?`https://github.com/${e.target.value}`:"")} placeholder="org/repo-name" style={{flex:1,background:"transparent",border:"none",padding:"9px 12px",color:C.tp,fontSize:12,outline:"none"}}/>
      </div>
    </div>
    <div>
      <label style={{fontSize:10,fontWeight:700,color:C.ts,display:"block",marginBottom:5,letterSpacing:"0.05em"}}>REQUIRED SKILLS</label>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:7}}>
        {form.skillTags.map(s=>(
          <span key={s} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px 3px 9px",borderRadius:999,fontSize:11,fontWeight:600,background:`${form.color}22`,color:form.color,border:`1px solid ${form.color}44`}}>
            {s}<button onClick={()=>fset("skillTags",form.skillTags.filter(t=>t!==s))} style={{background:"none",border:"none",cursor:"pointer",color:form.color,fontSize:12,padding:0}}>×</button>
          </span>
        ))}
      </div>
      <div style={{position:"relative"}}>
        <input value={skillInput} onChange={e=>{setSkillInput(e.target.value);setSuggestions(e.target.value?SKILL_SUGGESTIONS.filter(s=>s.toLowerCase().includes(e.target.value.toLowerCase())&&!form.skillTags.includes(s)).slice(0,5):[]);}} onKeyDown={e=>{if(e.key==="Enter"&&skillInput.trim())addSkill(skillInput.trim());}} placeholder="Type a skill, press Enter…" style={{width:"100%",background:C.surfaceElevated,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",color:C.tp,fontSize:12,outline:"none"}}/>
        {suggestions.length>0&&(
          <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:C.surfaceHigh,border:`1px solid ${C.border}`,borderRadius:8,zIndex:10,overflow:"hidden"}}>
            {suggestions.map(s=><button key={s} onClick={()=>addSkill(s)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",background:"none",border:"none",cursor:"pointer",color:C.ts,fontSize:12}} onMouseEnter={e=>{e.currentTarget.style.background=C.surfaceElevated;e.currentTarget.style.color=C.tp;}} onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=C.ts;}}>{s}</button>)}
          </div>
        )}
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <div>
        <label style={{fontSize:10,fontWeight:700,color:C.ts,display:"block",marginBottom:6,letterSpacing:"0.05em"}}>COLOR</label>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {PROJECT_COLORS.map(col=><button key={col} onClick={()=>fset("color",col)} style={{width:22,height:22,borderRadius:"50%",background:col,border:`2px solid ${form.color===col?"#fff":"transparent"}`,cursor:"pointer",boxShadow:form.color===col?`0 0 10px ${col}`:"none"}}/>)}
        </div>
      </div>
      <div>
        <label style={{fontSize:10,fontWeight:700,color:C.ts,display:"block",marginBottom:6,letterSpacing:"0.05em"}}>PRIORITY</label>
        <div style={{display:"flex",gap:4}}>
          {["low","medium","high"].map(p=><button key={p} onClick={()=>fset("priority",p)} style={{flex:1,padding:"6px 0",borderRadius:7,border:"none",cursor:"pointer",fontSize:10,fontWeight:700,textTransform:"uppercase",background:form.priority===p?(p==="high"?C.danger:p==="medium"?C.warning:C.success)+"33":C.surfaceElevated,color:form.priority===p?p==="high"?C.danger:p==="medium"?C.warning:C.success:C.tm}}>{p}</button>)}
        </div>
      </div>
    </div>
    <button onClick={()=>{if(!form.name.trim())return;onCreate({...form,id:Date.now(),progress:0,due_date:new Date(Date.now()+90*864e5).toISOString().split("T")[0],team:["YO"],tasks:{total:0,done:0},tags:form.skillTags.slice(0,3),todos:[],invites:[]});onClose();}} disabled={!form.name.trim()} style={{width:"100%",padding:"12px 0",borderRadius:11,border:"none",cursor:form.name.trim()?"pointer":"not-allowed",fontSize:14,fontWeight:800,background:form.name.trim()?`linear-gradient(135deg,${form.color},${C.accentLight})`:C.border,color:form.name.trim()?"#fff":C.tm,boxShadow:form.name.trim()?`0 0 24px ${form.color}44`:"none"}}>Create Project →</button>
  </div>
);

export default StepManualForm;