import React, { useState } from "react";
import { C, PLANS } from "@/constants/theme";
import Badge from "../../ui/Badge";

// Sub-package view imports
import BillingHeader from "./components/BillingHeader";
import PlanCards from "./components/PlanCards";
import FeatureTable from "./components/FeatureTable";

const BillingView = ({currentPlan, usageData, onOpenPayment, onCancelPlan}) => {
  const [billing, setBilling] = useState("monthly");
  const plan = PLANS[currentPlan];

  return (
    <div style={{flex:1,overflowY:"auto",padding:24}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:800,color:C.tp,marginBottom:4,letterSpacing:"-0.03em"}}>Plans & Billing</h1>
        <p style={{color:C.ts,fontSize:13}}>Manage your subscription and monitor usage.</p>
      </div>

      {/* 1. Header Usage Area Component */}
      <BillingHeader 
        currentPlan={currentPlan} 
        plan={plan} 
        usageData={usageData} 
        onCancelPlan={onCancelPlan} 
      />

      {/* 2. Billing Toggle Section */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:22}}>
        <span style={{fontSize:13,color:billing==="monthly"?C.tp:C.tm,fontWeight:billing==="monthly"?700:400}}>Monthly</span>
        <button onClick={()=>setBilling(b=>b==="monthly"?"annual":"monthly")} style={{width:46,height:26,borderRadius:999,border:`1px solid ${C.border}`,background:billing==="annual"?C.success:C.surfaceHigh,cursor:"pointer",position:"relative",transition:"background 0.3s",padding:0}}>
          <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:billing==="annual"?25:3,transition:"left 0.3s ease",boxShadow:"0 1px 4px rgba(0,0,0,0.4)"}}/>
        </button>
        <span style={{fontSize:13,color:billing==="annual"?C.tp:C.tm,fontWeight:billing==="annual"?700:400}}>Annual</span>
        {billing==="annual" && <Badge color={C.success}>Save 20%</Badge>}
      </div>

      {/* 3. Pricing Cards Component Grid */}
      <PlanCards 
        currentPlan={currentPlan} 
        billing={billing} 
        onOpenPayment={onOpenPayment} 
      />

      {/* 4. Feature Grid Table Component */}
      <FeatureTable currentPlan={currentPlan} />

      {/* 5. Static FAQ Footer elements */}
      <div style={{marginTop:20,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,animation:"fadeUp 0.5s ease 0.4s both"}}>
        {[
          {icon:"🔒",title:"Secure payments",desc:"All transactions via Razorpay with 256-bit SSL encryption. PCI DSS compliant."},
          {icon:"↩",title:"Cancel anytime",desc:"No lock-ins. Cancel your subscription from billing settings at any time."},
          {icon:"💬",title:"24/7 support",desc:"Pro & Prime plans include priority support. We respond within hours."},
        ].map((item,i)=>(
          <div key={i} style={{background:C.surfaceElevated,borderRadius:12,padding:"14px 16px",border:`1px solid ${C.border}`}}>
            <div style={{fontSize:20,marginBottom:8}}>{item.icon}</div>
            <div style={{fontSize:12,fontWeight:700,color:C.tp,marginBottom:4}}>{item.title}</div>
            <div style={{fontSize:11,color:C.ts,lineHeight:1.5}}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingView;