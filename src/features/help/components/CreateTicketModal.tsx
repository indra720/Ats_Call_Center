import React, { useState } from 'react';
import { X, Ticket, Check, AlertCircle, Paperclip, Send, User, Tag } from 'lucide-react';
import { toast } from '@/store/toastStore';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketCreated: (ticket: any) => void;
}

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose,
  onTicketCreated,
}) => {
  const [customer, setCustomer] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Account Access');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('Akash Sharma');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !subject.trim()) {
      toast.error('Validation Error', 'Customer Name and Subject are required');
      return;
    }

    const newTicketId = `#TKT-${Math.floor(Math.random() * 900) + 1010}`;
    const newTicket = {
      id: Math.floor(Math.random() * 9000) + 100,
      ticketId: newTicketId,
      subject: subject.trim(),
      customer: customer.trim(),
      category,
      priority,
      status: 'Open' as const,
      assignedTo,
      assignedAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop',
      createdOn: 'Just now',
    };

    onTicketCreated(newTicket);
    toast.success('Ticket Created', `Support ticket ${newTicketId} created and assigned to ${assignedTo}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Create Support Ticket</h2>
              <p className="text-[11px] text-slate-500">Log customer inquiries, technical issues, or escalations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4 text-xs flex-1">
          {/* Customer Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">
              Customer Name / Account <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Rohan Mehta or Acme Corp"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0362FA] text-slate-800"
            />
          </div>

          {/* Ticket Subject */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">
              Ticket Subject <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Brief summary of the issue (e.g. Call recording playback timeout)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0362FA] text-slate-800"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Department / Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0362FA] text-slate-800 bg-white"
              >
                <option>Account Access</option>
                <option>Call Records</option>
                <option>Integrations</option>
                <option>User Management</option>
                <option>Billing & Subscription</option>
                <option>API & Webhooks</option>
                <option>Campaigns</option>
                <option>Templates</option>
                <option>IVR & Numbers</option>
                <option>Reports & Analytics</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0362FA] text-slate-800 bg-white font-semibold"
              >
                <option value="Low">Low - General query</option>
                <option value="Medium">Medium - Standard issue</option>
                <option value="High">High - Urgent / Production impact</option>
              </select>
            </div>
          </div>

          {/* Assigned Agent */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">Assign To Support Agent</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0362FA] text-slate-800 bg-white"
            >
              <option>Akash Sharma (Senior Support Lead)</option>
              <option>Yashika Kanwar (Telephony Specialist)</option>
              <option>Sandeep Verma (Integration Engineer)</option>
              <option>Rohit Sharma (Billing & Operations)</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">Detailed Issue Description</label>
            <textarea
              rows={4}
              placeholder="Describe steps to reproduce, error codes, phone numbers affected, or customer environment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0362FA] text-slate-800 leading-relaxed"
            />
          </div>

          {/* Attachment upload */}
          <div className="border border-dashed border-slate-200 rounded-xl p-3 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
            <Paperclip className="w-4 h-4 text-slate-400 mx-auto mb-1" />
            <div className="text-[11px] font-medium text-slate-700">Click or drag log files / screenshots to attach</div>
            <div className="text-[10px] text-slate-400">PNG, JPG, PDF, or HAR up to 10MB</div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-end gap-2.5 bg-[#F8FAFC]">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Create Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );
};
