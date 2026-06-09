import React from "react";
import { C } from "@/constants/theme";

const StepReview = ({ plan, annualSaving, setStep }) => (
  <div style={{ animation: "fadeUp 0.3s ease" }}>
    {/* ... Keep your exact Plan summary card JSX layout here ... */}
    {/* ... Keep your exact Annual savings nudge JSX layout here ... */}
    {/* ... Keep your exact Billing breakdown JSX layout here ... */}
    
    <button onClick={() => setStep("form")} style={{ /* Your exact proceed button styles */ }}>
      Proceed to Payment →
    </button>
    <div style={{ textAlign: "center", marginTop: 12, fontSize: 11, color: C.tm, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
      <span>🔒</span> Payments processed securely by Razorpay. PCI DSS compliant.
    </div>
  </div>
);

export default StepReview;