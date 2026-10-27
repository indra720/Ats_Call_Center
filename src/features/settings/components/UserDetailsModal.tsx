import React from 'react';
import {
  User,
  Mail,
  Phone,
  Shield,
  Clock,
  Building,
  CheckCircle2,
  XCircle,
  Key,
  Edit2,
  Lock,
  Headphones,
  Calendar,
  X,
} from 'lucide-react';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { toast } from '@/store/toastStore';

export interface UserDetailItem {
  id: number;
  initials: string;
  initialsBg: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  roleBadgeColor: string;
  team: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  extension?: string;
}

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDetailItem | null;
  onEditUser?: (user: UserDetailItem) => void;
  onToggleStatus?: (user: UserDetailItem) => void;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  user,
  onEditUser,
  onToggleStatus,
}) => {
  if (!user) return null;

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="User Profile Details"
      description={`System credentials & permissions for ${user.name}`}
      size="md"
    >
      <div className="space-y-4 text-xs">
        {/* User Hero Banner */}
        <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl ${user.initialsBg} text-white font-extrabold text-base flex items-center justify-center shadow-sm shrink-0`}
            >
              {user.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">{user.name}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    user.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {user.status === 'Active' ? '● Active' : '○ Inactive'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</p>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${user.roleBadgeColor}`}>
            {user.role}
          </span>
        </div>

        {/* 2-Column Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Organizational Unit
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" /> Team / Dept:
                </span>
                <span className="font-bold text-slate-800">{user.team}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-400" /> Access Role:
                </span>
                <span className="font-semibold text-slate-800">{user.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-slate-400" /> PBX Extension:
                </span>
                <span className="font-mono font-bold text-[#0362FA]">Ext #{user.extension || (100 + user.id)}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Security & Activity
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Last Login:
                </span>
                <span className="font-mono text-slate-700 text-[11px]">{user.lastLogin}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" /> 2FA Authentication:
                </span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Enabled (SMS)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Shift Schedule:
                </span>
                <span className="font-semibold text-slate-800">General (9:30 - 6:30)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions & Telephony Privileges Pill list */}
        <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
          <span className="text-[10px] font-bold text-[#0362FA] uppercase tracking-wider block">
            Granted Telephony & CRM Privileges
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Inbound & Outbound Calling',
              'Call Recordings Access',
              'Disposition Logging',
              'WhatsApp Chat Assist',
              'Internal Team Notes',
              user.role === 'Admin' ? 'Lead Export Allowed' : 'View Assigned Leads Only',
            ].map((priv, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white border border-blue-200 text-slate-700 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-[#13AB4A]" /> {priv}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              if (onToggleStatus) onToggleStatus(user);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              user.status === 'Active'
                ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            {user.status === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                toast.success('Password Reset', `Password reset token dispatched to ${user.email}`);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Password</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onEditUser) onEditUser(user);
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0362FA] hover:bg-blue-600 shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit User</span>
            </button>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  );
};
