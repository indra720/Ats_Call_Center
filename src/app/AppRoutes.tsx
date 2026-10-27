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
import { LeadDetailsPage } from '@/features/leads/pages/LeadDetailsPage';

// Calling Pages
import { CallDashboardPage } from '@/features/calls/pages/CallDashboardPage';
import { DialerPage } from '@/features/calls/pages/DialerPage';
import { CallQueuePage } from '@/features/calls/pages/CallQueuePage';
import { CallHistoryPage } from '@/features/calls/pages/CallHistoryPage';
import { CallRecordingsPage } from '@/features/calls/pages/CallRecordingsPage';
import { VoicemailPage } from '@/features/calls/pages/VoicemailPage';
import { CallScriptsPage } from '@/features/calls/pages/CallScriptsPage';
import { IvrNumbersPage } from '@/features/calls/pages/IvrNumbersPage';
import { CallSettingsPage } from '@/features/calls/pages/CallSettingsPage';

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
import { CallAnalyticsPage } from '@/features/reports/pages/CallAnalyticsPage';
import { TeamReportsPage } from '@/features/reports/pages/TeamReportsPage';
import { CampaignPerformanceReportPage } from '@/features/reports/pages/CampaignPerformanceReportPage';
import { CustomerReportsPage } from '@/features/reports/pages/CustomerReportsPage';
import { CustomerConversionReportPage } from '@/features/reports/pages/CustomerConversionReportPage';
import { LeadAgingReportPage } from '@/features/reports/pages/LeadAgingReportPage';
import { LeadNurturingReportPage } from '@/features/reports/pages/LeadNurturingReportPage';
import { CallQualityReportPage } from '@/features/reports/pages/CallQualityReportPage';
import { CustomReportBuilderPage } from '@/features/reports/pages/CustomReportBuilderPage';
import { ReportTemplatesPage } from '@/features/reports/pages/ReportTemplatesPage';
import { ScheduledReportsPage } from '@/features/reports/pages/ScheduledReportsPage';
import { ExportCenterPage } from '@/features/reports/pages/ExportCenterPage';
import { ReportDeliveryHistoryPage } from '@/features/reports/pages/ReportDeliveryHistoryPage';
import { ReportSettingsPage } from '@/features/reports/pages/ReportSettingsPage';
import { BillingPage } from '@/features/billing/pages/BillingPage';
import { InvoicesPage } from '@/features/billing/pages/InvoicesPage';
import { PaymentMethodsPage } from '@/features/billing/pages/PaymentMethodsPage';
import { PricingPlansPage } from '@/features/billing/pages/PricingPlansPage';
import { SystemSettingsPage } from '@/features/settings/pages/SystemSettingsPage';
import { BrandingSettingsPage } from '@/features/settings/pages/BrandingSettingsPage';
import { BackupDataPage } from '@/features/settings/pages/BackupDataPage';
import { ApiWebhooksPage } from '@/features/settings/pages/ApiWebhooksPage';
import { ActivityLogsPage } from '@/features/settings/pages/ActivityLogsPage';
import { SystemMaintenancePage } from '@/features/settings/pages/SystemMaintenancePage';
import { UserProfilePage } from '@/features/settings/pages/UserProfilePage';
import { SmsTemplatesPage } from '@/features/templates/pages/SmsTemplatesPage';
import { TemplatesDirectoryPage } from '@/features/templates/pages/TemplatesDirectoryPage';
import { EmailTemplatesPage } from '@/features/templates/pages/EmailTemplatesPage';
import { IntegrationsPage } from '@/features/settings/pages/IntegrationsPage';
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
                <LeadDetailsPage />
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
                <IvrNumbersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calls/settings"
            element={
              <ProtectedRoute permission="calls:manage_settings">
                <CallSettingsPage />
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
                <CallAnalyticsPage />
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
                <TeamReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/campaigns"
            element={
              <ProtectedRoute permission="reports:view">
                <CampaignPerformanceReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/customers"
            element={
              <ProtectedRoute permission="reports:view">
                <CustomerReportsPage />
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
                <CustomerConversionReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/lead-aging"
            element={
              <ProtectedRoute permission="reports:view">
                <LeadAgingReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/lead-nurturing"
            element={
              <ProtectedRoute permission="reports:view">
                <LeadNurturingReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/call-quality"
            element={
              <ProtectedRoute permission="reports:view">
                <CallQualityReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/builder"
            element={
              <ProtectedRoute permission="reports:create">
                <CustomReportBuilderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/custom"
            element={
              <ProtectedRoute permission="reports:create">
                <CustomReportBuilderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/templates"
            element={
              <ProtectedRoute permission="reports:manage_templates">
                <ReportTemplatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/scheduled"
            element={
              <ProtectedRoute permission="reports:schedule">
                <ScheduledReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/scheduling"
            element={
              <ProtectedRoute permission="reports:schedule">
                <ScheduledReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/export-center"
            element={
              <ProtectedRoute permission="reports:export">
                <ExportCenterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/delivery-history"
            element={
              <ProtectedRoute permission="reports:view_logs">
                <ReportDeliveryHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/settings"
            element={
              <ProtectedRoute permission="reports:manage_settings">
                <ReportSettingsPage />
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
                <IntegrationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute permission="templates:view">
                <TemplatesDirectoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates/email"
            element={
              <ProtectedRoute permission="templates:view">
                <EmailTemplatesPage />
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
                <SmsTemplatesPage />
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
                <InvoicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing/payment-methods"
            element={
              <ProtectedRoute permission="billing:manage_payment_methods">
                <PaymentMethodsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing/plans"
            element={
              <ProtectedRoute permission="billing:manage_plan">
                <PricingPlansPage />
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
                <SystemSettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/branding"
            element={
              <ProtectedRoute permission="settings:edit_branding">
                <BrandingSettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/backup"
            element={
              <ProtectedRoute permission="settings:manage_backup">
                <BackupDataPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/api-webhooks"
            element={
              <ProtectedRoute permission="settings:manage_api">
                <ApiWebhooksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/activity-logs"
            element={
              <ProtectedRoute permission="settings:view_audit_logs">
                <ActivityLogsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/maintenance"
            element={
              <ProtectedRoute permission="settings:manage_maintenance">
                <SystemMaintenancePage />
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
                <UserProfilePage />
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
