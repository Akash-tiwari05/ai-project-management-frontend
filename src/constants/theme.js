// src/constants/theme.js

export const C = {
  bg:"#060A12", 
  surface:"#0B1220", 
  surfaceElevated:"#101929", 
  surfaceHigh:"#152035",
  border:"#182840", 
  borderLight:"#1E3254",
  accent:"#3B82F6", 
  accentLight:"#60A5FA",
  accentGlow:"rgba(59,130,246,0.18)",
  ai:"#8B5CF6", 
  aiLight:"#A78BFA", 
  aiGlow:"rgba(139,92,246,0.18)",
  success:"#10B981", 
  warning:"#F59E0B", 
  danger:"#EF4444",
  gold:"#EAB308", 
  goldLight:"#FDE047", 
  goldGlow:"rgba(234,179,8,0.2)",
  prime:"#EC4899", 
  primeLight:"#F472B6", 
  primeGlow:"rgba(236,72,153,0.2)",
  tp:"#F1F5F9", 
  ts:"#94A3B8", 
  tm:"#475569",
};

// ─── Plan Definitions ─────────────────────────────────────────────────────────
const PLANS = {
  free: {
    id:"free", name:"Free", price:0, period:"forever",
    color:C.accent, glow:C.accentGlow, icon:"◇",
    tagline:"Get started, no card needed",
    limits:{ projects:2, aiTokens:300, aiPeriod:"total", members:3 },
    features:[
      { icon:"◈", label:"Projects", value:"2 max" },
      { icon:"✦", label:"AI tokens", value:"300 total" },
      { icon:"◎", label:"Members / project", value:"3" },
      { icon:"✓", label:"Todo tasks", value:"Unlimited" },
      { icon:"◉", label:"Team chat", value:"Unlimited" },
      { icon:"⎇", label:"GitHub link", value:"✓" },
    ],
    cta:"Start Free", highlight:false,
  },
  pro: {
    id:"pro", name:"Pro", price:5, period:"month",
    color:C.gold, glow:C.goldGlow, icon:"◆",
    tagline:"Scale your professional work",
    badge:"Most Popular",
    limits:{ projects:7, aiTokens:5000, aiPeriod:"day", members:10 },
    features:[
      { icon:"◈", label:"Projects", value:"7 max" },
      { icon:"✦", label:"AI tokens", value:"5,000 / day" },
      { icon:"◎", label:"Members / project", value:"10" },
      { icon:"✓", label:"Todo tasks", value:"Unlimited" },
      { icon:"◉", label:"Team chat", value:"Unlimited" },
      { icon:"⎇", label:"GitHub link", value:"✓" },
      { icon:"★", label:"Priority support", value:"✓" },
      { icon:"⚡", label:"AI task suggestions", value:"✓" },
    ],
    cta:"Upgrade to Pro", highlight:true,
    razorpay:{ planId:"plan_pro_monthly", amount:500, currency:"INR" },
  },
  prime: {
    id:"prime", name:"Prime", price:15, period:"month",
    color:C.prime, glow:C.primeGlow, icon:"✦",
    tagline:"For teams building at scale",
    badge:"Best Value",
    limits:{ projects:30, aiTokens:20000, aiPeriod:"day", members:Infinity },
    features:[
      { icon:"◈", label:"Projects", value:"30 max" },
      { icon:"✦", label:"AI tokens", value:"20,000 / day" },
      { icon:"◎", label:"Members", value:"Unlimited" },
      { icon:"◈", label:"Shared AI quota", value:"All members" },
      { icon:"✓", label:"Todo tasks", value:"Unlimited" },
      { icon:"◉", label:"Team chat", value:"Unlimited" },
      { icon:"⎇", label:"GitHub link", value:"✓" },
      { icon:"★", label:"Priority support", value:"24/7" },
      { icon:"⚡", label:"AI task suggestions", value:"✓" },
      { icon:"⊟", label:"Analytics & reports", value:"✓" },
    ],
    cta:"Go Prime", highlight:false,
    razorpay:{ planId:"plan_prime_monthly", amount:1500, currency:"INR" },
  },
};

const COMPARE_ROWS = [
  { label:"Max projects",      free:"2",         pro:"7",           prime:"30" },
  { label:"AI tokens",          free:"300 total",  pro:"5,000/day",   prime:"20,000/day" },
  { label:"Members/project",    free:"3",          pro:"10",          prime:"Unlimited" },
  { label:"Shared AI quota",    free:"—",          pro:"—",           prime:"✓ All members" },
  { label:"Todo tasks",         free:"Unlimited",  pro:"Unlimited",   prime:"Unlimited" },
  { label:"Team chat",          free:"Unlimited",  pro:"Unlimited",   prime:"Unlimited" },
  { label:"GitHub integration", free:"✓",          pro:"✓",           prime:"✓" },
  { label:"AI task suggestions",free:"—",          pro:"✓",           prime:"✓" },
  { label:"Priority support",   free:"—",          pro:"Email",       prime:"24/7" },
  { label:"Analytics",          free:"—",          pro:"—",           prime:"✓ Full" },
  { label:"Custom AI context",  free:"—",          pro:"—",           prime:"✓" },
];

// ─── Seed Data ────────────────────────────────────────────────────────────────
const INIT_PROJECTS = [
  { id:1, name:"E-Commerce Redesign", description:"Full redesign of the shopping experience with modern UX", status:"active", progress:68, priority:"high", color:"#3B82F6", github_url:"https://github.com/org/ecom", due_date:"2026-07-15", team:["AK","SM","RJ","PL"], tasks:{total:24,done:16}, tags:["Design","Frontend"], skill_tags:["React","Figma","TypeScript"], todos:[{id:1,text:"Review checkout mockups",done:true,priority:"high",assignee:"AK"},{id:2,text:"Implement cart animation",done:false,priority:"medium",assignee:"SM"},{id:3,text:"Mobile responsiveness audit",done:false,priority:"high",assignee:"RJ"}], invites:[{id:1,email:"maya@co.com",role:"Developer",status:"pending",sent:"2h ago"}] },
  { id:2, name:"API Gateway v2", description:"Microservices gateway with rate limiting and OAuth2", status:"active", progress:42, priority:"high", color:"#8B5CF6", github_url:"https://github.com/org/gateway", due_date:"2026-08-01", team:["DM","AK","NR"], tasks:{total:31,done:13}, tags:["Backend","DevOps"], skill_tags:["Node.js","Docker","K8s"], todos:[{id:1,text:"Rate limiting middleware",done:true,priority:"high",assignee:"DM"},{id:2,text:"OAuth2 integration",done:false,priority:"high",assignee:"AK"}], invites:[] },
];

const INIT_TEAM = { 
  1:[{id:1,user:"AK",name:"Alex Kim",text:"Updated Figma mockups for checkout. Review?",time:"10:24 AM",avatar:"AK"},{id:2,user:"SM",name:"Sara M.",text:"Looks great! One note on cart summary.",time:"10:31 AM",avatar:"SM"}], 
  2:[{id:1,user:"DM",name:"Dave M.",text:"Rate limiting ready for review in PR #47.",time:"9:10 AM",avatar:"DM"}] 
};

const INIT_AI = { 
  1:[{id:1,role:"user",text:"What's the project status?",time:"10:00 AM"},{id:2,role:"ai",text:"**E-Commerce Redesign** is 68% complete.\n\n• 16/24 tasks done\n• Checkout mockups in review\n• Sprint review tomorrow 3 PM\n\n**Risk**: July 15 deadline has thin buffer.",time:"10:00 AM"}], 
  2:[{id:1,role:"user",text:"Summarize project risks.",time:"9:00 AM"},{id:2,role:"ai",text:"**API Gateway v2** risks:\n\n⚠️ **High**: 13/31 tasks done, Aug 1 deadline tight\n✅ **Low**: Rate limiting on track\n\n**Action**: Schedule a blocker session this week.",time:"9:00 AM"}] 
};

const PROJECT_COLORS = ["#3B82F6","#8B5CF6","#10B981","#F59E0B","#EF4444","#EC4899","#06B6D4","#F97316"];
const SKILL_SUGGESTIONS = ["React","Vue","TypeScript","JavaScript","Python","Node.js","Go","Docker","Kubernetes","AWS","PostgreSQL","MongoDB","Figma","React Native","Next.js","Firebase","GraphQL","REST","CI/CD","D3.js"];
const ROLES = ["Developer","Designer","QA Engineer","DevOps","Product Manager","Data Analyst","Tech Lead"];

// ─── Explicit Named Exports ──────────────────────────────────────────────────
// This block ensures all components can parse destructured named variables cleanly
export {
  PLANS,
  COMPARE_ROWS,
  INIT_PROJECTS,
  INIT_TEAM,
  INIT_AI,
  PROJECT_COLORS,
  SKILL_SUGGESTIONS,
  ROLES
};