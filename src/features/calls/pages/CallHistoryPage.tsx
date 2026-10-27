import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Download,
  Filter,
  Calendar,
  Search,
  ChevronDown,
  Play,
  Pause,
  MoreHorizontal,
  Volume2,
  Sliders,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Copy,
  UserPlus,
  Trash2,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface CallItem {
  id: number;
  initials: string;
  initialsBg: string;
  name: string;
  company: string;
  phone: string;
  type: 'Inbound' | 'Outbound' | 'Missed';
  duration: string;
  durationSec: number;
  callTime: string;
  callDate: string;
  status: 'Answered' | 'Missed';
  disposition: string;
  agent: string;
  agentAvatar: string;
  recording: string | null;
}

const CALL_DATA: CallItem[] = [
  { id: 1, initials: 'RS', initialsBg: 'bg-pink-500', name: 'Rohit Sharma', company: 'Tech Solutions Pvt. Ltd.', phone: '+91 98765 43210', type: 'Inbound', duration: '04:32', durationSec: 272, callTime: '11:20 AM', callDate: '31 Oct 2026', status: 'Answered', disposition: 'Interested', agent: 'Amit Kumar', agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces', recording: '04:32' },
  { id: 2, initials: 'PK', initialsBg: 'bg-purple-600', name: 'Priya Khanna', company: 'Globex Corp', phone: '+91 91234 56789', type: 'Outbound', duration: '02:18', durationSec: 138, callTime: '10:45 AM', callDate: '31 Oct 2026', status: 'Answered', disposition: 'Follow-up', agent: 'Sneha Verma', agentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces', recording: '02:18' },
  { id: 3, initials: 'AJ', initialsBg: 'bg-emerald-500', name: 'Amit Jain', company: 'Jain Traders', phone: '+91 99887 66554', type: 'Inbound', duration: '00:45', durationSec: 45, callTime: '09:30 AM', callDate: '31 Oct 2026', status: 'Missed', disposition: 'No Answer', agent: 'Rahul Mehta', agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces', recording: null },
  { id: 4, initials: 'SP', initialsBg: 'bg-indigo-600', name: 'Sunita Patel', company: 'Patel Industries', phone: '+91 88776 55543', type: 'Outbound', duration: '06:12', durationSec: 372, callTime: '09:10 AM', callDate: '31 Oct 2026', status: 'Answered', disposition: 'Qualified', agent: 'Neha Singh', agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces', recording: '06:12' },
  { id: 5, initials: 'VS', initialsBg: 'bg-teal-600', name: 'Vikram Singh', company: 'AutoHaus', phone: '+91 77665 44332', type: 'Inbound', duration: '03:22', durationSec: 202, callTime: '08:45 AM', callDate: '31 Oct 2026', status: 'Answered', disposition: 'Demo Scheduled', agent: 'Arjun Rao', agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces', recording: '03:22' },
  { id: 6, initials: 'NT', initialsBg: 'bg-orange-500', name: 'Neha Tiwari', company: 'NextGen Tech', phone: '+91 98712 34567', type: 'Missed', duration: '00:00', durationSec: 0, callTime: '06:30 PM', callDate: '30 Oct 2026', status: 'Missed', disposition: 'No Answer', agent: 'Pooja Sharma', agentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces', recording: null },
  { id: 7, initials: 'DS', initialsBg: 'bg-rose-500', name: 'Deepak Soni', company: 'Soni Enterprises', phone: '+91 91789 65432', type: 'Inbound', duration: '01:48', durationSec: 108, callTime: '05:15 PM', callDate: '30 Oct 2026', status: 'Answered', disposition: 'Price Discussed', agent: 'Karan Yadav', agentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=faces', recording: '01:48' },
  { id: 8, initials: 'KM', initialsBg: 'bg-violet-600', name: 'Karan Mehta', company: 'Alpha Systems', phone: '+91 98745 67890', type: 'Outbound', duration: '02:26', durationSec: 146, callTime: '04:10 PM', callDate: '30 Oct 2026', status: 'Answered', disposition: 'Follow-up', agent: 'Anjali Gupta', agentAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=80&h=80&fit=crop&crop=faces', recording: '02:26' },
  { id: 9, initials: 'SK', initialsBg: 'bg-blue-600', name: 'Simran Kaur', company: 'Bright Retail', phone: '+91 98712 34567', type: 'Inbound', duration: '02:08', durationSec: 128, callTime: '03:25 PM', callDate: '30 Oct 2026', status: 'Answered', disposition: 'Interested', agent: 'Rohit Verma', agentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&crop=faces', recording: '02:08' },
  { id: 10, initials: 'LY', initialsBg: 'bg-pink-600', name: 'Lokesh Yadav', company: 'Shree Infra', phone: '+91 99876 54321', type: 'Missed', duration: '00:00', durationSec: 0, callTime: '02:15 PM', callDate: '30 Oct 2026', status: 'Missed', disposition: 'Switched Off', agent: 'Simran Kaur', agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces', recording: null },
  { id: 11, initials: 'MG', initialsBg: 'bg-blue-700', name: 'Manish Gupta', company: 'Gupta & Co.', phone: '+91 87654 32109', type: 'Outbound', duration: '03:55', durationSec: 235, callTime: '01:40 PM', callDate: '30 Oct 2026', status: 'Answered', disposition: 'Meeting Fixed', agent: 'Amit Kumar', agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces', recording: '03:55' },
  { id: 12, initials: 'RV', initialsBg: 'bg-purple-500', name: 'Ravi Verma', company: 'Verma Enterprises', phone: '+91 76543 21098', type: 'Inbound', duration: '01:12', durationSec: 72, callTime: '12:30 PM', callDate: '30 Oct 2026', status: 'Answered', disposition: 'Not Interested', agent: 'Sneha Verma', agentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces', recording: '01:12' },
  { id: 13, initials: 'PM', initialsBg: 'bg-emerald-600', name: 'Pooja Mishra', company: 'Mishra Retail', phone: '+91 93456 78901', type: 'Outbound', duration: '05:20', durationSec: 320, callTime: '11:10 AM', callDate: '30 Oct 2026', status: 'Answered', disposition: 'Proposal Sent', agent: 'Rahul Mehta', agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces', recording: '05:20' },
  { id: 14, initials: 'SK', initialsBg: 'bg-amber-500', name: 'Sandeep Kumar', company: 'Kumar Tech', phone: '+91 82345 67890', type: 'Inbound', duration: '00:36', durationSec: 36, callTime: '10:05 AM', callDate: '30 Oct 2026', status: 'Missed', disposition: 'No Answer', agent: 'Neha Singh', agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces', recording: null },
  { id: 15, initials: 'AS', initialsBg: 'bg-teal-500', name: 'Ankit Singh', company: 'Singh Motors', phone: '+91 90234 56789', type: 'Outbound', duration: '03:18', durationSec: 198, callTime: '09:50 AM', callDate: '30 Oct 2026', status: 'Answered', disposition: 'Interested', agent: 'Arjun Rao', agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces', recording: '03:18' },
];

export const CallHistoryPage: React.FC = () => {
  const location = useLocation();
  const isMissedRoute = location.pathname.includes('/missed');

  const [selectedCall, setSelectedCall] = useState<CallItem>(CALL_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCallType, setSelectedCallType] = useState(isMissedRoute ? 'Missed' : 'All');
  const [selectedStatus, setSelectedStatus] = useState(isMissedRoute ? 'Missed' : 'All');

  useEffect(() => {
    if (isMissedRoute) {
      setSelectedCallType('Missed');
      setSelectedStatus('Missed');
    }
  }, [isMissedRoute]);

  const filteredCalls = CALL_DATA.filter((call) => {
    const matchesSearch =
      searchQuery === '' ||
      call.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.phone.includes(searchQuery) ||
      call.agent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedCallType === 'All' || call.type === selectedCallType;
    const matchesStatus = selectedStatus === 'All' || call.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Calling & Call Center</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">{isMissedRoute ? 'Missed Calls' : 'Call History'}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{isMissedRoute ? 'Missed Calls' : 'Call History'}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isMissedRoute
              ? 'Track, analyze and immediately return unanswered and dropped customer calls.'
              : 'View all inbound and outbound calls, listen to recordings and track call performance.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 31 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm">
            <Sliders className="w-3.5 h-3.5" />
            <span>Advanced Filters</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Stat Cards in a row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* Card 1: Total Calls */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Total Calls</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">2,845</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>18.6%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          {/* Sparkline Blue */}
          <div className="flex items-end gap-1 h-9 self-end">
            {[40, 60, 45, 75, 55, 95].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#0362FA] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 2: Incoming Calls */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A]">
                <PhoneIncoming className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Incoming Calls</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">1,524</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>17.4%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          {/* Sparkline Green */}
          <div className="flex items-end gap-1 h-9 self-end">
            {[35, 50, 40, 70, 60, 90].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#13AB4A] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 3: Outgoing Calls */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
                <PhoneOutgoing className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Outgoing Calls</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">1,321</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>20.3%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          {/* Sparkline Coral/Pink */}
          <div className="flex items-end gap-1 h-9 self-end">
            {[30, 45, 55, 65, 50, 85].map((h, i) => (
              <div key={i} className="w-1.5 bg-rose-400 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 4: Answered Calls */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Answered Calls</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">2,156</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>22.4%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          {/* Sparkline Blue */}
          <div className="flex items-end gap-1 h-9 self-end">
            {[45, 55, 65, 80, 70, 95].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#0362FA] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 5: Missed Calls */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between col-span-2 md:col-span-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FEECEE] flex items-center justify-center text-[#E73647]">
                <PhoneMissed className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Missed Calls</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">489</div>
            <div className="flex items-center text-[11px] font-semibold text-[#E73647]">
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
              <span>12.5%</span>
            </div>
          </div>
          {/* Sparkline Orange/Gold */}
          <div className="flex items-end gap-1 h-9 self-end">
            {[80, 70, 60, 45, 35, 25].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#EF9612] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl p-3 border border-[#E5EBF2] shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center flex-1 min-w-[260px] max-w-sm relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, lead, agent..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA] focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Call Type Dropdown */}
          <div className="relative">
            <select
              value={selectedCallType}
              onChange={(e) => setSelectedCallType(e.target.value)}
              className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer"
            >
              <option value="All">Call Type: All</option>
              <option value="Inbound">Call Type: Inbound</option>
              <option value="Outbound">Call Type: Outbound</option>
              <option value="Missed">Call Type: Missed</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer"
            >
              <option value="All">Status: All</option>
              <option value="Answered">Status: Answered</option>
              <option value="Missed">Status: Missed</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Agent Dropdown */}
          <div className="relative">
            <select className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer">
              <option>Agent: All</option>
              <option>Amit Kumar</option>
              <option>Sneha Verma</option>
              <option>Rahul Mehta</option>
              <option>Neha Singh</option>
              <option>Arjun Rao</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Duration Dropdown */}
          <div className="relative">
            <select className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer">
              <option>Duration: All</option>
              <option>&lt; 1 min</option>
              <option>1 - 3 min</option>
              <option>3 - 5 min</option>
              <option>&gt; 5 min</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Date Range Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Date Range</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg">
            <Filter className="w-3 h-3 text-slate-500" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 9 Cols Table + 3 Cols Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Table Area (approx 75% width on desktop) */}
        <div className="lg:col-span-8 xl:col-span-9 bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
          <div className="overflow-x-auto" role="region" aria-label="Call History Data Table" tabIndex={0}>
            <table className="w-full min-w-[1050px] text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-[#E5EBF2] whitespace-nowrap">
                  <th className="py-3 px-3 w-8">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0362FA] focus:ring-0" />
                  </th>
                  <th className="py-3 px-2 w-7 text-slate-400">#</th>
                  <th className="py-3 px-3.5">Contact Name</th>
                  <th className="py-3 px-3.5">Phone Number</th>
                  <th className="py-3 px-3.5">Call Type</th>
                  <th className="py-3 px-3.5">Duration</th>
                  <th className="py-3 px-3.5">Call Time ↓</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5">Disposition</th>
                  <th className="py-3 px-3.5">Agent</th>
                  <th className="py-3 px-3.5 text-center">Recording</th>
                  <th className="py-3 px-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCalls.map((item) => {
                  const isSelected = selectedCall.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedCall(item)}
                      className={`hover:bg-[#F0F7FF] transition-colors cursor-pointer ${
                        isSelected ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <td className="py-3 px-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-slate-300 text-[#0362FA] focus:ring-0" />
                      </td>
                      <td className="py-3 px-2 text-slate-400 font-mono text-[11px] whitespace-nowrap">{item.id}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full ${item.initialsBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                          >
                            {item.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 whitespace-nowrap leading-tight">{item.name}</div>
                            <div className="text-[11px] text-slate-400 whitespace-nowrap leading-tight mt-0.5">{item.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="font-mono text-[#0362FA] font-semibold hover:underline text-xs tracking-tight">
                          {item.phone}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-700">
                          {item.type === 'Inbound' && (
                            <>
                              <PhoneIncoming className="w-3.5 h-3.5 text-[#13AB4A]" />
                              <span>Inbound</span>
                            </>
                          )}
                          {item.type === 'Outbound' && (
                            <>
                              <PhoneOutgoing className="w-3.5 h-3.5 text-[#0362FA]" />
                              <span>Outbound</span>
                            </>
                          )}
                          {item.type === 'Missed' && (
                            <>
                              <PhoneMissed className="w-3.5 h-3.5 text-[#E73647]" />
                              <span>Missed</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3.5 font-mono text-slate-700 font-medium whitespace-nowrap">{item.duration}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="text-slate-800 font-semibold leading-tight">{item.callDate}</div>
                        <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{item.callTime}</div>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {item.status === 'Answered' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                            Answered
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEECEE] text-[#E73647] border border-rose-200">
                            Missed
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="text-slate-700 font-medium">{item.disposition}</span>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.agentAvatar}
                            alt={item.agent}
                            className="w-6 h-6 rounded-full object-cover shrink-0"
                          />
                          <span className="text-slate-800 font-medium text-xs whitespace-nowrap">{item.agent}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        {item.recording ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCall(item);
                              setIsPlaying(!isPlaying);
                            }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#0362FA] hover:bg-blue-100 text-xs font-semibold transition-colors"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>{item.recording}</span>
                          </button>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              toast.success('Audio Downloaded', `Audio recording for call #${call.id} (${call.name}) downloaded.`);
                            }}
                            title="Download Audio"
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <ActionMenu
                            items={[
                              {
                                label: 'View Call Details',
                                icon: FileText,
                                onClick: () => {
                                  toast.info('Call Details', `Viewing detailed telephony session #${call.id} for ${call.name}`);
                                },
                              },
                              {
                                label: 'Copy Recording URL',
                                icon: Copy,
                                onClick: () => {
                                  navigator.clipboard.writeText(`https://recordings.atscallcenter.in/calls/${call.id}.mp3`);
                                  toast.success('Recording URL Copied', 'Audio stream link copied to clipboard.');
                                },
                              },
                              {
                                label: 'Assign to Pipeline',
                                icon: UserPlus,
                                onClick: () => {
                                  toast.success('Lead Linked', `${call.name} linked to active sales pipeline.`);
                                },
                              },
                              {
                                label: 'Delete Call Record',
                                icon: Trash2,
                                danger: true,
                                onClick: () => {
                                  toast.warning('Record Removed', `Call #${call.id} removed from history.`);
                                },
                              },
                            ]}
                          />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#E5EBF2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing <span className="font-semibold text-slate-900">1</span> to{' '}
              <span className="font-semibold text-slate-900">15</span> of{' '}
              <span className="font-semibold text-slate-900">2,845</span> calls
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs">
                <button className="px-2 py-1 text-slate-400 hover:bg-slate-50 border-r border-slate-200">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="px-2.5 py-1 text-xs font-semibold bg-[#0362FA] text-white">1</button>
                <button className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50">2</button>
                <button className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50">3</button>
                <button className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50">4</button>
                <button className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50">5</button>
                <span className="px-2 py-1 text-xs text-slate-400">...</span>
                <button className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50">190</button>
                <button className="px-2 py-1 text-slate-600 hover:bg-slate-50 border-l border-slate-200">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <select className="px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-slate-700">
                <option>15 per page</option>
                <option>25 per page</option>
                <option>50 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Side Column (Analytics & Audio Player) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          {/* Card 1: Call Outcomes Donut */}
          <div className="bg-white rounded-xl p-4 border border-[#E5EBF2] shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Call Outcomes</h3>
            <div className="flex items-center gap-3">
              {/* Donut graphic */}
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background track */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Green - Answered (75.8%) */}
                  <path
                    stroke="#13AB4A"
                    strokeWidth="3.8"
                    strokeDasharray="75.8, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Red - Missed (17.2%) */}
                  <path
                    stroke="#E73647"
                    strokeWidth="3.8"
                    strokeDasharray="17.2, 100"
                    strokeDashoffset="-75.8"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Purple - No Answer (4.2%) */}
                  <path
                    stroke="#871CF4"
                    strokeWidth="3.8"
                    strokeDasharray="4.2, 100"
                    strokeDashoffset="-93"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-extrabold text-slate-900 leading-none">2,845</span>
                  <span className="text-[9px] text-slate-400 font-medium">Total Calls</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-1 text-[11px] flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Answered
                  </span>
                  <span className="font-semibold text-slate-900">2,156 (75.8%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-[#E73647]" /> Missed
                  </span>
                  <span className="font-semibold text-slate-900">489 (17.2%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-[#871CF4]" /> No Answer
                  </span>
                  <span className="font-semibold text-slate-900">120 (4.2%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-[#EF9612]" /> Busy
                  </span>
                  <span className="font-semibold text-slate-900">58 (2.0%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Failed
                  </span>
                  <span className="font-semibold text-slate-900">22 (0.0%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Calls by Type */}
          <div className="bg-white rounded-xl p-4 border border-[#E5EBF2] shadow-sm space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Calls by Type</h3>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <PhoneIncoming className="w-3.5 h-3.5 text-[#13AB4A]" /> Incoming
                  </span>
                  <span className="font-semibold text-slate-900">1,524 <span className="text-slate-400 font-normal">53.6%</span></span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#13AB4A] h-full rounded-full" style={{ width: '53.6%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <PhoneOutgoing className="w-3.5 h-3.5 text-[#0362FA]" /> Outgoing
                  </span>
                  <span className="font-semibold text-slate-900">1,321 <span className="text-slate-400 font-normal">46.4%</span></span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0362FA] h-full rounded-full" style={{ width: '46.4%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Top Agents by Calls */}
          <div className="bg-white rounded-xl p-4 border border-[#E5EBF2] shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Top Agents by Calls</h3>
              <a href="#/reports/agents" className="text-[11px] font-semibold text-[#0362FA] hover:underline">
                View All
              </a>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Amit Kumar', calls: 542, max: 600, color: 'bg-blue-600', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
                { name: 'Sneha Verma', calls: 486, max: 600, color: 'bg-purple-600', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
                { name: 'Rahul Mehta', calls: 412, max: 600, color: 'bg-indigo-600', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
                { name: 'Neha Singh', calls: 398, max: 600, color: 'bg-amber-500', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' },
                { name: 'Arjun Rao', calls: 365, max: 600, color: 'bg-sky-500', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop' },
              ].map((agent, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img src={agent.avatar} alt={agent.name} className="w-6 h-6 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center text-[11px] mb-0.5">
                      <span className="font-medium text-slate-800 truncate">{agent.name}</span>
                      <span className="font-bold text-slate-900">{agent.calls}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`${agent.color} h-full rounded-full`} style={{ width: `${(agent.calls / agent.max) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Call Duration Distribution */}
          <div className="bg-white rounded-xl p-4 border border-[#E5EBF2] shadow-sm space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Duration Distribution</h3>
            <div className="space-y-1.5 text-xs">
              {[
                { range: '< 1 min', count: 642, pct: '22.6%' },
                { range: '1 - 3 min', count: 1248, pct: '43.9%' },
                { range: '3 - 5 min', count: 620, pct: '21.8%' },
                { range: '5 - 10 min', count: 245, pct: '8.6%' },
                { range: '> 10 min', count: 90, pct: '3.1%' },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-16 text-[11px] text-slate-500 shrink-0">{d.range}</span>
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0362FA] h-full rounded-full" style={{ width: d.pct }} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 w-9 text-right">{d.count}</span>
                  <span className="text-[10px] text-slate-400 w-10 text-right">{d.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Call Recording Player */}
          <div className="bg-white rounded-xl p-4 border border-[#E5EBF2] shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Recording Player</h3>
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-full ${selectedCall.initialsBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
              >
                {selectedCall.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-slate-900 text-xs truncate">{selectedCall.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{selectedCall.company}</div>
                <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <span className="text-[#0362FA] font-medium">{selectedCall.type}</span>
                  <span>•</span>
                  <span>{selectedCall.callDate}, {selectedCall.callTime}</span>
                </div>
              </div>
            </div>

            {/* Audio Scrubber & Controls */}
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-7 h-7 rounded-full bg-[#0362FA] text-white flex items-center justify-center hover:bg-blue-600 shadow-sm shrink-0"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>
                <div className="flex-1">
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden relative cursor-pointer">
                    <div className="bg-[#0362FA] h-full rounded-full" style={{ width: isPlaying ? '35%' : '0%' }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>00:00 / {selectedCall.recording || '04:32'}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlaybackSpeed(playbackSpeed === '1x' ? '1.5x' : playbackSpeed === '1.5x' ? '2x' : '1x')}
                    className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold text-[10px]"
                  >
                    {playbackSpeed}
                  </button>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
