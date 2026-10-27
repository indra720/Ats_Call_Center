import React, { useState, useEffect } from 'react';
import { Shield, Layers, Users, FileText, CheckCircle2 } from 'lucide-react';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { toast } from '@/store/toastStore';
import { RoleItem } from './RoleDetailsModal';

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: RoleItem | null;
  onRoleUpdated: (updated: RoleItem) => void;
}

export const EditRoleModal: React.FC<EditRoleModalProps> = ({
  isOpen,
  onClose,
  role,
  onRoleUpdated,
}) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (role) {
      setName(role.name);
      setDesc(role.desc);
      setCount(role.count);
    }
  }, [role]);

  if (!role) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Validation Error', 'Role Name cannot be empty.');
      return;
    }

    const updatedRole: RoleItem = {
      ...role,
      name: name.trim(),
      desc: desc.trim() || 'Custom user role',
      count,
    };

    onRoleUpdated(updatedRole);
    toast.success('Role Updated', `Modifications saved for role "${updatedRole.name}".`);
    onClose();
  };

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Role Configuration"
      description={`Update role name and baseline description for "${role.name}"`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Role Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Quality Analyst"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Role Description <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <textarea
              rows={3}
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Brief description of responsibilities and permissions"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Assigned Staff Count</label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min="0"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Inheritance Template</label>
            <div className="relative">
              <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                defaultValue="standard"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
              >
                <option value="standard">Standard ATS Role Matrix</option>
                <option value="strict">Strict Privacy & Zero Export</option>
                <option value="supervisor">Floor Supervisor Override</option>
              </select>
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
            Save Role Changes
          </button>
        </div>
      </form>
    </ResponsiveModal>
  );
};
