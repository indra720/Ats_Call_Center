import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Shield,
  Building,
  CheckCircle2,
  Headphones,
} from 'lucide-react';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { toast } from '@/store/toastStore';
import { UserDetailItem } from './UserDetailsModal';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDetailItem | null;
  onUserUpdated: (updated: UserDetailItem) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+91 98765 43210',
    role: 'Agent',
    team: 'Calling',
    status: 'Active' as 'Active' | 'Inactive',
    extension: '104',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '+91 98765 43210',
        role: user.role,
        team: user.team,
        status: user.status,
        extension: user.extension || (100 + user.id).toString(),
      });
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Validation Error', 'Name and work email are required.');
      return;
    }

    const roleBadgeColor =
      formData.role === 'Admin'
        ? 'bg-blue-50 text-[#0362FA]'
        : formData.role === 'Team Leader'
        ? 'bg-purple-50 text-purple-700'
        : formData.role === 'Supervisor'
        ? 'bg-amber-50 text-[#EF9612]'
        : 'bg-emerald-50 text-[#13AB4A]';

    const updatedUser: UserDetailItem = {
      ...user,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      role: formData.role,
      roleBadgeColor,
      team: formData.team,
      status: formData.status,
      extension: formData.extension.trim(),
    };

    onUserUpdated(updatedUser);
    toast.success('User Profile Updated', `${updatedUser.name}'s changes saved successfully.`);
    onClose();
  };

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit User Profile"
      description={`Update account details, role and permissions for ${user.name}`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Work Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Contact Phone</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              System Access Role <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
              >
                <option value="Admin">Admin (Full System Access)</option>
                <option value="Team Leader">Team Leader (Manage Group)</option>
                <option value="Supervisor">Supervisor (Monitor Queues)</option>
                <option value="Agent">Agent (Calling & Leads)</option>
                <option value="Quality Analyst">Quality Analyst (QA Scorecards)</option>
                <option value="Data Analyst">Data Analyst (Reports Only)</option>
                <option value="HR Manager">HR Manager (Attendance & Shifts)</option>
                <option value="Viewer">Viewer (Read-Only)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Team / Department <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
              >
                <option value="Calling">Calling / Outbound Sales</option>
                <option value="Backend">Backend / Operations</option>
                <option value="Management">Executive Management</option>
                <option value="Support">Customer Support</option>
                <option value="Inbound Sales">Inbound Lead Desk</option>
                <option value="Telemarketing">Direct Telemarketing</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">PBX Extension</label>
            <div className="relative">
              <Headphones className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. 104"
                value={formData.extension}
                onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Account Status</label>
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'Active' })}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-xs border transition-colors ${
                  formData.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-1 ring-emerald-300'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ● Active
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'Inactive' })}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-xs border transition-colors ${
                  formData.status === 'Inactive'
                    ? 'bg-rose-50 text-rose-700 border-rose-300 ring-1 ring-rose-300'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ○ Inactive
              </button>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-xl shadow-sm active:scale-95 transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </ResponsiveModal>
  );
};
