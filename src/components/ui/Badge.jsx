import React from "react";
import { C } from "@/constants/theme";

const Badge = ({children,color=C.accent,small}) => (
  <span style={{
    padding:small?"1px 6px":"2px 8px",
    borderRadius:999,
    fontSize:small?10:11,
    fontWeight:600,
    background:`${color}22`,
    color,border:`1px solid ${color}44`,whiteSpace:"nowrap"}}>
      {children}</span>
);

export default Badge