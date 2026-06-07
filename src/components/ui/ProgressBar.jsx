import React, { useState, useEffect } from "react"; // Added missing imports
import { C } from "@/constants/theme";

const ProgressBar = ({value,color=C.accent,height=4}) => { // Changed ( to {
  
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const clampedValue = Math.max(0, Math.min(100, value));
    setAnimatedWidth(clampedValue);
  }, [value]); // Added value dependency so it updates dynamically

  return ( // Added explicit return statement
    <div style={{
      background:C.border,
      borderRadius:999,height,
      overflow:"hidden"}}>
      <div style={{
        width:`${animatedWidth}%`, // Streamlined to use state
        height:"100%",borderRadius:999,
        background:`linear-gradient(90deg,${color},${color}cc)`,
        transition:"width 1s cubic-bezier(.4,0,.2,1)",
        boxShadow:`0 0 10px ${color}55`}}/>
    </div>
  );
}; // Changed ) to }

export default ProgressBar;