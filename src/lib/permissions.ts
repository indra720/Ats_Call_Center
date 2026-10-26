// Grouped module permissions as specified in Master Prompt Section 3.2

export const PERMISSION_MODULES = {
  dashboard: ['view', 'view_all_agents'] as const,
  leads: ['view', 'create', 'edit', 'delete', 'export', 'import', 'assign', 'merge', 'restore', 'view_all'] as const,
  contacts: ['view', 'create', 'edit', 'delete', 'export'] as const,
  companies: ['view', 'create', 'edit', 'delete', 'export'] as const,
  calls: ['make', 'view_history', 'listen_recordings', 'download_recordings', 'use_scripts', 'manage_queue', 'manage_settings', 'manage_ivr'] as const,
  voicemail: ['view', 'manage'] as const,
  communication: ['whatsapp_send', 'email_send', 'sms_send'] as const,
  templates: ['view', 'create', 'edit', 'delete', 'approve'] as const,
  campaigns: ['view', 'create', 'edit', 'delete', 'run'] as const,
  followups: ['view', 'create', 'edit', 'delete'] as const,
  team: ['view_agents', 'manage_agents', 'view_attendance', 'manage_shifts', 'view_performance'] as const,
  reports: ['view', 'create', 'edit', 'delete', 'export', 'schedule', 'manage_templates', 'view_logs', 'manage_settings', 'manage_permissions'] as const,
  billing: ['view', 'manage_plan', 'manage_payment_methods', 'view_invoices'] as const,
  knowledge_base: ['view', 'create', 'edit', 'delete', 'publish', 'manage_categories', 'manage_settings'] as const,
  help: ['view_tickets', 'create_ticket', 'manage_tickets'] as const,
  users: ['view', 'create', 'edit', 'delete', 'manage_roles'] as const,
  settings: ['view', 'edit_system', 'edit_branding', 'manage_backup', 'manage_api', 'manage_integrations', 'view_audit_logs', 'manage_maintenance'] as const,
};

export type PermissionModule = keyof typeof PERMISSION_MODULES;

export type Permission = {
  [K in PermissionModule]: `${K}:${(typeof PERMISSION_MODULES)[K][number]}`;
}[PermissionModule];

// Flattened list of all valid permissions
export const ALL_PERMISSIONS: Permission[] = Object.entries(PERMISSION_MODULES).flatMap(
  ([mod, actions]) => actions.map((act) => `${mod}:${act}` as Permission)
);

export interface PermissionGroupMeta {
  id: PermissionModule;
  label: string;
  description: string;
  actions: { id: string; label: string; permission: Permission }[];
}

export const PERMISSION_GROUPS_META: PermissionGroupMeta[] = [
  {
    id: 'dashboard',
    label: 'Dashboard & Overview',
    description: 'Dashboard metrics, real-time monitors, and agent status',
    actions: [
      { id: 'view', label: 'View Dashboard', permission: 'dashboard:view' },
      { id: 'view_all_agents', label: 'View All Agents Status', permission: 'dashboard:view_all_agents' },
    ],
  },
  {
    id: 'leads',
    label: 'Leads & Pipeline',
    description: 'Lead generation, assignments, pipeline stages and recycle bin',
    actions: [
      { id: 'view', label: 'View Leads', permission: 'leads:view' },
      { id: 'view_all', label: 'View All Leads (bypass own scope)', permission: 'leads:view_all' },
      { id: 'create', label: 'Create Lead', permission: 'leads:create' },
      { id: 'edit', label: 'Edit Lead', permission: 'leads:edit' },
      { id: 'delete', label: 'Delete Lead', permission: 'leads:delete' },
      { id: 'assign', label: 'Assign Lead', permission: 'leads:assign' },
      { id: 'export', label: 'Export Leads', permission: 'leads:export' },
      { id: 'import', label: 'Import Leads', permission: 'leads:import' },
      { id: 'merge', label: 'Merge Duplicates', permission: 'leads:merge' },
      { id: 'restore', label: 'Restore from Recycle Bin', permission: 'leads:restore' },
    ],
  },
  {
    id: 'contacts',
    label: 'Contacts',
    description: 'Manage individual customer and lead contact records',
    actions: [
      { id: 'view', label: 'View Contacts', permission: 'contacts:view' },
      { id: 'create', label: 'Create Contact', permission: 'contacts:create' },
      { id: 'edit', label: 'Edit Contact', permission: 'contacts:edit' },
      { id: 'delete', label: 'Delete Contact', permission: 'contacts:delete' },
      { id: 'export', label: 'Export Contacts', permission: 'contacts:export' },
    ],
  },
  {
    id: 'companies',
    label: 'Companies / Accounts',
    description: 'Organization accounts and B2B profiles',
    actions: [
      { id: 'view', label: 'View Companies', permission: 'companies:view' },
      { id: 'create', label: 'Create Company', permission: 'companies:create' },
      { id: 'edit', label: 'Edit Company', permission: 'companies:edit' },
      { id: 'delete', label: 'Delete Company', permission: 'companies:delete' },
      { id: 'export', label: 'Export Companies', permission: 'companies:export' },
    ],
  },
  {
    id: 'calls',
    label: 'Calling & Call Center',
    description: 'Dialer, live calling, call queue, IVR, and recordings',
    actions: [
      { id: 'make', label: 'Make Calls / Web Dialer', permission: 'calls:make' },
      { id: 'view_history', label: 'View Call Logs', permission: 'calls:view_history' },
      { id: 'listen_recordings', label: 'Listen to Call Recordings', permission: 'calls:listen_recordings' },
      { id: 'download_recordings', label: 'Download Recordings', permission: 'calls:download_recordings' },
      { id: 'use_scripts', label: 'Use Interactive Call Scripts', permission: 'calls:use_scripts' },
      { id: 'manage_queue', label: 'Manage Inbound/Outbound Queue', permission: 'calls:manage_queue' },
      { id: 'manage_settings', label: 'Call Center Settings', permission: 'calls:manage_settings' },
      { id: 'manage_ivr', label: 'IVR & Phone Numbers', permission: 'calls:manage_ivr' },
    ],
  },
  {
    id: 'voicemail',
    label: 'Voicemail',
    description: 'Inbound voicemails and greetings',
    actions: [
      { id: 'view', label: 'View Voicemails', permission: 'voicemail:view' },
      { id: 'manage', label: 'Manage Voicemails', permission: 'voicemail:manage' },
    ],
  },
  {
    id: 'communication',
    label: 'Multi-Channel Messaging',
    description: 'Direct communication via WhatsApp, Email, and SMS',
    actions: [
      { id: 'whatsapp_send', label: 'Send WhatsApp Messages', permission: 'communication:whatsapp_send' },
      { id: 'email_send', label: 'Send Email Messages', permission: 'communication:email_send' },
      { id: 'sms_send', label: 'Send SMS Messages', permission: 'communication:sms_send' },
    ],
  },
  {
    id: 'templates',
    label: 'Message Templates',
    description: 'WhatsApp, Email, SMS message templates with variables',
    actions: [
      { id: 'view', label: 'View Templates', permission: 'templates:view' },
      { id: 'create', label: 'Create Template', permission: 'templates:create' },
      { id: 'edit', label: 'Edit Template', permission: 'templates:edit' },
      { id: 'delete', label: 'Delete Template', permission: 'templates:delete' },
      { id: 'approve', label: 'Approve WhatsApp Templates', permission: 'templates:approve' },
    ],
  },
  {
    id: 'campaigns',
    label: 'Campaigns & Auto-Dialer',
    description: 'Outbound voice and multi-channel marketing campaigns',
    actions: [
      { id: 'view', label: 'View Campaigns', permission: 'campaigns:view' },
      { id: 'create', label: 'Create Campaign', permission: 'campaigns:create' },
      { id: 'edit', label: 'Edit Campaign', permission: 'campaigns:edit' },
      { id: 'delete', label: 'Delete Campaign', permission: 'campaigns:delete' },
      { id: 'run', label: 'Run / Pause Campaigns', permission: 'campaigns:run' },
    ],
  },
  {
    id: 'followups',
    label: 'Follow-ups & Tasks',
    description: 'Lead callbacks, scheduled tasks, and reminders',
    actions: [
      { id: 'view', label: 'View Follow-ups', permission: 'followups:view' },
      { id: 'create', label: 'Schedule Follow-up', permission: 'followups:create' },
      { id: 'edit', label: 'Edit Follow-up', permission: 'followups:edit' },
      { id: 'delete', label: 'Delete Follow-up', permission: 'followups:delete' },
    ],
  },
  {
    id: 'team',
    label: 'Team Management',
    description: 'Agents, teams, attendance, shifts and performance tracking',
    actions: [
      { id: 'view_agents', label: 'View Agents & Teams', permission: 'team:view_agents' },
      { id: 'manage_agents', label: 'Manage Agents & Teams', permission: 'team:manage_agents' },
      { id: 'view_attendance', label: 'View Attendance & Shifts', permission: 'team:view_attendance' },
      { id: 'manage_shifts', label: 'Manage Shifts & Roster', permission: 'team:manage_shifts' },
      { id: 'view_performance', label: 'View Team Performance', permission: 'team:view_performance' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    description: 'Analytics, custom report builder, scheduled reports and delivery',
    actions: [
      { id: 'view', label: 'View Reports', permission: 'reports:view' },
      { id: 'create', label: 'Build Custom Report', permission: 'reports:create' },
      { id: 'edit', label: 'Edit Report', permission: 'reports:edit' },
      { id: 'delete', label: 'Delete Report', permission: 'reports:delete' },
      { id: 'export', label: 'Export Reports (PDF/CSV/XLS)', permission: 'reports:export' },
      { id: 'schedule', label: 'Schedule Automated Reports', permission: 'reports:schedule' },
      { id: 'manage_templates', label: 'Manage Report Templates', permission: 'reports:manage_templates' },
      { id: 'view_logs', label: 'View Delivery History', permission: 'reports:view_logs' },
      { id: 'manage_settings', label: 'Report Settings & Limits', permission: 'reports:manage_settings' },
      { id: 'manage_permissions', label: 'Manage Report Permissions', permission: 'reports:manage_permissions' },
    ],
  },
  {
    id: 'billing',
    label: 'Billing & Plan',
    description: 'Subscriptions, invoice history, payment methods and usage',
    actions: [
      { id: 'view', label: 'View Billing Overview', permission: 'billing:view' },
      { id: 'manage_plan', label: 'Upgrade / Change Plan', permission: 'billing:manage_plan' },
      { id: 'manage_payment_methods', label: 'Manage Payment Methods', permission: 'billing:manage_payment_methods' },
      { id: 'view_invoices', label: 'View & Download Invoices', permission: 'billing:view_invoices' },
    ],
  },
  {
    id: 'knowledge_base',
    label: 'Knowledge Base & FAQs',
    description: 'Articles, internal FAQs, categories and article merge',
    actions: [
      { id: 'view', label: 'Read Articles & FAQs', permission: 'knowledge_base:view' },
      { id: 'create', label: 'Create Article / FAQ', permission: 'knowledge_base:create' },
      { id: 'edit', label: 'Edit Articles & FAQs', permission: 'knowledge_base:edit' },
      { id: 'delete', label: 'Delete Article', permission: 'knowledge_base:delete' },
      { id: 'publish', label: 'Publish / Unpublish', permission: 'knowledge_base:publish' },
      { id: 'manage_categories', label: 'Manage Categories', permission: 'knowledge_base:manage_categories' },
      { id: 'manage_settings', label: 'Knowledge Base Settings', permission: 'knowledge_base:manage_settings' },
    ],
  },
  {
    id: 'help',
    label: 'Help & Support Tickets',
    description: 'Support desk, ticket creation and resolution',
    actions: [
      { id: 'view_tickets', label: 'View Support Tickets', permission: 'help:view_tickets' },
      { id: 'create_ticket', label: 'Create Support Ticket', permission: 'help:create_ticket' },
      { id: 'manage_tickets', label: 'Manage & Resolve Tickets', permission: 'help:manage_tickets' },
    ],
  },
  {
    id: 'users',
    label: 'Users & Roles Management',
    description: 'System user accounts, roles, and permission assignments',
    actions: [
      { id: 'view', label: 'View Users & Roles', permission: 'users:view' },
      { id: 'create', label: 'Invite / Add Users', permission: 'users:create' },
      { id: 'edit', label: 'Edit User Info', permission: 'users:edit' },
      { id: 'delete', label: 'Deactivate / Delete Users', permission: 'users:delete' },
      { id: 'manage_roles', label: 'Manage Roles & Permissions', permission: 'users:manage_roles' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings & Administration',
    description: 'System config, branding, backup, API, audit logs and maintenance',
    actions: [
      { id: 'view', label: 'View Settings', permission: 'settings:view' },
      { id: 'edit_system', label: 'Edit System Settings', permission: 'settings:edit_system' },
      { id: 'edit_branding', label: 'Edit Branding & Appearance', permission: 'settings:edit_branding' },
      { id: 'manage_backup', label: 'Manage Backup & Restore', permission: 'settings:manage_backup' },
      { id: 'manage_api', label: 'Manage API Keys & Webhooks', permission: 'settings:manage_api' },
      { id: 'manage_integrations', label: 'Configure 3rd-Party Integrations', permission: 'settings:manage_integrations' },
      { id: 'view_audit_logs', label: 'View Activity Logs & Audit Trail', permission: 'settings:view_audit_logs' },
      { id: 'manage_maintenance', label: 'System Maintenance & Cache', permission: 'settings:manage_maintenance' },
    ],
  },
];
