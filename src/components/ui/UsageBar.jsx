import React from "react";
import { C } from "@/constants/theme";
import ProgressBar from "@/components/ui/ProgressBar";

const UsageBar = ({used,total,color,label}) => {
  const pct = total===Infinity?0:Math.min(100,(used/total)*100);
  const bc = pct>95?C.danger:pct>80?C.warning:color;
  return (
    <div style={{marginBottom:8}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:11,color:C.ts}}>{label}</span>
        <span style={{fontSize:11,color:pct>80?bc:C.tm,fontWeight:600}}>{total===Infinity?`${used} used`:`${used.toLocaleString()} / ${total.toLocaleString()}`}</span>
      </div>
      <ProgressBar value={pct} color={bc} height={4}/>
    </div>
  );
};

export default UsageBar;