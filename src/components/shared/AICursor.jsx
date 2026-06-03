import React, { useState, useEffect } from "react";
import { C } from "../../constants/theme";

export default function AICursor({ visible }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (!visible) return;
    const handle = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail(t => [...t.slice(-8), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [visible]);

  if (!visible) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {trail.map((t, i) => (
        <div key={t.id} style={{
          position: "absolute", left: t.x - 4, top: t.y - 4,
          width: 8, height: 8, borderRadius: "50%",
          background: C.ai, opacity: (i / trail.length) * 0.4,
          transform: "translate(-50%,-50%)",
          transition: "opacity 0.3s",
        }} />
      ))}
      <div style={{
        position: "absolute", left: pos.x, top: pos.y,
        transform: "translate(-2px,-2px)",
        pointerEvents: "none",
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M4 2L18 10L11 12L8 20L4 2Z" fill={C.ai} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        <div style={{
          position: "absolute", left: 18, top: 2,
          background: `linear-gradient(135deg, ${C.ai}, ${C.accent})`,
          color: "#fff", fontSize: 9, fontWeight: 700,
          padding: "2px 6px", borderRadius: 6, whiteSpace: "nowrap",
          boxShadow: `0 0 12px ${C.aiGlow}`,
        }}>✦ AI Mode</div>
      </div>
    </div>
  );
}