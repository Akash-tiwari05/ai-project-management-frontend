import React from "react";
import { C } from "@/constants/theme";

const StepSuccess = ({ plan, method, form, txnId, onSuccess, onClose }) => (
  <div style={{ animation: "fadeUp 0.3s ease", textAlign: "center", padding: "32px 20px" }}>
    {/* ... Keep your exact success checkmark animation box here ... */}
    {/* ... Keep your exact Receipt details mapping loop layout here ... */}
    {/* ... Keep your exact New Limits grid layout box here ... */}
    
    <button onClick={() => { onSuccess(plan.id); onClose(); }} style={{ /* Your exact termination CTA styles */ }}>
      Start using {plan.name} →
    </button>
  </div>
);

export default StepSuccess;