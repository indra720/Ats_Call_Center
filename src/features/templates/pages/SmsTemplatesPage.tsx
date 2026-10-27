import React, { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  Copy,
  Edit2,
  Trash2,
  AlertCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface SmsTemplate {
  id: string;
  name: string;
  headerId: string;
  dltTemplateId: string;
  category: 'Transactional' | 'Service Implicit' | 'Promotional';
  content: string;
  charCount: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  updatedOn: string;
}

const INITIAL_SMS: SmsTemplate[] = [
  {
    id: 'sms-1',
    name: 'Instant Missed Call Callback Notice',
    headerId: 'ATSCLL',
    dltTemplateId: '1407161298412093841',
    category: 'Transactional',
    content: 'Dear {#var1#}, thank you for calling ATS Call Center. Our agent {#var2#} will call you back shortly. Ref: {#var3#}',
    charCount: 122,
    status: 'Approved',
    updatedOn: '24 Oct 2026',
  },
  {
    id: 'sms-2',
    name: 'Appointment & Demo Confirmation',
    headerId: 'ATSCLL',
    dltTemplateId: '1407161298412093842',
    category: 'Service Implicit',
    content: 'Hi {#var1#}, your software demonstration is confirmed for {#var2#} at {#var3#}. Meeting Link: {#var4#}',
    charCount: 114,
    status: 'Approved',
    updatedOn: '22 Oct 2026',
  },
  {
    id: 'sms-3',
    name: 'Post-Call Customer Feedback Survey',
    headerId: 'ATSCLL',
    dltTemplateId: '1407161298412093843',
    category: 'Service Implicit',
    content: 'How was your call with agent {#var1#}? Rate your experience from 1 to 5 here: {#var2#}. Thank you!',
    charCount: 98,
    status: 'Approved',
    updatedOn: '18 Oct 2026',
  },
  {
    id: 'sms-4',
    name: 'Festival Festive Offer Discount (Promotional)',
    headerId: 'ATSADV',
    dltTemplateId: '1407161298412093844',
    category: 'Promotional',
    content: 'Festive offer! Get 20% off on all annual CRM plans this week only. Claim code {#var1#} at checkout: {#var2#}',
    charCount: 112,
    status: 'Pending',
    updatedOn: '26 Oct 2026',
  },
];

export const SmsTemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<SmsTemplate[]>(INITIAL_SMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showModal, setShowModal] = useState(false);

  // Modal Form State
  const [templateName, setTemplateName] = useState('');
  const [headerId, setHeaderId] = useState('ATSCLL');
  const [dltId, setDltId] = useState('');
  const [category, setCategory] = useState<'Transactional' | 'Service Implicit' | 'Promotional'>('Transactional');
  const [content, setContent] = useState('');

  const insertVariable = (tag: string) => {
    setContent((prev) => prev + tag);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.warning('Content Required', 'Please enter SMS template body text');
      return;
    }

    const newTpl: SmsTemplate = {
      id: `sms-${Date.now()}`,
      name: templateName.trim() || 'New DLT SMS Template',
      headerId,
      dltTemplateId: dltId.trim() || `14071612${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      category,
      content,
      charCount: content.length,
      status: 'Pending',
      updatedOn: 'Just now',
    };

    setTemplates([newTpl, ...templates]);
    setShowModal(false);
    setTemplateName('');
    setDltId('');
    setContent('');
    toast.success('Template Submitted', 'Draft submitted for Airtel/Jio DLT registry approval.');
  };

  const filtered = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.headerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Templates & Messaging</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">SMS Templates (DLT Registered)</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SMS Templates (DLT Registered)</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            TRAI DLT compliant transactional, service implicit, and promotional SMS templates with dynamic variables.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New DLT Template</span>
        </button>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">DLT Registered Headers</span>
            <div className="text-xl font-bold text-slate-900 mt-1">2 Senders</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">ATSCLL & ATSADV</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Approved Templates</span>
            <div className="text-xl font-bold text-slate-900 mt-1">3 Ready to Send</div>
            <div className="text-[11px] text-[#0362FA] font-semibold mt-1">1 Pending Approval</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Monthly SMS Delivered</span>
            <div className="text-xl font-bold text-slate-900 mt-1">42,910 SMS</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">98.4% Delivery Ratio</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Send className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Standard SMS Parts</span>
            <div className="text-xl font-bold text-slate-900 mt-1">160 Chars</div>
            <div className="text-[11px] text-purple-600 font-semibold mt-1">GSM-7 1 Credit / SMS</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-3.5 border-b border-[#E5EBF2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#FAFCFF]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates or text..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
              />
            </div>

            <div className="flex items-center gap-1 bg-white border border-[#E5EBF2] rounded-lg p-0.5 text-xs">
              {['All', 'Transactional', 'Service Implicit', 'Promotional'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-[#0362FA] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filtered.length}</span> templates
          </div>
        </div>

        {/* Anti-Shrink Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[900px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5EBF2] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3.5">Template Name</th>
                <th className="py-3 px-3.5">Header (Sender)</th>
                <th className="py-3 px-3.5">DLT Template ID</th>
                <th className="py-3 px-3.5">Category</th>
                <th className="py-3 px-3.5">SMS Body Content</th>
                <th className="py-3 px-3.5">Length</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBF2]">
              {filtered.map((tpl) => (
                <tr key={tpl.id} className="hover:bg-[#F0F7FF] transition-colors">
                  <td className="py-3 px-3.5 font-bold text-slate-900">{tpl.name}</td>
                  <td className="py-3 px-3.5">
                    <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                      {tpl.headerId}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-[11px] text-slate-500">{tpl.dltTemplateId}</td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#0362FA]">
                      {tpl.category}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-[11px] text-slate-600 max-w-[300px] truncate">
                    {tpl.content}
                  </td>
                  <td className="py-3 px-3.5 font-mono text-slate-500">
                    {tpl.charCount} chars ({Math.ceil(tpl.charCount / 160)} SMS)
                  </td>
                  <td className="py-3 px-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${
                        tpl.status === 'Approved'
                          ? 'bg-[#E9F9EE] text-[#13AB4A] border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {tpl.status === 'Approved' ? (
                        <CheckCircle2 className="w-3 h-3 text-[#13AB4A]" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-600" />
                      )}
                      <span>{tpl.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => toast.success(`Simulated test SMS sent for template: ${tpl.name}`)}
                        className="px-2 py-1 text-[11px] font-semibold text-[#0362FA] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                      >
                        Test
                      </button>
                      <ActionMenu
                        align="right"
                        items={[
                          {
                            label: 'Send Test SMS to My Mobile',
                            icon: <Send className="w-3.5 h-3.5" />,
                            onClick: () => toast.success(`Test SMS dispatched to linked mobile.`),
                          },
                          {
                            label: 'Duplicate Template Draft',
                            icon: <Copy className="w-3.5 h-3.5" />,
                            onClick: () => toast.info(`Cloned template: ${tpl.name}`),
                          },
                          {
                            label: 'Delete Template',
                            icon: <Trash2 className="w-3.5 h-3.5" />,
                            danger: true,
                            onClick: () => {
                              setTemplates(templates.filter((t) => t.id !== tpl.id));
                              toast.error(`Removed template: ${tpl.name}`);
                            },
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-[#F8FAFC] border-t border-[#E5EBF2] flex items-center justify-between text-xs text-slate-600">
          <span>Showing 1 to {filtered.length} of {templates.length} templates</span>
          <div className="flex items-center gap-1">
            <button className="p-1 border border-[#E5EBF2] rounded bg-white text-slate-400">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-2.5 py-0.5 bg-[#0362FA] text-white font-bold rounded">1</button>
            <button className="p-1 border border-[#E5EBF2] rounded bg-white text-slate-400">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#0362FA]" />
                <h3 className="font-bold text-slate-900 text-sm">Register New DLT SMS Template</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Template Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Inbound Lead Welcome SMS"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sender Header ID</label>
                  <select
                    value={headerId}
                    onChange={(e) => setHeaderId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono"
                  >
                    <option value="ATSCLL">ATSCLL (Transactional)</option>
                    <option value="ATSADV">ATSADV (Promotional)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">DLT Template ID (19 Digits)</label>
                  <input
                    type="text"
                    placeholder="14071612..."
                    value={dltId}
                    onChange={(e) => setDltId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                  >
                    <option value="Transactional">Transactional</option>
                    <option value="Service Implicit">Service Implicit</option>
                    <option value="Promotional">Promotional</option>
                  </select>
                </div>
              </div>

              {/* Message Body with Variable Helpers */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">SMS Body Text</label>
                  <span className="font-mono text-[11px] text-slate-400">
                    {content.length} chars • {Math.ceil((content.length || 1) / 160)} SMS Part
                  </span>
                </div>
                <textarea
                  rows={4}
                  placeholder="Dear {#var1#}, thank you for contacting ATS Call Center. Our agent {#var2#} is assigned to your query."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-xs"
                  required
                />
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Insert Tag:</span>
                  {['{#var1#}', '{#var2#}', '{#var3#}', '{#var4#}'].map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => insertVariable(tag)}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[10px] font-semibold border border-slate-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Submit DLT Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
