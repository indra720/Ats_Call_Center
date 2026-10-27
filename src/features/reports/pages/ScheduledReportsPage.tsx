import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Play,
  Pause,
  Plus,
  Mail,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Edit,
  Send,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

interface ScheduleItem {
  id: number;
  name: string;
  type: string;
  freq: string;
  time: string;
  recipients: number;
  format: string;
  nextRun: string;
  lastRun: string;
  status: 'Active' | 'Paused' | 'Failed';
}

export const ScheduledReportsPage: React.FC = () => {
  const [scheduleName, setScheduleName] = useState('Daily Lead Performance Report');
  const [frequency, setFrequency] = useState('Daily');
  const [selectedFormat, setSelectedFormat] = useState('PDF (Recommended)');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    { id: 1, name: 'Daily Call Summary', type: 'Call Report', freq: 'Daily', time: '09:00 AM', recipients: 5, format: 'PDF', nextRun: '22 Oct 2026 09:00 AM', lastRun: '21 Oct 2026 09:00 AM', status: 'Active' },
    { id: 2, name: 'Weekly Lead Report', type: 'Lead Report', freq: 'Weekly (Mon)', time: '10:00 AM', recipients: 8, format: 'PDF', nextRun: '26 Oct 2026 10:00 AM', lastRun: '19 Oct 2026 10:00 AM', status: 'Active' },
    { id: 3, name: 'Agent Performance', type: 'Agent Report', freq: 'Weekly (Mon)', time: '11:00 AM', recipients: 6, format: 'Excel', nextRun: '26 Oct 2026 11:00 AM', lastRun: '19 Oct 2026 11:00 AM', status: 'Active' },
    { id: 4, name: 'Campaign Performance', type: 'Campaign Report', freq: 'Monthly (1st)', time: '09:00 AM', recipients: 4, format: 'PDF', nextRun: '01 Nov 2026 09:00 AM', lastRun: '01 Oct 2026 09:00 AM', status: 'Paused' },
    { id: 5, name: 'Customer Engagement', type: 'Customer Report', freq: 'Weekly (Mon)', time: '02:00 PM', recipients: 7, format: 'PDF', nextRun: '26 Oct 2026 02:00 PM', lastRun: '19 Oct 2026 02:00 PM', status: 'Active' },
    { id: 6, name: 'Lead Nurturing Report', type: 'Lead Report', freq: 'Daily', time: '05:00 PM', recipients: 3, format: 'PDF', nextRun: '22 Oct 2026 05:00 PM', lastRun: '21 Oct 2026 05:00 PM', status: 'Failed' },
  ]);

  const toggleStatus = (id: number) => {
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'Active' ? 'Paused' : 'Active';
          toast.info('Schedule Updated', `Schedule "${s.name}" is now ${nextStatus}.`);
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const newSch: ScheduleItem = {
      id: schedules.length + 1,
      name: scheduleName,
      type: 'Custom Report',
      freq: frequency,
      time: '09:00 AM',
      recipients: 4,
      format: selectedFormat.split(' ')[0],
      nextRun: 'Tomorrow, 09:00 AM',
      lastRun: 'Just created',
      status: 'Active',
    };
    setSchedules([newSch, ...schedules]);
    toast.success('Schedule Created', `Automation for "${scheduleName}" is now active.`);
  };

  const filtered = schedules.filter((s) => {
    if (filterStatus !== 'All' && s.status !== filterStatus) return false;
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Scheduled Reports</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Report Scheduling & Automation</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automate your reports with custom schedules, delivery options, and advanced settings.
          </p>
        </div>

        <button
          onClick={() => {
            const formElem = document.getElementById('create-schedule-form');
            formElem?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0362FA] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Schedule</span>
        </button>
      </div>

      {/* 2. Top KPI Metric Cards - Balanced, non-shrinking layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Schedules</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">12</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">33% vs last month</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Active</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">9</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">50% operational</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <Play className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Paused</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">2</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#E73647] truncate">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">33% on hold</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <Pause className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Failed Runs</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">1</div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate">
              0% change
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <XCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Emails Sent</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">186</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">28% delivered</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <Mail className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Next Run</span>
            <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate">Today 9:00 AM</div>
            <div className="text-[10px] sm:text-[11px] font-medium text-slate-400 truncate">
              Daily Call Summary
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Row 2: 4-Step Schedule Creation Wizard */}
      <form id="create-schedule-form" onSubmit={handleCreateSchedule} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4">
        {/* Step 1 */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">1</span>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Create Scheduled Report</h3>
              <p className="text-[10px] text-slate-400">Schedule frequency & source</p>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Schedule Name *</label>
            <input
              type="text"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-lg p-1.5 font-medium text-slate-900"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Report Template *</label>
            <select className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700">
              <option>Lead Conversion Detailed Report</option>
              <option>Call Center Performance</option>
              <option>Agent QA Scorecard</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Time</label>
              <input type="time" defaultValue="09:00" className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white" />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">2</span>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Delivery Options</h3>
              <p className="text-[10px] text-slate-400">Recipients & delivery channels</p>
            </div>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {[
              { name: 'Kamlesh Kumar (Admin)', email: 'kamlesh@dovixai.com' },
              { name: 'Pramod Saini (Director)', email: 'pramod@dovixai.com' },
              { name: 'Yashika Kanwar (Lead)', email: 'yashika@dovixai.com' },
              { name: 'Team Managers Group', email: 'managers@dovixai.com' },
            ].map((u, i) => (
              <label key={i} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer p-1 rounded hover:bg-slate-50">
                <input type="checkbox" defaultChecked className="rounded text-[#0362FA]" />
                <div className="truncate">
                  <div className="font-semibold text-slate-800 leading-tight truncate">{u.name}</div>
                  <div className="text-[10px] text-slate-400">{u.email}</div>
                </div>
              </label>
            ))}
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Delivery Channels</label>
            <div className="flex items-center gap-3 text-xs">
              <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked className="rounded text-[#0362FA]" /> Email</label>
              <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked className="rounded text-[#0362FA]" /> WhatsApp</label>
              <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked className="rounded text-[#0362FA]" /> In-App</label>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">3</span>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Advanced Settings</h3>
              <p className="text-[10px] text-slate-400">Format & email template</p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center justify-between text-slate-700">
              <span>Include Charts & Graphs</span>
              <input type="checkbox" defaultChecked className="rounded text-[#0362FA]" />
            </label>
            <label className="flex items-center justify-between text-slate-700">
              <span>Include Summary Section</span>
              <input type="checkbox" defaultChecked className="rounded text-[#0362FA]" />
            </label>
            <label className="flex items-center justify-between text-slate-700">
              <span>Include Raw Data (CSV)</span>
              <input type="checkbox" className="rounded text-[#0362FA]" />
            </label>
            <label className="flex items-center justify-between text-slate-700">
              <span>Compress File (ZIP)</span>
              <input type="checkbox" className="rounded text-[#0362FA]" />
            </label>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Report Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700"
            >
              <option>PDF (Recommended)</option>
              <option>Excel (.xlsx)</option>
              <option>CSV Raw Data</option>
            </select>
          </div>
        </div>

        {/* Step 4 */}
        <div className="space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">4</span>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Conditions & Action</h3>
                <p className="text-[10px] text-slate-400">Execution prerequisites</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="flex items-center justify-between text-slate-700">
                <span>Send only if data available</span>
                <input type="checkbox" defaultChecked className="rounded text-[#0362FA]" />
              </label>
              <label className="flex items-center justify-between text-slate-700">
                <span>Send on data change only</span>
                <input type="checkbox" className="rounded text-[#0362FA]" />
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2 bg-[#0362FA] text-white rounded-lg text-xs font-semibold hover:bg-blue-600 shadow-sm flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Save & Activate Schedule
            </button>
          </div>
        </div>
      </form>

      {/* Row 3: Scheduled Reports List Table + Recent Runs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>📅</span> Scheduled Reports List
            </h3>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Search schedules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2 py-1 text-xs border border-slate-200 rounded-lg w-40"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium text-slate-700"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Schedule Name</th>
                  <th className="py-2.5 px-2">Report Type</th>
                  <th className="py-2.5 px-2">Frequency</th>
                  <th className="py-2.5 px-2">Time</th>
                  <th className="py-2.5 px-2 text-center">Recipients</th>
                  <th className="py-2.5 px-2">Format</th>
                  <th className="py-2.5 px-2">Next Run</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{s.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{s.name}</td>
                    <td className="py-2.5 px-2 text-slate-600">{s.type}</td>
                    <td className="py-2.5 px-2 font-medium text-slate-800">{s.freq}</td>
                    <td className="py-2.5 px-2 font-mono text-slate-600">{s.time}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#0362FA]">{s.recipients}</td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {s.format}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-slate-500 font-mono text-[11px]">{s.nextRun}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        s.status === 'Active'
                          ? 'bg-[#E9F9EE] text-[#13AB4A]'
                          : s.status === 'Paused'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => toggleStatus(s.id)}
                        className={`p-1 rounded hover:bg-slate-100 ${s.status === 'Active' ? 'text-amber-600' : 'text-emerald-600'}`}
                        title={s.status === 'Active' ? 'Pause Schedule' : 'Resume Schedule'}
                      >
                        {s.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Scheduled Runs (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Executions</h3>
            <button onClick={() => toast.info('Execution Audit', 'Showing automated delivery dispatch history.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { name: 'Daily Call Summary', dt: '21 Oct 09:00 AM', status: 'Success' },
              { name: 'Lead Nurturing Report', dt: '21 Oct 05:00 PM', status: 'Success' },
              { name: 'Agent Performance', dt: '20 Oct 11:00 AM', status: 'Success' },
              { name: 'Campaign Performance', dt: '20 Oct 09:00 AM', status: 'Failed' },
              { name: 'Weekly Lead Report', dt: '19 Oct 10:00 AM', status: 'Success' },
            ].map((run, i) => (
              <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800 text-[11px]">{run.name}</div>
                  <div className="text-[10px] text-slate-400">{run.dt}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  run.status === 'Success' ? 'bg-[#E9F9EE] text-[#13AB4A]' : 'bg-[#FEECEE] text-[#E73647]'
                }`}>
                  {run.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
