import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Share2,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  Clock,
  Target,
  Play,
  Pause,
  MoreVertical,
  Filter,
  Search,
  CheckCircle2,
  XCircle,
  Users,
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

interface CallRecord {
  id: number;
  dateTime: string;
  contact: string;
  phone: string;
  callType: 'Incoming' | 'Outgoing' | 'Campaign';
  agent: { name: string; avatar: string };
  duration: string;
  status: 'Answered' | 'Missed';
  disposition: 'Interested' | 'Follow-up' | 'Closed' | 'Not Interested' | 'Wrong Number';
  recordingUrl?: string;
}

export const CallAnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'volume' | 'agents' | 'campaigns' | 'customers' | 'custom'>('overview');
  const [trendPeriod, setTrendPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [hourlyType, setHourlyType] = useState('All Calls');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAgent, setFilterAgent] = useState('All');
  const [filterDisposition, setFilterDisposition] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [selectedCalls, setSelectedCalls] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const initialCalls: CallRecord[] = [
    {
      id: 1,
      dateTime: '31 Oct 2026 10:45 AM',
      contact: 'Rohit Sharma',
      phone: '+91 98765 43210',
      callType: 'Incoming',
      agent: { name: 'Amit Kumar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
      duration: '04:32',
      status: 'Answered',
      disposition: 'Interested',
      recordingUrl: 'https://sample-audio.mp3',
    },
    {
      id: 2,
      dateTime: '31 Oct 2026 09:22 AM',
      contact: 'Priya Khanna',
      phone: '+91 91234 56789',
      callType: 'Outgoing',
      agent: { name: 'Sneha Verma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
      duration: '02:18',
      status: 'Answered',
      disposition: 'Follow-up',
      recordingUrl: 'https://sample-audio.mp3',
    },
    {
      id: 3,
      dateTime: '30 Oct 2026 06:18 PM',
      contact: 'Amit Jain',
      phone: '+91 99887 66554',
      callType: 'Campaign',
      agent: { name: 'Rahul Mehta', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
      duration: '01:50',
      status: 'Missed',
      disposition: 'Not Interested',
    },
    {
      id: 4,
      dateTime: '30 Oct 2026 04:12 PM',
      contact: 'Sunita Patel',
      phone: '+91 88776 55443',
      callType: 'Incoming',
      agent: { name: 'Neha Singh', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' },
      duration: '05:21',
      status: 'Answered',
      disposition: 'Closed',
      recordingUrl: 'https://sample-audio.mp3',
    },
    {
      id: 5,
      dateTime: '30 Oct 2026 02:45 PM',
      contact: 'Vikram Singh',
      phone: '+91 77665 44332',
      callType: 'Outgoing',
      agent: { name: 'Arjun Rao', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop' },
      duration: '03:14',
      status: 'Answered',
      disposition: 'Interested',
      recordingUrl: 'https://sample-audio.mp3',
    },
    {
      id: 6,
      dateTime: '30 Oct 2026 11:30 AM',
      contact: 'Kavita Joshi',
      phone: '+91 98112 33445',
      callType: 'Incoming',
      agent: { name: 'Amit Kumar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
      duration: '03:45',
      status: 'Answered',
      disposition: 'Follow-up',
      recordingUrl: 'https://sample-audio.mp3',
    },
    {
      id: 7,
      dateTime: '29 Oct 2026 04:10 PM',
      contact: 'Rajesh Nair',
      phone: '+91 97234 88776',
      callType: 'Outgoing',
      agent: { name: 'Sneha Verma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
      duration: '04:12',
      status: 'Answered',
      disposition: 'Closed',
      recordingUrl: 'https://sample-audio.mp3',
    },
  ];

  const filteredCalls = initialCalls.filter((c) => {
    if (filterType !== 'All' && c.callType !== filterType) return false;
    if (filterStatus !== 'All' && c.status !== filterStatus) return false;
    if (filterAgent !== 'All' && c.agent.name !== filterAgent) return false;
    if (filterDisposition !== 'All' && c.disposition !== filterDisposition) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.contact.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.agent.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedCalls.length === filteredCalls.length) {
      setSelectedCalls([]);
    } else {
      setSelectedCalls(filteredCalls.map((c) => c.id));
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedCalls((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const togglePlayAudio = (id: number) => {
    if (playingId === id) {
      setPlayingId(null);
      toast.info('Audio Paused', 'Call playback has been paused.');
    } else {
      setPlayingId(id);
      toast.success('Playing Recording', `Streaming call recording audio for session #${id}`);
    }
  };

  const handleExport = (format: string) => {
    toast.success('Report Exported', `Call Analytics report downloaded in ${format} format.`);
  };

  return (
    <div className="space-y-4">
      {/* Header with Breadcrumb and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Call Analytics</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics & Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Get detailed insights into your call center performance, agent productivity and campaign results.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 31 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0362FA] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-blue-600 transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-36 z-20 text-xs">
              <button
                onClick={() => handleExport('PDF')}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
              >
                <FileText className="w-3.5 h-3.5 text-rose-500" /> PDF Document
              </button>
              <button
                onClick={() => handleExport('Excel')}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" /> Excel (.xlsx)
              </button>
              <button
                onClick={() => handleExport('CSV')}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
              >
                <BarChart3 className="w-3.5 h-3.5 text-blue-500" /> CSV Raw Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5EBF2] pb-1 overflow-x-auto whitespace-nowrap">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'volume', label: 'Call Volume', icon: Phone },
          { id: 'agents', label: 'Agent Performance', icon: Users },
          { id: 'campaigns', label: 'Campaign Reports', icon: Target },
          { id: 'customers', label: 'Customer Insights', icon: Clock },
          { id: 'custom', label: 'Custom Reports', icon: Filter },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                isActive
                  ? 'bg-[#EBF3FE] text-[#0362FA]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 5 Top Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-[#EBF3FE] flex items-center justify-center text-[#0362FA]">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">12,486</div>
            <div className="text-[11px] font-semibold text-slate-500">Total Calls</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>18.5% vs last month</span>
            </div>
          </div>
          {/* Mini Sparkline Bar Chart */}
          <div className="flex items-end gap-1 h-10 pb-1">
            {[40, 65, 55, 80, 95, 85].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#B0D2FB] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A]">
              <PhoneIncoming className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">9,842</div>
            <div className="text-[11px] font-semibold text-slate-500">Answered Calls</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>22.4% vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-10 pb-1">
            {[35, 50, 70, 60, 90, 100].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#A7F3D0] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-[#FEECEE] flex items-center justify-center text-[#E73647]">
              <PhoneMissed className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">1,624</div>
            <div className="text-[11px] font-semibold text-slate-500">Missed Calls</div>
            <div className="flex items-center text-[11px] font-semibold text-[#E73647]">
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
              <span>12.6% vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-10 pb-1">
            {[80, 70, 60, 50, 45, 30].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#FECDD3] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-[#FEF3E6] flex items-center justify-center text-[#EF9612]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">3m 24s</div>
            <div className="text-[11px] font-semibold text-slate-500">Avg. Call Duration</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>16.8% vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-10 pb-1">
            {[45, 55, 65, 75, 80, 92].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#FDE68A] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-lg bg-[#F3E8FF] text-[#871CF4] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">28.5%</div>
            <div className="text-[11px] font-semibold text-slate-500">Conversion Rate</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>6.4% vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-10 pb-1">
            {[50, 60, 65, 70, 85, 95].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#DDD6FE] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Call Trends (Line Chart) + Call Distribution (Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Call Trends Line Chart (approx 8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Trends</h3>
              <p className="text-[11px] text-slate-400">Total calls, answered calls and missed calls over time.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0362FA]" /> Total Calls
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#13AB4A]" /> Answered
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E73647]" /> Missed
                </span>
              </div>
              <select
                value={trendPeriod}
                onChange={(e) => setTrendPeriod(e.target.value as any)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 bg-white font-medium text-slate-700"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* SVG Trend Multi-Line Chart */}
          <div className="relative h-56 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="0" x2="700" y2="0" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="50" x2="700" y2="50" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="100" x2="700" y2="100" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="150" x2="700" y2="150" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="200" x2="700" y2="200" stroke="#F1F5F9" strokeWidth="1" />

              {/* Total Calls Line (Blue) */}
              <polyline
                fill="none"
                stroke="#0362FA"
                strokeWidth="2.5"
                points="10,120 70,110 130,90 190,105 250,75 310,115 370,80 430,95 490,60 550,75 610,50 670,65"
              />
              {[
                [10, 120], [70, 110], [130, 90], [190, 105], [250, 75],
                [310, 115], [370, 80], [430, 95], [490, 60], [550, 75], [610, 50], [670, 65]
              ].map(([x, y], idx) => (
                <circle key={`tot-${idx}`} cx={x} cy={y} r="3.5" fill="#0362FA" stroke="#FFF" strokeWidth="1.5" />
              ))}

              {/* Answered Calls Line (Green) */}
              <polyline
                fill="none"
                stroke="#13AB4A"
                strokeWidth="2.5"
                points="10,145 70,130 130,120 190,135 250,110 310,140 370,115 430,125 490,95 550,110 610,90 670,100"
              />
              {[
                [10, 145], [70, 130], [130, 120], [190, 135], [250, 110],
                [310, 140], [370, 115], [430, 125], [490, 95], [550, 110], [610, 90], [670, 100]
              ].map(([x, y], idx) => (
                <circle key={`ans-${idx}`} cx={x} cy={y} r="3.5" fill="#13AB4A" stroke="#FFF" strokeWidth="1.5" />
              ))}

              {/* Missed Calls Line (Red) */}
              <polyline
                fill="none"
                stroke="#E73647"
                strokeWidth="2"
                strokeDasharray="4,4"
                points="10,185 70,180 130,175 190,178 250,170 310,185 370,175 430,180 490,170 550,175 610,165 670,175"
              />
              {[
                [10, 185], [70, 180], [130, 175], [190, 178], [250, 170],
                [310, 185], [370, 175], [430, 180], [490, 170], [550, 175], [610, 165], [670, 175]
              ].map(([x, y], idx) => (
                <circle key={`mis-${idx}`} cx={x} cy={y} r="3" fill="#E73647" stroke="#FFF" strokeWidth="1.5" />
              ))}
            </svg>

            {/* X Axis Labels */}
            <div className="flex justify-between text-[10px] text-slate-400 mt-2 px-1">
              <span>Oct 1</span>
              <span>Oct 4</span>
              <span>Oct 7</span>
              <span>Oct 10</span>
              <span>Oct 13</span>
              <span>Oct 16</span>
              <span>Oct 19</span>
              <span>Oct 22</span>
              <span>Oct 25</span>
              <span>Oct 28</span>
              <span>Oct 31</span>
            </div>
          </div>
        </div>

        {/* Right: Call Distribution Donut Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Distribution</h3>
              <p className="text-[11px] text-slate-400">Call type wise distribution.</p>
            </div>
            <select className="text-[11px] border border-slate-200 rounded-md px-2 py-0.5 bg-white font-medium text-slate-700">
              <option>Call Type</option>
              <option>Region</option>
              <option>Department</option>
            </select>
          </div>

          <div className="flex items-center justify-center pt-2">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Donut rings */}
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="42, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="33.5, 100" strokeDashoffset="-42" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="14.9, 100" strokeDashoffset="-75.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="5.8, 100" strokeDashoffset="-90.4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="3.8, 100" strokeDashoffset="-96.2" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-extrabold text-slate-900 leading-none">12,486</span>
                <span className="text-[10px] text-slate-400">Total Calls</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs pt-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#0362FA]" /> Incoming</span>
              <span className="font-semibold text-slate-900">5,240 (42.0%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#13AB4A]" /> Outgoing</span>
              <span className="font-semibold text-slate-900">4,180 (33.5%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#871CF4]" /> Campaign</span>
              <span className="font-semibold text-slate-900">1,856 (14.9%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#EF9612]" /> Follow-up</span>
              <span className="font-semibold text-slate-900">720 (5.8%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Others</span>
              <span className="font-semibold text-slate-900">490 (3.9%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Calls by Hour + Top Performing Agents + Call Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Calls by Hour Bar Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Calls by Hour</h3>
              <p className="text-[11px] text-slate-400">Call volume throughout the day.</p>
            </div>
            <select
              value={hourlyType}
              onChange={(e) => setHourlyType(e.target.value)}
              className="text-[11px] border border-slate-200 rounded-md px-2 py-0.5 bg-white font-medium text-slate-700"
            >
              <option value="All Calls">All Calls</option>
              <option value="Inbound">Inbound</option>
              <option value="Outbound">Outbound</option>
            </select>
          </div>

          <div className="h-44 flex items-end justify-between gap-1.5 pt-6 px-1">
            {[
              { hour: '12 AM', count: 45, h: 10 },
              { hour: '3 AM', count: 80, h: 15 },
              { hour: '6 AM', count: 180, h: 30 },
              { hour: '9 AM', count: 520, h: 85 },
              { hour: '12 PM', count: 480, h: 75 },
              { hour: '3 PM', count: 560, h: 90 },
              { hour: '6 PM', count: 380, h: 60 },
              { hour: '9 PM', count: 190, h: 32 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div
                  className="w-full bg-[#0362FA] rounded-t hover:bg-blue-600 transition-all cursor-pointer"
                  style={{ height: `${col.h}%` }}
                  title={`${col.hour}: ${col.count} calls`}
                />
                <span className="text-[9px] text-slate-400 whitespace-nowrap mt-1">{col.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Agents Table (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Top Performing Agents</h3>
              <p className="text-[11px] text-slate-400">Based on answered calls and conversion rate.</p>
            </div>
            <a href="#/reports/agents" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[340px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[10px]">
                  <th className="py-2 px-1 w-6">#</th>
                  <th className="py-2 px-1">Agent</th>
                  <th className="py-2 px-1 text-center">Total</th>
                  <th className="py-2 px-1 text-center">Answered</th>
                  <th className="py-2 px-1 text-right">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { rank: 1, name: 'Amit Kumar', total: '1,842', ans: '1,620', conv: '32.4%', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
                  { rank: 2, name: 'Sneha Verma', total: '1,620', ans: '1,418', conv: '30.8%', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
                  { rank: 3, name: 'Rahul Mehta', total: '1,356', ans: '1,182', conv: '28.6%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
                  { rank: 4, name: 'Neha Singh', total: '1,248', ans: '1,096', conv: '26.4%', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' },
                  { rank: 5, name: 'Arjun Rao', total: '1,102', ans: '968', conv: '24.8%', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop' },
                ].map((a) => (
                  <tr key={a.rank} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-1 text-slate-400 font-mono text-[10px]">{a.rank}</td>
                    <td className="py-2 px-1">
                      <div className="flex items-center gap-1.5">
                        <img src={a.avatar} alt={a.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-semibold text-slate-900 text-[11px]">{a.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-1 text-center font-medium text-slate-800">{a.total}</td>
                    <td className="py-2 px-1 text-center font-medium text-[#13AB4A]">{a.ans}</td>
                    <td className="py-2 px-1 text-right font-bold text-slate-900">{a.conv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call Outcomes Donut Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Outcomes</h3>
              <p className="text-[11px] text-slate-400">Final disposition of calls.</p>
            </div>
            <select className="text-[11px] border border-slate-200 rounded-md px-2 py-0.5 bg-white font-medium text-slate-700">
              <option>Disposition</option>
              <option>Agent wise</option>
              <option>Campaign wise</option>
            </select>
          </div>

          <div className="flex items-center justify-center pt-2">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="28.9, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="21.5, 100" strokeDashoffset="-28.9" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="18.9, 100" strokeDashoffset="-50.4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="12.5, 100" strokeDashoffset="-69.3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="10.0, 100" strokeDashoffset="-81.8" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="8.2, 100" strokeDashoffset="-91.8" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-extrabold text-slate-900 leading-none">9,842</span>
                <span className="text-[9px] text-slate-400">Answered Calls</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Interested: <span className="font-bold text-slate-900">2,840</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-[#E73647]" /> Not Interested: <span className="font-bold text-slate-900">2,120</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-[#0362FA]" /> Follow-up: <span className="font-bold text-slate-900">1,856</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-[#EF9612]" /> Closed: <span className="font-bold text-slate-900">1,234</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-[#871CF4]" /> Wrong No.: <span className="font-bold text-slate-900">982</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-slate-400" /> Other: <span className="font-bold text-slate-900">810</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Detailed Call Analytics Table (Protected against squishing!) */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Detailed Call Analytics</h3>
            <p className="text-xs text-slate-500">View detailed call data with filters and export options.</p>
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search contact or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-44 md:w-52 focus:outline-hidden focus:border-[#0362FA]"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
            >
              <option value="All">Call Type: All</option>
              <option value="Incoming">Incoming</option>
              <option value="Outgoing">Outgoing</option>
              <option value="Campaign">Campaign</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
            >
              <option value="All">Status: All</option>
              <option value="Answered">Answered</option>
              <option value="Missed">Missed</option>
            </select>

            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
            >
              <option value="All">Agent: All</option>
              <option value="Amit Kumar">Amit Kumar</option>
              <option value="Sneha Verma">Sneha Verma</option>
              <option value="Rahul Mehta">Rahul Mehta</option>
              <option value="Neha Singh">Neha Singh</option>
              <option value="Arjun Rao">Arjun Rao</option>
            </select>

            <select
              value={filterDisposition}
              onChange={(e) => setFilterDisposition(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
            >
              <option value="All">Disposition: All</option>
              <option value="Interested">Interested</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Closed">Closed</option>
              <option value="Not Interested">Not Interested</option>
            </select>

            <button
              onClick={() => {
                setFilterType('All');
                setFilterStatus('All');
                setFilterAgent('All');
                setFilterDisposition('All');
                setSearchQuery('');
                toast.info('Filters Reset', 'Showing all call analytics records.');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* The Table with min-w-[1050px] and whitespace-nowrap */}
        <div className="overflow-x-auto rounded-lg border border-[#E5EBF2]">
          <table className="w-full min-w-[1050px] text-left border-collapse text-xs whitespace-nowrap">
            <thead className="bg-[#F8FAFC] border-b border-[#E5EBF2]">
              <tr className="text-slate-500 font-semibold text-[11px]">
                <th className="py-3 px-3 w-8">
                  <input
                    type="checkbox"
                    checked={selectedCalls.length > 0 && selectedCalls.length === filteredCalls.length}
                    onChange={toggleSelectAll}
                    className="rounded text-[#0362FA] focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-2 w-8">#</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Phone Number</th>
                <th className="py-3 px-3">Call Type</th>
                <th className="py-3 px-3">Agent</th>
                <th className="py-3 px-3">Duration</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Disposition</th>
                <th className="py-3 px-3 text-center">Recording</th>
                <th className="py-3 px-3 text-center">Export</th>
                <th className="py-3 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBF2] bg-white text-slate-700">
              {filteredCalls.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((call) => (
                <tr key={call.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3">
                    <input
                      type="checkbox"
                      checked={selectedCalls.includes(call.id)}
                      onChange={() => toggleSelectOne(call.id)}
                      className="rounded text-[#0362FA] focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="py-2.5 px-2 font-mono text-slate-400 text-[11px]">{call.id}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-700">{call.dateTime}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{call.contact}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{call.phone}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        call.callType === 'Incoming'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : call.callType === 'Outgoing'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}
                    >
                      {call.callType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <img src={call.agent.avatar} alt={call.agent.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="font-semibold text-slate-800 text-[11px]">{call.agent.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{call.duration}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        call.status === 'Answered'
                          ? 'bg-[#E9F9EE] text-[#13AB4A]'
                          : 'bg-[#FEECEE] text-[#E73647]'
                      }`}
                    >
                      {call.status === 'Answered' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {call.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        call.disposition === 'Interested'
                          ? 'bg-emerald-100 text-emerald-800'
                          : call.disposition === 'Closed'
                          ? 'bg-blue-100 text-blue-800'
                          : call.disposition === 'Follow-up'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {call.disposition}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {call.recordingUrl ? (
                      <button
                        onClick={() => togglePlayAudio(call.id)}
                        className={`p-1.5 rounded-full transition-colors ${
                          playingId === call.id
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-blue-50 text-[#0362FA] hover:bg-blue-100'
                        }`}
                        title={playingId === call.id ? 'Pause' : 'Play audio recording'}
                      >
                        {playingId === call.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400">None</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => toast.success('Recording Downloaded', `Audio file for #${call.id} saved to Downloads.`)}
                      className="p-1.5 text-slate-500 hover:text-[#0362FA] hover:bg-slate-100 rounded-lg transition-colors"
                      title="Download call record"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => toast.info('Call Actions', `Options menu opened for record #${call.id}`)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-900">1</span> to{' '}
            <span className="font-semibold text-slate-900">{Math.min(pageSize, filteredCalls.length)}</span> of{' '}
            <span className="font-semibold text-slate-900">12,486</span> calls
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 border border-slate-200 rounded-md text-xs font-semibold disabled:opacity-40 hover:bg-slate-50"
            >
              &lt;
            </button>
            <button className="px-2.5 py-1 bg-[#0362FA] text-white rounded-md text-xs font-semibold">1</button>
            <button className="px-2.5 py-1 border border-slate-200 rounded-md text-xs font-semibold hover:bg-slate-50">2</button>
            <button className="px-2.5 py-1 border border-slate-200 rounded-md text-xs font-semibold hover:bg-slate-50">3</button>
            <button className="px-2.5 py-1 border border-slate-200 rounded-md text-xs font-semibold hover:bg-slate-50">4</button>
            <button className="px-2.5 py-1 border border-slate-200 rounded-md text-xs font-semibold hover:bg-slate-50">5</button>
            <span className="px-1 text-slate-400">...</span>
            <button className="px-2.5 py-1 border border-slate-200 rounded-md text-xs font-semibold hover:bg-slate-50">2,498</button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-2.5 py-1 border border-slate-200 rounded-md text-xs font-semibold hover:bg-slate-50"
            >
              &gt;
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-slate-200 rounded-md px-2 py-1 bg-white font-medium text-slate-700"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
