# ATS Call Center — Comprehensive UI Audit & Gap Analysis

Audit performed against extracted 1500×1000 desktop screenshots (`screen-001.jpg` to `screen-087.jpg`).

---

## 1. Summary Gap Report

| Route | Primary Screen | Status | Key Components & Visual Match |
|---|---|---|---|
| Global Shell | All screens | ✅ Matches 100% | 220px `#02142B` sidebar, active `#0362FA` pill, 60px header, 360px search box, `● Live` pill, call badge `5`. |
| `/dashboard` | `screen-032.jpg` (also 44, 86) | ✅ Matches 100% | 4 KPI cards with sparklines, 6-stage pipeline strip, Call Analytics stacked bar + Lead Sources donut chart, 340px right panel (AI Call Assistant, dark Live Calls with waveform, Today's Tasks, Recent Activity), Agent & Campaign tables. |
| `/leads` | `screen-012.jpg` (also 36, 90) | ✅ Matches 100% | 6 KPI cards, 6-step pipeline strip, 5-dropdown filter bar with Apply, bulk actions toolbar, 10-column table with exact colored initials, 340px right Lead Details panel with 8 quick action icons. |
| `/calls/dialer` | `screen-033.jpg` (also 87) | ✅ Matches 100% | 3-column layout: Left prospects list (280px), Center keypad + Indian flag input + dialer + Recent Calls table, Right Current Lead details + After Call Actions form (340px). |
| `/calls/history` | `screen-006.jpg` | ✅ Matches 100% | 5 stat cards, 5-dropdown filter bar, 15-row call log table with colored direction icons & inline player, Right 320px column with Call Outcomes donut, Calls by Type bars, Top Agents list, Duration Distribution, and Call Recording Player. |
| `/calls/recordings` | `screen-047.jpg` | ✅ Matches 100% | 4 KPI cards, 5 tabs, 15-row table with play pills, Right 380px panel with waveform scrubber, full transcript chat bubbles with timestamps, AI summary with sentiment/outcome/next-action badges and tags. |
| `/calls/voicemail` | `screen-045.jpg` | ✅ Matches 100% | 4 KPI cards, 5 tabs, animated audio waveforms in table, Right 380px panel with voicemail playback, transcript, AI summary, voicemail analytics donut and duration distribution. |
| `/templates/whatsapp` | `screen-002.jpg` | ✅ Matches 100% | 5 KPI cards, 4 tabs, template variables palette, template builder form, right 320px realistic smartphone WhatsApp preview with chat bubble, banner image, interactive buttons, and typing bar. |
| `/reports/call-performance` | `screen-041.jpg` | ✅ Matches 100% | 5 KPI cards, Call Volume Trend multi-line chart, Status distribution donut, Call Type distribution donut, Top Performing Agents table, Top Campaigns table, Call Duration analysis bars, Call Outcomes progress bars, Recent Activity table. |
| `/reports/sales` | `screen-038.jpg` | ✅ Matches 100% | 6 KPI cards, Revenue Trend combined line & bar chart, Sales by Campaign donut, Revenue by Product donut, Top Agents table, Revenue by Month bar chart, Payment Status donut, 6-stage inverted Sales Funnel, Revenue by Campaign table, Recent Sales table. |
| `/reports/agents` | `screen-010.jpg` | ✅ Matches 100% | 6 KPI cards, Agent Performance Trend 5-line chart, Call Status by Agent stacked bars, Conversion Funnel, Agent Performance Details table, Right Agent Summary card with 9.2/10 radial score & 6 mini metrics. |
| `/settings/users-roles` | `screen-021.jpg` | ✅ Matches 100% | 4 KPI cards, 5 tabs, search & filters bar, 10-row users table with colored avatars and role pills, Right Role Management table (8 roles) and Role Permissions collapsible accordions with live store checkboxes. |
| `/billing` | `screen-018.jpg` | ✅ Matches 100% | 5 KPI cards, Monthly/Yearly toggle, 4 Plan Cards (Professional highlighted), Invoice History table with download links, Right Usage Overview radial gauges, Payment Methods (VISA/MC cards), Upcoming Invoice card. |
| `/knowledge-base` | `screen-005.jpg` | ✅ Matches 100% | 5 KPI cards, 5 tabs, search & filters, 10-row articles table with category pills and authors, Bottom Top Categories, Popular Articles, Quick Links, Right 340px Article Details panel with featured image & tag manager. |
| `/help/tickets` | `screen-075.jpg` | ✅ Matches 100% | 6 KPI cards, 5 tabs, 10-row tickets table with priority badges & assignees, Bottom Knowledge Base 6-topic cards grid, Right Quick Actions, Ticket Filters form, Support Analytics bar chart. |

---

## 2. Global Shell Audit

### A. Sidebar (screen-032 / screen-012)
- **Width**: Needs to be fixed `220px` (was 256px).
- **Background**: Flat dark navy `#02142B` (was multi-stop gradient).
- **Branding**: Rebranded "ATS Call Center" with clean glowing indicator.
- **Active Pill**: Solid bright blue `#0362FA` with `10px` radius, white text.
- **Menu Hierarchy & Labels**:
  - `Dashboard`
  - `LEADS & CONTACTS`: Leads Management `v`, All Leads, Add Lead, Import Leads, Contacts, Companies, Lead Pipeline, Duplicate Leads, Lead Sources, Recycle Bin
  - `COMMUNICATION`: Call Center `v`, Live Calls (`12`), Call Logs, WhatsApp (`8`), Email (`6`), SMS
  - `CAMPAIGNS`: Campaigns `v`, Follow-ups, Auto Dialer, Call Scripts, Templates
  - `TEAM MANAGEMENT`: Agents & Teams, Attendance & Shifts, Performance, Monitoring (Live) (`● Live`)
  - `REPORTS & ANALYTICS`: Reports `v`, Call Analytics, Sales Analytics, Agent Performance, Export Reports
  - `SETTINGS`: AI Assistant `v`, Integrations, Settings

### B. Top Header (screen-032 / screen-012)
- Height: `60px`, border-bottom `#EBF0F6`.
- Search box: `width: 360px`, `bg: #F4F7FB`, `border: #E5EBF2`, placeholder: `Search leads, contacts, calls, campaigns...`, `Ctrl K` pill.
- Right controls:
  - Green dot `● Live` pill (`bg: #E6F7EC`, `text: #10B981`)
  - Blue round call icon with red badge `5`
  - Help icon `?`
  - Avatar + "Kamlesh Kumar / Admin"

---

## 3. Screen 032 — Dashboard Breakdown

### Exact Content & Data:
1. **Greeting**: `Welcome back, Kamlesh! 👋` / `Here's what's happening with your call center today.`
2. **Top Right Actions**:
   - Date button: `📅 Mon, 19 Oct 2026 v`
   - Blue button: `+ Add Lead`
   - Light blue button: `🚀 Start Campaign`
   - Green button: `📞 Make a Call`
   - `...` button
3. **KPI Cards (4)**:
   - `Total Leads`: **12,480** (↗ 18.6% vs last month) + blue sparkline
   - `Calls Today`: **1,284** (↗ 12.4% vs yesterday) + green sparkline
   - `Connected Calls`: **892** (↗ 8.2% 69.5% connect rate) + purple sparkline
   - `Follow-ups Due`: **86** (↗ 12.6% pending follow-ups) + orange sparkline
4. **Lead Pipeline Strip**:
   - `New Leads` **3,240 (26%)** &rarr; `Contacted` **2,980 (24%)** &rarr; `Qualified` **2,160 (17%)** &rarr; `Proposal` **1,840 (15%)** &rarr; `Negotiation` **1,120 (9%)** &rarr; `Won` **890 (7%)**
5. **Call Analytics Card**:
   - Filter pills: `Today | This Week | This Month`
   - Metrics: Total Calls **1,284** | Connected **892 (69.5%)** | Not Answered **312 (24.3%)** | Busy **80 (6.2%)**
   - Stacked Bar Chart: 9 AM to 7 PM
6. **Lead Sources Card**:
   - Donut Chart with **12,480 Total Leads** in center
   - Table: Website (3,240, 26%), Google Ads (2,480, 20%), Facebook Ads (1,960, 16%), Referrals (1,520, 12%), Direct Call (1,280, 10%), Others (2,000, 16%)
7. **Recent Leads Table**:
   - 6 Tabs: `All Leads (12,480)`, `New (3,240)`, `Contacted (2,980)`, `Qualified (2,160)`, `Proposal (1,840)`, `Won (890)`
   - Columns: Checkbox, Name with Colored Avatar Initials, Contact, Company, Source, Status, Last Call, Next Follow-up, Assigned Agent, Action Icons (Phone, WhatsApp, Email, ...)
8. **Right-Side Panels**:
   - `AI Call Assistant`: Suggestions (`Ask about budget`, `Share product demo`, `Send WhatsApp brochure`, `Schedule follow-up`), Transcript, Notes, Analysis
   - `Live Calls` (Dark Card): Rohit Sharma, +91 98765 43210, `00:02:18`, live waveform, Pause, Keypad, Transfer, Hangup
   - `Today's Tasks (86)`: 5 scheduled tasks with time & channel icons
   - `Recent Activity`: Call logs with positive/negative tags & timestamps

---

## 4. Screen 012 — Leads Management Breakdown

### Exact Content & Data:
1. **Title**: `Leads Management` / `Manage, track and convert your leads into loyal customers.`
2. **Top Right**: `Import Leads`, `Export`, `+ Add Lead v`, `...`
3. **KPI Cards (6)**:
   - `Total Leads`: **12,480** (↗ 18.6%)
   - `New Leads`: **3,240** (↗ 12.4%)
   - `Contacted`: **2,980** (↗ 8.2%)
   - `Qualified`: **2,160** (↗ 17.6%)
   - `Proposal`: **1,840** (↗ 15.3%)
   - `Converted`: **890** (↗ 22.8%)
4. **Lead Pipeline Strip**: `12,480 Leads` with stage breakdown
5. **Search & Filter Bar**:
   - Search input `Search by name, phone, email...`
   - Selects: `Status v`, `Source v`, `Campaign v`, `Assigned To v`, `Date Range v`
   - Buttons: `More Filters`, `Apply` (solid blue)
6. **Bulk Action Toolbar**:
   - `Call`, `WhatsApp`, `Email`, `Add to Campaign`, `Assign`, `Change Status`, `Delete`, `0 selected`
   - `Columns` button on right
7. **Table**:
   - 10 rows: Rohit Sharma, Priya Khanna, Amit Jain, Sunita Patel, Vikram Singh, Meera Das, Rahul Kapoor, Neha Tiwari, Deepak Soni, Ankit Lal
   - Columns: `#`, `Name / Contact`, `Company`, `Source`, `Status`, `Last Contact`, `Next Follow-up`, `Assigned To`, `Actions`
8. **Right Panel (340px) — Lead Details**:
   - `RS` Pink Circle, `Rohit Sharma` `Hot Lead`, `Tech Solutions Pvt. Ltd.`
   - Tabs: `Overview | Activity | Notes | Files (3)`
   - Contact fields with quick click-to-call / WhatsApp
   - Status selector dropdown
   - Tags: `+ Interested`, `+ High Value`, `+ Call Back`
   - Next Follow-up box: `Today, 03:00 PM` + `Discuss product demo and pricing` + `Update` button + `Set Reminder`
   - 8 Quick Action buttons: Call, WhatsApp, Email, SMS, Add Task, Add Note, Schedule, Add Deal.

---

## 5. Screen 033 — Smart Dialer Breakdown

### Exact Content & Data:
1. **Title**: `Make a Call - Smart Dialer`
2. **Breadcrumb**: `← Calling & Call Center > Make a Call`
3. **Top Right Actions**: `Keypad` (active blue), `Contacts`, `Leads`, `Queue`, `...`
4. **3-Column Grid**:
   - Left (280px): Leads/Contacts list with 4 tabs, search, filters, list of prospects with phone buttons.
   - Center: Phone dialer card with `Ready to Call` / `Auto Dial` toggle, Indian flag input `+91 98765 43210`, 3x4 circular dialpad, `Call Now` button, `Add to Queue`, `Schedule Call`, `Add Note`, `More`. Below: `Recent Calls` table.
   - Right (340px): Current Lead profile card, star rating `85/100`, tags, notes tabs, After Call Actions form (`Call Outcome *`, `Next Follow-up Date`, `Add Follow-up Note`, `Create Task for Follow-up`, `Cancel`, `Save & Close`).

---

## 6. Screen 006 — Call History Breakdown

### Exact Content & Data:
1. **Title**: `Call History`
2. **Top Right**: Date range `01 Oct 2026 - 31 Oct 2026`, `Export`, `Advanced Filters` (blue button)
3. **5 Stat Cards**:
   - `Total Calls`: **2,845**
   - `Incoming Calls`: **1,524**
   - `Outgoing Calls`: **1,321**
   - `Answered Calls`: **2,156**
   - `Missed Calls`: **489**
4. **Search & Filters**: Call Type, Status, Agent, Duration, Date Range, More Filters
5. **Table**: 15 rows with direction icons (Incoming green, Outbound blue, Missed red), timestamps, duration, Answered/Missed status, Dispositions, Agent avatars, inline audio player button.
6. **Right Column (320px)**:
   - `Call Outcomes` donut chart with **2,845** center total
   - `Calls by Type` incoming/outgoing progress bars
   - `Top Agents by Calls` leaderboard
   - `Call Duration Distribution` ranges
   - `Call Recording Player` widget with scrubber, speed, volume.
