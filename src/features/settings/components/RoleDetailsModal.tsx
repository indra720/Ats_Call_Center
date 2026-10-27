import React from 'react';
import {
  Shield,
  Users,
  CheckCircle2,
  Lock,
  Layers,
  Edit2,
  Copy,
  ChevronRight,
  Phone,
  BarChart3,
  Settings,
  Database,
} from 'lucide-react';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { toast } from '@/store/toastStore';

export interface RoleItem {
  id: number;
  name: string;
  count: number;
  desc: string;
}

interface RoleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: RoleItem | null;
  onEditRole?: (role: RoleItem) => void;
}

export const RoleDetailsModal: React.FC<RoleDetailsModalProps> = ({
  isOpen,
  onClose,
  role,
  onEditRole,
}) => {
  if (!role) return null;

  const getRoleBadgeStyle = (name: string) => {
    switch (name) {
      case 'Admin':
        return 'bg-blue-50 text-[#0362FA] border-blue-200';
      case 'Team Leader':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Supervisor':
        return 'bg-amber-50 text-[#EF9612] border-amber-200';
      case 'Quality Analyst':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Data Analyst':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Viewer':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-emerald-50 text-[#13AB4A] border-emerald-200';
    }
  };

  const getRolePermissionsList = (name: string) => {
    switch (name) {
      case 'Admin':
        return [
          { icon: Settings, label: 'Full System Administration & Security' },
          { icon: Phone, label: 'Inbound / Outbound Dialing & Trunk Setup' },
          { icon: Users, label: 'User Provisioning & Role Assignments' },
          { icon: BarChart3, label: 'Comprehensive Analytics & BI Exports' },
          { icon: Database, label: 'Backup, API Webhooks & Integrations' },
        ];
      case 'Team Leader':
        return [
          { icon: Users, label: 'Agent Monitoring & Barge-in Calling' },
          { icon: Phone, label: 'Campaign Queue Management' },
          { icon: BarChart3, label: 'Team KPI Reports & Live Dashboards' },
          { icon: CheckCircle2, label: 'Disposition & Quality Scorecard Reviews' },
        ];
      case 'Supervisor':
        return [
          { icon: Users, label: 'Real-time Live Floor Queue Supervision' },
          { icon: Phone, label: 'Call Whispering & Silent Listening' },
          { icon: BarChart3, label: 'Daily Agent Adherence Metrics' },
        ];
      case 'Quality Analyst':
        return [
          { icon: Phone, label: 'Call Recordings & Audio Playback' },
          { icon: CheckCircle2, label: 'QA Scorecard Evaluation & Auditing' },
          { icon: BarChart3, label: 'Agent Quality Trend Analytics' },
        ];
      case 'Data Analyst':
        return [
          { icon: BarChart3, label: 'Raw CDR & Calling Data Exports' },
          { icon: BarChart3, label: 'Custom BI Reports & Dashboards' },
          { icon: Database, label: 'Analytics Query Engine Access' },
        ];
      case 'Viewer':
        return [
          { icon: CheckCircle2, label: 'Read-only Access to High-level Dashboards' },
          { icon: Lock, label: 'Exporting & Modifying Leads Restricted' },
        ];
      default:
        return [
          { icon: Phone, label: 'Inbound & Outbound Calling Dialpad' },
          { icon: Users, label: 'Assigned Leads Contact & History' },
          { icon: CheckCircle2, label: 'Disposition Logging & Call Notes' },
          { icon: BarChart3, label: 'Personal Performance Metrics' },
        ];
    }
  };

  const perms = getRolePermissionsList(role.name);

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Role & Privilege Details"
      description={`Configuration, assigned staff, and capabilities for "${role.name}"`}
      size="md"
    >
      <div className="space-y-4 text-xs">
        {/* Role Header Banner */}
        <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0362FA] text-white flex items-center justify-center shadow-sm shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">{role.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRoleBadgeStyle(role.name)}`}>
                  ID #{role.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{role.desc}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">
            <Users className="w-3.5 h-3.5 text-[#0362FA]" />
            <span className="font-bold text-slate-900">{role.count}</span>
            <span className="text-slate-500 text-[11px]">Staff Assigned</span>
          </div>
        </div>

        {/* 2-Column Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Access Scope & Tier
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Security Tier:</span>
                <span className="font-bold text-slate-800">
                  {role.name === 'Admin' ? 'Tier 1 (Unrestricted)' : role.name === 'Viewer' ? 'Tier 4 (Read Only)' : 'Tier 2 (Operational)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Default Allocation:</span>
                <span className="font-semibold text-slate-700">Pre-configured</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">MFA Policy:</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Mandatory
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Telephony Policy
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Recording Access:</span>
                <span className="font-bold text-slate-800">
                  {role.name === 'Viewer' ? 'Restricted' : 'Allowed'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Direct Inward Dialing:</span>
                <span className="font-semibold text-slate-700">Supported</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Max Concurrent Calls:</span>
                <span className="font-mono font-bold text-[#0362FA]">Unlimited</span>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions Granted Matrix */}
        <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
          <span className="text-[10px] font-bold text-[#0362FA] uppercase tracking-wider block">
            Key Permissions Enforced ({perms.length})
          </span>
          <div className="space-y-1.5">
            {perms.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={idx}
                  className="p-2 bg-white rounded-lg border border-blue-100 flex items-center justify-between text-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <IconComp className="w-3.5 h-3.5 text-[#0362FA]" />
                    <span className="font-medium">{p.label}</span>
                  </div>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#13AB4A] shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(role, null, 2));
              toast.success('Role Details Copied', `Copied JSON specifications for ${role.name}`);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Copy Specs</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onEditRole) onEditRole(role);
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0362FA] hover:bg-blue-600 shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Role</span>
            </button>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  );
};
