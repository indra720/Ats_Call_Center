import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { AppLayout } from './AppLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

// Core Pages
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { ForbiddenPage } from '@/features/auth/pages/ForbiddenPage';
import { NotFoundPage } from '@/features/auth/pages/NotFoundPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { LeadsPage } from '@/features/leads/pages/LeadsPage';
import { ContactsPage } from '@/features/contacts/pages/ContactsPage';
import { CompaniesPage } from '@/features/leads/pages/CompaniesPage';
import { LeadPipelinePage } from '@/features/leads/pages/LeadPipelinePage';
import { DuplicateLeadsPage } from '@/features/leads/pages/DuplicateLeadsPage';
import { LeadSourcesPage } from '@/features/leads/pages/LeadSourcesPage';
import { RecycleBinPage } from '@/features/leads/pages/RecycleBinPage';

// Calling Pages
import { CallDashboardPage } from '@/features/calls/pages/CallDashboardPage';
import { DialerPage } from '@/features/calls/pages/DialerPage';
import { CallQueuePage } from '@/features/calls/pages/CallQueuePage';
import { CallHistoryPage } from '@/features/calls/pages/CallHistoryPage';
import { CallRecordingsPage } from '@/features/calls/pages/CallRecordingsPage';
import { VoicemailPage } from '@/features/calls/pages/VoicemailPage';
import { CallScriptsPage } from '@/features/calls/pages/CallScriptsPage';

// Communication & Campaigns
import { ConversationsPage } from '@/features/conversations/pages/ConversationsPage';
import { CampaignsPage } from '@/features/campaigns/pages/CampaignsPage';
import { FollowUpsPage } from '@/features/campaigns/pages/FollowUpsPage';

// Team Pages
import { TeamAgentsPage } from '@/features/team/pages/TeamAgentsPage';
import { AttendanceShiftsPage } from '@/features/team/pages/AttendanceShiftsPage';

// AI & Automation
import { AIAssistantPage } from '@/features/ai/pages/AIAssistantPage';
import { AutomationWorkflowsPage } from '@/features/automation/pages/AutomationWorkflowsPage';

// Templates & Reports
import { WhatsAppTemplatesPage } from '@/features/templates/pages/WhatsAppTemplatesPage';
import { UsersRolesPage } from '@/features/settings/pages/UsersRolesPage';
import { CallPerformanceReportPage } from '@/features/reports/pages/CallPerformanceReportPage';
import { SalesReportPage } from '@/features/reports/pages/SalesReportPage';
import { AgentPerformanceReportPage } from '@/features/reports/pages/AgentPerformanceReportPage';
import { BillingPage } from '@/features/billing/pages/BillingPage';
import { KnowledgeBasePage } from '@/features/knowledge/pages/KnowledgeBasePage';
import { SupportTicketsPage } from '@/features/help/pages/SupportTicketsPage';

// Archetype helper for reference screen models
import { ArchetypePage } from '@/components/common/ArchetypePage';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Layout (Public Routes) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Standalone Error Routes */}
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/404" element={<NotFoundPage />} />

        {/* Main App Layout (Protected Plain Routes) */}
        <Route element={<AppLayout />}>
          {/* Default Route -> Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Core Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute permission="dashboard:view">
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 1. Leads & Contacts */}
          <Route
            path="/leads"
            element={
              <ProtectedRoute permission="leads:view">
                <LeadsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/new"
            element={
              <ProtectedRoute permission="leads:create">
                <LeadsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/import"
            element={
              <ProtectedRoute permission="leads:import">
                <LeadsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute permission="contacts:view">
                <ContactsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companies"
            element={
              <ProtectedRoute permission="companies:view">
                <CompaniesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/pipeline"
            element={
              <ProtectedRoute permission="leads:view">
                <LeadPipelinePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/duplicates"
            element={
              <ProtectedRoute permission="leads:merge">
                <DuplicateLeadsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/sources"
            element={
              <ProtectedRoute permission="leads:view">
                <LeadSourcesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/recycle-bin"
            element={
              <ProtectedRoute permission="leads:restore">
                <RecycleBinPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/:id"
            element={
              <ProtectedRoute permission="leads:view">
                <ArchetypePage
                  title="Lead Profile & Activity History"
                  subtitle="Detailed lead overview, call records, touchpoints and timeline"
                  screenNumbers="76"
                  moduleName="LEADS & CONTACTS"
                />
              </ProtectedRoute>
            }
          />

          {/* 2. Calling & Call Center */}
          <Route
            path="/calls/dashboard"
            element={
              <ProtectedRoute permission="calls:view_history">
                <CallDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls/dialer"
            element={
              <ProtectedRoute permission="calls:make">
                <DialerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls/queue"
            element={
              <ProtectedRoute permission="calls:manage_queue">
                <CallQueuePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls/history"
            element={
              <ProtectedRoute permission="calls:view_history">
                <CallHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls/recordings"
            element={
              <ProtectedRoute permission="calls:listen_recordings">
                <CallRecordingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls/voicemail"
            element={
              <ProtectedRoute permission="voicemail:view">
                <VoicemailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls/missed"
            element={
              <ProtectedRoute permission="calls:view_history">
                <CallHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls/scripts"
            element={
              <ProtectedRoute permission="calls:use_scripts">
                <CallScriptsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls/ivr-numbers"
            element={
              <ProtectedRoute permission="calls:manage_ivr">
                <ArchetypePage
                  title="IVR Menus & Phone Numbers"
                  subtitle="DID phone numbers, routing trees, and business hours setup"
                  screenNumbers="54"
                  moduleName="CALLING & CALL CENTER"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls/settings"
            element={
              <ProtectedRoute permission="calls:manage_settings">
                <ArchetypePage
                  title="Call Center Configuration"
                  subtitle="WebRTC codec settings, maximum ring duration, queue limits"
                  screenNumbers="37, 91"
                  moduleName="CALLING & CALL CENTER"
                />
              </ProtectedRoute>
            }
          />

          {/* 3. Communication & Campaigns */}
          <Route
            path="/conversations"
            element={
              <ProtectedRoute permission="communication:whatsapp_send">
                <ConversationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communication/whatsapp"
            element={
              <ProtectedRoute permission="communication:whatsapp_send">
                <ConversationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communication/email"
            element={
              <ProtectedRoute permission="communication:email_send">
                <ConversationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communication/sms"
            element={
              <ProtectedRoute permission="communication:sms_send">
                <ConversationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns"
            element={
              <ProtectedRoute permission="campaigns:view">
                <CampaignsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/follow-ups"
            element={
              <ProtectedRoute permission="followups:view">
                <FollowUpsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/followups"
            element={
              <ProtectedRoute permission="followups:view">
                <FollowUpsPage />
              </ProtectedRoute>
            }
          />

          {/* 4. Team Management */}
          <Route
            path="/team/agents"
            element={
              <ProtectedRoute permission="team:view_agents">
                <TeamAgentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute permission="team:view_agents">
                <TeamAgentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team/attendance"
            element={
              <ProtectedRoute permission="team:view_attendance">
                <AttendanceShiftsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team/performance"
            element={
              <ProtectedRoute permission="team:view_performance">
                <AgentPerformanceReportPage />
              </ProtectedRoute>
            }
          />

          {/* 5. AI & Automation */}
          <Route
            path="/ai-assistant"
            element={
              <ProtectedRoute permission="dashboard:view">
                <AIAssistantPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/ai"
            element={
              <ProtectedRoute permission="dashboard:view">
                <AIAssistantPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/automation"
            element={
              <ProtectedRoute permission="campaigns:edit">
                <AutomationWorkflowsPage />
              </ProtectedRoute>
            }
          />

          {/* 6. Reports & Analytics */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute permission="reports:view">
                <ArchetypePage
                  title="Call Analytics Overview"
                  subtitle="High-level operational performance and customer conversion metrics"
                  screenNumbers="13, 29, 83"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/call-performance"
            element={
              <ProtectedRoute permission="reports:view">
                <CallPerformanceReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/sales"
            element={
              <ProtectedRoute permission="reports:view">
                <SalesReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/agents"
            element={
              <ProtectedRoute permission="reports:view">
                <AgentPerformanceReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/teams"
            element={
              <ProtectedRoute permission="reports:view">
                <ArchetypePage
                  title="Team & Shift Performance"
                  subtitle="Comparative analytics across North, West, South and East zones"
                  screenNumbers="28, 82"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/campaigns"
            element={
              <ProtectedRoute permission="reports:view">
                <ArchetypePage
                  title="Campaigns Analytics"
                  subtitle="Outbound auto-dialer campaign reach and conversion rates"
                  screenNumbers="69, 92"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/customers"
            element={
              <ProtectedRoute permission="reports:view">
                <ArchetypePage
                  title="Customer Accounts Report"
                  subtitle="Account retention, NPS feedback and repeat engagement"
                  screenNumbers="23, 60"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/lead-sources"
            element={
              <ProtectedRoute permission="reports:view">
                <LeadSourcesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/conversion"
            element={
              <ProtectedRoute permission="reports:view">
                <ArchetypePage
                  title="Customer Conversion Report"
                  subtitle="Stage-by-stage drop-off analysis from Lead to Customer"
                  screenNumbers="26, 66, 80"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/lead-aging"
            element={
              <ProtectedRoute permission="reports:view">
                <ArchetypePage
                  title="Lead Aging & Stalled Deals"
                  subtitle="Time spent in pipeline stages without touchpoints"
                  screenNumbers="08"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/lead-nurturing"
            element={
              <ProtectedRoute permission="reports:view">
                <ArchetypePage
                  title="Lead Nurturing & Follow-up Report"
                  subtitle="Automated email and WhatsApp drip response metrics"
                  screenNumbers="30, 84"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/call-quality"
            element={
              <ProtectedRoute permission="reports:view">
                <ArchetypePage
                  title="Call Quality & QA Scorecard"
                  subtitle="Compliance scoring, script adherence and sentiment evaluations"
                  screenNumbers="57"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/builder"
            element={
              <ProtectedRoute permission="reports:create">
                <ArchetypePage
                  title="Custom Report Builder"
                  subtitle="Drag and drop metrics, custom filters and chart visualizer"
                  screenNumbers="11, 19, 48"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/custom"
            element={
              <ProtectedRoute permission="reports:create">
                <ArchetypePage
                  title="Custom Reports"
                  subtitle="User-created custom metrics and report views"
                  screenNumbers="11, 19, 48"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/templates"
            element={
              <ProtectedRoute permission="reports:manage_templates">
                <ArchetypePage
                  title="Report Templates Library"
                  subtitle="Pre-configured reporting models and dashboard views"
                  screenNumbers="20, 72"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/scheduled"
            element={
              <ProtectedRoute permission="reports:schedule">
                <ArchetypePage
                  title="Automated Scheduled Reports"
                  subtitle="Daily/weekly scheduled PDF exports delivered via email"
                  screenNumbers="34, 43, 56, 88"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/scheduling"
            element={
              <ProtectedRoute permission="reports:schedule">
                <ArchetypePage
                  title="Automated Scheduled Reports"
                  subtitle="Daily/weekly scheduled PDF exports delivered via email"
                  screenNumbers="34, 43, 56, 88"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/export-center"
            element={
              <ProtectedRoute permission="reports:export">
                <ArchetypePage
                  title="Export & Download Center"
                  subtitle="Historical data exports, CSVs and generated reports"
                  screenNumbers="65"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/delivery-history"
            element={
              <ProtectedRoute permission="reports:view_logs">
                <ArchetypePage
                  title="Report Delivery Logs"
                  subtitle="Email and webhook dispatch timestamps and status"
                  screenNumbers="79"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/settings"
            element={
              <ProtectedRoute permission="reports:manage_settings">
                <ArchetypePage
                  title="Analytics & Report Settings"
                  subtitle="Default metrics, fiscal year dates and retention"
                  screenNumbers="27, 81"
                  moduleName="REPORTS & ANALYTICS"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/permissions"
            element={
              <ProtectedRoute permission="reports:manage_permissions">
                <UsersRolesPage />
              </ProtectedRoute>
            }
          />

          {/* 7. Integrations & Templates */}
          <Route
            path="/settings/integrations"
            element={
              <ProtectedRoute permission="settings:manage_integrations">
                <ArchetypePage
                  title="3rd-Party Integrations"
                  subtitle="WhatsApp Business API, Twilio, Exotel, Zoho, Salesforce & Zapier"
                  screenNumbers="16, 71, 99"
                  moduleName="SETTINGS & ADMIN"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute permission="templates:view">
                <ArchetypePage
                  title="Message Templates Directory"
                  subtitle="Omni-channel templates for SMS, WhatsApp and Email"
                  screenNumbers="14"
                  moduleName="TEMPLATES & MESSAGING"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates/email"
            element={
              <ProtectedRoute permission="templates:view">
                <ArchetypePage
                  title="Email Templates & Signatures"
                  subtitle="HTML email templates and agent signatures"
                  screenNumbers="53"
                  moduleName="TEMPLATES & MESSAGING"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates/whatsapp"
            element={
              <ProtectedRoute permission="templates:view">
                <WhatsAppTemplatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates/sms"
            element={
              <ProtectedRoute permission="templates:view">
                <ArchetypePage
                  title="SMS Templates (DLT Registered)"
                  subtitle="TRAI/DLT compliant transactional & promotional SMS drafts"
                  screenNumbers="64"
                  moduleName="TEMPLATES & MESSAGING"
                />
              </ProtectedRoute>
            }
          />

          {/* 8. Billing & Plan */}
          <Route
            path="/billing"
            element={
              <ProtectedRoute permission="billing:view">
                <BillingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing/invoices"
            element={
              <ProtectedRoute permission="billing:view_invoices">
                <ArchetypePage
                  title="Invoices & Tax Receipts"
                  subtitle="GST-compliant billing invoices and download links"
                  screenNumbers="73"
                  moduleName="BILLING & PLAN"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing/payment-methods"
            element={
              <ProtectedRoute permission="billing:manage_payment_methods">
                <ArchetypePage
                  title="Payment Methods & UPI"
                  subtitle="Corporate credit cards, Net Banking, and Auto-Debit UPI"
                  screenNumbers="09"
                  moduleName="BILLING & PLAN"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing/plans"
            element={
              <ProtectedRoute permission="billing:manage_plan">
                <ArchetypePage
                  title="Pricing & Plan Upgrades"
                  subtitle="Starter, Professional, and Enterprise AI Call Center tiers"
                  screenNumbers="52"
                  moduleName="BILLING & PLAN"
                />
              </ProtectedRoute>
            }
          />

          {/* 9. Settings & Admin */}
          <Route
            path="/settings/users-roles"
            element={
              <ProtectedRoute permission="users:view">
                <UsersRolesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/system"
            element={
              <ProtectedRoute permission="settings:edit_system">
                <ArchetypePage
                  title="System & Organization Settings"
                  subtitle="Company details, timezones, working hours and currencies"
                  screenNumbers="77, 94, 95"
                  moduleName="SETTINGS & ADMIN"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/branding"
            element={
              <ProtectedRoute permission="settings:edit_branding">
                <ArchetypePage
                  title="Branding & Appearance"
                  subtitle="White-label logos, theme colors, email header and custom domain"
                  screenNumbers="61"
                  moduleName="SETTINGS & ADMIN"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/backup"
            element={
              <ProtectedRoute permission="settings:manage_backup">
                <ArchetypePage
                  title="Backup & Data Management"
                  subtitle="Automated cloud snapshots, point-in-time recovery and database exports"
                  screenNumbers="62"
                  moduleName="SETTINGS & ADMIN"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/api-webhooks"
            element={
              <ProtectedRoute permission="settings:manage_api">
                <ArchetypePage
                  title="API Keys & Webhooks"
                  subtitle="REST API access tokens, secret keys and outbound event webhooks"
                  screenNumbers="35, 89, 93"
                  moduleName="SETTINGS & ADMIN"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/activity-logs"
            element={
              <ProtectedRoute permission="settings:view_audit_logs">
                <ArchetypePage
                  title="Activity Logs & Audit Trail"
                  subtitle="Detailed audit log of logins, role edits, data exports and calls"
                  screenNumbers="58"
                  moduleName="SETTINGS & ADMIN"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/maintenance"
            element={
              <ProtectedRoute permission="settings:manage_maintenance">
                <ArchetypePage
                  title="System Maintenance & Health"
                  subtitle="System status, server uptime, cache clearing and diagnostics"
                  screenNumbers="31, 67, 85, 100"
                  moduleName="SETTINGS & ADMIN"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/knowledge-base"
            element={
              <ProtectedRoute permission="knowledge_base:view">
                <KnowledgeBasePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help/tickets"
            element={
              <ProtectedRoute permission="help:view_tickets">
                <SupportTicketsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute permission="help:view_tickets">
                <SupportTicketsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/profile"
            element={
              <ProtectedRoute>
                <ArchetypePage
                  title="User Profile & Preferences"
                  subtitle="Personal details, notification settings, audio devices and password"
                  screenNumbers="96"
                  moduleName="SETTINGS & ADMIN"
                />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
