import React, { useState } from 'react';
import {
  Voicemail,
  PhoneIncoming,
  PhoneMissed,
  Clock,
  RotateCw,
  Settings,
  Search,
  ChevronDown,
  Play,
  Pause,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  UserPlus,
  Eye,
  UserCheck,
  Volume2,
  Maximize2,
  Copy,
  Calendar,
  Filter,
  X,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Trash2,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface VoicemailItem {
  id: number;
  initials: string;
  initialsBg: string;
  name: string;
  company: string;
  phone: string;
  duration: string;
  durationSec: number;
  receivedAtDate: string;
  receivedAtTime: string;
  status: 'New' | 'Unread' | 'Processed' | 'Important' | 'Spam';
  assignedTo: string;
  assignedAvatar: string;
}

const VOICEMAIL_DATA: VoicemailItem[] = [
  { id: 1, initials: 'RS', initialsBg: 'bg-pink-500', name: 'Rohit Sharma', company: 'Tech Solutions Pvt. Ltd.', phone: '+91 98765 43210', duration: '01:32', durationSec: 92, receivedAtDate: '31 Oct 2026', receivedAtTime: '10:45 AM', status: 'New', assignedTo: 'Amit Kumar', assignedAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop' },
  { id: 2, initials: 'PK', initialsBg: 'bg-purple-600', name: 'Priya Khanna', company: 'Globex Corp', phone: '+91 91234 56789', duration: '00:48', durationSec: 48, receivedAtDate: '31 Oct 2026', receivedAtTime: '09:22 AM', status: 'Unread', assignedTo: 'Sneha Verma', assignedAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { id: 3, initials: 'AJ', initialsBg: 'bg-emerald-500', name: 'Amit Jain', company: 'Jain Traders', phone: '+91 99887 66554', duration: '02:15', durationSec: 135, receivedAtDate: '30 Oct 2026', receivedAtTime: '06:18 PM', status: 'Processed', assignedTo: 'Rahul Mehta', assignedAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { id: 4, initials: 'SP', initialsBg: 'bg-indigo-600', name: 'Sunita Patel', company: 'Patel Industries', phone: '+91 88776 55543', duration: '00:36', durationSec: 36, receivedAtDate: '30 Oct 2026', receivedAtTime: '04:12 PM', status: 'New', assignedTo: 'Neha Singh', assignedAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop' },
  { id: 5, initials: 'VS', initialsBg: 'bg-teal-600', name: 'Vikram Singh', company: 'AutoHaus', phone: '+91 77665 44332', duration: '01:08', durationSec: 68, receivedAtDate: '30 Oct 2026', receivedAtTime: '02:45 PM', status: 'Important', assignedTo: 'Arjun Rao', assignedAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
  { id: 6, initials: 'NT', initialsBg: 'bg-orange-500', name: 'Neha Tiwari', company: 'NextGen Tech', phone: '+91 98712 34567', duration: '03:22', durationSec: 202, receivedAtDate: '30 Oct 2026', receivedAtTime: '01:10 PM', status: 'Processed', assignedTo: 'Pooja Sharma', assignedAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop' },
  { id: 7, initials: 'DS', initialsBg: 'bg-rose-500', name: 'Deepak Soni', company: 'Soni Enterprises', phone: '+91 91789 65432', duration: '00:55', durationSec: 55, receivedAtDate: '29 Oct 2026', receivedAtTime: '05:32 PM', status: 'New', assignedTo: 'Karan Yadav', assignedAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop' },
  { id: 8, initials: 'KM', initialsBg: 'bg-violet-600', name: 'Karan Mehta', company: 'Alpha Systems', phone: '+91 98745 67890', duration: '01:46', durationSec: 106, receivedAtDate: '29 Oct 2026', receivedAtTime: '03:18 PM', status: 'Unread', assignedTo: 'Anjali Gupta', assignedAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=80&h=80&fit=crop' },
  { id: 9, initials: 'SK', initialsBg: 'bg-blue-600', name: 'Simran Kaur', company: 'Bright Retail', phone: '+91 98712 34567', duration: '00:28', durationSec: 28, receivedAtDate: '29 Oct 2026', receivedAtTime: '11:50 AM', status: 'Spam', assignedTo: 'Rohit Verma', assignedAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop' },
  { id: 10, initials: 'LY', initialsBg: 'bg-pink-600', name: 'Lokesh Yadav', company: 'Shree Infra', phone: '+91 99876 54321', duration: '02:12', durationSec: 132, receivedAtDate: '28 Oct 2026', receivedAtTime: '06:40 PM', status: 'New', assignedTo: 'Simran Kaur', assignedAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop' },
];

export const VoicemailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'processed' | 'important' | 'spam'>('all');
  const [selectedItem, setSelectedItem] = useState<VoicemailItem>(VOICEMAIL_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('1x');
  const [detailTab, setDetailTab] = useState<'transcript' | 'summary' | 'details' | 'notes' | 'followups'>('transcript');

  const filteredItems = VOICEMAIL_DATA.filter((item) => {
    if (activeTab === 'unread') return item.status === 'Unread';
    if (activeTab === 'processed') return item.status === 'Processed';
    if (activeTab === 'important') return item.status === 'Important';
    if (activeTab === 'spam') return item.status === 'Spam';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Calling & Call Center</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">Voicemail</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Voicemail</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage all voicemail messages, listen to recordings, convert to leads and take follow-up actions.
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
            <Settings className="w-3.5 h-3.5" />
            <span>Voicemail Settings</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Total Voicemails */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#871CF4]">
                <Voicemail className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Total Voicemails</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">164</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>18.6%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[40, 55, 45, 70, 60, 95].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#0362FA] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* New Voicemails */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A]">
                <PhoneIncoming className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">New Voicemails</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">48</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>22.4%</span>
              <span className="text-slate-400 font-normal ml-1">this week</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[30, 45, 60, 50, 75, 90].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#13AB4A] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Missed Calls to Voicemail */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FEECEE] flex items-center justify-center text-[#E73647]">
                <PhoneMissed className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Missed Calls to Voicemail</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">89</div>
            <div className="flex items-center text-[11px] font-semibold text-[#E73647]">
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
              <span>12.5%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[75, 65, 55, 45, 40, 30].map((h, i) => (
              <div key={i} className="w-1.5 bg-rose-400 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Avg. Duration */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-[#EF9612]">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Avg. Duration</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">01:24</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>6.2%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[45, 50, 60, 70, 65, 80].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#EF9612] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-600 overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { key: 'all', label: 'All Voicemails (164)' },
          { key: 'unread', label: 'Unread (48)' },
          { key: 'processed', label: 'Processed (116)' },
          { key: 'important', label: 'Important (12)' },
          { key: 'spam', label: 'Spam (6)' },
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
            placeholder="Search by name, phone number or keyword..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA] focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer">
              <option>Status: All</option>
              <option>New</option>
              <option>Unread</option>
              <option>Processed</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer">
              <option>Duration: All</option>
              <option>&lt; 30 sec</option>
              <option>30 - 60 sec</option>
              <option>&gt; 1 min</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer">
              <option>Agent: All</option>
              <option>Amit Kumar</option>
              <option>Sneha Verma</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer">
              <option>Date Range: All</option>
              <option>Today</option>
              <option>This Week</option>
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
          <div className="overflow-x-auto" role="region" aria-label="Voicemail Messages Table" tabIndex={0}>
            <table className="w-full min-w-[980px] text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-[#E5EBF2] whitespace-nowrap">
                  <th className="py-3 px-3 w-8">
                    <input type="checkbox" className="rounded border-slate-300 text-[#0362FA] focus:ring-0" />
                  </th>
                  <th className="py-3 px-2 w-7 text-slate-400">#</th>
                  <th className="py-3 px-3.5">Caller Information</th>
                  <th className="py-3 px-3.5">Message Preview</th>
                  <th className="py-3 px-3.5">Duration</th>
                  <th className="py-3 px-3.5">Received At</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5">Assigned To</th>
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
                            <div className="text-[11px] text-[#0362FA] font-mono leading-tight whitespace-nowrap mt-0.5">{item.phone}</div>
                            <div className="text-[10px] text-slate-400 leading-tight whitespace-nowrap mt-0.5">{item.company}</div>
                          </div>
                        </div>
                      </td>

                      {/* Message Preview Waveform */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                              setIsPlaying(!isPlaying);
                            }}
                            className="p-1.5 rounded-full text-[#0362FA] hover:bg-blue-100 bg-blue-50 shrink-0 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </button>
                          <div className="flex items-center gap-0.5 h-4 w-28">
                            {[30, 60, 40, 80, 50, 90, 40, 70, 85, 45, 60, 75, 50, 35, 65].map((val, idx) => (
                              <div
                                key={idx}
                                className="flex-1 bg-blue-400 rounded-full"
                                style={{ height: `${val}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3.5 font-mono text-slate-700 font-medium whitespace-nowrap">{item.duration}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="text-slate-800 font-semibold leading-tight whitespace-nowrap">{item.receivedAtDate}</div>
                        <div className="text-[11px] text-slate-400 leading-tight mt-0.5 whitespace-nowrap">{item.receivedAtTime}</div>
                      </td>

                      {/* Status Badges */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {item.status === 'New' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#0362FA] border border-blue-200">
                            New
                          </span>
                        )}
                        {item.status === 'Unread' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEECEE] text-[#E73647] border border-rose-200">
                            Unread
                          </span>
                        )}
                        {item.status === 'Processed' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                            Processed
                          </span>
                        )}
                        {item.status === 'Important' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-[#EF9612] border border-amber-200">
                            Important
                          </span>
                        )}
                        {item.status === 'Spam' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            Spam
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <img
                            src={item.assignedAvatar}
                            alt={item.assignedTo}
                            className="w-6 h-6 rounded-full object-cover shrink-0"
                          />
                          <span className="text-slate-800 font-medium text-xs whitespace-nowrap">{item.assignedTo}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              toast.success('Voicemail Downloaded', `Audio file downloaded for ${item.name}`);
                            }}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                            title="Download Voicemail"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <ActionMenu
                            items={[
                              {
                                label: 'Play Audio Message',
                                icon: Play,
                                onClick: () => {
                                  setSelectedVoicemail(item);
                                  setIsPlaying(true);
                                  toast.info('Audio Loaded', `Playing voicemail from ${item.name}`);
                                },
                              },
                              {
                                label: 'Call Back Lead',
                                icon: PhoneCall,
                                onClick: () => {
                                  toast.success('Dialing', `Calling ${item.phone} (${item.name})...`);
                                },
                              },
                              {
                                label: 'Mark as Handled',
                                icon: UserCheck,
                                onClick: () => {
                                  toast.info('Status Updated', `Voicemail #${item.id} marked as resolved.`);
                                },
                              },
                              {
                                label: 'Delete Voicemail',
                                icon: Trash2,
                                danger: true,
                                onClick: () => {
                                  toast.warning('Voicemail Deleted', `Message #${item.id} permanently removed.`);
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

          {/* Footer */}
          <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#E5EBF2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing <span className="font-semibold text-slate-900">1</span> to{' '}
              <span className="font-semibold text-slate-900">10</span> of{' '}
              <span className="font-semibold text-slate-900">164</span> voicemails
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
                <button className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50">17</button>
                <button className="px-2 py-1 text-slate-600 hover:bg-slate-50 border-l border-slate-200">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <select className="px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-slate-700">
                <option>10 per page</option>
                <option>25 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Detail Panel (380px) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Voicemail Details</h3>
            <button className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Caller Header */}
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
                <div className="text-[11px] text-[#0362FA] font-mono mt-0.5">{selectedItem.phone}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0362FA]">
                New
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-[#E73647]">
                Unread
              </span>
            </div>
          </div>

          {/* Quick Action Icons Row */}
          <div className="grid grid-cols-5 gap-1.5 py-2 border-y border-slate-100 text-center">
            <button className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-slate-50 text-slate-700">
              <PhoneCall className="w-4 h-4 text-[#0362FA]" />
              <span className="text-[10px] font-medium">Call Back</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-slate-50 text-slate-700">
              <UserPlus className="w-4 h-4 text-[#13AB4A]" />
              <span className="text-[10px] font-medium">Add to Lead</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-slate-50 text-slate-700">
              <Eye className="w-4 h-4 text-purple-600" />
              <span className="text-[10px] font-medium">View Contact</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-slate-50 text-slate-700">
              <UserCheck className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-medium">Assign</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-slate-50 text-slate-700">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
              <span className="text-[10px] font-medium">More</span>
            </button>
          </div>

          {/* Audio Player with Waveform */}
          <div className="bg-[#F8FAFC] rounded-xl p-3 border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-[#0362FA] text-white flex items-center justify-center hover:bg-blue-600 shadow-md shrink-0 transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <div className="flex-1 flex items-center gap-0.5 h-8">
                {[
                  30, 45, 65, 85, 40, 75, 95, 60, 40, 85, 70, 50, 90, 65, 45, 80, 55, 35, 70, 90,
                  60, 40, 75, 50, 85, 65, 45, 95, 70, 40, 60, 80, 55, 35, 70, 85, 50, 40, 65, 80,
                ].map((val, idx) => {
                  const isPassed = idx < 12;
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
              { key: 'notes', label: 'Notes' },
              { key: 'followups', label: 'Follow-ups' },
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

          {/* Transcript Area */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-end">
              <button className="flex items-center gap-1 text-[11px] font-semibold text-[#0362FA] hover:underline">
                <Copy className="w-3 h-3" />
                <span>Copy Transcript</span>
              </button>
            </div>
            <div className="space-y-1.5 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 max-h-40 overflow-y-auto font-sans leading-relaxed">
              <p><span className="font-mono text-slate-400 font-medium mr-2">00:00</span>Hello, this is Rohit Sharma from Tech Solutions.</p>
              <p><span className="font-mono text-slate-400 font-medium mr-2">00:08</span>I wanted to know more about your CRM and call center solutions.</p>
              <p><span className="font-mono text-slate-400 font-medium mr-2">00:18</span>Please give me a call back at your earliest convenience.</p>
              <p><span className="font-mono text-slate-400 font-medium mr-2">00:28</span>My requirement is for about 20 agents.</p>
              <p><span className="font-mono text-slate-400 font-medium mr-2">00:36</span>Looking forward to your response. Thank you.</p>
            </div>
          </div>

          {/* AI Summary Section */}
          <div className="bg-[#FAFBFD] rounded-xl p-3 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">AI</div>
              <span>AI Summary</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rohit Sharma from Tech Solutions is interested in CRM and call center solutions for around 20 agents. He requested a call back at the earliest convenience.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Intent</span>
                <span className="font-bold text-[#13AB4A] text-[11px]">Interested</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Priority</span>
                <span className="font-bold text-[#EF9612] text-[11px]">Medium</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Next Action</span>
                <span className="font-bold text-[#0362FA] text-[11px]">Call Back</span>
              </div>
            </div>
            {/* Suggested Tags */}
            <div className="pt-1.5">
              <div className="text-[10px] text-slate-400 font-medium mb-1">Suggested Tags</div>
              <div className="flex flex-wrap gap-1">
                {['CRM', 'Call Center', '20 Agents', 'Follow-up'].map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[10px] font-medium bg-purple-50 text-purple-700 rounded border border-purple-100">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Analytics Donut + Duration */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-900">Voicemail Analytics</div>
              <div className="flex items-center gap-2">
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      stroke="#0362FA"
                      strokeWidth="4"
                      strokeDasharray="29.3, 100"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      stroke="#13AB4A"
                      strokeWidth="4"
                      strokeDasharray="70.7, 100"
                      strokeDashoffset="-29.3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-extrabold text-slate-900 leading-none">164</span>
                    <span className="text-[7px] text-slate-400">Total</span>
                  </div>
                </div>
                <div className="space-y-0.5 text-[9px] text-slate-600">
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> New 48</div>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Processed 116</div>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Important 12</div>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Spam 6</div>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="text-[11px] font-bold text-slate-900">Voicemail by Duration</div>
              <div className="space-y-1 text-[9px]">
                {[
                  { label: '< 30 sec', count: 32, pct: '19.5%' },
                  { label: '30 - 60 sec', count: 58, pct: '35.4%' },
                  { label: '1 - 3 min', count: 51, pct: '31.1%' },
                  { label: '3 - 5 min', count: 18, pct: '11.0%' },
                  { label: '> 5 min', count: 5, pct: '3.0%' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between text-slate-600">
                    <span>{row.label}</span>
                    <span className="font-semibold text-slate-900">{row.count} ({row.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
