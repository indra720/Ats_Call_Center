import React, { useState } from 'react';
import {
  Mail,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Copy,
  Sparkles,
  CheckCircle2,
  Clock,
  Send,
  X,
  FileCode,
  PenTool,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  MessageSquare,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  category: 'Quotation' | 'Onboarding' | 'Follow-up' | 'Billing' | 'Support';
  openRate: string;
  clickRate: string;
  lastUpdated: string;
  status: 'Active' | 'Draft' | 'Archived';
  bodySnippet: string;
}

interface AgentSignature {
  id: number;
  agentName: string;
  title: string;
  phone: string;
  email: string;
  department: string;
  isDefault: boolean;
  avatar: string;
}

const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 1,
    name: 'Enterprise Telephony Proposal & Pricing Quotation',
    subject: 'ATS Call Center - Bespoke Enterprise Solution for {{company_name}}',
    category: 'Quotation',
    openRate: '58.4%',
    clickRate: '24.1%',
    lastUpdated: 'Today, 11:20 AM',
    status: 'Active',
    bodySnippet: 'Dear {{contact_name}}, Thank you for your interest in ATS Call Center. Attached is our customized quote tailored for your 50+ agent team.',
  },
  {
    id: 2,
    name: 'New Agent Account Credentials & Login Guide',
    subject: 'Welcome to ATS Call Center - Your Agent Login Credentials',
    category: 'Onboarding',
    openRate: '88.2%',
    clickRate: '62.4%',
    lastUpdated: 'Yesterday, 04:15 PM',
    status: 'Active',
    bodySnippet: 'Hello {{agent_name}}, Your workspace is ready! Login with your company email and temporary pass code {{temp_password}}.',
  },
  {
    id: 3,
    name: 'Post-Call Summary & Follow-up Action Items',
    subject: 'Notes from our call today regarding ATS Telephony integration',
    category: 'Follow-up',
    openRate: '46.7%',
    clickRate: '18.9%',
    lastUpdated: '19 Oct 2026',
    status: 'Active',
    bodySnippet: 'Hi {{lead_name}}, Great speaking with you today. As discussed, here are the links to our API documentation and pricing calculator.',
  },
  {
    id: 4,
    name: 'Monthly Subscription Invoice & Payment Receipt',
    subject: 'Invoice #{{invoice_id}} for ATS Call Center Enterprise Cloud',
    category: 'Billing',
    openRate: '64.5%',
    clickRate: '31.2%',
    lastUpdated: '16 Oct 2026',
    status: 'Active',
    bodySnippet: 'Dear Accounts Team, Please find attached your monthly statement and GST tax invoice for billing cycle {{billing_cycle}}.',
  },
  {
    id: 5,
    name: 'Technical Support Ticket Resolution Notice',
    subject: 'Resolution Notice: Support Ticket #{{ticket_id}} Closed',
    category: 'Support',
    openRate: '52.1%',
    clickRate: '12.4%',
    lastUpdated: '14 Oct 2026',
    status: 'Active',
    bodySnippet: 'Hello {{customer_name}}, Your ticket regarding {{issue_summary}} has been resolved by {{agent_name}}. Please rate our service.',
  },
  {
    id: 6,
    name: 'Quarterly VoIP Line Review & Contract Renewal',
    subject: 'Important: Your annual ATS SIP Trunk agreement renews next month',
    category: 'Quotation',
    openRate: '39.8%',
    clickRate: '9.5%',
    lastUpdated: '10 Oct 2026',
    status: 'Draft',
    bodySnippet: 'Dear {{customer_name}}, We appreciate your partnership over the last 12 months. Early renewal locks in your existing rates.',
  },
];

const INITIAL_SIGNATURES: AgentSignature[] = [
  {
    id: 1,
    agentName: 'Aakash Sharma',
    title: 'Senior Enterprise Sales Director',
    phone: '+91 98765 43210',
    email: 'aakash@ats-telecom.com',
    department: 'Sales & Growth',
    isDefault: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
  },
  {
    id: 2,
    agentName: 'Yashika Kanwar',
    title: 'Customer Success Team Lead',
    phone: '+91 98234 56789',
    email: 'yashika@ats-telecom.com',
    department: 'Support & Success',
    isDefault: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  },
  {
    id: 3,
    agentName: 'Sandeep Verma',
    title: 'Telephony Solutions Architect',
    phone: '+91 91234 56780',
    email: 'sandeep@ats-telecom.com',
    department: 'Engineering & Delivery',
    isDefault: false,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop',
  },
];

export const EmailTemplatesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'signatures'>('templates');
  const [templates, setTemplates] = useState<EmailTemplate[]>(INITIAL_EMAIL_TEMPLATES);
  const [signatures, setSignatures] = useState<AgentSignature[]>(INITIAL_SIGNATURES);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

  // New template form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<EmailTemplate['category']>('Quotation');
  const [newBody, setNewBody] = useState('');

  // New signature form state
  const [sigName, setSigName] = useState('');
  const [sigTitle, setSigTitle] = useState('');
  const [sigPhone, setSigPhone] = useState('');
  const [sigEmail, setSigEmail] = useState('');

  const filteredTemplates = templates.filter((t) => {
    if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.bodySnippet.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSubject.trim()) {
      toast.error('Validation Error', 'Template title and subject are required.');
      return;
    }

    const created: EmailTemplate = {
      id: Math.floor(Math.random() * 9000) + 100,
      name: newTitle.trim(),
      subject: newSubject.trim(),
      category: newCategory,
      openRate: '0.0%',
      clickRate: '0.0%',
      lastUpdated: 'Just now',
      status: 'Active',
      bodySnippet: newBody.trim() || 'Custom HTML email template for client correspondence.',
    };

    setTemplates([created, ...templates]);
    toast.success('Email Template Created', `"${newTitle}" is now live and selectable in CRM workflows.`);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewSubject('');
    setNewBody('');
  };

  const handleCreateSignature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sigName.trim() || !sigTitle.trim()) {
      toast.error('Validation Error', 'Agent name and job title are required.');
      return;
    }

    const newSig: AgentSignature = {
      id: Math.floor(Math.random() * 9000) + 100,
      agentName: sigName.trim(),
      title: sigTitle.trim(),
      phone: sigPhone.trim() || '+91 99999 88888',
      email: sigEmail.trim() || `${sigName.toLowerCase().replace(/\s+/g, '')}@ats-telecom.com`,
      department: 'Customer Operations',
      isDefault: false,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
    };

    setSignatures([...signatures, newSig]);
    toast.success('Signature Added', `Email signature created for ${sigName}.`);
    setIsSignatureModalOpen(false);
    setSigName('');
    setSigTitle('');
    setSigPhone('');
    setSigEmail('');
  };

  return (
    <div className="space-y-4">
      {/* Create Email Template Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Create HTML Email Template</h2>
                  <p className="text-[11px] text-slate-500">Design dynamic transactional and sales emails</p>
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
                <label className="text-[11px] font-bold text-slate-700">Internal Template Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Inbound Demo Confirmation"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 bg-white"
                  >
                    <option value="Quotation">Quotation & Proposals</option>
                    <option value="Onboarding">Onboarding & Credentials</option>
                    <option value="Follow-up">Lead Follow-up</option>
                    <option value="Billing">Billing & Receipts</option>
                    <option value="Support">Support Ticket Updates</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Status</label>
                  <select className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 bg-white">
                    <option>Active - Production</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700">Email Subject Line *</label>
                  <span className="text-[10px] text-slate-400">Supports variable tags</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. ATS Call Center Demo scheduled with {{agent_name}}"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700">HTML / Markdown Body</label>
                  <div className="flex gap-1">
                    {['{{lead_name}}', '{{company}}', '{{quote_link}}'].map((chip) => (
                      <button
                        type="button"
                        key={chip}
                        onClick={() => setNewBody((prev) => prev + ` ${chip}`)}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-[#0362FA] hover:bg-blue-100"
                      >
                        +{chip}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  rows={4}
                  placeholder="Dear {{lead_name}},\n\nThank you for reaching out..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-800 leading-relaxed font-sans"
                />
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

      {/* Add Signature Modal */}
      {isSignatureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">New Agent Signature</h2>
                  <p className="text-[11px] text-slate-500">Auto-appended to outbound emails and quotations</p>
                </div>
              </div>
              <button
                onClick={() => setIsSignatureModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSignature} className="p-5 space-y-3 text-xs overflow-y-auto">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Agent Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Kamlesh Kumar"
                  value={sigName}
                  onChange={(e) => setSigName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Job Title / Designation *</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Telephony Specialist"
                  value={sigTitle}
                  onChange={(e) => setSigTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Direct Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98765 00000"
                    value={sigPhone}
                    onChange={(e) => setSigPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="agent@ats.com"
                    value={sigEmail}
                    onChange={(e) => setSigEmail(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-800 text-[11px]">Brand Footer Preview:</div>
                <div className="text-[10px] text-slate-500">
                  ATS Call Center Systems Pvt Ltd • ISO 27001 Certified Cloud Telephony
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSignatureModalOpen(false)}
                  className="px-3.5 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Save Signature
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
            <span className="text-slate-700 font-semibold">Email Templates & Signatures</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Email Templates & Signatures</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage professional HTML email layouts, quotation designs, and agent contact signatures.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsSignatureModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
          >
            <PenTool className="w-3.5 h-3.5 text-slate-500" />
            <span>+ Add Signature</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Email Template</span>
          </button>
        </div>
      </div>

      {/* 4 Balanced KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Active Templates</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">18</div>
            <div className="text-[11px] font-semibold text-[#13AB4A] mt-1">↗ +3 this month</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Avg. Open Rate</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">58.2%</div>
            <div className="text-[11px] font-semibold text-[#13AB4A] mt-1">↗ 14% vs industry avg</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#E9F9EE] text-[#13AB4A] flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Click-Through Rate</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">24.6%</div>
            <div className="text-[11px] font-semibold text-[#0362FA] mt-1">High conversion</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Delivery SLA</span>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">99.8%</div>
            <div className="text-[11px] font-semibold text-[#13AB4A] mt-1">Amazon SES Connected</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-600 overflow-x-auto scrollbar-none whitespace-nowrap">
        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-2.5 transition-colors relative ${
            activeTab === 'templates'
              ? 'text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]'
              : 'hover:text-slate-900'
          }`}
        >
          Email Templates ({templates.length})
        </button>
        <button
          onClick={() => setActiveTab('signatures')}
          className={`pb-2.5 transition-colors relative ${
            activeTab === 'signatures'
              ? 'text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]'
              : 'hover:text-slate-900'
          }`}
        >
          Agent Signatures ({signatures.length})
        </button>
      </div>

      {/* Tab 1: Email Templates Table Card */}
      {activeTab === 'templates' && (
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
          {/* Table Filters */}
          <div className="p-3.5 border-b border-[#E5EBF2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#FAFCFF]">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search templates or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
              >
                <option value="All">All Categories</option>
                <option value="Quotation">Quotation</option>
                <option value="Onboarding">Onboarding</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Billing">Billing</option>
                <option value="Support">Support</option>
              </select>

              {(searchTerm || categoryFilter !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('All');
                    toast.info('Filters Reset', 'Displaying all email templates');
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
                  <th className="py-2.5 px-3">Template Name</th>
                  <th className="py-2.5 px-3">Subject Line Preview</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Open Rate</th>
                  <th className="py-2.5 px-3">Click Rate</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Last Updated</th>
                  <th className="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTemplates.map((t) => (
                  <tr key={t.id} className="hover:bg-[#F0F7FF] transition-colors">
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{t.id}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">{t.name}</td>
                    <td className="py-3 px-3 max-w-[280px] truncate text-slate-600" title={t.subject}>
                      {t.subject}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0362FA]">
                        {t.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-600 font-mono">{t.openRate}</td>
                    <td className="py-3 px-3 font-bold text-slate-800 font-mono">{t.clickRate}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          t.status === 'Active'
                            ? 'bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200'
                            : 'bg-amber-50 text-[#EF9612] border border-amber-200'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">{t.lastUpdated}</td>
                    <td className="py-3 px-3 text-center">
                      <ActionMenu
                        onView={() => toast.info('Email Preview', `Subject: ${t.subject}`)}
                        onEdit={() => toast.info('Edit Template', `Editing template #${t.id}`)}
                        onDuplicate={() => {
                          const copy = { ...t, id: Math.floor(Math.random() * 9000) + 100, name: `${t.name} (Copy)` };
                          setTemplates([copy, ...templates]);
                          toast.success('Duplicated', `Created copy of ${t.name}`);
                        }}
                        onDelete={() => {
                          setTemplates(templates.filter((item) => item.id !== t.id));
                          toast.success('Deleted', `Template ${t.name} removed.`);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Agent Signatures Grid */}
      {activeTab === 'signatures' && (
        <div className="space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {signatures.map((sig) => (
              <div
                key={sig.id}
                className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm hover:border-[#0362FA] transition-all space-y-3 relative group"
              >
                {sig.isDefault && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                    Default Team Signature
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <img
                    src={sig.avatar}
                    alt={sig.agentName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{sig.agentName}</h3>
                    <p className="text-xs text-[#0362FA] font-medium">{sig.title}</p>
                    <p className="text-[10px] text-slate-400">{sig.department}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 text-slate-600 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Phone:</span>
                    <span className="font-semibold text-slate-800">{sig.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Email:</span>
                    <span className="font-semibold text-slate-800">{sig.email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => toast.info('Preview Signature', `Previewing HTML signature for ${sig.agentName}`)}
                    className="text-[#0362FA] font-semibold hover:underline text-[11px]"
                  >
                    Preview HTML
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toast.info('Edit Signature', `Editing ${sig.agentName}'s signature`)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {!sig.isDefault && (
                      <button
                        onClick={() => {
                          setSignatures(signatures.filter((s) => s.id !== sig.id));
                          toast.success('Removed', `Signature for ${sig.agentName} removed.`);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
