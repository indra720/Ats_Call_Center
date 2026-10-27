import React, { useState } from 'react';
import { Shield, Check, X, Layers, Plus } from 'lucide-react';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { toast } from '@/store/toastStore';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleAdded?: (role: { name: string; description: string }) => void;
}

export const AddRoleModal: React.FC<AddRoleModalProps> = ({ isOpen, onClose, onRoleAdded }) => {
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');
  const [cloneFrom, setCloneFrom] = useState('Agent');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) {
      toast.warning('Role Name Required', 'Please provide a name for the new role');
      return;
    }

    if (onRoleAdded) {
      onRoleAdded({ name: roleName.trim(), description: description.trim() || 'Custom user role' });
    }

    toast.success('Role Created', `New role "${roleName}" initialized with permissions cloned from ${cloneFrom}.`);
    setRoleName('');
    setDescription('');
    onClose();
  };

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Custom Role"
      description="Define a new role and clone existing permission templates"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            Role Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Senior Escalations Lead"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-xs"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">Role Description</label>
          <textarea
            rows={2}
            placeholder="Brief explanation of responsibilities and scope"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-xs"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">Clone Base Permissions From</label>
          <select
            value={cloneFrom}
            onChange={(e) => setCloneFrom(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-xs"
          >
            <option value="Agent">Agent (Calling & Pipeline only)</option>
            <option value="Team Leader">Team Leader (Agent supervision & QA)</option>
            <option value="Supervisor">Supervisor (Queue & Escalations)</option>
            <option value="Admin">Admin (Full configuration access)</option>
            <option value="Viewer">Viewer (Read-only)</option>
          </select>
          <p className="text-[11px] text-slate-400 mt-1">
            You can customize fine-grained permissions anytime from the Role Permissions tab.
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3.5 py-1.5 font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
          >
            Save Role
          </button>
        </div>
      </form>
    </ResponsiveModal>
  );
};
