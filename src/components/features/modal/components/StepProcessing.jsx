import React from "react";
import { C } from "@/constants/theme";

const StepProcessing = ({ plan }) => (
  <div style={{ animation: "fadeUp 0.3s ease", textAlign: "center", padding: "50px 24px" }}>
    {/* ... Keep your exact relative spinner circle & typography layout here ... */}
    <div style={{ marginTop: 20, display: "center", justifyContent: "center", gap: 6 }}>
      {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: plan.color, opacity: 0.4, animation: `typingDot 1.2s ease ${i * 0.2}s infinite` }} />)}
    </div>
  </div>
);

export default StepProcessing;