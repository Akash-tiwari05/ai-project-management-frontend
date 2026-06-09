import React, { useState } from "react";
import { C, ROLES } from "@/constants/theme";
import Avatar from "@/components/ui/Avatar"; // Fixed destructured named import bug

const InviteSection = ({invites = [], onInvite, onRevoke, projectColor}) => { // Added safety fallback array
  const [email,setEmail]=useState(""); const [role,setRole]=useState("Developer"); const [err,setErr]=useState("");
  const sc={pending:C.warning,accepted:C.success,declined:C.danger};
  return (
    <div style={{background:C.surface,borderRadius:14,border:`1px solid ${C.border}`,overflow:"hidden"}}>
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:26,height:26,borderRadius:7,background:`${C.success}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:C.success}}>✉</div>
        <div><div style={{fontSize:12,fontWeight:700,color:C.tp}}>Invite Team</div><div style={{fontSize:10,color:C.tm}}>{invites.length} invite{invites.length!==1?"s":""} sent</div></div>
      </div>
      {invites.length>0&&(
        <div style={{padding:"8px 12px",maxHeight:120,overflowY:"auto"}}>
          {invites.map((inv,i)=>(
            <div key={inv.id || i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 6px",borderRadius:8,marginBottom:2}}
              onMouseEnter={e=>e.currentTarget.style.background=C.surfaceElevated} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <Avatar initials={inv.email.slice(0,2).toUpperCase()} color={projectColor} size={22}/>
              <div style={{flex:1,overflow:"hidden"}}><div style={{fontSize:11,color:C.tp,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inv.email}</div><div style={{fontSize:9,color:C.tm}}>{inv.role} · {inv.sent}</div></div>
              <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:999,background:`${sc[inv.status]}22`,color:sc[inv.status]}}>{inv.status}</span>
              {inv.status==="pending"&&<button onClick={()=>onRevoke(inv.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.tm,fontSize:11}} onMouseEnter={e=>e.currentTarget.style.color=C.danger} onMouseLeave={e=>e.currentTarget.style.color=C.tm}>×</button>}
            </div>
          ))}
        </div>
      )}
      <div style={{padding:"8px 12px 12px",borderTop:invites.length?`1px solid ${C.border}`:"none"}}>
        <div style={{display:"flex",gap:6,marginBottom:err?4:0}}>
          <input value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} onKeyDown={e=>{if(e.key==="Enter"){if(!email.includes("@")){setErr("Invalid email");return;}onInvite(email,role);setEmail("");}}} placeholder="Email address..." style={{flex:1,border:`1px solid ${err?C.danger:C.border}`,outline:"none",background:C.surfaceElevated,color:C.tp,fontSize:11,padding:"6px 10px",borderRadius:7}}/>
          <select value={role} onChange={e=>setRole(e.target.value)} style={{background:C.surfaceElevated,border:`1px solid ${C.border}`,color:C.ts,fontSize:10,borderRadius:7,padding:"0 6px",cursor:"pointer",outline:"none"}}>
            {ROLES.map(r=><option key={r} value={r}>{r}</option>)}
          </select>
          <button onClick={()=>{if(!email.includes("@")){setErr("Invalid email");return;}onInvite(email,role);setEmail("");}} style={{padding:"6px 12px",borderRadius:7,border:"none",cursor:"pointer",background:`linear-gradient(135deg,${C.success},#34d399)`,color:"#fff",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>Invite</button>
        </div>
        {err&&<div style={{fontSize:10,color:C.danger}}>{err}</div>}
      </div>
    </div>
  );
};

export default InviteSection; // Added missing default export link