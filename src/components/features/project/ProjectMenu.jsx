import React, { useState, useEffect, useRef } from "react"; // Fixed missing hooks imports
import { C } from "@/constants/theme"; // Fixed missing theme variable import

const ProjectMenu = ({ project = {}, onDelete, onArchive }) => { // Added safety parameter default object fallback
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const menuItems = [
    { icon: "✎", label: "Edit project", color: C.ts, action: () => setOpen(false) },
    { icon: "⊟", label: "Archive project", color: C.warning, action: () => { onArchive(); setOpen(false); } },
    { icon: "—", label: "divider" },
    { icon: "⌫", label: "Delete project", color: C.danger, action: () => { setConfirmDelete(true); setOpen(false); } },
  ];

  return (
    <>
      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div style={{ position:"fixed", inset:0, background:"rgba(4,8,18,0.82)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyindex:4000, justifyContent:"center", zIndex:4000, animation:"fadeIn 0.18s ease" }}>
          <div style={{ background:C.surface, borderRadius:18, border:`1px solid ${C.danger}44`, width:400, padding:"28px 28px 24px", boxShadow:`0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(239,68,68,0.15)`, animation:"slideUp 0.28s cubic-bezier(.34,1.56,.64,1)" }}>
            {/* icon */}
            <div style={{ width:52, height:52, borderRadius:14, background:`${C.danger}18`, border:`1px solid ${C.danger}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:18 }}>⌫</div>
            <div style={{ fontSize:17, fontWeight:800, color:C.tp, marginBottom:8, letterSpacing:"-0.02em" }}>Delete "{project?.name || "this project"}"?</div> {/* Safe lookup injection handler */}
            <p style={{ fontSize:13, color:C.ts, lineHeight:1.6, marginBottom:6 }}>
              This will permanently remove the project and all its data including todos, messages, and invites.
            </p>
            <div style={{ background:`${C.danger}10`, borderRadius:10, padding:"10px 14px", border:`1px solid ${C.danger}22`, marginBottom:22 }}>
              <div style={{ fontSize:11, color:C.danger, fontWeight:600, marginBottom:4 }}>This action cannot be undone.</div>
              <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                {[
                  `${project?.todos?.length || 0} todos will be deleted`,
                  `All team chat history will be lost`,
                  `${project?.invites?.length || 0} pending invites will be cancelled`,
                ].map((w, i) => (
                  <div key={i} style={{ fontSize:11, color:C.ts, display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ color:C.danger, fontSize:10 }}>✕</span>{w}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setConfirmDelete(false)} style={{ flex:1, padding:"11px 0", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.ts, fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderLight; e.currentTarget.style.color = C.tp; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.ts; }}>
                Cancel
              </button>
              <button onClick={() => { setConfirmDelete(false); onDelete(); }} style={{ flex:1, padding:"11px 0", borderRadius:10, border:"none", background:`linear-gradient(135deg, ${C.danger}, #dc2626)`, color:"#fff", fontSize:13, fontWeight:800, cursor:"pointer", boxShadow:`0 0 24px rgba(239,68,68,0.35)`, transition:"all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 36px rgba(239,68,68,0.55)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 24px rgba(239,68,68,0.35)"}>
                ⌫ Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Three-dot trigger + dropdown */}
      <div ref={menuRef} style={{ position:"relative" }}>
        <button onClick={() => setOpen(o => !o)} style={{
          width:30, height:30, borderRadius:8, border:`1px solid ${open ? C.borderLight : "transparent"}`,
          background: open ? C.surfaceHigh : "transparent",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          flexDirection:"column", gap:3, transition:"all 0.18s", flexShrink:0,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = C.surfaceHigh; e.currentTarget.style.borderColor = C.borderLight; }}
          onMouseLeave={e => { if (!open) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; } }}
          title="Project options"
        >
          {[0,1,2].map(i => (
            <div key={i} style={{ width:3.5, height:3.5, borderRadius:"50%", background:open ? C.tp : C.ts, transition:"background 0.15s" }} />
          ))}
        </button>

        {open && (
          <div style={{
            position:"absolute", top:"calc(100% + 6px)", right:0,
            background:C.surfaceHigh, borderRadius:11,
            border:`1px solid ${C.borderLight}`,
            boxShadow:`0 16px 48px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3)`,
            minWidth:190, zIndex:500,
            animation:"fadeUp 0.18s ease",
            overflow:"hidden",
          }}>
            {/* Header */}
            <div style={{ padding:"10px 13px 8px", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:project?.color || C.accent }} />
                <span style={{ fontSize:11, fontWeight:700, color:C.tp, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:140 }}>{project?.name || "Project"}</span>
              </div>
            </div>
            {/* Items */}
            <div style={{ padding:"4px 0" }}>
              {menuItems.map((item, i) => {
                if (item.label === "divider") return <div key={i} style={{ height:1, background:C.border, margin:"4px 0" }} />;
                return (
                  <button key={i} onClick={item.action} style={{
                    display:"flex", alignItems:"center", gap:9,
                    width:"100%", padding:"8px 13px",
                    background:"transparent", border:"none", cursor:"pointer",
                    fontSize:12, fontWeight:500, color:item.color,
                    transition:"background 0.15s",
                    textAlign:"left",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = item.label === "Delete project" ? `${C.danger}14` : C.surfaceElevated; }}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{ fontSize:13, width:16, textAlign:"center", flexShrink:0 }}>{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectMenu; // Fixed missing default export link