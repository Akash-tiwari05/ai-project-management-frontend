import React from 'react';
// Imported C from the relative path of theme.js
import { C } from "@/constants/theme";

const Avatar = ({initials,color,size=32}) => (
  <div style={{width:size,
    height:size,
    borderRadius:"50%",
    flexShrink:0,
    background:`linear-gradient(135deg,
    ${color||C.accent},${color?color+"99":C.accentLight})`,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    fontSize:size*0.34,
    fontWeight:800,color:"#fff"}}>{initials} 
    </div>
);

// Added export default so you can use <Avatar /> in other components
export default Avatar;