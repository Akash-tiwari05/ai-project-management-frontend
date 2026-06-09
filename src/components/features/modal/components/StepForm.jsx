import React from "react";
import { C } from "@/constants/theme";

const StepForm = ({ plan, method, setMethod, form, fset, errors, savePay, setSavePay, handlePay, inp, lbl }) => (
  <div style={{ animation: "fadeUp 0.3s ease" }}>
    {/* ... Keep your exact Razorpay trust bar JSX layout here ... */}
    {/* ... Keep your exact Amount pill JSX layout here ... */}
    {/* ... Keep your exact Method tabs selector JSX layout here ... */}
    {/* ... Keep your exact Cardholder text fields JSX layout here ... */}
    {/* ... Keep your exact Conditional Inputs (method === "card" / "upi" / "netbanking") ... */}
    
    <button onClick={handlePay} style={{ /* Your exact submit payment button styles */ }}>
      Pay ${plan.price}.00 →
    </button>
  </div>
);

export default StepForm;