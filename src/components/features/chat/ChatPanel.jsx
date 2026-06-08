import React, { useState, useRef, useEffect } from "react";
import { C } from "@/constants/theme";
import Avatar from "@/components/ui/Avatar"; // 1. Fixed named-import typo to read default Avatar correctly

const ChatPanel = ({teamMessages = [], aiMessages = [], onSend, projectColor, planLimits, aiUsage, onUpgrade}) => { // 2. Added array fallbacks to prevent empty rendering crashes
  const [isAI, setIsAI] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  
  const messages = isAI ? aiMessages : teamMessages;
  const aiBlocked = isAI && aiUsage >= planLimits.aiTokens;
  const aiWarn = isAI && !aiBlocked && (aiUsage/planLimits.aiTokens) > 0.8;

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[messages,typing,isAI]);

  const handleSend = () => {
    if(!input.trim()||aiBlocked) return;
    onSend(input.trim(), isAI?"ai":"team");
    setInput("");
    if(isAI){setTyping(true);setTimeout(()=>setTyping(false),2300);}
  };

  const accent = isAI?C.ai:projectColor||C.accent;

  return (
    <div style={{display:"flex",flexDirection:"column",background:C.surface,borderRadius:14,border:`1px solid ${C.border}`,overflow:"hidden",height:"100%",boxShadow:isAI?`0 0 40px ${C.aiGlow}`:"none",transition:"box-shadow 0.4s ease"}}>
      {/* Header with toggle */}
      <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",background:isAI?`linear-gradient(135deg,${C.aiGlow},transparent)`:"transparent",transition:"background 0.4s"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:26,height:26,borderRadius:7,background:isAI?`linear-gradient(135deg,${C.ai},${C.accent})`:`${projectColor||C.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:isAI?"#fff":accent,transition:"all 0.3s"}}>{isAI?"✦":"◎"}</div>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.tp}}>{isAI?"AI Assistant":"Team Chat"}</div>
            <div style={{fontSize:10,color:C.tm}}>{isAI?`${aiUsage.toLocaleString()} / ${planLimits.aiTokens===Infinity?"∞":planLimits.aiTokens.toLocaleString()} tokens used`:`${teamMessages.length} messages`}</div>
          </div>
        </div>
        {/* Slider toggle */}
        <div style={{display:"flex",alignItems:"center",gap:8,background:C.surfaceElevated,borderRadius:999,padding:"3px",border:`1px solid ${C.border}`}}>
          <button onClick={()=>setIsAI(false)} style={{padding:"5px 12px",borderRadius:999,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,transition:"all 0.25s",background:!isAI?`linear-gradient(135deg,${projectColor||C.accent},${C.accentLight})`:"transparent",color:!isAI?"#fff":C.tm,boxShadow:!isAI?`0 0 12px ${C.accentGlow}`:"none"}}>◎ Team</button>
          <button onClick={()=>setIsAI(true)} style={{padding:"5px 12px",borderRadius:999,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,transition:"all 0.25s",background:isAI?`linear-gradient(135deg,${C.ai},${C.accent})`:"transparent",color:isAI?"#fff":C.tm,boxShadow:isAI?`0 0 12px ${C.aiGlow}`:"none"}}>✦ AI</button>
        </div>
      </div>

      {/* AI usage warning */}
      {aiWarn && (
        <div style={{margin:"0 10px",marginTop:6,padding:"7px 11px",borderRadius:8,background:`${C.warning}18`,border:`1px solid ${C.warning}44`,fontSize:11,color:C.warning,display:"flex",alignItems:"center",gap:6}}>
          ⚠ {Math.round((1-aiUsage/planLimits.aiTokens)*100)}% of AI tokens remaining.
          <button onClick={onUpgrade} style={{background:"none",border:"none",cursor:"pointer",color:C.accent,fontSize:11,fontWeight:700,textDecoration:"underline",padding:0}}>Upgrade →</button>
        </div>
      )}
      {aiBlocked && (
        <div style={{margin:"0 10px",marginTop:6,padding:"9px 11px",borderRadius:10,background:`${C.danger}14`,border:`1px solid ${C.danger}44`,fontSize:11,color:C.danger}}>
          <div style={{fontWeight:700,marginBottom:3}}>✦ AI token limit reached</div>
          <div style={{color:C.ts,marginBottom:6}}>You've used all {planLimits.aiTokens.toLocaleString()} tokens for this {planLimits.aiPeriod}.</div>
          <button onClick={onUpgrade} style={{background:`linear-gradient(135deg,${C.ai},${C.accent})`,border:"none",borderRadius:7,padding:"6px 12px",cursor:"pointer",color:"#fff",fontSize:11,fontWeight:700}}>✦ Upgrade Plan →</button>
        </div>
      )}

      {/* Messages */}
      <div style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
        {messages.map((msg,i)=>{
          const isMe = msg.role==="user"||msg.user==="YO";
          const isAiMsg = msg.role==="ai";
          return (
            <div key={msg.id||i} style={{display:"flex",gap:7,flexDirection:isMe?"row-reverse":"row",animation:"fadeUp 0.3s ease"}}>
              {!isMe&&(isAiMsg?<div style={{width:26,height:26,borderRadius:7,background:`linear-gradient(135deg,${C.ai},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",flexShrink:0,marginTop:2}}>✦</div>:<Avatar initials={msg.avatar||msg.user} color={projectColor} size={26}/>)}
              {isMe&&<Avatar initials="YO" color={C.accent} size={26}/>}
              <div style={{maxWidth:"76%",display:"flex",flexDirection:"column",alignItems:isMe?"flex-end":"flex-start"}}>
                {!isMe&&<span style={{fontSize:9,color:C.tm,marginBottom:2,paddingLeft:2}}>{isAiMsg?"AI Assistant":msg.name}</span>}
                <div style={{padding:"8px 11px",fontSize:12,lineHeight:1.65,borderRadius:isMe?"11px 3px 11px 11px":"3px 11px 11px 11px",background:isMe?`linear-gradient(135deg,${C.accent},${C.accentLight})`:C.surfaceElevated,border:isAiMsg?`1px solid ${C.ai}33`:`1px solid ${C.border}`,color:isMe?"#fff":C.tp,whiteSpace:"pre-wrap"}}>
                  {isAiMsg?msg.text.split(/(\*\*[^*]+\*\*)/g).map((p,j)=>p.startsWith("**")&&p.endsWith("**")?<strong key={j} style={{color:C.aiLight}}>{p.slice(2,-2)}</strong>:<span key={j}>{p}</span>):msg.text}
                </div>
                <span style={{fontSize:9,color:C.tm,marginTop:2,padding:"0 2px"}}>{msg.time}</span>
              </div>
            </div>
          );
        })}
        {typing&&(
          <div style={{display:"flex",gap:7}}>
            <div style={{width:26,height:26,borderRadius:7,background:`linear-gradient(135deg,${C.ai},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",flexShrink:0}}>✦</div>
            <div style={{padding:"10px 13px",borderRadius:"3px 11px 11px 11px",background:C.surfaceElevated,border:`1px solid ${C.ai}33`,display:"flex",gap:4,alignItems:"center"}}>
              {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:C.aiLight,animation:`typingDot 1.2s ease ${i*0.2}s infinite`}}/>)}
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Input */}
      <div style={{padding:10,borderTop:`1px solid ${C.border}`}}>
        <div style={{display:"flex",gap:7,alignItems:"center",background:C.surfaceElevated,borderRadius:10,padding:"5px 5px 5px 11px",border:`1px solid ${C.border}`}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&handleSend()} disabled={aiBlocked}
            placeholder={aiBlocked?"AI limit reached — upgrade to continue…":isAI?"Ask AI about this project...":"Message the team..."}
            style={{flex:1,border:"none",outline:"none",background:"transparent",color:aiBlocked?C.tm:C.tp,fontSize:12,cursor:aiBlocked?"not-allowed":"text"}}/>
          <button onClick={handleSend} disabled={aiBlocked||!input.trim()} style={{width:28,height:28,borderRadius:7,border:"none",cursor:aiBlocked||!input.trim()?"not-allowed":"pointer",background:input.trim()&&!aiBlocked?`linear-gradient(135deg,${accent},${isAI?C.accent:C.accentLight})`:C.border,color:input.trim()&&!aiBlocked?"#fff":C.tm,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>↑</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel; // 3. Added missing default export hook