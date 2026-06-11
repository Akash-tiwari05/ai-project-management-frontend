import React, { useState, useRef, useEffect } from "react";
import { C } from "@/constants/theme";

const INIT_NOTIFS = [
  { id: 1, type: "invite", title: "Maya Patel accepted your invite", body: "Joined E-Commerce Redesign as Developer", time: "2m ago", read: false, icon: "✉", color: "#10B981" },
  { id: 2, type: "ai", title: "AI token usage at 85%", body: "You've used 255 of 300 free tokens", time: "18m ago", read: false, icon: "✦", color: "#8B5CF6" }
];

export default function NotificationPanel({ onGoToBilling }) {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(INIT_NOTIFS);
  const unread = notifs.filter(n => !n.read).length;

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ width: 34, height: 34, background: C.surfaceElevated, border: "none", color: "#fff", cursor: "pointer" }}>
        🔔 {unread > 0 && <span>•</span>}
      </button>
      {open && (
        <div style={{ position: "absolute", top: "40px", right: 0, background: C.surfaceHigh, width: 300, padding: 12, borderRadius: 8, zIndex: 1000 }}>
          {notifs.map(n => <div key={n.id} style={{ padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>{n.title}</div>)}
        </div>
      )}
    </div>
  );
}