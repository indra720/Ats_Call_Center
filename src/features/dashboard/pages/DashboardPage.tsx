import React, { useState } from 'react';
import {
  Users,
  PhoneCall,
  Headphones,
  Clock,
  Calendar,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  Phone,
  MessageSquare,
  Mail,
  ChevronRight,
  Pause,
  Grid,
  ArrowRightLeft,
  PhoneOff,
  Search,
  Filter,
  Check,
  Send,
  Eye,
  Edit,
  Trash2,
  SlidersHorizontal,
  RefreshCw,
  Download,
  Share2,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { LeadPipelineStrip } from '@/components/common/LeadPipelineStrip';
import { UserAvatar } from '@/components/common/UserAvatar';
import { ActionMenu } from '@/components/common/ActionMenu';
import { AddLeadModal } from '@/features/leads/components/AddLeadModal';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { usePermission } from '@/hooks/usePermission';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const startCall = useUIStore((state) => state.startCall);
  const { can } = usePermission();

  const [activeLeadTab, setActiveLeadTab] = useState('All Leads (12,480)');
  const [activeCallFilter, setActiveCallFilter] = useState<'Today' | 'This Week' | 'This Month'>('Today');
  const [activeAssistantTab, setActiveAssistantTab] = useState<'Suggestions' | 'Transcript' | 'Notes' | 'Analysis'>('Suggestions');
  const [isLiveCallPaused, setIsLiveCallPaused] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const [showTableFilter, setShowTableFilter] = useState(false);
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('All');

  // Exact hourly stacked call data from Screen 032
  const callAnalyticsData = [
    { hour: '9 AM', connected: 18, notAnswered: 8, busy: 3 },
    { hour: '10 AM', connected: 28, notAnswered: 12, busy: 4 },
    { hour: '11 AM', connected: 38, notAnswered: 15, busy: 5 },
    { hour: '12 PM', connected: 22, notAnswered: 9, busy: 3 },
    { hour: '1 PM', connected: 16, notAnswered: 7, busy: 2 },
    { hour: '2 PM', connected: 30, notAnswered: 11, busy: 4 },
    { hour: '3 PM', connected: 42, notAnswered: 14, busy: 5 },
    { hour: '4 PM', connected: 36, notAnswered: 12, busy: 4 },
    { hour: '5 PM', connected: 26, notAnswered: 8, busy: 3 },
    { hour: '6 PM', connected: 19, notAnswered: 6, busy: 2 },
    { hour: '7 PM', connected: 12, notAnswered: 4, busy: 1 },
  ];

  // Exact lead sources from Screen 032
  const leadSourcesData = [
    { name: 'Website', value: 3240, percentage: '26%', color: '#0362FA' },
    { name: 'Google Ads', value: 2480, percentage: '20%', color: '#10B981' },
    { name: 'Facebook Ads', value: 1960, percentage: '16%', color: '#871CF4' },
    { name: 'Referrals', value: 1520, percentage: '12%', color: '#EF9612' },
    { name: 'Direct Call', value: 1280, percentage: '10%', color: '#E73647' },
    { name: 'Others', value: 2000, percentage: '16%', color: '#06B6D4' },
  ];

  // Exact Recent Leads from Screen 032
  const recentLeads = [
    {
      id: '1',
      initials: 'RS',
      initialsColor: 'bg-[#E73647]',
      name: 'Rohit Sharma',
      contact: '+91 98765 43210',
      company: 'Tech Solutions',
      source: 'Website',
      status: 'New',
      statusColor: 'bg-[#EBF3FE] text-[#0362FA]',
      lastCall: 'Today, 10:15 AM',
      nextFollowUp: 'Today, 03:00 PM',
      assignedAgent: 'Amit Kumar',
      agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      initials: 'PK',
      initialsColor: 'bg-[#0362FA]',
      name: 'Priya Khanna',
      contact: '+91 91234 56789',
      company: 'Globex Corp',
      source: 'Google Ads',
      status: 'Contacted',
      statusColor: 'bg-[#EBF3FE] text-[#0362FA]',
      lastCall: 'Today, 09:45 AM',
      nextFollowUp: 'Today, 12:30 PM',
      assignedAgent: 'Sneha Verma',
      agentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      initials: 'AJ',
      initialsColor: 'bg-[#10B981]',
      name: 'Amit Jain',
      contact: '+91 99887 66554',
      company: 'Jain Traders',
      source: 'Referral',
      status: 'Qualified',
      statusColor: 'bg-[#F3E8FF] text-[#871CF4]',
      lastCall: 'Yesterday, 04:30 PM',
      nextFollowUp: 'Today, 11:00 AM',
      assignedAgent: 'Rahul Mehta',
      agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: '4',
      initials: 'SP',
      initialsColor: 'bg-[#EF9612]',
      name: 'Sunita Patel',
      contact: '+91 88776 55443',
      company: 'Patel Industries',
      source: 'LinkedIn',
      status: 'Proposal',
      statusColor: 'bg-[#FEF3E6] text-[#EF9612]',
      lastCall: 'Today, 11:20 AM',
      nextFollowUp: 'Today, 05:00 PM',
      assignedAgent: 'Neha Singh',
      agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: '5',
      initials: 'VK',
      initialsColor: 'bg-[#0362FA]',
      name: 'Vikram Singh',
      contact: '+91 77665 44332',
      company: 'AutoHaus',
      source: 'Cold Call',
      status: 'Negotiation',
      statusColor: 'bg-[#FDE8E8] text-[#E73647]',
      lastCall: 'Today, 09:10 AM',
      nextFollowUp: 'Tomorrow, 10:00 AM',
      assignedAgent: 'Arjun Rao',
      agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: '6',
      initials: 'MD',
      initialsColor: 'bg-[#10B981]',
      name: 'Meera Das',
      contact: '+91 98712 34567',
      company: 'Das Group',
      source: 'Website',
      status: 'Won',
      statusColor: 'bg-[#E6F7EC] text-[#13AB4A]',
      lastCall: 'Today, 08:45 AM',
      nextFollowUp: '-',
      assignedAgent: 'Pooja Sharma',
      agentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    },
  ];

  const filteredLeads = recentLeads.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      row.contact.includes(leadSearch) ||
      row.company.toLowerCase().includes(leadSearch.toLowerCase());

    const matchesSource =
      selectedSourceFilter === 'All' || row.source.toLowerCase() === selectedSourceFilter.toLowerCase();

    return matchesSearch && matchesSource;
  });

  return (
    <div className="space-y-4">
      {/* 1. Page Header matching screen-032 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Yashika'}! 👋
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Here&apos;s what&apos;s happening with your call center today.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date Picker Button */}
          <button
            onClick={() => toast.info('Selected Date', 'Currently viewing metrics for Monday, 19 Oct 2026.')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] text-[#475569] text-xs font-medium rounded-lg shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#8A99AD]" />
            <span>Mon, 19 Oct 2026</span>
          </button>

          {/* Add Lead */}
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>

          {/* Start Campaign */}
          <a
            href="/campaigns"
            className="flex items-center gap-1 px-3 py-1.5 bg-[#EBF3FE] hover:bg-[#D6E7FD] text-[#0362FA] text-xs font-bold rounded-lg border border-[#B0D2FB] transition-colors"
          >
            <span>🚀 Start Campaign</span>
          </a>

          {/* Make a Call */}
          <button
            onClick={() =>
              startCall({
                contactName: 'Rohit Sharma',
                phoneNumber: '+91 98765 43210',
                companyName: 'Tech Solutions Pvt Ltd',
              })
            }
            className="flex items-center gap-1 px-3 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Make a Call</span>
          </button>

          {/* Header ActionMenu for three dots */}
          <ActionMenu
            align="right"
            items={[
              {
                label: 'Refresh Realtime Metrics',
                icon: RefreshCw,
                onClick: () => toast.success('Dashboard Refreshed', 'Synced all agent queues and active telephony trunks.'),
              },
              {
                label: 'Customize KPI Layout',
                icon: SlidersHorizontal,
                onClick: () => toast.info('Customization Mode', 'Drag cards to rearrange your command center.'),
              },
              {
                label: 'Download Daily Operations Report',
                icon: Download,
                onClick: () => toast.info('Generating PDF', 'Compiling daily calls and conversion summary...'),
              },
            ]}
          />
        </div>
      </div>

      {/* 2. Main Canvas Grid (Left 8 cols / Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Top 4 KPI Cards - Responsive grid, sparklines NEVER overflow! */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
            <StatCard
              title="Total Leads"
              value="12,480"
              change="18.6%"
              changeType="positive"
              timeframe="vs last month"
              icon={<Users className="w-4 h-4" />}
              iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
              sparklineColor="bg-[#B0D2FB]"
              sparklineHeights={[30, 45, 60, 80, 55, 95]}
            />
            <StatCard
              title="Calls Today"
              value="1,284"
              change="12.4%"
              changeType="positive"
              timeframe="vs yesterday"
              icon={<Phone className="w-4 h-4" />}
              iconBgColor="bg-[#E6F7EC] text-[#10B981]"
              sparklineColor="bg-[#A7F3D0]"
              sparklineHeights={[40, 50, 75, 60, 85, 100]}
            />
            <StatCard
              title="Connected Calls"
              value="892"
              change="8.2%"
              changeType="positive"
              timeframe="69.5% connect rate"
              icon={<Headphones className="w-4 h-4" />}
              iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
              sparklineColor="bg-[#DDD6FE]"
              sparklineHeights={[50, 35, 65, 80, 70, 90]}
            />
            <StatCard
              title="Follow-ups Due"
              value="86"
              change="12.6%"
              changeType="negative"
              timeframe="pending follow-ups"
              icon={<Clock className="w-4 h-4" />}
              iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
              sparklineColor="bg-[#FDE68A]"
              sparklineHeights={[30, 60, 40, 75, 90, 85]}
            />
          </div>

          {/* Lead Pipeline 6-stage strip with interactive filters */}
          <LeadPipelineStrip />

          {/* Row: Call Analytics + Lead Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Call Analytics Card */}
            <div className="bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-[#0F172A]">Call Analytics</h3>
                <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-lg text-[11px] font-semibold text-[#64748B]">
                  {(['Today', 'This Week', 'This Month'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setActiveCallFilter(t);
                        toast.info('Analytics Range', `Viewing call volume for ${t.toLowerCase()}.`);
                      }}
                      className={cn(
                        'px-2 py-0.5 rounded-md transition-colors cursor-pointer',
                        activeCallFilter === t ? 'bg-[#0362FA] text-white shadow-2xs' : 'hover:text-slate-900'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-Metrics Row */}
              <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-100 text-center">
                <div>
                  <div className="text-[10px] text-[#64748B] flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full border-2 border-[#0362FA]" />
                    Total Calls
                  </div>
                  <div className="text-sm font-extrabold text-[#0F172A] mt-0.5">1,284</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#64748B] flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    Connected
                  </div>
                  <div className="text-sm font-extrabold text-[#10B981] mt-0.5">892 <span className="text-[10px] font-normal text-slate-400">(69.5%)</span></div>
                </div>
                <div>
                  <div className="text-[10px] text-[#64748B] flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#E73647]" />
                    Not Answered
                  </div>
                  <div className="text-sm font-extrabold text-[#E73647] mt-0.5">312 <span className="text-[10px] font-normal text-slate-400">(24.3%)</span></div>
                </div>
                <div>
                  <div className="text-[10px] text-[#64748B] flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#8A99AD]" />
                    Busy
                  </div>
                  <div className="text-sm font-extrabold text-[#64748B] mt-0.5">80 <span className="text-[10px] font-normal text-slate-400">(6.2%)</span></div>
                </div>
              </div>

              {/* Stacked Bar Chart */}
              <div className="h-[170px] w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={callAnalyticsData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                    <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: '#8A99AD' }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: '#8A99AD' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#02142B', color: '#fff', borderRadius: '8px', fontSize: '11px', border: 'none' }}
                    />
                    <Bar dataKey="connected" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} barSize={12} />
                    <Bar dataKey="notAnswered" stackId="a" fill="#0362FA" radius={[0, 0, 0, 0]} barSize={12} />
                    <Bar dataKey="busy" stackId="a" fill="#CBD5E1" radius={[3, 3, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lead Sources Card with Donut Chart and Legend Table */}
            <div className="bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-2 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-[#0F172A]">Lead Sources</h3>
                <div className="flex items-center gap-1 text-xs text-[#64748B]">
                  <span>This Month</span>
                  <ActionMenu
                    align="right"
                    items={[
                      {
                        label: 'View Ingestion Channels',
                        icon: Share2,
                        onClick: () => (window.location.href = '/lead-sources'),
                      },
                      {
                        label: 'Recalculate Channel ROI',
                        icon: RefreshCw,
                        onClick: () => toast.success('ROI Calculated', 'Attributed ₹42.8L pipeline to Website & Ads.'),
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 items-center flex-1">
                {/* Donut Chart with Center Total */}
                <div className="col-span-5 h-[160px] relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadSourcesData}
                        innerRadius={46}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {leadSourcesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Total in Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-[14px] font-extrabold text-[#0F172A] leading-none">12,480</span>
                    <span className="text-[9px] text-[#8A99AD] font-semibold mt-0.5">Total Leads</span>
                  </div>
                </div>

                {/* Legend Table */}
                <div className="col-span-7 space-y-1 text-xs">
                  {leadSourcesData.map((src, idx) => (
                    <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: src.color }} />
                        <span className="text-[11px] text-[#475569] font-medium truncate">{src.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold">
                        <span className="text-[#0F172A]">{src.value.toLocaleString()}</span>
                        <span className="text-[#8A99AD] text-[10px] w-6 text-right">{src.percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Leads Table (Screen 032 exact) - NO squishing, min-w 960px, phone is whitespace-nowrap font-mono */}
          <div className="bg-white rounded-[12px] border border-[#E5EBF2] shadow-card overflow-hidden">
            {/* Table Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5EBF2] px-4 pt-2 gap-2">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
                {[
                  'All Leads (12,480)',
                  'New (3,240)',
                  'Contacted (2,980)',
                  'Qualified (2,160)',
                  'Proposal (1,840)',
                  'Won (890)',
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveLeadTab(tab);
                      toast.info(`Tab Switched`, `Filtering by status: ${tab.split(' ')[0]}`);
                    }}
                    className={cn(
                      'px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer',
                      activeLeadTab === tab
                        ? 'border-[#0362FA] text-[#0362FA]'
                        : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Table Search & Filters */}
              <div className="flex items-center gap-2 pb-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search leads..."
                    className="pl-8 pr-3 py-1 text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg text-slate-800 placeholder:text-slate-400 w-36 sm:w-44 focus:outline-none focus:bg-white focus:border-[#0362FA]"
                  />
                </div>
                <button
                  onClick={() => setShowTableFilter(!showTableFilter)}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer',
                    showTableFilter
                      ? 'bg-blue-50 border-blue-300 text-[#0362FA]'
                      : 'bg-white border-[#E5EBF2] text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <Filter className="w-3 h-3" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Filter Drawer / Bar when toggled */}
            {showTableFilter && (
              <div className="px-4 py-2.5 bg-[#F8FAFD] border-b border-[#E5EBF2] flex flex-wrap items-center gap-3 text-xs">
                <span className="font-semibold text-slate-600">Filter by Ingestion Source:</span>
                {['All', 'Website', 'Google Ads', 'Referral', 'LinkedIn', 'Cold Call'].map((src) => (
                  <button
                    key={src}
                    onClick={() => setSelectedSourceFilter(src)}
                    className={cn(
                      'px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
                      selectedSourceFilter === src
                        ? 'bg-[#0362FA] text-white shadow-2xs'
                        : 'bg-white border border-[#CBD5E1] text-slate-700 hover:bg-slate-100'
                    )}
                  >
                    {src}
                  </button>
                ))}
              </div>
            )}

            {/* Table Content */}
            <div className="overflow-x-auto no-scrollbar scrollbar-none">
              <table className="w-full text-left text-xs min-w-[960px]">
                <thead className="bg-[#F8FAFD] text-[#64748B] uppercase text-[10px] font-bold border-b border-[#E5EBF2]">
                  <tr>
                    <th className="w-8 px-3.5 py-2.5 text-center">
                      <input type="checkbox" className="rounded text-[#0362FA]" />
                    </th>
                    <th className="px-3.5 py-2.5 whitespace-nowrap">Name</th>
                    <th className="px-3.5 py-2.5 whitespace-nowrap">Contact</th>
                    <th className="px-3.5 py-2.5 whitespace-nowrap">Company</th>
                    <th className="px-3.5 py-2.5 whitespace-nowrap">Source</th>
                    <th className="px-3.5 py-2.5 whitespace-nowrap">Status</th>
                    <th className="px-3.5 py-2.5 whitespace-nowrap">Last Call</th>
                    <th className="px-3.5 py-2.5 whitespace-nowrap">Next Follow-up</th>
                    <th className="px-3.5 py-2.5 whitespace-nowrap">Assigned Agent</th>
                    <th className="px-3.5 py-2.5 text-center whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center py-6 text-slate-400 text-xs">
                        No leads matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F8FAFD] transition-colors">
                        <td className="px-3.5 py-2.5 text-center">
                          <input type="checkbox" className="rounded text-[#0362FA]" />
                        </td>
                        <td className="px-3.5 py-2.5 font-bold text-[#0F172A] whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <UserAvatar name={row.name} size="xs" />
                            <span className="font-semibold text-slate-900">{row.name}</span>
                          </div>
                        </td>
                        {/* Contact number with whitespace-nowrap font-mono so it NEVER breaks onto 2 lines */}
                        <td className="px-3.5 py-2.5 text-[#334155] font-mono text-[11px] font-semibold whitespace-nowrap">
                          {row.contact}
                        </td>
                        <td className="px-3.5 py-2.5 text-[#0F172A] font-medium whitespace-nowrap">
                          {row.company}
                        </td>
                        <td className="px-3.5 py-2.5 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EBF3FE] text-[#0362FA] whitespace-nowrap">
                            {row.source}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 whitespace-nowrap">
                          <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap', row.statusColor)}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 text-[#64748B] text-[11px] whitespace-nowrap">
                          {row.lastCall}
                        </td>
                        <td className="px-3.5 py-2.5 text-[#EF9612] font-semibold text-[11px] whitespace-nowrap">
                          {row.nextFollowUp}
                        </td>
                        <td className="px-3.5 py-2.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <UserAvatar name={row.assignedAgent} src={row.agentAvatar} size="xs" />
                            <span className="text-[#0F172A] font-medium truncate">{row.assignedAgent}</span>
                          </div>
                        </td>
                        <td className="px-3.5 py-2.5 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => startCall({ contactName: row.name, phoneNumber: row.contact, companyName: row.company })}
                              className="p-1 text-[#0362FA] hover:bg-[#EBF3FE] rounded-md transition-colors"
                              title="Direct Call"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toast.info('WhatsApp Opened', `Chat window initialized for ${row.name}`)}
                              className="p-1 text-[#10B981] hover:bg-[#E6F7EC] rounded-md transition-colors"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toast.info('Email Composer', `Drafting email to ${row.name}`)}
                              className="p-1 text-[#0362FA] hover:bg-[#EBF3FE] rounded-md transition-colors"
                              title="Send Email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </button>

                            {/* Interactive ActionMenu for 3 dots */}
                            <ActionMenu
                              align="right"
                              items={[
                                {
                                  label: 'View Lead Profile',
                                  icon: Eye,
                                  onClick: () => toast.info(`Lead Profile: ${row.name}`, `Assigned to ${row.assignedAgent}`),
                                },
                                {
                                  label: 'Edit Lead Info',
                                  icon: Edit,
                                  onClick: () => toast.info('Edit Lead', `Opening record editor for ${row.name}`),
                                },
                                {
                                  label: 'Move to Qualified Stage',
                                  icon: Check,
                                  onClick: () => toast.success('Stage Updated', `${row.name} promoted to Qualified stage.`),
                                },
                                {
                                  label: 'Move to Recycle Bin',
                                  icon: Trash2,
                                  onClick: () => toast.warning('Archived', `${row.name} moved to Recycle Bin.`),
                                },
                              ]}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-2.5 border-t border-[#E5EBF2] bg-[#F8FAFD] flex items-center justify-between text-xs text-[#64748B]">
              <span>Showing 1 to 10 of 12,480 leads</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    onClick={() => toast.info('Page Navigation', `Viewing page ${p} of leads`)}
                    className={cn(
                      'w-6 h-6 rounded-md text-xs font-semibold flex items-center justify-center cursor-pointer',
                      p === 1 ? 'bg-[#0362FA] text-white' : 'text-slate-700 hover:bg-slate-200'
                    )}
                  >
                    {p}
                  </button>
                ))}
                <span className="px-1 text-slate-400">...</span>
                <button
                  onClick={() => toast.info('Page Navigation', 'Viewing last page 1,248 of leads')}
                  className="px-2 h-6 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  1,248
                </button>
                <button
                  onClick={() => toast.info('Next Page', 'Viewing next 10 leads')}
                  className="px-1.5 h-6 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Agent Performance & Campaign Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Agent Performance Table */}
            <div className="bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-[#0F172A]">Agent Performance</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#64748B]">This Week</span>
                  <a href="/reports/agents" className="text-[#0362FA] font-bold hover:underline">View All</a>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: 'Amit Kumar', calls: 284, connected: '198 (69.7%)', conversion: '28.5%', time: '4h 32m', bar: 85, color: '#0362FA' },
                  { name: 'Sneha Verma', calls: 256, connected: '176 (68.8%)', conversion: '24.3%', time: '3h 45m', bar: 72, color: '#10B981' },
                  { name: 'Rahul Mehta', calls: 230, connected: '152 (66.1%)', conversion: '22.8%', time: '3h 20m', bar: 65, color: '#871CF4' },
                ].map((ag, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFD] border border-[#F1F5F9]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px]">
                        {ag.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">{ag.name}</div>
                        <div className="text-[10px] text-[#64748B]">{ag.calls} calls • {ag.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-[#10B981]">{ag.conversion}</div>
                      <div className="text-[10px] text-[#8A99AD]">{ag.connected}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Performance Table */}
            <div className="bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-[#0F172A]">Campaign Performance</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#64748B]">This Month</span>
                  <a href="/campaigns" className="text-[#0362FA] font-bold hover:underline">View All</a>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: 'Product Demo', leads: '3,240', connected: '1,980', conv: '26.5%' },
                  { name: 'New Year Offer', leads: '2,480', connected: '1,520', conv: '24.8%' },
                  { name: 'Enterprise Plan', leads: '1,960', connected: '1,240', conv: '28.1%' },
                ].map((cmp, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFD] border border-[#F1F5F9]">
                    <div>
                      <div className="font-bold text-[#0F172A]">{cmp.name}</div>
                      <div className="text-[10px] text-[#64748B]">{cmp.leads} leads • {cmp.connected} connected</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-[#0362FA]">{cmp.conv}</span>
                      <button
                        onClick={() => toast.success(`Launched ${cmp.name}`, 'Dialer queue started calling campaign leads.')}
                        className="p-1 text-[#0362FA] hover:bg-blue-50 rounded cursor-pointer"
                        title="Resume campaign"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Span 4) matching Screen 032 exact */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. AI Call Assistant Card */}
          <div className="bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-[#0F172A] text-sm">
                <span>AI Call Assistant</span>
                <Sparkles className="w-3.5 h-3.5 text-[#871CF4]" />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-[#10B981] bg-[#E6F7EC] px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                Online
              </span>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-3 text-xs border-b border-slate-100 pb-2">
              {(['Suggestions', 'Transcript', 'Notes', 'Analysis'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveAssistantTab(t)}
                  className={cn(
                    'font-medium transition-colors cursor-pointer',
                    activeAssistantTab === t ? 'text-[#0362FA] font-bold border-b-2 border-[#0362FA] pb-1' : 'text-[#64748B]'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-[#64748B]">
              Based on this conversation, here are suggestions:
            </p>

            <div className="space-y-2 text-xs">
              {[
                { text: 'Ask about budget', color: 'text-[#871CF4]', bg: 'bg-[#F3E8FF]', icon: '🟣', message: 'Budget range: Enterprise annual tier approx ₹8L.' },
                { text: 'Share product demo', color: 'text-[#0362FA]', bg: 'bg-[#EBF3FE]', icon: '🔵', message: 'Demo link sent via SMS and email.' },
                { text: 'Send WhatsApp brochure', color: 'text-[#10B981]', bg: 'bg-[#E6F7EC]', icon: '🟢', message: 'Corporate brochure PDF sent to WhatsApp.' },
                { text: 'Schedule follow-up', color: 'text-[#EF9612]', bg: 'bg-[#FEF3E6]', icon: '🟠', message: 'Follow-up appointment booked for Tomorrow at 11 AM.' },
              ].map((sugg, i) => (
                <button
                  key={i}
                  onClick={() => toast.success(`Action Triggered: ${sugg.text}`, sugg.message)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#E5EBF2] hover:border-[#0362FA] bg-[#F8FAFD] transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-medium text-[#0F172A]">
                    <span className="text-sm">{sugg.icon}</span>
                    <span>{sugg.text}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Live Calls Dark Card (Screen 032 Exact) */}
          <div className="bg-[#0A192F] text-white rounded-[12px] p-4 shadow-card space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white text-sm">Live Calls</span>
              <div className="flex items-center gap-2">
                <a href="/calls/live" className="text-blue-400 hover:underline">View All</a>
                <span className="text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px]">
                  ● 12 Agents Online
                </span>
              </div>
            </div>

            {/* Active Caller Card */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Rohit Sharma"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div>
                  <div className="font-bold text-sm text-white">Rohit Sharma</div>
                  <div className="text-[11px] text-slate-300 font-mono whitespace-nowrap">+91 98765 43210</div>
                  <div className="text-[11px] text-emerald-400 font-mono font-bold">00:02:18</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                ● Live
              </span>
            </div>

            {/* Audio Waveform Animation (Teal) */}
            <div className="flex items-center justify-center gap-1 h-9 py-1">
              {[40, 70, 95, 60, 85, 100, 75, 90, 50, 70, 85, 60, 45, 80, 65, 40].map((h, i) => (
                <div
                  key={i}
                  style={{ height: isLiveCallPaused ? '20%' : `${h}%` }}
                  className={cn(
                    'w-1 rounded-full transition-all duration-300',
                    isLiveCallPaused ? 'bg-slate-600' : 'bg-[#06B6D4] animate-pulse'
                  )}
                />
              ))}
            </div>

            {/* Call Controls Strip */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  setIsLiveCallPaused(!isLiveCallPaused);
                  if (!isLiveCallPaused) {
                    toast.warning('Call On Hold', 'Call with Rohit Sharma placed on hold.');
                  } else {
                    toast.success('Call Resumed', 'Call with Rohit Sharma resumed.');
                  }
                }}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer',
                  isLiveCallPaused ? 'bg-amber-600' : 'bg-white/10 hover:bg-white/20'
                )}
                title={isLiveCallPaused ? 'Resume Call' : 'Hold Call'}
              >
                <Pause className="w-4 h-4" />
              </button>
              <button
                onClick={() => (window.location.href = '/calls/dialer')}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                title="Dialer Keypad"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => toast.info('Transfer Call', 'Choose agent or supervisor to bridge the call.')}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                title="Warm Transfer"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => toast.error('Call Disconnected', 'Call duration: 00:02:45. Audio log stored in Call Recordings.')}
                className="w-10 h-10 rounded-full bg-[#E73647] hover:bg-rose-700 flex items-center justify-center text-white shadow-lg cursor-pointer"
                title="End Call"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3. Today's Tasks (86) Card */}
          <div className="bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-[#0F172A]">Today&apos;s Tasks (86)</h3>
              <a href="/followups" className="text-xs text-[#0362FA] font-bold hover:underline">View All</a>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { title: 'Call Rohit Sharma', sub: 'Tech Solutions', time: '11:00 AM', icon: <Phone className="w-3.5 h-3.5 text-[#0362FA]" />, bg: 'bg-[#EBF3FE]' },
                { title: 'Follow-up with Priya', sub: 'Globex Corp', time: '12:30 PM', icon: <MessageSquare className="w-3.5 h-3.5 text-[#10B981]" />, bg: 'bg-[#E6F7EC]' },
                { title: 'Send proposal to Amit Jain', sub: 'Jain Traders', time: '02:00 PM', icon: <Mail className="w-3.5 h-3.5 text-[#0362FA]" />, bg: 'bg-[#EBF3FE]' },
                { title: 'Demo call with Sunita Patel', sub: 'Patel Industries', time: '03:30 PM', icon: <Calendar className="w-3.5 h-3.5 text-[#EF9612]" />, bg: 'bg-[#FEF3E6]' },
                { title: 'Follow-up with Vikram', sub: 'AutoHaus', time: '05:00 PM', icon: <Phone className="w-3.5 h-3.5 text-[#0362FA]" />, bg: 'bg-[#EBF3FE]' },
              ].map((task, idx) => (
                <div key={idx} className="flex items-center justify-between pb-2 border-b border-slate-50 last:border-none">
                  <div className="flex items-center gap-2.5 truncate">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          toast.success('Task Completed', `Completed: ${task.title}`);
                        }
                      }}
                      className="rounded text-[#0362FA] cursor-pointer"
                    />
                    <div className="truncate">
                      <div className="font-bold text-[#0F172A] truncate">{task.title}</div>
                      <div className="text-[10px] text-[#64748B] truncate">{task.sub}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">{task.time}</span>
                    <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center', task.bg)}>
                      {task.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Recent Activity Card */}
          <div className="bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-[#0F172A]">Recent Activity</h3>
              <a href="/settings/activity-logs" className="text-xs text-[#0362FA] font-bold hover:underline">View All</a>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 pb-2 border-b border-slate-50">
                <div className="p-1.5 rounded-lg bg-[#EBF3FE] text-[#0362FA] mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[#0F172A]">Call completed with Rohit Sharma</div>
                  <div className="text-[10px] text-[#64748B]">00:08:24 • <span className="text-[#10B981] font-semibold">Positive</span></div>
                </div>
                <span className="text-[10px] text-[#8A99AD] whitespace-nowrap">10:15 AM</span>
              </div>

              <div className="flex items-start gap-2.5 pb-2 border-b border-slate-50">
                <div className="p-1.5 rounded-lg bg-[#EBF3FE] text-[#0362FA] mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[#0F172A]">Follow-up email sent to Priya Khanna</div>
                  <div className="text-[10px] text-[#64748B]">Product demo invitation</div>
                </div>
                <span className="text-[10px] text-[#8A99AD] whitespace-nowrap">09:30 AM</span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#E6F7EC] text-[#10B981] mt-0.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[#0F172A]">WhatsApp message sent</div>
                  <div className="text-[10px] text-[#64748B]">Brochure shared with Amit Jain</div>
                </div>
                <span className="text-[10px] text-[#8A99AD] whitespace-nowrap">09:15 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
      />
    </div>
  );
};
