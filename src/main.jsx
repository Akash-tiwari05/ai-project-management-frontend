// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import DashboardView from './components/shared/DashboardView.jsx'
import BillingView from './components/features/modal/BillingView.jsx'

// Define your URL paths here
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Your shell layout (Sidebar, Topbar)
    children: [
      {
        path: "dashboard",
        element: <DashboardView />
      },
      {
        path: "billing",
        element: <BillingView />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)