# 🤖 AI Management System Frontend

A modern AI-powered Project Management System frontend built using React. The application enables teams to manage projects, track tasks, collaborate with members, and interact with AI-powered features through a clean and scalable user interface.

---

## 🚀 Features

### 📊 Dashboard

* Project overview and analytics
* Progress tracking
* Team activity monitoring
* Quick access to projects

### 📁 Project Management

* Create new projects
* Manage project details
* Track project progress
* Organize project workflows

### ✅ Task Management

* Create and manage todos
* Track completion status
* Monitor project progress

### 👥 Team Collaboration

* Invite team members
* Manage project participants
* Collaborative workspace

### 💬 AI Chat Integration

* AI-powered chat panel
* Smart project assistance
* Interactive communication system

### 🎨 Modern User Interface

* Responsive design
* Smooth animations
* Reusable components
* Consistent theme management

---

## 🛠️ Tech Stack

* React.js
* JavaScript (ES6+)
* CSS3
* Custom React Hooks
* Component-Based Architecture

---

## 📂 Project Structure

```text
src/
├── constants/
│   └── theme.js             # Color palette & configurations
│
├── components/
│   ├── ui/
│   │   ├── Avatar.jsx
│   │   ├── Badge.jsx
│   │   ├── ProgressBar.jsx
│   │   └── StatusDot.jsx
│   │
│   ├── shared/
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   └── AICursor.jsx
│   │
│   └── features/
│       ├── project/
│       │   ├── TodoSection.jsx
│       │   └── InviteSection.jsx
│       │
│       ├── chat/
│       │   ├── ChatPanel.jsx
│       │   └── ChatToggle.jsx
│       │
│       └── modal/
│           └── NewProjectModal.jsx
│
├── hooks/
│   └── useProjectSystem.js
│
├── views/
│   ├── DashboardView.jsx
│   └── ProjectView.jsx
│
├── App.css
└── App.jsx
```

---

## 🏗️ Architecture

The application follows a scalable and maintainable architecture with clear separation of concerns.

### Constants

Stores theme configuration and reusable constants.

### UI Components

Reusable atomic components such as:

* Avatar
* Badge
* ProgressBar
* StatusDot

### Shared Components

Application-wide layout components:

* Sidebar
* Topbar
* AICursor

### Feature Components

#### Project Module

* Todo Management
* Team Invitations

#### Chat Module

* AI Chat Interface
* Chat Controls

#### Modal Module

* New Project Creation

### Custom Hooks

`useProjectSystem.js`

Responsible for:

* Project state management
* Task handling
* Team collaboration logic
* Application orchestration

### Views

#### DashboardView

Displays project summaries and analytics.

#### ProjectView

Handles project-specific operations and management.

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Akash-tiwari05/ai-project-management-frontend.git
```

### Navigate to the Project

```bash
cd ai-management-system-frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## 🎯 Design Principles

### Single Responsibility Principle (SRP)

Every component has one clearly defined responsibility.

### Reusability

UI elements are designed for reuse across multiple features.

### Scalability

Feature-based folder structure allows easy future expansion.

### Maintainability

Business logic, UI components, and views remain independent and easy to manage.

---

## 🔮 Future Enhancements

* Real-time collaboration
* AI task recommendations
* Project analytics dashboard
* Role-based access control
* Notifications system
* File sharing support
* Team performance insights

---

## 👨‍💻 Author

### Akash Tiwari

Recent Computer Science Graduate | Java Full Stack Developer | AI Enthusiast

**Skills**

* Java
* Spring Boot
* React.js
* JavaScript
* SQL
* Docker
* Microservices
* Generative AI

---

⭐ If you like this project, don't forget to give it a star on GitHub.
