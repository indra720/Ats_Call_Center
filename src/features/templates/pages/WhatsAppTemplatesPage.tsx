import React, { useState } from 'react';
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  Send,
  Plus,
  Search,
  ChevronDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  BookOpen,
  Bold,
  Italic,
  Link,
  Smile,
  Phone,
  Video,
  Paperclip,
  Camera,
  Mic,
  ArrowUpRight,
  ExternalLink,
  Trash2,
} from 'lucide-react';

interface TemplateItem {
  id: number;
  name: string;
  category: string;
  language: string;
  type: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  updatedOn: string;
}

const TEMPLATES_DATA: TemplateItem[] = [
  { id: 1, name: 'Welcome Message', category: 'General', language: 'Hindi', type: 'Text', status: 'Approved', updatedOn: '19 Oct 2026' },
  { id: 2, name: 'Lead Follow-up', category: 'Follow-up', language: 'Hindi', type: 'Text', status: 'Approved', updatedOn: '18 Oct 2026' },
  { id: 3, name: 'Demo Schedule', category: 'Appointment', language: 'English', type: 'Text + Button', status: 'Approved', updatedOn: '17 Oct 2026' },
  { id: 4, name: 'Payment Reminder', category: 'Payments', language: 'Hindi', type: 'Text', status: 'Pending', updatedOn: '16 Oct 2026' },
  { id: 5, name: 'KYC Verification', category: 'Verification', language: 'English', type: 'Text + Button', status: 'Approved', updatedOn: '15 Oct 2026' },
  { id: 6, name: 'Account Activation', category: 'Account', language: 'Hindi', type: 'Text', status: 'Approved', updatedOn: '14 Oct 2026' },
  { id: 7, name: 'Order Confirmation', category: 'Notifications', language: 'English', type: 'Text + Media', status: 'Approved', updatedOn: '13 Oct 2026' },
  { id: 8, name: 'Support Response', category: 'Support', language: 'Hindi', type: 'Text', status: 'Approved', updatedOn: '12 Oct 2026' },
  { id: 9, name: 'Promotional Offer', category: 'Marketing', language: 'Hindi', type: 'Text + Button', status: 'Approved', updatedOn: '11 Oct 2026' },
  { id: 10, name: 'Feedback Request', category: 'Feedback', language: 'English', type: 'Text', status: 'Approved', updatedOn: '10 Oct 2026' },
];

export const WhatsAppTemplatesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'categories' | 'variables' | 'builder'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>(TEMPLATES_DATA[1]);
  const [templateName, setTemplateName] = useState('Lead Follow-up');
  const [category, setCategory] = useState('Follow-up');
  const [language, setLanguage] = useState('Hindi');
  const [messageType, setMessageType] = useState('Text');
  const [messageContent, setMessageContent] = useState(
    'नमस्ते {{name}},\n\nआपने ATS Call Center में अपनी रुचि दिखाई इसके लिए धन्यवाद 🙏.\n\nक्या हम आपके लिए एक डेमो कॉल शेड्यूल कर सकते हैं?\n\nकृपया नीचे दिए गए बटन पर क्लिक करके अपनी सुविधा के अनुसार समय चुनें।'
  );

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">WhatsApp Templates</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">WhatsApp Templates</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, manage and send WhatsApp message templates for your leads, customers and campaigns.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>Template Guidelines</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Import Templates</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm">
            <Plus className="w-3.5 h-3.5" />
            <span>Create Template</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* Total Templates */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-500">Total Templates</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">24</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>5 this month</span>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-500">Approved</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">18</div>
          <div className="text-[11px] font-semibold text-[#13AB4A]">75% approval rate</div>
        </div>

        {/* Pending Approval */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-[#EF9612]">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-500">Pending Approval</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">4</div>
          <div className="text-[11px] font-semibold text-[#EF9612]">Needs review</div>
        </div>

        {/* Rejected */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FEECEE] flex items-center justify-center text-[#E73647]">
              <XCircle className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-500">Rejected</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">2</div>
          <div className="text-[11px] font-semibold text-[#E73647]">8% rejection rate</div>
        </div>

        {/* Messages Sent */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#871CF4]">
              <Send className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-500">Messages Sent</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">12,486</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>22% this month</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-600">
        {[
          { key: 'templates', label: 'Templates' },
          { key: 'categories', label: 'Template Categories' },
          { key: 'variables', label: 'Template Variables' },
          { key: 'builder', label: 'Message Builder' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-2.5 transition-colors relative ${
              activeTab === tab.key
                ? 'text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]'
                : 'hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3-Column Layout: Left (Table + Variables) ~40% | Center (Builder Form) ~35% | Right (Phone Preview) ~25% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Template List & Variables (~40%) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
            {/* Filter Bar */}
            <div className="p-3 border-b border-[#E5EBF2] space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search templates by name, content or category..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 text-[11px]">
                <select className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700">
                  <option>Category: All</option>
                  <option>Follow-up</option>
                  <option>General</option>
                </select>
                <select className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700">
                  <option>Status: All</option>
                  <option>Approved</option>
                  <option>Pending</option>
                </select>
                <select className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700">
                  <option>Language: All</option>
                  <option>Hindi</option>
                  <option>English</option>
                </select>
                <button className="text-[#0362FA] font-semibold hover:underline ml-auto">Reset</button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-[#E5EBF2]">
                    <th className="py-2 px-2.5 w-6">
                      <input type="checkbox" className="rounded border-slate-300 text-[#0362FA]" />
                    </th>
                    <th className="py-2 px-1.5 w-5 text-slate-400">#</th>
                    <th className="py-2 px-2">Template Name</th>
                    <th className="py-2 px-2">Category</th>
                    <th className="py-2 px-2">Language</th>
                    <th className="py-2 px-2">Type</th>
                    <th className="py-2 px-2">Status</th>
                    <th className="py-2 px-2">Updated On</th>
                    <th className="py-2 px-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TEMPLATES_DATA.map((t) => {
                    const isSelected = selectedTemplate.id === t.id;
                    return (
                      <tr
                        key={t.id}
                        onClick={() => {
                          setSelectedTemplate(t);
                          setTemplateName(t.name);
                        }}
                        className={`hover:bg-[#F0F7FF] transition-colors cursor-pointer text-[11px] ${
                          isSelected ? 'bg-blue-50/60' : ''
                        }`}
                      >
                        <td className="py-2 px-2.5" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-slate-300 text-[#0362FA]" />
                        </td>
                        <td className="py-2 px-1.5 text-slate-400 font-mono">{t.id}</td>
                        <td className="py-2 px-2 font-semibold text-slate-900">{t.name}</td>
                        <td className="py-2 px-2 text-slate-600">{t.category}</td>
                        <td className="py-2 px-2 text-slate-600">{t.language}</td>
                        <td className="py-2 px-2 text-slate-500">{t.type}</td>
                        <td className="py-2 px-2">
                          {t.status === 'Approved' && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                              Approved
                            </span>
                          )}
                          {t.status === 'Pending' && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-[#EF9612] border border-amber-200">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-2 text-slate-500">{t.updatedOn}</td>
                        <td className="py-2 px-2 text-center">
                          <button className="text-slate-400 hover:text-slate-700">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-[#F8FAFC] border-t border-[#E5EBF2] flex items-center justify-between text-[11px] text-slate-600">
              <span>Showing 1 to 10 of 24 templates</span>
              <div className="flex items-center gap-1">
                <button className="p-1 border rounded bg-white"><ChevronLeft className="w-3 h-3" /></button>
                <button className="px-2 py-0.5 bg-[#0362FA] text-white font-bold rounded">1</button>
                <button className="px-2 py-0.5 bg-white border rounded">2</button>
                <button className="px-2 py-0.5 bg-white border rounded">3</button>
                <button className="p-1 border rounded bg-white"><ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
          </div>

          {/* Template Variables Palette */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3.5 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">Template Variables</h4>
            <p className="text-[11px] text-slate-500">Use these variables to personalize your WhatsApp messages.</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { tag: '{{name}}', label: 'Contact name' },
                { tag: '{{phone}}', label: 'Phone number' },
                { tag: '{{company}}', label: 'Company name' },
                { tag: '{{agent_name}}', label: 'Agent name' },
                { tag: '{{appointment_date}}', label: 'Appointment date' },
                { tag: '{{campaign_name}}', label: 'Campaign name' },
                { tag: '{{deal_value}}', label: 'Deal value' },
                { tag: '{{order_id}}', label: 'Order ID' },
              ].map((v, i) => (
                <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer hover:bg-blue-50 transition-colors">
                  <div className="font-mono text-[11px] font-bold text-[#0362FA]">{v.tag}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{v.label}</div>
                </div>
              ))}
              <button className="p-2 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-600 hover:border-[#0362FA] hover:text-[#0362FA]">
                <Plus className="w-3 h-3" />
                <span>Add Variable</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center Column: Create / Edit WhatsApp Template Form (~38%) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3.5">
          <h3 className="text-sm font-bold text-slate-900">Create / Edit WhatsApp Template</h3>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Template Name *</label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs"
              >
                <option>Follow-up</option>
                <option>General</option>
                <option>Marketing</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Language *</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs"
              >
                <option>Hindi</option>
                <option>English</option>
              </select>
            </div>
          </div>

          {/* Message Type Buttons */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">Message Type</label>
            <div className="flex flex-wrap gap-1.5">
              {['Text', 'Media', 'Buttons', 'List', 'Interactive'].map((t) => (
                <button
                  key={t}
                  onClick={() => setMessageType(t)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    messageType === t
                      ? 'bg-[#0362FA] text-white border-[#0362FA]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Message Content with Formatting Toolbar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <label className="font-semibold text-slate-700">Message Content *</label>
              <div className="flex items-center gap-1.5">
                <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><Bold className="w-3 h-3" /></button>
                <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><Italic className="w-3 h-3" /></button>
                <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><Link className="w-3 h-3" /></button>
                <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><Smile className="w-3 h-3" /></button>
                <select className="text-[11px] border border-slate-200 rounded px-1.5 py-0.5 text-slate-700">
                  <option>Variables ˇ</option>
                  <option>{'{{name}}'}</option>
                  <option>{'{{company}}'}</option>
                </select>
              </div>
            </div>

            <textarea
              rows={5}
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="w-full p-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#0362FA] leading-relaxed"
            />
            <div className="text-right text-[10px] text-slate-400">212/1024</div>
          </div>

          {/* Add Buttons (Optional) */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-700 block">Add Buttons (Optional)</label>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  defaultValue="डेमो शेड्यूल करें"
                  className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                />
                <select className="px-2 py-1.5 border border-slate-200 rounded-lg text-slate-700">
                  <option>URL</option>
                  <option>Quick Reply</option>
                  <option>Phone Number</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  defaultValue="हमसे चैट करें"
                  className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                />
                <select className="px-2 py-1.5 border border-slate-200 rounded-lg text-slate-700">
                  <option>Quick Reply</option>
                  <option>URL</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  defaultValue="कॉल करें"
                  className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                />
                <select className="px-2 py-1.5 border border-slate-200 rounded-lg text-slate-700">
                  <option>Phone Number</option>
                  <option>URL</option>
                </select>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-semibold text-[#0362FA] hover:underline pt-1">
                <Plus className="w-3 h-3" />
                <span>Add Button</span>
              </button>
            </div>
          </div>

          {/* Media (Optional) */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-700 block">Media (Optional)</label>
            <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-slate-200 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop"
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-[11px]">demo-banner.jpg</div>
                  <div className="text-[10px] text-slate-400">256 KB</div>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
              Save as Draft
            </button>
            <button className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm">
              Save Template
            </button>
          </div>
        </div>

        {/* Right Column: Realistic Smartphone WhatsApp Mockup (~32%) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-800 mb-1">
            <span className="text-[#0362FA] border-b-2 border-[#0362FA] pb-1">WhatsApp Preview</span>
            <span className="text-slate-400 hover:text-slate-700 cursor-pointer pb-1">Variables Preview</span>
          </div>

          {/* Phone Frame */}
          <div className="w-full max-w-[310px] mx-auto bg-slate-900 rounded-[36px] p-3 shadow-2xl border-4 border-slate-800 relative">
            {/* Top Speaker / Camera Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-900 rounded-full z-20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2" />
              <div className="w-8 h-1 rounded-full bg-slate-800" />
            </div>

            {/* Inner Phone Screen */}
            <div className="bg-[#EFEAE2] rounded-[26px] overflow-hidden flex flex-col h-[520px] relative text-xs">
              {/* WhatsApp Green Top Bar */}
              <div className="bg-[#075E54] text-white px-3 pt-5 pb-2.5 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4 cursor-pointer" />
                  <div className="w-7 h-7 rounded-full bg-white text-[#075E54] font-bold text-[10px] flex items-center justify-center">
                    ATS
                  </div>
                  <div>
                    <div className="font-bold text-[11px] leading-tight flex items-center gap-1">
                      ATS Call Center
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 fill-current" />
                    </div>
                    <div className="text-[9px] text-emerald-200">Business Account</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Video className="w-3.5 h-3.5" />
                  <Phone className="w-3.5 h-3.5" />
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Chat Canvas Area */}
              <div className="flex-1 p-2.5 overflow-y-auto space-y-2 flex flex-col justify-end">
                {/* Message Bubble */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200/60 overflow-hidden max-w-[94%] self-start space-y-1.5">
                  {/* Banner Image */}
                  <div className="w-full h-24 bg-slate-100 overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop"
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent flex items-end p-2">
                      <div className="text-[10px] text-white font-bold">ATS Call Center — Smarter Communication</div>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="p-2 space-y-1 text-[11px] text-slate-800 leading-relaxed font-sans">
                    <p>नमस्ते Rohit Sharma,</p>
                    <p>आपने ATS Call Center में अपनी रुचि दिखाई इसके लिए धन्यवाद 🙏.</p>
                    <p>क्या हम आपके लिए एक डेमो कॉल शेड्यूल कर सकते हैं?</p>
                    <p className="text-[10px] text-slate-600">कृपया नीचे दिए गए बटन पर क्लिक करके अपनी सुविधा के अनुसार समय चुनें।</p>
                    <div className="text-right text-[9px] text-slate-400 font-mono">11:32 AM</div>
                  </div>

                  {/* Action Buttons Inside Bubble */}
                  <div className="border-t border-slate-100 divide-y divide-slate-100 text-[11px] font-semibold text-[#0362FA] text-center">
                    <button className="w-full py-1.5 hover:bg-slate-50 flex items-center justify-center gap-1.5">
                      <span>📅</span> <span>डेमो शेड्यूल करें</span>
                    </button>
                    <button className="w-full py-1.5 hover:bg-slate-50 flex items-center justify-center gap-1.5">
                      <span>💬</span> <span>हमसे चैट करें</span>
                    </button>
                    <button className="w-full py-1.5 hover:bg-slate-50 flex items-center justify-center gap-1.5">
                      <span>📞</span> <span>कॉल करें</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom WhatsApp Input Bar */}
              <div className="bg-[#F0F2F5] px-2 py-1.5 flex items-center gap-1.5 border-t border-slate-200">
                <Smile className="w-4 h-4 text-slate-500" />
                <div className="flex-1 bg-white rounded-full px-3 py-1 text-[11px] text-slate-400 shadow-xs">
                  Type a message...
                </div>
                <Paperclip className="w-4 h-4 text-slate-500" />
                <Camera className="w-4 h-4 text-slate-500" />
                <div className="w-7 h-7 rounded-full bg-[#128C7E] text-white flex items-center justify-center shadow-xs">
                  <Mic className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
