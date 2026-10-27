import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Smartphone,
  Mail,
  Calendar,
  Clock,
  User,
  Building,
  CheckCircle2,
  Edit2,
  Plus,
  Star,
  Tag,
  Activity,
  FileText,
  Sparkles,
  Share2,
  DollarSign,
  Play,
  Pause,
  Download,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { toast } from '@/store/toastStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

export const LeadDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const startCall = useUIStore((state) => state.startCall);

  const [activeTab, setActiveTab] = useState<'timeline' | 'calls' | 'notes' | 'whatsapp' | 'emails'>('timeline');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [currentStage, setCurrentStage] = useState<'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won'>('Qualified');

  // Lead mock data
  const [lead, setLead] = useState({
    id: id || 'LD-4092',
    name: 'Vikramaditya Singhania',
    company: 'Apex Logistics & Freight India Pvt Ltd',
    title: 'Managing Director & VP Operations',
    phone: '+91 98201 44521',
    email: 'vikram.singhania@apexlogistics.in',
    city: 'Mumbai, Maharashtra',
    source: 'Google Paid Search',
    status: 'Hot Lead',
    assignedTo: 'Aakash Sharma',
    assignedAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop',
    dealValue: '₹6,50,000',
    leadScore: 92,
    createdOn: '14 Oct 2026',
    notes: [
      {
        id: 1,
        author: 'Aakash Sharma',
        date: 'Today, 2:30 PM',
        text: 'Client requested demo for 40 agent seats. Very interested in WhatsApp API and Call Recording modules. Follow-up demo call scheduled for tomorrow.',
      },
      {
        id: 2,
        author: 'Yashika Kanwar',
        date: 'Yesterday, 11:15 AM',
        text: 'Initial qualification call completed. Decision maker confirmed. Needs PRI trunk integration with existing PBX.',
      },
    ],
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    setLead((prev) => ({
      ...prev,
      notes: [
        {
          id: Date.now(),
          author: 'You (Current Agent)',
          date: 'Just now',
          text: newNoteText.trim(),
        },
        ...prev.notes,
      ],
    }));
    toast.success('Note Added', 'Note attached to lead profile.');
    setNewNoteText('');
  };

  const STAGES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won'] as const;

  return (
    <div className="space-y-4">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/leads/all')}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            title="Back to Leads"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{lead.name}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                {lead.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{lead.company}</span>
              <span>•</span>
              <span className="font-mono text-slate-400">ID: {lead.id}</span>
            </p>
          </div>
        </div>

        {/* Quick Omnichannel Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() =>
              startCall({
                contactName: lead.name,
                phoneNumber: lead.phone,
                companyName: lead.company,
              })
            }
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm active:scale-95 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Lead</span>
          </button>
          <button
            onClick={() => {
              navigate('/templates/whatsapp');
              toast.info('WhatsApp Studio', `Opening chat templates for ${lead.phone}`);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-lg shadow-xs transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => {
              navigate('/templates/sms');
              toast.info('SMS Studio', `Opening DLT SMS templates for ${lead.phone}`);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 rounded-lg shadow-xs transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>SMS</span>
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              toast.success('Link Copied', 'Lead profile URL copied to clipboard.');
            }}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
            title="Share Lead"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stage Progression Stepper */}
      <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>Lead Pipeline Stage</span>
          <span className="text-[#0362FA] font-bold">Currently: {currentStage}</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {STAGES.map((stage, idx) => {
            const isCompleted = STAGES.indexOf(currentStage) >= idx;
            const isCurrent = currentStage === stage;
            return (
              <button
                key={stage}
                onClick={() => {
                  setCurrentStage(stage);
                  toast.success('Stage Updated', `Lead moved to "${stage}" stage.`);
                }}
                className={cn(
                  'py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1',
                  isCurrent
                    ? 'bg-[#0362FA] text-white shadow-xs ring-2 ring-blue-300'
                    : isCompleted
                    ? 'bg-blue-50 text-[#0362FA] hover:bg-blue-100'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                )}
              >
                {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                <span className="truncate">{stage}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Modern Responsive KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0362FA] border border-blue-100">
              Inbound & Out
            </span>
          </div>
          <div className="mt-2 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">14 Calls</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Total Touchpoints</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#13AB4A] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#13AB4A] border border-emerald-100">
              40 Seats
            </span>
          </div>
          <div className="mt-2 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{lead.dealValue}</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Estimated ARR</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">
              Top Tier
            </span>
          </div>
          <div className="mt-2 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{lead.leadScore} / 100</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">AI Propensity Score</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#EF9612] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
              Active Today
            </span>
          </div>
          <div className="mt-2 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Today, 2:15 PM</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Last Call Attempt</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Details & Tabs (8 cols) | Right Lead Metadata & Follow-up (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Section */}
        <div className="lg:col-span-8 space-y-4">
          {/* Tabs */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="flex items-center gap-4 px-4 pt-3 border-b border-slate-200 text-xs font-semibold text-slate-600 overflow-x-auto scrollbar-none whitespace-nowrap">
              {[
                { key: 'timeline', label: 'Activity Timeline' },
                { key: 'calls', label: 'Call Records (4)' },
                { key: 'notes', label: 'Internal Notes (2)' },
                { key: 'whatsapp', label: 'WhatsApp Chat' },
                { key: 'emails', label: 'Email Log' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={cn(
                    'pb-3 relative transition-colors',
                    activeTab === tab.key
                      ? 'text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]'
                      : 'hover:text-slate-900'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Timeline */}
            {activeTab === 'timeline' && (
              <div className="p-4 space-y-4">
                <div className="relative pl-6 border-l-2 border-blue-200 space-y-5">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#0362FA] ring-4 ring-blue-100 flex items-center justify-center text-white text-[8px]" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">Outbound Call Answered (14m 22s)</span>
                      <span className="text-[11px] text-slate-400">Today, 2:15 PM</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Agent <strong>Aakash Sharma</strong> connected with Vikramaditya. Discussed customized telephony packages for their Mumbai warehouse.
                    </p>
                    <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-7 h-7 rounded-full bg-[#0362FA] text-white flex items-center justify-center hover:bg-blue-600"
                        >
                          {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                        </button>
                        <span className="font-mono text-[11px] text-slate-700">rec_ld_4092_20261027.mp3</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">14:22</span>
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100 flex items-center justify-center text-white text-[8px]" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">WhatsApp Brochure Dispatched</span>
                      <span className="text-[11px] text-slate-400">Yesterday, 4:20 PM</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Automated Meta template <em>WA_PROPOSAL_V2</em> delivered and read.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-100 flex items-center justify-center text-white text-[8px]" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">Inbound Web Enquiry Generated</span>
                      <span className="text-[11px] text-slate-400">14 Oct 2026, 10:14 AM</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Lead created via Google Paid Search campaign targeting &quot;Best Cloud PBX India&quot;.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Call Records */}
            {activeTab === 'calls' && (
              <div className="p-4 space-y-3">
                {[
                  { id: 1, type: 'Outbound', duration: '14m 22s', date: 'Today, 2:15 PM', disposition: 'Interested - Demo Required', agent: 'Aakash Sharma' },
                  { id: 2, type: 'Inbound', duration: '3m 10s', date: 'Yesterday, 11:15 AM', disposition: 'Callback Requested', agent: 'Yashika Kanwar' },
                  { id: 3, type: 'Outbound', duration: '0m 45s', date: '18 Oct 2026', disposition: 'Voicemail Left', agent: 'Aakash Sharma' },
                ].map((c) => (
                  <div key={c.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{c.type} Call • {c.duration}</div>
                        <div className="text-[11px] text-slate-500">{c.date} by {c.agent}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {c.disposition}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Notes */}
            {activeTab === 'notes' && (
              <div className="p-4 space-y-4">
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={3}
                    placeholder="Add an internal agent note or meeting summary..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                    >
                      Save Note
                    </button>
                  </div>
                </form>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {lead.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{note.author}</span>
                        <span className="text-[10px] text-slate-400">{note.date}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: WhatsApp */}
            {activeTab === 'whatsapp' && (
              <div className="p-4 space-y-3">
                <div className="p-3 bg-[#E9F9EE] rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#13AB4A]" />
                    <span>WhatsApp Opt-in Confirmed ({lead.phone})</span>
                  </div>
                  <button
                    onClick={() => navigate('/templates/whatsapp')}
                    className="font-bold text-[#13AB4A] hover:underline"
                  >
                    Open Studio →
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="p-2.5 bg-emerald-600 text-white rounded-lg max-w-sm ml-auto text-left">
                    Hi Vikramaditya! Thank you for speaking with ATS Call Center today. Here is our product brochure and API documentation.
                    <div className="text-[9px] text-emerald-200 text-right mt-1">2:31 PM • Read</div>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg max-w-sm mr-auto text-left">
                    Thanks Aakash! We will review with our IT team and connect on tomorrow&apos;s call.
                    <div className="text-[9px] text-slate-400 text-right mt-1">2:45 PM</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Email */}
            {activeTab === 'emails' && (
              <div className="p-4 space-y-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Quotation #QT-9912 Sent</span>
                    <span className="text-[10px] text-slate-400">18 Oct 2026, 4:10 PM</span>
                  </div>
                  <div className="text-[11px] text-slate-500">To: {lead.email}</div>
                  <p className="text-slate-600 mt-1">Enterprise Telephony Proposal with 40 seat licenses and Twilio SIP Trunking.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Contact Profile Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Contact Overview</h3>
              <button
                onClick={() => toast.info('Edit Lead', 'Opening lead edit modal...')}
                className="p-1 rounded text-slate-400 hover:text-[#0362FA]"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Phone Number</span>
                <span className="font-bold text-slate-900 font-mono text-xs">{lead.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email Address</span>
                <span className="font-bold text-[#0362FA] font-mono text-xs">{lead.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Location</span>
                <span className="text-slate-800">{lead.city}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Lead Source</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0362FA]">
                  {lead.source}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Assigned Agent</span>
                <div className="flex items-center gap-2 mt-1">
                  <img src={lead.assignedAvatar} alt={lead.assignedTo} className="w-6 h-6 rounded-full object-cover" />
                  <span className="font-bold text-slate-800">{lead.assignedTo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
