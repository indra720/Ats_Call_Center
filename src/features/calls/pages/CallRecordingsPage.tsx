import React, { useState } from 'react';
import {
  Music,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  RotateCw,
  Download,
  Filter,
  Search,
  ChevronDown,
  Play,
  Pause,
  Volume2,
  Maximize2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Smile,
  Calendar,
  Tag,
  Plus,
  ArrowUpRight,
  X,
  Copy,
  Share2,
  FileText,
  Trash2,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface RecordingItem {
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
  agent: string;
  agentAvatar: string;
}

const RECORDINGS_DATA: RecordingItem[] = [
  { id: 1, initials: 'RS', initialsBg: 'bg-pink-500', name: 'Rohit Sharma', company: 'Tech Solutions Pvt. Ltd.', phone: '+91 98765 43210', type: 'Inbound', duration: '04:32', durationSec: 272, callTime: '11:20 AM', callDate: '31 Oct 2026', status: 'Answered', agent: 'Amit Kumar', agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop' },
  { id: 2, initials: 'PK', initialsBg: 'bg-purple-600', name: 'Priya Khanna', company: 'Globex Corp', phone: '+91 91234 56789', type: 'Outbound', duration: '02:18', durationSec: 138, callTime: '10:45 AM', callDate: '31 Oct 2026', status: 'Answered', agent: 'Sneha Verma', agentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { id: 3, initials: 'AJ', initialsBg: 'bg-emerald-500', name: 'Amit Jain', company: 'Jain Traders', phone: '+91 99887 66554', type: 'Inbound', duration: '00:45', durationSec: 45, callTime: '09:30 AM', callDate: '31 Oct 2026', status: 'Missed', agent: 'Rahul Mehta', agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { id: 4, initials: 'SP', initialsBg: 'bg-indigo-600', name: 'Sunita Patel', company: 'Patel Industries', phone: '+91 88776 55543', type: 'Outbound', duration: '06:12', durationSec: 372, callTime: '09:10 AM', callDate: '31 Oct 2026', status: 'Answered', agent: 'Neha Singh', agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop' },
  { id: 5, initials: 'VS', initialsBg: 'bg-teal-600', name: 'Vikram Singh', company: 'AutoHaus', phone: '+91 77665 44332', type: 'Inbound', duration: '03:22', durationSec: 202, callTime: '08:45 AM', callDate: '31 Oct 2026', status: 'Answered', agent: 'Arjun Rao', agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
  { id: 6, initials: 'NT', initialsBg: 'bg-orange-500', name: 'Neha Tiwari', company: 'NextGen Tech', phone: '+91 98712 34567', type: 'Missed', duration: '00:00', durationSec: 0, callTime: '06:30 PM', callDate: '30 Oct 2026', status: 'Missed', agent: 'Pooja Sharma', agentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop' },
  { id: 7, initials: 'DS', initialsBg: 'bg-rose-500', name: 'Deepak Soni', company: 'Soni Enterprises', phone: '+91 91789 65432', type: 'Inbound', duration: '01:48', durationSec: 108, callTime: '05:15 PM', callDate: '30 Oct 2026', status: 'Answered', agent: 'Karan Yadav', agentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop' },
  { id: 8, initials: 'SK', initialsBg: 'bg-violet-600', name: 'Karan Mehta', company: 'Alpha Systems', phone: '+91 98745 67890', type: 'Outbound', duration: '02:26', durationSec: 146, callTime: '04:10 PM', callDate: '30 Oct 2026', status: 'Answered', agent: 'Anjali Gupta', agentAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=80&h=80&fit=crop' },
  { id: 9, initials: 'SK', initialsBg: 'bg-blue-600', name: 'Simran Kaur', company: 'Bright Retail', phone: '+91 98712 34567', type: 'Inbound', duration: '02:08', durationSec: 128, callTime: '03:25 PM', callDate: '30 Oct 2026', status: 'Answered', agent: 'Rohit Verma', agentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop' },
  { id: 10, initials: 'LY', initialsBg: 'bg-pink-600', name: 'Lokesh Yadav', company: 'Shree Infra', phone: '+91 99876 54321', type: 'Missed', duration: '00:00', durationSec: 0, callTime: '02:15 PM', callDate: '30 Oct 2026', status: 'Missed', agent: 'Simran Kaur', agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop' },
  { id: 11, initials: 'KM', initialsBg: 'bg-blue-700', name: 'Manish Gupta', company: 'Gupta & Co.', phone: '+91 87654 32109', type: 'Outbound', duration: '03:55', durationSec: 235, callTime: '01:40 PM', callDate: '30 Oct 2026', status: 'Answered', agent: 'Amit Kumar', agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop' },
  { id: 12, initials: 'RV', initialsBg: 'bg-purple-500', name: 'Ravi Verma', company: 'Verma Enterprises', phone: '+91 76543 21098', type: 'Inbound', duration: '01:12', durationSec: 72, callTime: '12:30 PM', callDate: '30 Oct 2026', status: 'Answered', agent: 'Sneha Verma', agentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { id: 13, initials: 'MP', initialsBg: 'bg-emerald-600', name: 'Pooja Mishra', company: 'Mishra Retail', phone: '+91 93456 78901', type: 'Outbound', duration: '05:20', durationSec: 320, callTime: '11:10 AM', callDate: '30 Oct 2026', status: 'Answered', agent: 'Rahul Mehta', agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { id: 14, initials: 'SK', initialsBg: 'bg-amber-500', name: 'Sandeep Kumar', company: 'Kumar Tech', phone: '+91 82345 67890', type: 'Inbound', duration: '00:36', durationSec: 36, callTime: '10:05 AM', callDate: '30 Oct 2026', status: 'Answered', agent: 'Neha Singh', agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop' },
  { id: 15, initials: 'AS', initialsBg: 'bg-teal-500', name: 'Ankit Singh', company: 'Singh Motors', phone: '+91 90234 56789', type: 'Outbound', duration: '03:18', durationSec: 198, callTime: '09:50 AM', callDate: '30 Oct 2026', status: 'Answered', agent: 'Arjun Rao', agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
];

export const CallRecordingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'inbound' | 'outbound' | 'missed' | 'starred'>('all');
  const [selectedItem, setSelectedItem] = useState<RecordingItem>(RECORDINGS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('1x');
  const [detailTab, setDetailTab] = useState<'transcript' | 'summary' | 'details' | 'lead'>('transcript');
  const [transcriptSearch, setTranscriptSearch] = useState('');

  const filteredItems = RECORDINGS_DATA.filter((item) => {
    if (activeTab === 'inbound') return item.type === 'Inbound';
    if (activeTab === 'outbound') return item.type === 'Outbound';
    if (activeTab === 'missed') return item.type === 'Missed';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Calling & Call Center</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">Call Recordings</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Call Recordings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Listen, manage and analyze all call recordings. Get AI-powered transcriptions, summaries and insights.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 31 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <RotateCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Refresh</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Total Recordings */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#871CF4]">
                <Music className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Total Recordings</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">2,845</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>18.6%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[40, 60, 45, 75, 55, 95].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#0362FA] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Inbound Recordings */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A]">
                <PhoneIncoming className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Inbound Recordings</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">1,524</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>17.4%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[35, 50, 40, 70, 60, 90].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#13AB4A] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Outbound Recordings */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
                <PhoneOutgoing className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Outbound Recordings</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">1,321</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>20.3%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[30, 45, 55, 65, 50, 85].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#0362FA] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Total Duration */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-[#EF9612]">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Total Duration</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">142:35:16</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>22.4%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[45, 55, 65, 80, 70, 95].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#EF9612] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-600 overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { key: 'all', label: 'All Recordings (2,845)' },
          { key: 'inbound', label: 'Inbound (1,524)' },
          { key: 'outbound', label: 'Outbound (1,321)' },
          { key: 'missed', label: 'Missed (489)' },
          { key: 'starred', label: 'Starred (56)' },
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

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-3 border border-[#E5EBF2] shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center flex-1 min-w-[260px] max-w-sm relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search by contact name, phone number, agent..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA] focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer">
              <option>Call Type: All</option>
              <option>Inbound</option>
              <option>Outbound</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer">
              <option>Status: All</option>
              <option>Answered</option>
              <option>Missed</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer">
              <option>Agent: All</option>
              <option>Amit Kumar</option>
              <option>Sneha Verma</option>
              <option>Rahul Mehta</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer">
              <option>Date Range: All</option>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg">
            <Filter className="w-3 h-3 text-slate-500" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Table (~65%) + Right Detail Panel (~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Table Area */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
          <div className="overflow-x-auto" role="region" aria-label="Call Recordings Table" tabIndex={0}>
            <table className="w-full min-w-[1000px] text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-[#E5EBF2] whitespace-nowrap">
                  <th className="py-3 px-3 w-8">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0362FA] focus:ring-0" />
                  </th>
                  <th className="py-3 px-2 w-7 text-slate-400">#</th>
                  <th className="py-3 px-3.5">Contact Name</th>
                  <th className="py-3 px-3.5">Phone Number</th>
                  <th className="py-3 px-3.5">Type</th>
                  <th className="py-3 px-3.5">Duration</th>
                  <th className="py-3 px-3.5">Call Time ↓</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5">Agent</th>
                  <th className="py-3 px-3.5 text-center">Recording</th>
                  <th className="py-3 px-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => {
                  const isSelected = selectedItem.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
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
                            <div className="font-semibold text-slate-900 leading-tight whitespace-nowrap">{item.name}</div>
                            <div className="text-[11px] text-slate-400 leading-tight mt-0.5 whitespace-nowrap">{item.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3.5 font-mono text-[#0362FA] font-semibold whitespace-nowrap">{item.phone}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-700">
                          {item.type === 'Inbound' && <PhoneIncoming className="w-3.5 h-3.5 text-[#13AB4A]" />}
                          {item.type === 'Outbound' && <PhoneOutgoing className="w-3.5 h-3.5 text-[#0362FA]" />}
                          {item.type === 'Missed' && <PhoneMissed className="w-3.5 h-3.5 text-[#E73647]" />}
                          <span>{item.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3.5 font-mono text-slate-700 font-medium whitespace-nowrap">{item.duration}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="text-slate-800 font-semibold leading-tight whitespace-nowrap">{item.callDate}</div>
                        <div className="text-[11px] text-slate-400 leading-tight mt-0.5 whitespace-nowrap">{item.callTime}</div>
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
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <img src={item.agentAvatar} alt={item.agent} className="w-6 h-6 rounded-full object-cover shrink-0" />
                          <span className="text-slate-800 font-medium text-xs whitespace-nowrap">{item.agent}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(item);
                            setIsPlaying(!isPlaying);
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#0362FA] hover:bg-blue-100 text-xs font-semibold whitespace-nowrap transition-colors"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Play</span>
                        </button>
                      </td>
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              toast.success('MP3 Download Started', `Downloading recording for ${rec.name} (${rec.duration})`);
                            }}
                            title="Download Recording"
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <ActionMenu
                            items={[
                              {
                                label: 'Open Player & Waveform',
                                icon: Play,
                                onClick: () => {
                                  setSelectedRec(rec);
                                  setIsPlaying(true);
                                  toast.info('Audio Loaded', `Now playing recording for ${rec.name}`);
                                },
                              },
                              {
                                label: 'Copy Shareable Link',
                                icon: Copy,
                                onClick: () => {
                                  navigator.clipboard.writeText(`https://app.atscallcenter.in/calls/recordings/${rec.id}`);
                                  toast.success('Link Copied', 'Encrypted sharing link copied to clipboard.');
                                },
                              },
                              {
                                label: 'View AI Transcript',
                                icon: FileText,
                                onClick: () => {
                                  setSelectedRec(rec);
                                  toast.info('Transcript Opened', `Showing speaker transcription for ${rec.name}`);
                                },
                              },
                              {
                                label: 'Delete Recording',
                                icon: Trash2,
                                danger: true,
                                onClick: () => {
                                  toast.warning('Recording Archived', `Recording #${rec.id} moved to compliance archive.`);
                                },
                              },
                            ]}
                          />
                        </div>
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
              <span className="font-semibold text-slate-900">2,845</span> recordings
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
              </select>
            </div>
          </div>
        </div>

        {/* Right Detail Panel (380px) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Recording Details</h3>
            <button className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Lead Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${selectedItem.initialsBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
              >
                {selectedItem.initials}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{selectedItem.name}</div>
                <div className="text-xs text-slate-500">{selectedItem.company}</div>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
              Answered
            </span>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-lg text-center text-xs">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Phone Number</div>
              <div className="font-semibold text-slate-800 text-[11px] mt-0.5">{selectedItem.phone}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Call Time</div>
              <div className="font-semibold text-slate-800 text-[11px] mt-0.5">{selectedItem.callDate}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Duration</div>
              <div className="font-semibold text-slate-800 text-[11px] mt-0.5">{selectedItem.duration}</div>
            </div>
          </div>

          {/* Large Audio Player with Waveform */}
          <div className="bg-[#F8FAFC] rounded-xl p-3 border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-[#0362FA] text-white flex items-center justify-center hover:bg-blue-600 shadow-md shrink-0 transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              {/* Waveform graphic */}
              <div className="flex-1 flex items-center gap-0.5 h-8">
                {[
                  35, 60, 40, 80, 50, 95, 30, 45, 85, 65, 40, 75, 90, 55, 35, 70, 80, 60, 45, 95,
                  50, 30, 65, 85, 40, 55, 75, 60, 90, 45, 35, 60, 80, 50, 40, 70, 85, 60, 35, 50,
                ].map((val, idx) => {
                  const isPassed = idx < 14;
                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-full transition-colors ${
                        isPassed ? 'bg-[#0362FA]' : 'bg-slate-300'
                      }`}
                      style={{ height: `${val}%` }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>00:00 / {selectedItem.duration}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSpeed(speed === '1x' ? '1.5x' : speed === '1.5x' ? '2x' : '1x')}
                  className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-bold text-xs"
                >
                  {speed}
                </button>
                <Volume2 className="w-4 h-4 text-slate-500" />
                <Maximize2 className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>

          {/* Panel Tabs */}
          <div className="flex items-center gap-4 border-b border-slate-200 text-xs font-semibold text-slate-600">
            {[
              { key: 'transcript', label: 'Transcript' },
              { key: 'summary', label: 'AI Summary' },
              { key: 'details', label: 'Call Details' },
              { key: 'lead', label: 'Related Lead' },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setDetailTab(t.key as any)}
                className={`pb-2 transition-colors relative ${
                  detailTab === t.key
                    ? 'text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]'
                    : 'hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Transcript Content */}
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={transcriptSearch}
                  onChange={(e) => setTranscriptSearch(e.target.value)}
                  placeholder="Search in transcript..."
                  className="w-full pl-8 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-xs">
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {[
                { time: '00:00', speaker: 'RS', isAgent: false, text: 'Hello, this is Rohit Sharma from Tech Solutions.' },
                { time: '00:05', speaker: 'A', isAgent: true, text: 'Hi Mr. Rohit, this is Amit from ATS Call Center. How can I help you today?' },
                { time: '00:12', speaker: 'RS', isAgent: false, text: 'I want to know more about your call center solution.' },
                { time: '00:20', speaker: 'A', isAgent: true, text: 'Sure, I can explain the features and pricing to you.' },
                { time: '00:45', speaker: 'RS', isAgent: false, text: 'Great, please share the details via email.' },
                { time: '00:52', speaker: 'A', isAgent: true, text: 'I will send the details and also schedule a demo call.' },
                { time: '01:10', speaker: 'RS', isAgent: false, text: 'Thank you. Looking forward to the demo.' },
              ].map((msg, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <div
                    className={`w-6 h-6 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 ${
                      msg.isAgent ? 'bg-blue-600' : 'bg-pink-500'
                    }`}
                  >
                    {msg.speaker}
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-lg p-2 border border-slate-100">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                      <span className="font-semibold text-slate-700">
                        {msg.isAgent ? 'Amit Kumar (Agent)' : selectedItem.name}
                      </span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="text-slate-700">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div className="text-center pt-1">
                <button className="text-xs font-semibold text-[#0362FA] hover:underline">Show More</button>
              </div>
            </div>
          </div>

          {/* AI Summary Card */}
          <div className="bg-[#FAFBFD] rounded-xl p-3.5 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">AI Summary</h4>
              <button className="flex items-center gap-1 text-[11px] font-semibold text-[#0362FA] hover:underline">
                <RotateCw className="w-3 h-3" />
                <span>Generate Again</span>
              </button>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Sentiment</span>
                <span className="font-bold text-[#13AB4A] text-[11px]">😊 Positive</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Call Outcome</span>
                <span className="font-bold text-[#13AB4A] text-[11px]">✓ Interested</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Next Action</span>
                <span className="font-bold text-[#0362FA] text-[11px]">Schedule Demo</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Follow-up Date</span>
                <span className="font-bold text-slate-800 text-[11px]">02 Nov 2026</span>
              </div>
            </div>

            <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
              <li>Rohit Sharma from Tech Solutions inquired about ATS call center solution.</li>
              <li>Discussed key features and pricing.</li>
              <li>Rohit is interested in the solution.</li>
              <li>Details will be shared via email.</li>
              <li>Demo call to be scheduled on 02 Nov 2026.</li>
            </ul>

            {/* Tags */}
            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-700">Tags</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {['Interested', 'Demo', 'Pricing', 'Follow-up'].map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] font-medium bg-blue-50 text-[#0362FA] rounded-md border border-blue-100"
                  >
                    {t}
                  </span>
                ))}
                <button className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-white text-slate-600 rounded-md border border-slate-200 hover:bg-slate-50">
                  <Plus className="w-3 h-3" />
                  <span>Add Tag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
