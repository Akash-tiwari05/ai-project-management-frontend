import React, { useState, useRef, useEffect } from "react";
import { C } from "../../../constants/theme";
import Avatar from "../../ui/Avatar";
import ChatToggle from "./ChatToggle";

export default function ChatPanel({ teamMessages, aiMessages, onSend, projectColor }) {
  const [isAI, setIsAI] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const messages = isAI ? aiMessages : teamMessages;

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing, isAI]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim(), isAI ? "ai" : "team");
    setInput("");
    if (isAI) { setTyping(true); setTimeout(() => setTyping(false), 2200); }
  };

  const accent = isAI ? C.ai : projectColor || C.accent;
  const glow = isAI ? C.aiGlow : C.accentGlow;

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      background: C.surface, borderRadius: 14,
      border: `1px solid ${C.border}`,
      overflow: "hidden", height: "100%",
      boxShadow: isAI ? `0 0 40px ${C.aiGlow}` : "none",
      transition: "box-shadow 0.4s ease",
    }}>
      <div style={{
        padding: "10px 14px", borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: isAI ? `linear-gradient(135deg, ${C.aiGlow}, transparent)` : "transparent",
        transition: "background 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: isAI ? `linear-gradient(135deg, ${C.ai}, ${C.accent})` : `${projectColor || C.accent}33`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, color: isAI ? "#fff" : accent,
            boxShadow: isAI ? `0 0 14px ${C.aiGlow}` : "none",
            transition: "all 0.3s ease",
          }}>{isAI ? "✦" : "◎"}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.tp }}>{isAI ? "AI Assistant" : "Team Chat"}</div>
            <div style={{ fontSize: 10, color: C.tm }}>{isAI ? "Context-aware · Project linked" : `${teamMessages.length} messages`}</div>
          </div>
        </div>
        <ChatToggle isAI={isAI} onToggle={setIsAI} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((msg, i) => {
          const isMe = msg.role === "user" || msg.user === "YO";
          const isAiMsg = msg.role === "ai";
          return (
            <div key={msg.id || i} style={{ display: "flex", gap: 7, flexDirection: isMe ? "row-reverse" : "row", animation: "fadeUp 0.3s ease" }}>
              {!isMe && (isAiMsg
                ? <div style={{ width: 26, height: 26, borderRadius: 7, background: `linear-gradient(135deg,${C.ai},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", flexShrink: 0, marginTop: 2 }}>✦</div>
                : <Avatar initials={msg.avatar || msg.user} color={projectColor} size={26} />
              )}
              {isMe && <Avatar initials="YO" color={C.accent} size={26} />}
              <div style={{ maxWidth: "76%", display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                {!isMe && <span style={{ fontSize: 9, color: C.tm, marginBottom: 2, paddingLeft: 2 }}>{isAiMsg ? "AI Assistant" : msg.name}</span>}
                <div style={{
                  padding: "8px 11px", fontSize: 12, lineHeight: 1.65,
                  borderRadius: isMe ? "11px 3px 11px 11px" : "3px 11px 11px 11px",
                  background: isMe ? `linear-gradient(135deg,${C.accent},${C.accentLight})` : C.surfaceElevated,
                  border: isAiMsg ? `1px solid ${C.ai}33` : `1px solid ${C.border}`,
                  color: isMe ? "#fff" : C.tp,
                  boxShadow: isMe ? `0 3px 10px ${C.accentGlow}` : isAiMsg ? `0 3px 10px ${C.aiGlow}` : "none",
                  whiteSpace: "pre-wrap",
                }}>
                  {isAiMsg
                    ? msg.text.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
                        p.startsWith("**") && p.endsWith("**")
                          ? <strong key={j} style={{ color: C.aiLight }}>{p.slice(2, -2)}</strong>
                          : <span key={j}>{p}</span>)
                    : msg.text}
                </div>
                <span style={{ fontSize: 9, color: C.tm, marginTop: 2, padding: "0 2px" }}>{msg.time}</span>
              </div>
            </div>
          );
        })}
        {typing && (
          <div style={{ display: "flex", gap: 7 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: `linear-gradient(135deg,${C.ai},${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", flexShrink: 0 }}>✦</div>
            <div style={{ padding: "10px 13px", borderRadius: "3px 11px 11px 11px", background: C.surfaceElevated, border: `1px solid ${C.ai}33`, display: "flex", gap: 4, alignItems: "center" }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: C.aiLight, animation: `typingDot 1.2s ease ${i*0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ padding: 10, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center", background: C.surfaceElevated, borderRadius: 10, padding: "5px 5px 5px 11px", border: `1px solid ${C.border}`, transition: "border-color 0.2s" }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={isAI ? "Ask AI about this project..." : "Message the team..."}
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: C.tp, fontSize: 12 }} />
          <button onClick={handleSend} style={{
            width: 28, height: 28, borderRadius: 7, border: "none", cursor: "pointer",
            background: input.trim() ? `linear-gradient(135deg,${accent},${isAI ? C.accent : C.accentLight})` : C.border,
            color: input.trim() ? "#fff" : C.tm, fontSize: 13,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", boxShadow: input.trim() ? `0 0 12px ${glow}` : "none",
          }}>↑</button>
        </div>
      </div>
    </div>
  );
}