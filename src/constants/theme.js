export const C = {
  bg: "#070B14",
  surface: "#0D1425",
  surfaceElevated: "#121C30",
  surfaceHigh: "#17243A",
  border: "#1B2D47",
  borderLight: "#243C5A",
  accent: "#3B82F6",
  accentLight: "#60A5FA",
  accentGlow: "rgba(59,130,246,0.18)",
  ai: "#8B5CF6",
  aiLight: "#A78BFA",
  aiGlow: "rgba(139,92,246,0.18)",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  pink: "#EC4899",
  cyan: "#06B6D4",
  tp: "#F1F5F9",
  ts: "#94A3B8",
  tm: "#475569",
};

export const SKILL_SUGGESTIONS = [
  "React","Vue","Angular","TypeScript","JavaScript","Python","Node.js","Go","Rust","Java",
  "Django","FastAPI","Docker","Kubernetes","AWS","GCP","Azure","PostgreSQL","MongoDB","Redis",
  "GraphQL","REST","Figma","Tailwind","Next.js","React Native","Expo","Firebase","Supabase",
  "D3.js","Three.js","TensorFlow","PyTorch","CI/CD","Git","WebSockets","Stripe","OAuth2","Jest","Cypress"
];

export const ROLES = ["Developer", "Designer", "QA Engineer", "DevOps", "Product Manager", "Data Analyst", "Tech Lead"];

export const PROJECT_COLORS = ["#3B82F6","#8B5CF6","#10B981","#F59E0B","#EF4444","#EC4899","#06B6D4","#F97316"];

export const INIT_PROJECTS = [
  {
    id: 1, name: "E-Commerce Redesign",
    description: "Full redesign of the main shopping experience with modern UX patterns",
    status: "active", progress: 68, priority: "high",
    dueDate: "2026-07-15", team: ["AK", "SM", "RJ", "PL"],
    tasks: { total: 24, done: 16 }, tags: ["Design", "Frontend", "UX"],
    color: "#3B82F6", github: "https://github.com/org/ecom-redesign",
    skillTags: ["React", "Figma", "TypeScript"],
    todos: [
      { id: 1, text: "Review checkout flow mockups", done: true, assignee: "AK", priority: "high" },
      { id: 2, text: "Implement cart animation", done: false, assignee: "SM", priority: "medium" },
      { id: 3, text: "Mobile responsiveness audit", done: false, assignee: "RJ", priority: "high" },
      { id: 4, text: "Write unit tests for cart logic", done: false, assignee: "PL", priority: "low" },
      { id: 5, text: "Performance audit with Lighthouse", done: true, assignee: "RJ", priority: "medium" },
    ],
    invites: [{ id: 1, email: "maya@company.com", role: "Developer", status: "pending", sent: "2h ago" }],
  },
  {
    id: 2, name: "API Gateway v2",
    description: "Microservices gateway with rate limiting and OAuth2 auth",
    status: "active", progress: 42, priority: "high",
    dueDate: "2026-08-01", team: ["DM", "AK", "NR"],
    tasks: { total: 31, done: 13 }, tags: ["Backend", "DevOps", "Security"],
    color: "#8B5CF6", github: "https://github.com/org/api-gateway",
    skillTags: ["Node.js", "Docker", "Kubernetes"],
    todos: [
      { id: 1, text: "Finish rate limiting middleware", done: true, assignee: "DM", priority: "high" },
      { id: 2, text: "OAuth2 integration", done: false, assignee: "AK", priority: "high" },
      { id: 3, text: "Load testing setup", done: false, assignee: "NR", priority: "medium" },
    ],
    invites: [],
  },
  {
    id: 3, name: "Mobile App MVP",
    description: "React Native app for iOS and Android platforms",
    status: "planning", progress: 15, priority: "medium",
    dueDate: "2026-09-20", team: ["SM", "LK", "RJ"],
    tasks: { total: 40, done: 6 }, tags: ["Mobile", "React Native"],
    color: "#10B981", github: "",
    skillTags: ["React Native", "Expo", "Firebase"],
    todos: [
      { id: 1, text: "Define navigation structure", done: false, assignee: "SM", priority: "high" },
      { id: true, text: "Set up Expo project", done: true, assignee: "LK", priority: "high" },
      { id: 3, text: "Design onboarding screens", done: false, assignee: "RJ", priority: "medium" },
    ],
    invites: [
      { id: 1, email: "carlos@dev.io", role: "Designer", status: "accepted", sent: "1d ago" },
      { id: 2, email: "yuki@mobile.dev", role: "Developer", status: "pending", sent: "3h ago" },
    ],
  },
  {
    id: 4, name: "Analytics Dashboard",
    description: "Real-time business intelligence and reporting platform",
    status: "review", progress: 89, priority: "low",
    dueDate: "2026-06-30", team: ["PL", "DM"],
    tasks: { total: 18, done: 16 }, tags: ["Data", "Charts", "BI"],
    color: "#F59E0B", github: "https://github.com/org/analytics",
    skillTags: ["D3.js", "Python", "PostgreSQL"],
    todos: [
      { id: 1, text: "Final QA pass", done: true, assignee: "DM", priority: "high" },
      { id: 2, text: "Deploy to staging", done: false, assignee: "PL", priority: "high" },
    ],
    invites: [],
  },
];

export const INIT_TEAM_MSGS = {
  1: [
    { id: 1, user: "AK", name: "Alex Kim", text: "Updated the Figma mockups for checkout. Can everyone review?", time: "10:24 AM", avatar: "AK" },
    { id: 2, user: "SM", name: "Sara M.", text: "Looks great! One suggestion on the cart summary section.", time: "10:31 AM", avatar: "SM" },
    { id: 3, user: "RJ", name: "Raj J.", text: "Payment integration is done. Testing now.", time: "11:05 AM", avatar: "RJ" },
    { id: 4, user: "PL", name: "Priya L.", text: "Great work team! Sprint review tomorrow at 3 PM.", time: "11:42 AM", avatar: "PL" },
  ],
  2: [
    { id: 1, user: "DM", name: "Dave M.", text: "Rate limiting logic is ready for review in PR #47.", time: "9:10 AM", avatar: "DM" },
    { id: 2, user: "AK", name: "Alex Kim", text: "Will review this afternoon.", time: "9:25 AM", avatar: "AK" },
    { id: 3, user: "NR", name: "Nina R.", text: "DevOps pipeline updated to include load testing.", time: "10:00 AM", avatar: "NR" },
  ],
  3: [
    { id: 1, user: "SM", name: "Sara M.", text: "Wireframes are ready. Sharing Figma link.", time: "Yesterday", avatar: "SM" },
    { id: 2, user: "LK", name: "Lena K.", text: "Let's discuss push notifications next.", time: "Yesterday", avatar: "LK" },
  ],
  4: [
    { id: 1, user: "PL", name: "Priya L.", text: "All charts are responsive. Performance improved 40%.", time: "2h ago", avatar: "PL" },
    { id: 2, user: "DM", name: "Dave M.", text: "Final QA pass done. Ready for production.", time: "1h ago", avatar: "DM" },
  ],
};

export const INIT_AI_MSGS = {
  1: [
    { id: 1, role: "user", text: "What's the current project status?", time: "10:00 AM" },
    { id: 2, role: "ai", text: "**E-Commerce Redesign** is 68% complete with 16/24 tasks done.\n\n• Checkout flow mockups in review\n• Payment integration being tested\n• Sprint review tomorrow at 3 PM\n\n**Risk**: July 15 due date — on track but buffer is thin.", time: "10:00 AM" },
  ],
  2: [
    { id: 1, role: "user", text: "Summarize the project risks.", time: "9:00 AM" },
    { id: 2, role: "ai", text: "**API Gateway v2** risks (42% complete):\n\n⚠️ **High**: 13/31 tasks done, Aug 1 deadline is tight\n⚠️ **Medium**: Auth middleware not started\n✅ **Low**: Rate limiting & DevOps on track\n\n**Action**: Schedule blocker-removal session with Alex & Dave.", time: "9:00 AM" },
  ],
  3: [
    { id: 1, role: "user", text: "Best tech stack for this mobile app?", time: "Yesterday" },
    { id: 2, role: "ai", text: "For your **Mobile App MVP**:\n\n• **Framework**: React Native + Expo\n• **State**: Zustand\n• **Navigation**: Expo Router v3\n• **Backend**: React Query + your existing API\n\nMaximizes reuse from your web codebase.", time: "Yesterday" },
  ],
  4: [
    { id: 1, role: "user", text: "Is the Analytics Dashboard ready to ship?", time: "1h ago" },
    { id: 2, role: "ai", text: "**Yes!** Dashboard is 89% complete. QA cleared.\n\n✅ Charts responsive\n✅ 40% perf improvement\n✅ Final QA done\n\n2 minor tasks remain. **Deploy tomorrow or Wednesday.**", time: "1h ago" },
  ],
};