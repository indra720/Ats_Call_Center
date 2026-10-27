import React, { useState } from 'react';
import {
  FileCode2,
  Plus,
  Search,
  Filter,
  MessageSquare,
  Smartphone,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Copy,
  Trash2,
  Edit2,
  Send,
  Eye,
  Layers,
  ArrowUpRight,
  X,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';
import { useNavigate } from 'react-router-dom';

interface UnifiedTemplate {
  id: number;
  code: string;
  name: string;
  channel: 'WhatsApp' | 'SMS' | 'Email';
  category: 'Transactional' | 'Marketing' | 'Utility' | 'OTP / Security';
  status: 'Approved' | 'Pending Approval' | 'Draft' | 'Rejected';
  variables: string[];
  lastUsed: string;
  usageCount: number;
  preview: string;
}

const INITIAL_TEMPLATES: UnifiedTemplate[] = [
  {
    id: 1,
    code: 'WA_WELCOME_01',
    name: 'New Lead Welcome & Introduction',
    channel: 'WhatsApp',
    category: 'Marketing',
    status: 'Approved',
    variables: ['{{first_name}}', '{{company_name}}', '{{agent_phone}}'],
    lastUsed: '10 mins ago',
    usageCount: 1420,
    preview: 'Hi {{first_name}}, welcome to ATS Call Center! Our representative will connect with you shortly.',
  },
  {
    id: 2,
    code: 'SMS_OTP_LOGIN',
    name: 'Agent Two-Factor Verification OTP',
    channel: 'SMS',
    category: 'OTP / Security',
    status: 'Approved',
    variables: ['{{otp_code}}', '{{valid_mins}}'],
    lastUsed: '1 min ago',
    usageCount: 4890,
    preview: 'Your ATS login verification code is {{otp_code}}. Valid for {{valid_mins}} minutes. Do not share.',
  },
  {
    id: 3,
    code: 'EMAIL_PROPOSAL_V2',
    name: 'Telephony Enterprise Quotation & Proposal',
    channel: 'Email',
    category: 'Transactional',
    status: 'Approved',
    variables: ['{{lead_name}}', '{{plan_name}}', '{{discount_pct}}', '{{pdf_link}}'],
    lastUsed: '2 hours ago',
    usageCount: 380,
    preview: 'Dear {{lead_name}}, please find attached our bespoke pricing quotation for {{plan_name}}.',
  },
  {
    id: 4,
    code: 'WA_PAYMENT_REMIND',
    name: 'Invoice Payment Due Reminder',
    channel: 'WhatsApp',
    category: 'Utility',
    status: 'Approved',
    variables: ['{{customer_name}}', '{{invoice_num}}', '{{amount_due}}', '{{pay_link}}'],
    lastUsed: '5 hours ago',
    usageCount: 890,
    preview: 'Hello {{customer_name}}, this is a friendly reminder that invoice #{{invoice_num}} of {{amount_due}} is due today.',
  },
  {
    id: 5,
    code: 'SMS_CALL_MISSED',
    name: 'Missed Call Follow-up Auto SMS',
    channel: 'SMS',
    category: 'Transactional',
    status: 'Approved',
    variables: ['{{agent_name}}', '{{callback_num}}'],
    lastUsed: '12 mins ago',
    usageCount: 2150,
    preview: 'Sorry we missed your call! Our executive {{agent_name}} will call back shortly or dial {{callback_num}}.',
  },
  {
    id: 6,
    code: 'EMAIL_ONBOARDING',
    name: 'Customer Onboarding Kickoff & Access Details',
    channel: 'Email',
    category: 'Transactional',
    status: 'Approved',
    variables: ['{{user_name}}', '{{portal_url}}', '{{temp_pass}}'],
    lastUsed: '1 day ago',
    usageCount: 410,
    preview: 'Welcome aboard {{user_name}}! Your ATS portal credentials are live at {{portal_url}}.',
  },
  {
    id: 7,
    code: 'WA_DIWALI_FEST',
    name: 'Festive Season Promotional Campaign Offer',
    channel: 'WhatsApp',
    category: 'Marketing',
    status: 'Pending Approval',
    variables: ['{{customer_name}}', '{{offer_code}}'],
    lastUsed: 'Never',
    usageCount: 0,
    preview: 'Happy Festive Season {{customer_name}}! Enjoy 25% off on our enterprise call center lines with code {{offer_code}}.',
  },
  {
    id: 8,
    code: 'SMS_DLT_DISPATCH',
    name: 'Dispatched Hardware Delivery Alert',
    channel: 'SMS',
    category: 'Utility',
    status: 'Pending Approval',
    variables: ['{{order_id}}', '{{courier_name}}', '{{tracking_no}}'],
    lastUsed: 'Never',
    usageCount: 0,
    preview: 'Your VoIP Headset order {{order_id}} has been dispatched via {{courier_name}}. Tracking: {{tracking_no}}.',
  },
];

export const TemplatesDirectoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<UnifiedTemplate[]>(INITIAL_TEMPLATES);
  const [activeChannelTab, setActiveChannelTab] = useState<'All' | 'WhatsApp' | 'SMS' | 'Email'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form state for creating a quick template
  const [newName, setNewName] = useState('');
  const [newChannel, setNewChannel] = useState<'WhatsApp' | 'SMS' | 'Email'>('WhatsApp');
  const [newCategory, setNewCategory] = useState<'Transactional' | 'Marketing' | 'Utility' | 'OTP / Security'>('Marketing');
  const [newContent, setNewContent] = useState('');

  const filteredTemplates = templates.filter((t) => {
    if (activeChannelTab !== 'All' && t.channel !== activeChannelTab) return false;
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && t.status !== selectedStatus) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q) ||
        t.preview.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newContent.trim()) {
      toast.error('Validation Error', 'Template name and message content are required.');
      return;
    }

    const created: UnifiedTemplate = {
      id: Math.floor(Math.random() * 9000) + 100,
      code: `${newChannel.toUpperCase().slice(0, 2)}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      name: newName.trim(),
      channel: newChannel,
      category: newCategory,
      status: 'Approved',
      variables: ['{{customer_name}}', '{{date}}'],
      lastUsed: 'Just now',
      usageCount: 0,
      preview: newContent.trim(),
    };

    setTemplates([created, ...templates]);
    toast.success('Template Created', `"${newName}" created under ${newChannel} channel.`);
    setIsCreateModalOpen(false);
    setNewName('');
    setNewContent('');
  };

  const getChannelBadge = (ch: 'WhatsApp' | 'SMS' | 'Email') => {
    switch (ch) {
      case 'WhatsApp':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
            <MessageSquare className="w-3 h-3" /> WhatsApp
          </span>
        );
      case 'SMS':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#EF9612] border border-amber-200">
            <Smartphone className="w-3 h-3" /> SMS
          </span>
        );
      case 'Email':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0362FA] border border-blue-200">
            <Mail className="w-3 h-3" /> Email
          </span>
        );
    }
  };

  const getStatusBadge = (st: UnifiedTemplate['status']) => {
    switch (st) {
      case 'Approved':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
            Approved
          </span>
        );
      case 'Pending Approval':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-[#EF9612] border border-amber-200">
            Pending DLT/Meta
          </span>
        );
      case 'Draft':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Draft
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-200">
            Rejected
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Create Template Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center">
                  <FileCode2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Create Omni-Channel Template</h2>
                  <p className="text-[11px] text-slate-500">Add dynamic message format for CRM automated outreach</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTemplate} className="p-5 space-y-3.5 text-xs overflow-y-auto">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Template Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Follow-up Notice"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Channel</label>
                  <select
                    value={newChannel}
                    onChange={(e) => setNewChannel(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 bg-white"
                  >
                    <option value="WhatsApp">WhatsApp (Meta Cloud API)</option>
                    <option value="SMS">SMS (DLT Header)</option>
                    <option value="Email">Email (HTML / SMTP)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 bg-white"
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Transactional">Transactional</option>
                    <option value="Utility">Utility</option>
                    <option value="OTP / Security">OTP / Security</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700">Message Body *</label>
                  <div className="flex gap-1">
                    {['{{customer_name}}', '{{agent_name}}', '{{ticket_id}}'].map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => setNewContent((prev) => prev + ` ${v}`)}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-[#0362FA] hover:bg-blue-100"
                      >
                        +{v}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  rows={4}
                  placeholder="Type your template text here. Click chips above to insert variables..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800 leading-relaxed font-sans"
                />
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl text-[11px] text-[#0362FA] flex items-start gap-2">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  WhatsApp and DLT SMS templates will be queued for automated compliance verification. Email templates go live instantly.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Create Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Integrations & Templates</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">Message Templates Directory</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Message Templates</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Unified omnichannel repository for WhatsApp, SMS, and Email messaging across ATS Call Center.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/templates/whatsapp')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Studio</span>
          </button>
          <button
            onClick={() => navigate('/templates/sms')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 shadow-sm"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>SMS Studio</span>
          </button>
          <button
            onClick={() => navigate('/templates/email')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0362FA] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Studio</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Template</span>
          </button>
        </div>
      </div>

      {/* 4 Balanced KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Total Templates</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">{templates.length}</div>
            <div className="text-[11px] font-semibold text-[#13AB4A] mt-1">↗ +14 this month</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <FileCode2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">WhatsApp Approved</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {templates.filter((t) => t.channel === 'WhatsApp' && t.status === 'Approved').length}
            </div>
            <div className="text-[11px] font-semibold text-[#13AB4A] mt-1">Meta Cloud Tier-2</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#E9F9EE] text-[#13AB4A] flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">DLT Registered SMS</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {templates.filter((t) => t.channel === 'SMS' && t.status === 'Approved').length}
            </div>
            <div className="text-[11px] font-semibold text-[#EF9612] mt-1">Airtel / Jio DLT Active</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#EF9612] flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Email Templates</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {templates.filter((t) => t.channel === 'Email').length}
            </div>
            <div className="text-[11px] font-semibold text-purple-600 mt-1">98.4% Delivery SLA</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-600 overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { key: 'All', label: 'All Channels' },
          { key: 'WhatsApp', label: 'WhatsApp Only' },
          { key: 'SMS', label: 'SMS Only' },
          { key: 'Email', label: 'Email Only' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveChannelTab(tab.key as any)}
            className={`pb-2.5 transition-colors relative ${
              activeChannelTab === tab.key
                ? 'text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]'
                : 'hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        {/* Filter Bar */}
        <div className="p-3.5 border-b border-[#E5EBF2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#FAFCFF]">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates or variables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
            >
              <option value="All">All Categories</option>
              <option value="Marketing">Marketing</option>
              <option value="Transactional">Transactional</option>
              <option value="Utility">Utility</option>
              <option value="OTP / Security">OTP / Security</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Draft">Draft</option>
            </select>

            {(searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All' || activeChannelTab !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                  setActiveChannelTab('All');
                  toast.info('Filters Reset', 'Displaying all omni-channel templates');
                }}
                className="text-xs text-[#0362FA] font-semibold hover:underline px-1.5"
              >
                Reset
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{filteredTemplates.length}</span> templates
          </div>
        </div>

        {/* Anti-Shrink Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[950px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-[#E5EBF2]">
                <th className="py-2.5 px-3 w-8">#</th>
                <th className="py-2.5 px-3">Template Name & Code</th>
                <th className="py-2.5 px-3">Channel</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Message Preview</th>
                <th className="py-2.5 px-3">Variables</th>
                <th className="py-2.5 px-3">Total Sent</th>
                <th className="py-2.5 px-3">Last Sent</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTemplates.map((t) => (
                <tr key={t.id} className="hover:bg-[#F0F7FF] transition-colors">
                  <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{t.id}</td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{t.code}</div>
                  </td>
                  <td className="py-3 px-3">{getChannelBadge(t.channel)}</td>
                  <td className="py-3 px-3 text-slate-700 font-medium">{t.category}</td>
                  <td className="py-3 px-3">{getStatusBadge(t.status)}</td>
                  <td className="py-3 px-3 max-w-[260px] truncate text-slate-600 text-[11px]" title={t.preview}>
                    {t.preview}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1 max-w-[160px]">
                      {t.variables.slice(0, 2).map((v) => (
                        <span key={v} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700">
                          {v}
                        </span>
                      ))}
                      {t.variables.length > 2 && (
                        <span className="text-[10px] text-slate-400">+{t.variables.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-800 font-mono">
                    {t.usageCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px]">{t.lastUsed}</td>
                  <td className="py-3 px-3 text-center">
                    <ActionMenu
                      onView={() => toast.info('Preview', `Previewing ${t.channel} template: "${t.name}"`)}
                      onEdit={() => toast.info('Edit Template', `Editing ${t.code}`)}
                      onDuplicate={() => {
                        const copy = { ...t, id: Math.floor(Math.random() * 9000) + 100, name: `${t.name} (Copy)` };
                        setTemplates([copy, ...templates]);
                        toast.success('Duplicated', `Created copy of ${t.name}`);
                      }}
                      onDelete={() => {
                        setTemplates(templates.filter((item) => item.id !== t.id));
                        toast.success('Deleted', `Template ${t.name} deleted.`);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8FAFC] border-t border-[#E5EBF2] flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-800">{filteredTemplates.length}</span> of {templates.length} templates
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.info('Export', 'Exporting template registry to CSV...')}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              Export Registry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
