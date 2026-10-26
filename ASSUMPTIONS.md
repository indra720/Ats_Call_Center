# ATS Call Center — Architecture & Assumptions Log

## 1. Project Initialization & Stack Choices
- **React 18 + Vite + TypeScript (Strict)**: Installed and configured with zero TanStack libraries.
- **Routing**: Plain React Router v6 using `<BrowserRouter>`, `<Routes>`, and `<Route>` with `<ProtectedRoute>` guards.
- **Styling**: Tailwind CSS with custom design system tokens matching DOVIx / ATS Call Center PDF mockups:
  - Sidebar: Deep Navy `#0B1530` -> `#0F1F4A`
  - Page Background: `#F3F6FC`
  - Primary Brand: Blue `#2563EB`
  - Cards: White, radius `16px`, border `#E6EBF5`, soft shadows
  - Typography: Inter font, 4px grid, touch targets >= 44x44px.

## 2. Role & Permission System (RBAC)
- All permissions strictly follow `module:action` syntax (e.g., `leads:view`, `calls:make`, `reports:export`).
- Roles defined:
  - Super Admin & Admin: Unrestricted access
  - Team Leader: Team scope leads, recordings, performance, attendance
  - Agent: Own scope leads, outbound calling, interactive scripts, messaging
  - Supervisor: Call monitoring, QA, reports
  - Quality Analyst: Recordings, call quality scorecard
  - Data Analyst: Reports builder, scheduled exports
  - HR Manager: Employee roster, shifts, attendance
  - Viewer: Read-only dashboards and reports
  - Custom Role: User-defined with runtime permission matrix editing.
- Persisted in `localStorage` and reactive via Zustand (`useAuthStore`, `usePermissionStore`).
- Floating **Dev Role Switcher** widget enabled for instant demo persona testing.

## 3. Mobile Experience
- Top bar: iOS-style blurred glass with branding, search and notification triggers.
- Bottom bar: 5 tabs with raised circular gradient FAB center (`Dialer`).
- More menu: Full-screen slide-up sheet with profile details and permission-filtered sections.
- Tables: Custom `<ResponsiveDataView>` with segmented **Cards | Table** toggle. No font under 12px; horizontal containment with sticky headers.
- Modals: Bottom-sheet drawers on mobile, centered dialogs on desktop per modern web guidance.

## 4. Live Call & AI Assistant
- Live Call floating widget with ticking timer, mute, hold, record controls.
- Expands to full-screen Copilot with live transcript, AI response recommendations, and disposition note logger.
