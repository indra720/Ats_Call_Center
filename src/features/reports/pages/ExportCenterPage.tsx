import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Share2,
  RefreshCw,
  Plus,
  CheckCircle2,
  XCircle,
  FileText,
  FileSpreadsheet,
  HardDrive,
  Clock,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  MoreVertical,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

interface ExportRecord {
  id: number;
  name: string;
  type: string;
  format: 'PDF' | 'Excel' | 'CSV' | 'ZIP';
  size: string;
  user: { name: string; avatar: string };
  time: string;
  status: 'Success' | 'Failed';
}

export const ExportCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterFormat, setFilterFormat] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const [exportsList, setExportsList] = useState<ExportRecord[]>([
    { id: 1, name: 'Daily Call Summary', type: 'Call Report', format: 'PDF', size: '2.4 MB', user: { name: 'Kamlesh Kumar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' }, time: '21 Oct 2026, 09:15 AM', status: 'Success' },
    { id: 2, name: 'Lead Conversion Report', type: 'Lead Report', format: 'Excel', size: '1.8 MB', user: { name: 'Pramod Saini', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' }, time: '21 Oct 2026, 08:45 AM', status: 'Success' },
    { id: 3, name: 'Agent Performance', type: 'Agent Report', format: 'PDF', size: '3.2 MB', user: { name: 'Aakash Sharma', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop' }, time: '20 Oct 2026, 06:30 PM', status: 'Success' },
    { id: 4, name: 'Campaign Performance', type: 'Campaign Report', format: 'CSV', size: '950 KB', user: { name: 'Yashika Kanwar', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' }, time: '20 Oct 2026, 04:20 PM', status: 'Success' },
    { id: 5, name: 'Customer Engagement', type: 'Customer Report', format: 'Excel', size: '2.1 MB', user: { name: 'Rohan Mehta', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' }, time: '20 Oct 2026, 11:10 AM', status: 'Failed' },
    { id: 6, name: 'Lead Nurturing Report', type: 'Lead Report', format: 'PDF', size: '1.6 MB', user: { name: 'Neha Verma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop' }, time: '19 Oct 2026, 05:00 PM', status: 'Success' },
    { id: 7, name: 'Weekly Call Summary', type: 'Call Report', format: 'PDF', size: '2.8 MB', user: { name: 'Team Manager', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' }, time: '19 Oct 2026, 10:15 AM', status: 'Success' },
  ]);

  const filteredExports = exportsList.filter((e) => {
    if (filterType !== 'All' && e.type !== filterType) return false;
    if (filterFormat !== 'All' && e.format !== filterFormat) return false;
    if (filterStatus !== 'All' && e.status !== filterStatus) return false;
    if (searchQuery && !e.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleDownload = (name: string) => {
    toast.success('Download Initiated', `Saving "${name}" to local device.`);
  };

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Report Shared', 'Download link dispatched to specified recipients via email.');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Export & Download Center</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Report Export & Download Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Download, export, and share your reports in multiple formats with advanced options.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => toast.info('Refreshed', 'Export queue updated.')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => toast.success('Bulk Export', 'Zipping all current month reports.')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Bulk Export</span>
          </button>
          <button
            onClick={() => toast.info('New Export', 'Select a report to export.')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0362FA] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Export</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Metric Cards - Balanced, non-shrinking layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Exports</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">186</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">28% vs last month</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Download className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Successful</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">172</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">32% completed</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Failed</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">6</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">-50% reduction</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <XCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Data Size</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">2.4 GB</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">25% capacity</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <HardDrive className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Downloads</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">348</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">18% accessed</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Avg. Speed</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">12 sec</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">-40% latency</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Row 2: Trend + Donut + Data Size */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Trend (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Export Activity Trend</h3>
          <div className="relative h-44 w-full pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none">
              <line x1="0" y1="30" x2="400" y2="30" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="#F1F5F9" strokeWidth="1" />
              <polyline fill="none" stroke="#0362FA" strokeWidth="2" points="10,90 60,75 120,60 180,68 240,48 300,52 360,45" />
              <polyline fill="none" stroke="#13AB4A" strokeWidth="2" points="10,105 60,90 120,75 180,85 240,65 300,70 360,60" />
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

        {/* Format Donut (3.5 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Exports by Format</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="42, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="30, 100" strokeDashoffset="-42" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="15, 100" strokeDashoffset="-72" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="9, 100" strokeDashoffset="-87" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="4, 100" strokeDashoffset="-96" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">186</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">PDF</span><span className="font-bold">78 (42%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Excel</span><span className="font-bold">56 (30%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">CSV</span><span className="font-bold">28 (15%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">ZIP</span><span className="font-bold">16 (9%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Other</span><span className="font-bold">8 (4%)</span></div>
            </div>
          </div>
        </div>

        {/* Data Size Bars (3.5 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Data Size by Report Type</h3>
          <div className="space-y-2 text-xs">
            {[
              { type: 'Call Reports', size: '650 MB', w: '90%', color: 'bg-blue-600' },
              { type: 'Lead Reports', size: '520 MB', w: '75%', color: 'bg-emerald-600' },
              { type: 'Agent Reports', size: '420 MB', w: '60%', color: 'bg-amber-500' },
              { type: 'Campaign Reports', size: '320 MB', w: '48%', color: 'bg-purple-600' },
              { type: 'Customer Reports', size: '280 MB', w: '40%', color: 'bg-rose-500' },
              { type: 'Other Reports', size: '210 MB', w: '30%', color: 'bg-slate-400' },
            ].map((d, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-800">{d.type}</span>
                  <span className="font-mono text-slate-500">{d.size}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${d.color}`} style={{ width: d.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Export History Table (8 cols) + Right Quick Export & Share Panels (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Export History Table */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Export History</h3>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Search exports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2 py-1 text-xs border border-slate-200 rounded-lg w-36"
                />
              </div>

              <select
                value={filterFormat}
                onChange={(e) => setFilterFormat(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium text-slate-700"
              >
                <option value="All">All Formats</option>
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="CSV">CSV</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium text-slate-700"
              >
                <option value="All">All Status</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Report Name</th>
                  <th className="py-2.5 px-2">Format</th>
                  <th className="py-2.5 px-2">File Size</th>
                  <th className="py-2.5 px-2">Requested By</th>
                  <th className="py-2.5 px-2">Exported On</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {filteredExports.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{row.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{row.name}</td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {row.format}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-mono text-slate-600">{row.size}</td>
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-1.5">
                        <img src={row.user.avatar} alt={row.user.name} className="w-4 h-4 rounded-full object-cover" />
                        <span className="text-slate-800 font-medium">{row.user.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-slate-500 font-mono text-[11px]">{row.time}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        row.status === 'Success' ? 'bg-[#E9F9EE] text-[#13AB4A]' : 'bg-[#FEECEE] text-[#E73647]'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {row.status === 'Success' ? (
                        <button
                          onClick={() => handleDownload(row.name)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EBF3FE] text-[#0362FA] font-semibold rounded text-[11px] hover:bg-blue-100 transition-colors"
                        >
                          <Download className="w-3 h-3" /> Download
                        </button>
                      ) : (
                        <button
                          onClick={() => toast.info('Retrying Export', `Restarting export job for #${row.id}`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 font-semibold rounded text-[11px] hover:bg-amber-100 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" /> Retry
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Quick Export & Share */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Export</h3>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-500 font-medium">Report Type</label>
                <select className="w-full text-xs border border-slate-200 rounded-md p-1.5 bg-white font-medium text-slate-700">
                  <option>Call Center Performance</option>
                  <option>Lead Conversion Funnel</option>
                  <option>Agent QA Scorecard</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-medium">Format</label>
                <select className="w-full text-xs border border-slate-200 rounded-md p-1.5 bg-white font-medium text-slate-700">
                  <option>PDF (Recommended)</option>
                  <option>Excel (.xlsx)</option>
                  <option>CSV Raw Data</option>
                </select>
              </div>

              <button
                onClick={() => toast.success('Export Ready', 'Report generated and downloaded.')}
                className="w-full py-2 bg-[#0362FA] text-white rounded-lg text-xs font-semibold hover:bg-blue-600 shadow-sm flex items-center justify-center gap-1.5 pt-2"
              >
                <Download className="w-3.5 h-3.5" /> Generate & Download
              </button>
            </div>
          </div>

          <form onSubmit={handleShare} className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Share Export</h3>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-500 font-medium">Share With Emails</label>
                <input
                  type="email"
                  placeholder="colleague@dovixai.com"
                  className="w-full text-xs border border-slate-200 rounded-md p-1.5"
                  required
                />
              </div>

              <div className="space-y-1 text-slate-700">
                <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-[#0362FA]" /> Attach PDF file</label>
                <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-[#0362FA]" /> Include cloud link</label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 shadow-sm flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Dispatch Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
