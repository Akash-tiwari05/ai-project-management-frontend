import React from "react";
import { C } from "@/constants/theme";

const LimitBanner = ({ planLimits, onClose, onUpgrade }) => (
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,animation:"fadeIn 0.2s ease"}}>
    <div style={{background:C.surface,borderRadius:20,border:`1px solid ${C.danger}44`,width:440,padding:"32px 28px",textAlign:"center",boxShadow:`0 40px 100px rgba(0,0,0,0.7), 0 0 60px ${C.danger}22`,animation:"slideUp 0.3s ease"}}>
      <div style={{width:60,height:60,borderRadius:"50%",background:`${C.danger}18`,border:`2px solid ${C.danger}44`,margin:"0 auto 18px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>◈</div>
      <div style={{fontSize:18,fontWeight:800,color:C.tp,marginBottom:8,letterSpacing:"-0.02em"}}>Project limit reached</div>
      <div style={{fontSize:13,color:C.ts,marginBottom:6,lineHeight:1.6}}>You've used all <strong style={{color:C.tp}}>{planLimits.projects}</strong> project slots on your current plan.</div>
      <div style={{background:C.surfaceElevated,borderRadius:10,padding:"10px 14px",marginBottom:22,border:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",fontSize:12}}>
        <span style={{color:C.ts}}>Current plan</span>
        <span style={{color:C.tp,fontWeight:700}}>{planLimits.projects} projects max</span>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button onClick={onClose} style={{flex:1,padding:"11px 0",borderRadius:10,border:`1px solid ${C.border}`,background:"transparent",color:C.ts,fontSize:12,cursor:"pointer"}}>Cancel</button>
        <button onClick={()=>{onClose();onUpgrade();}} style={{flex:2,padding:"11px 0",borderRadius:10,border:"none",background:`linear-gradient(135deg,${C.ai},${C.accent})`,color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",boxShadow:`0 0 20px ${C.aiGlow}`}}>✦ View Plans →</button>
      </div>
    </div>
  </div>
);

export default LimitBanner;