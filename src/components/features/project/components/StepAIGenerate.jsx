import React from "react";
import { C } from "@/constants/theme";

const StepAIGenerate = ({ aiPrompt, setAiPrompt, simulateAI, generating, setStep }) => (
  <div style={{animation:"fadeUp 0.3s ease"}}>
    <div style={{background:C.surfaceElevated,borderRadius:12,padding:16,border:`1px solid ${C.border}`,marginBottom:14}}>
      <div style={{fontSize:11,color:C.aiLight,fontWeight:600,marginBottom:8}}>✦ Describe your project idea</div>
      <textarea value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)} placeholder="e.g. A real-time collaboration tool for remote teams with shared boards and task tracking…" style={{width:"100%",background:"transparent",border:"none",outline:"none",color:C.tp,fontSize:13,lineHeight:1.6,resize:"none",height:80,fontFamily:"inherit"}}/>
    </div>
    <button onClick={simulateAI} disabled={generating||!aiPrompt.trim()} style={{width:"100%",padding:"11px 0",borderRadius:10,border:"none",cursor:generating||!aiPrompt.trim()?"not-allowed":"pointer",background:generating||!aiPrompt.trim()?C.border:`linear-gradient(135deg,${C.ai},${C.accent})`,color:generating||!aiPrompt.trim()?C.tm:"#fff",fontSize:13,fontWeight:700}}>
      {generating?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span> Generating…</span>:"✦ Generate Project with AI"}
    </button>
    <div style={{marginTop:10,textAlign:"center"}}><button onClick={()=>setStep(1)} style={{background:"none",border:"none",cursor:"pointer",color:C.tm,fontSize:11,textDecoration:"underline"}}>Skip — fill manually</button></div>
  </div>
);

export default StepAIGenerate;