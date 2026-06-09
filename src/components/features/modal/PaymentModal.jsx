import React, { useState, useRef } from "react";
import { C } from "@/constants/theme";

// Import your sub-package views cleanly
import StepReview from "./components/StepReview";
import StepForm from "./components/StepForm";
import StepProcessing from "./components/StepProcessing";
import StepSuccess from "./components/StepSuccess";

const PaymentModal = ({ plan, onClose, onSuccess }) => {
  const [step, setStep] = useState("review");
  const [method, setMethod] = useState("card");
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "", upi: "", bank: "" });
  const [errors, setErrors] = useState({});
  const [savePay, setSavePay] = useState(false);
  
  const fset = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const txnId = useRef("TXN" + Date.now().toString().slice(-10));

  // Validation algorithms (Keep your exact function implementations)
  const formatCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();
  const formatExp = v => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };
  
  const validate = () => { /* ... Keep your exact validate function logic here ... */ };
  const handlePay = () => { if (!validate()) return; setStep("processing"); setTimeout(() => setStep("success"), 2800); };

  // Reusable CSS style factories
  const inp = (err) => ({ width: "100%", background: C.surfaceHigh, border: `1.5px solid ${err ? C.danger : C.border}`, borderRadius: 9, padding: "10px 13px", color: C.tp, fontSize: 13, outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" });
  const lbl = { fontSize: 10, fontWeight: 700, color: C.ts, display: "block", marginBottom: 5, letterSpacing: "0.07em" };
  const annualSaving = (plan.price * 0.2 * 12).toFixed(0);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,18,0.88)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000, animation: "fadeIn 0.2s ease" }}>
      <div style={{ background: C.surface, borderRadius: 22, border: `1px solid ${plan.color}55`, width: 500, maxHeight: "92vh", overflowY: "auto", boxShadow: `0 48px 120px rgba(0,0,0,0.8), 0 0 80px ${plan.glow}`, animation: "slideUp 0.35s cubic-bezier(.34,1.56,.64,1)" }}>
        
        {/* Modal Header Shell */}
        <div style={{ padding: "20px 22px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: `linear-gradient(135deg, ${plan.glow}, transparent)` }}>
          {/* ... Keep your header content exactly as it is ... */}
        </div>

        <div style={{ padding: "20px 22px 24px" }}>
          {/* Step Conditionals Router */}
          {step === "review" && (
            <StepReview plan={plan} annualSaving={annualSaving} setStep={setStep} />
          )}

          {step === "form" && (
            <StepForm 
              plan={plan} method={method} setMethod={setMethod} form={form} 
              fset={fset} errors={errors} savePay={savePay} setSavePay={setSavePay} 
              handlePay={handlePay} inp={inp} lbl={lbl} formatCard={formatCard} formatExp={formatExp}
            />
          )}

          {step === "processing" && (
            <StepProcessing plan={plan} />
          )}

          {step === "success" && (
            <StepSuccess plan={plan} method={method} form={form} txnId={txnId} onSuccess={onSuccess} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;