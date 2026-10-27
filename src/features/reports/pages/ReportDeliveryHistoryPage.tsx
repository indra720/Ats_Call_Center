import React, { useState } from 'react';
import {
  Calendar,
  Download,
  RefreshCw,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  MessageSquare,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

interface DeliveryItem {
  id: number;
  reportName: string;
  reportType: string;
  channel: 'Email' | 'WhatsApp' | 'In-App' | 'SMS';
  recipients: number;
  sentBy: { name: string; avatar: string };
  sentOn: string;
  status: 'Success' | 'Failed' | 'Pending';
  deliveryTime: string;
}

export const ReportDeliveryHistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChannel, setFilterChannel] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedLog, setSelectedLog] = useState<DeliveryItem | null>(null);

  const deliveryLogs: DeliveryItem[] = [
    { id: 1, reportName: 'Daily Call Summary', reportType: 'Call Report', channel: 'Email', recipients: 5, sentBy: { name: 'Kamlesh Kumar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' }, sentOn: '21 Oct 2026, 09:00 AM', status: 'Success', deliveryTime: '8 sec' },
    { id: 2, reportName: 'Lead Conversion Report', reportType: 'Lead Report', channel: 'WhatsApp', recipients: 8, sentBy: { name: 'Pramod Saini', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' }, sentOn: '21 Oct 2026, 08:45 AM', status: 'Success', deliveryTime: '12 sec' },
    { id: 3, reportName: 'Agent Performance', reportType: 'Agent Report', channel: 'Email', recipients: 6, sentBy: { name: 'Aakash Kumawat', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop' }, sentOn: '20 Oct 2026, 06:30 PM', status: 'Success', deliveryTime: '10 sec' },
    { id: 4, reportName: 'Campaign Performance', reportType: 'Campaign Report', channel: 'In-App', recipients: 4, sentBy: { name: 'Yashika Kanwar', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' }, sentOn: '20 Oct 2026, 04:20 PM', status: 'Success', deliveryTime: '6 sec' },
    { id: 5, reportName: 'Customer Engagement', reportType: 'Customer Report', channel: 'Email', recipients: 7, sentBy: { name: 'Rohan Mehta', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' }, sentOn: '20 Oct 2026, 11:10 AM', status: 'Failed', deliveryTime: '-' },
    { id: 6, reportName: 'Weekly Lead Report', reportType: 'Lead Report', channel: 'WhatsApp', recipients: 12, sentBy: { name: 'Neha Verma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop' }, sentOn: '19 Oct 2026, 05:00 PM', status: 'Success', deliveryTime: '14 sec' },
    { id: 7, reportName: 'Lead Nurturing Report', reportType: 'Lead Report', channel: 'SMS', recipients: 8, sentBy: { name: 'Team Manager', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' }, sentOn: '19 Oct 2026, 10:15 AM', status: 'Pending', deliveryTime: '-' },
  ];

  const filteredLogs = deliveryLogs.filter((d) => {
    if (filterChannel !== 'All' && d.channel !== filterChannel) return false;
    if (filterStatus !== 'All' && d.status !== filterStatus) return false;
    if (searchQuery && !d.reportName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeLog = selectedLog || deliveryLogs[0];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Report Delivery History</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Report Delivery History & Logs</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track and monitor all scheduled and manual report deliveries with detailed logs, status, and recipient information.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => toast.info('Refreshed', 'Delivery logs reloaded.')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => toast.success('Logs Exported', 'Delivery history downloaded as CSV.')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Metric Cards - Balanced, non-shrinking layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Deliveries</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">248</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">28% vs last month</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Send className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Successful</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">232</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">34% delivered</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Failed</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">12</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">-40% bounced</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <XCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Pending Queue</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">4</div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate">
              0% change
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Recipients</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">486</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">25% reach</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <Mail className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Delivery Time</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">12 sec</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">-30% latency</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Row 2: Status Trend + Deliveries by Channel Donut + Deliveries by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Trend (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Delivery Status Trend</h3>
          <div className="relative h-44 w-full pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none">
              <line x1="0" y1="30" x2="400" y2="30" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="#F1F5F9" strokeWidth="1" />
              <polyline fill="none" stroke="#0362FA" strokeWidth="2" points="10,85 60,70 120,55 180,60 240,40 300,45 360,35" />
              <polyline fill="none" stroke="#E73647" strokeWidth="2" strokeDasharray="3,3" points="10,135 60,130 120,132 180,128 240,130 300,135 360,130" />
            </svg>
            <div className="flex justify-between text-[9px] text-slate-400 mt-1">
              <span>1 Oct</span>
              <span>4 Oct</span>
              <span>7 Oct</span>
              <span>10 Oct</span>
              <span>13 Oct</span>
              <span>16 Oct</span>
              <span>21 Oct</span>
            </div>
          </div>
        </div>

        {/* Channel Donut (3.5 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Deliveries by Channel</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="60, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="21, 100" strokeDashoffset="-60" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="11, 100" strokeDashoffset="-81" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="5, 100" strokeDashoffset="-92" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="3, 100" strokeDashoffset="-97" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">248</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">Email</span><span className="font-bold">148 (60%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">WhatsApp</span><span className="font-bold">52 (21%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">In-App</span><span className="font-bold">28 (11%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">SMS</span><span className="font-bold">12 (5%)</span></div>
            </div>
          </div>
        </div>

        {/* Deliveries by Type (3.5 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Deliveries by Report Type</h3>
          <div className="space-y-2 text-xs">
            {[
              { type: 'Call Reports', count: 72, w: '95%', color: 'bg-blue-600' },
              { type: 'Lead Reports', count: 58, w: '78%', color: 'bg-emerald-600' },
              { type: 'Agent Reports', count: 42, w: '58%', color: 'bg-amber-500' },
              { type: 'Campaign Reports', count: 36, w: '48%', color: 'bg-purple-600' },
              { type: 'Customer Reports', count: 24, w: '32%', color: 'bg-rose-500' },
            ].map((d, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-800">{d.type}</span>
                  <span className="font-mono text-slate-500">{d.count}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${d.color}`} style={{ width: d.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Delivery Logs Table + Delivery Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Logs Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Delivery Logs</h3>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2 py-1 text-xs border border-slate-200 rounded-lg w-36"
                />
              </div>

              <select
                value={filterChannel}
                onChange={(e) => setFilterChannel(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium text-slate-700"
              >
                <option value="All">All Channels</option>
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="In-App">In-App</option>
                <option value="SMS">SMS</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium text-slate-700"
              >
                <option value="All">All Status</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Report Name</th>
                  <th className="py-2.5 px-2">Report Type</th>
                  <th className="py-2.5 px-2">Channel</th>
                  <th className="py-2.5 px-2 text-center">Recipients</th>
                  <th className="py-2.5 px-2">Sent By</th>
                  <th className="py-2.5 px-2">Sent On</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{log.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{log.reportName}</td>
                    <td className="py-2.5 px-2 text-slate-600">{log.reportType}</td>
                    <td className="py-2.5 px-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                        log.channel === 'Email'
                          ? 'bg-blue-50 text-blue-700'
                          : log.channel === 'WhatsApp'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}>
                        {log.channel}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#0362FA]">{log.recipients}</td>
                    <td className="py-2.5 px-2 text-slate-800">{log.sentBy.name}</td>
                    <td className="py-2.5 px-2 text-slate-500 font-mono text-[11px]">{log.sentOn}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        log.status === 'Success'
                          ? 'bg-[#E9F9EE] text-[#13AB4A]'
                          : log.status === 'Failed'
                          ? 'bg-[#FEECEE] text-[#E73647]'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button className="px-2 py-0.5 bg-blue-50 text-[#0362FA] rounded text-[10px] font-semibold hover:bg-blue-100">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Preview Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Delivery Details</h3>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400 text-[11px]">Report Name</span>
              <span className="font-bold text-slate-900">{activeLog.reportName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-[11px]">Report Type</span>
              <span className="font-medium text-slate-800">{activeLog.reportType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-[11px]">Channel</span>
              <span className="font-semibold text-[#0362FA]">{activeLog.channel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-[11px]">Recipients</span>
              <span className="font-medium text-slate-800">{activeLog.recipients} users</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-[11px]">Sent By</span>
              <span className="font-medium text-slate-800">{activeLog.sentBy.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-[11px]">Sent On</span>
              <span className="font-mono text-slate-600">{activeLog.sentOn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-[11px]">Status</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                activeLog.status === 'Success' ? 'bg-[#E9F9EE] text-[#13AB4A]' : 'bg-[#FEECEE] text-[#E73647]'
              }`}>
                {activeLog.status}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900">Message Payload</h4>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed font-mono">
              Please find attached the automated call center operational performance report for {activeLog.sentOn}.
            </div>
          </div>

          <button
            onClick={() => toast.success('Dispatch Re-sent', `Re-dispatched ${activeLog.reportName} to queue.`)}
            className="w-full py-2 bg-[#0362FA] text-white rounded-lg text-xs font-semibold hover:bg-blue-600 shadow-sm flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Re-send Delivery Now
          </button>
        </div>
      </div>
    </div>
  );
};
