import { ALL_PERMISSIONS, Permission } from './permissions';

export type UserRole =
  | 'Super Admin'
  | 'Admin'
  | 'Team Leader'
  | 'Agent'
  | 'Supervisor'
  | 'Quality Analyst'
  | 'Data Analyst'
  | 'HR Manager'
  | 'Viewer'
  | string; // Allows user-created custom roles

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  badgeColor: string;
  userCount: number;
  isSystem: boolean;
  permissions: Permission[];
  updatedAt: string;
}

export const DEFAULT_ROLE_PERMISSIONS: Record<string, Permission[]> = {
  'Super Admin': [...ALL_PERMISSIONS],
  'Admin': [...ALL_PERMISSIONS],
  'Team Leader': [
    'dashboard:view',
    'leads:view',
    'leads:create',
    'leads:edit',
    'leads:assign',
    'leads:export',
    'contacts:view',
    'companies:view',
    'calls:make',
    'calls:view_history',
    'calls:listen_recordings',
    'calls:download_recordings',
    'calls:use_scripts',
    'calls:manage_queue',
    'templates:view',
    'campaigns:view',
    'campaigns:run',
    'followups:view',
    'followups:create',
    'followups:edit',
    'team:view_agents',
    'team:view_attendance',
    'team:view_performance',
    'reports:view',
    'reports:export',
    'knowledge_base:view',
    'help:view_tickets',
    'help:create_ticket',
  ],
  'Agent': [
    'dashboard:view',
    'leads:view',
    'leads:create',
    'leads:edit',
    'contacts:view',
    'contacts:create',
    'calls:make',
    'calls:view_history',
    'calls:use_scripts',
    'followups:view',
    'followups:create',
    'followups:edit',
    'communication:whatsapp_send',
    'communication:email_send',
    'communication:sms_send',
    'templates:view',
    'knowledge_base:view',
    'help:create_ticket',
  ],
  'Supervisor': [
    'dashboard:view',
    'dashboard:view_all_agents',
    'leads:view',
    'leads:view_all',
    'calls:view_history',
    'calls:listen_recordings',
    'calls:download_recordings',
    'team:view_agents',
    'team:view_performance',
    'team:view_attendance',
    'reports:view',
    'knowledge_base:view',
  ],
  'Quality Analyst': [
    'dashboard:view',
    'calls:view_history',
    'calls:listen_recordings',
    'calls:download_recordings',
    'reports:view',
    'knowledge_base:view',
  ],
  'Data Analyst': [
    'dashboard:view',
    'leads:view',
    'reports:view',
    'reports:create',
    'reports:edit',
    'reports:export',
    'reports:schedule',
    'reports:manage_templates',
    'knowledge_base:view',
  ],
  'HR Manager': [
    'dashboard:view',
    'users:view',
    'users:create',
    'users:edit',
    'team:view_agents',
    'team:view_attendance',
    'team:manage_shifts',
    'team:view_performance',
    'reports:view',
  ],
  'Viewer': [
    'dashboard:view',
    'leads:view',
    'reports:view',
    'knowledge_base:view',
  ],
};

export const INITIAL_ROLES: RoleDefinition[] = [
  {
    id: 'super-admin',
    name: 'Super Admin',
    description: 'Complete unrestricted access to all modules, billing, settings, and audit logs.',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    userCount: 2,
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS['Super Admin'],
    updatedAt: '2026-10-15',
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full administrative access for managing users, reports, configuration, and workflows.',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    userCount: 4,
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS['Admin'],
    updatedAt: '2026-10-16',
  },
  {
    id: 'team-leader',
    name: 'Team Leader',
    description: 'Manages team leads, monitors agent calls, runs campaigns, and tracks shift attendance.',
    badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    userCount: 6,
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS['Team Leader'],
    updatedAt: '2026-10-18',
  },
  {
    id: 'agent',
    name: 'Agent',
    description: 'Frontline calling, handling assigned leads, follow-ups, and customer communication.',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    userCount: 18,
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS['Agent'],
    updatedAt: '2026-10-20',
  },
  {
    id: 'supervisor',
    name: 'Supervisor',
    description: 'Monitors real-time calls, queues, agent performance ratings, and call quality.',
    badgeColor: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    userCount: 3,
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS['Supervisor'],
    updatedAt: '2026-10-12',
  },
  {
    id: 'quality-analyst',
    name: 'Quality Analyst',
    description: 'Reviews call recordings, rates transcripts, monitors compliance and QA benchmarks.',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
    userCount: 3,
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS['Quality Analyst'],
    updatedAt: '2026-10-10',
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Designs custom reports, schedules exports, creates conversion funnels and trends.',
    badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
    userCount: 2,
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS['Data Analyst'],
    updatedAt: '2026-10-14',
  },
  {
    id: 'hr-manager',
    name: 'HR Manager',
    description: 'Manages employee directory, shifts, leave requests, attendance logs, and agent hiring.',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    userCount: 2,
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS['HR Manager'],
    updatedAt: '2026-10-11',
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only stakeholder access to dashboards, basic reports, and knowledge base.',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    userCount: 5,
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS['Viewer'],
    updatedAt: '2026-10-05',
  },
];
