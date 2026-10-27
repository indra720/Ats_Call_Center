import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  Table,
  LineChart,
  BarChart,
  PieChart,
  Sliders,
  Filter,
  Check,
  Search,
  MoreVertical,
  ChevronDown,
  Clock,
  Phone,
  Users,
  Target,
  FileText,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const CustomReportBuilderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'saved' | 'scheduled' | 'history'>('builder');
  const [selectedSource, setSelectedSource] = useState('Call Logs');
  const [reportName, setReportName] = useState('Answered Calls - October 2026');
  const [reportDesc, setReportDesc] = useState('Report of all answered calls with contact details and agent information.');
  const [selectedViz, setSelectedViz] = useState<'Table' | 'Line Chart' | 'Bar Chart' | 'Pie Chart' | 'Funnel'>('Table');
  const [saveAsCustom, setSaveAsCustom] = useState(true);

  // Field selection state
  const [fields, setFields] = useState<Record<string, boolean>>({
    'Date & Time': true,
    'Call Type': true,
    'Phone Number': true,
    'Contact Name': true,
    'Duration': true,
    'Call Status': true,
    'Recording URL': false,
    'Call Notes': false,
    'Call ID': false,
  });

  const toggleField = (field: string) => {
    setFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleGenerate = () => {
    toast.success('Custom Report Generated', `Report "${reportName}" compiled successfully with active filters.`);
  };

  const handleReset = () => {
    setReportName('New Custom Report');
    setReportDesc('');
    setSelectedViz('Table');
    toast.info('Builder Reset', 'All query parameters returned to defaults.');
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
            <span className="text-slate-800 font-semibold">Custom Reports / Builder</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Custom Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, customize and generate your own reports with powerful filters, metrics and visualizations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('saved')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Saved Reports</span>
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Scheduled Reports</span>
          </button>
          <button
            onClick={() => {
              handleReset();
              setActiveTab('builder');
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0362FA] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5EBF2] pb-1">
        {[
          { id: 'builder', label: 'Report Builder' },
          { id: 'saved', label: 'Saved Reports' },
          { id: 'scheduled', label: 'Scheduled Reports' },
          { id: 'history', label: 'Report History' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === tab.id ? 'bg-[#EBF3FE] text-[#0362FA]' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4-Step Builder Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Step 1: Select Data Source */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3.5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">1</span>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Select Data Source</h3>
              <p className="text-[10px] text-slate-400">Choose module for report</p>
            </div>
          </div>

          <div className="space-y-1">
            {[
              { id: 'Call Logs', label: 'Call Logs', icon: Phone },
              { id: 'Leads & Contacts', label: 'Leads & Contacts', icon: Users },
              { id: 'Campaigns', label: 'Campaigns', icon: Target },
              { id: 'Agents & Teams', label: 'Agents & Teams', icon: Users },
              { id: 'Sales & Deals', label: 'Sales & Deals', icon: Sparkles },
            ].map((src) => {
              const Icon = src.icon;
              const isSelected = selectedSource === src.id;
              return (
                <button
                  key={src.id}
                  onClick={() => setSelectedSource(src.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold transition-colors ${
                    isSelected ? 'bg-blue-50 text-[#0362FA] border border-blue-200' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{src.label}</span>
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0362FA]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose Fields */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3.5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">2</span>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Choose Fields</h3>
              <p className="text-[10px] text-slate-400">Select data attributes</p>
            </div>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {Object.keys(fields).map((fieldName) => (
              <label
                key={fieldName}
                className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={fields[fieldName]}
                  onChange={() => toggleField(fieldName)}
                  className="rounded text-[#0362FA] focus:ring-blue-500 cursor-pointer"
                />
                <span>{fieldName}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Step 3: Add Filters */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3.5 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">3</span>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Add Filters</h3>
              <p className="text-[10px] text-slate-400">Filter your dataset</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[10px] text-slate-500 font-medium">Date Range</label>
              <select className="w-full text-xs border border-slate-200 rounded-md p-1.5 bg-white">
                <option>01 Oct 2026 - 31 Oct 2026</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-medium">Call Type</label>
              <select className="w-full text-xs border border-slate-200 rounded-md p-1.5 bg-white">
                <option>All Types</option>
                <option>Incoming</option>
                <option>Outgoing</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-medium">Call Status</label>
              <select className="w-full text-xs border border-slate-200 rounded-md p-1.5 bg-white">
                <option>Answered</option>
                <option>Missed</option>
                <option>All</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 4: Choose Visualization & Generate */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3.5 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">4</span>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Choose Visualization</h3>
              <p className="text-[10px] text-slate-400">View format & export</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 text-[11px]">
            {[
              { id: 'Table', label: 'Table', icon: Table },
              { id: 'Line Chart', label: 'Line', icon: LineChart },
              { id: 'Bar Chart', label: 'Bar', icon: BarChart },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedViz(v.id as any)}
                  className={`flex flex-col items-center p-1.5 rounded-lg border text-center transition-colors ${
                    selectedViz === v.id ? 'bg-blue-50 border-blue-500 text-[#0362FA]' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mb-0.5" />
                  <span className="text-[10px] font-semibold">{v.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <input
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              placeholder="Report Name"
              className="w-full text-xs border border-slate-200 rounded-md p-1.5 font-semibold text-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={handleReset}
              className="flex-1 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
            <button
              onClick={handleGenerate}
              className="flex-1 py-1.5 bg-[#0362FA] text-white rounded-lg text-xs font-semibold hover:bg-blue-600 shadow-sm"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Report Preview Table (9 cols) + Right Sidebar (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Report Preview */}
        <div className="lg:col-span-9 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Report Preview</h3>
              <p className="text-xs text-slate-500">Showing report preview with sample data. Click Generate Report to get the latest data.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.success('CSV Exported', 'Dataset exported as CSV file.')}
                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* 4 Quick Stat Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 font-semibold">Total Calls</div>
                <div className="text-base font-extrabold text-slate-900">9,842</div>
              </div>
              <Phone className="w-4 h-4 text-[#0362FA]" />
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 font-semibold">Unique Contacts</div>
                <div className="text-base font-extrabold text-slate-900">6,320</div>
              </div>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 font-semibold">Total Duration</div>
                <div className="text-base font-extrabold text-slate-900">452h 18m</div>
              </div>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="p-2.5 bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 font-semibold">Avg. Call Duration</div>
                <div className="text-base font-extrabold text-slate-900">4m 36s</div>
              </div>
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
          </div>

          {/* Table (Non-shrinking min-w-[1050px]) */}
          <div className="overflow-x-auto rounded-lg border border-[#E5EBF2]">
            <table className="w-full min-w-[1050px] text-left border-collapse text-xs whitespace-nowrap">
              <thead className="bg-[#F8FAFC] border-b border-[#E5EBF2]">
                <tr className="text-slate-500 font-semibold text-[11px]">
                  <th className="py-2.5 px-3 w-8">#</th>
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">Contact Name</th>
                  <th className="py-2.5 px-3">Phone Number</th>
                  <th className="py-2.5 px-3">Call Type</th>
                  <th className="py-2.5 px-3">Agent</th>
                  <th className="py-2.5 px-3">Campaign</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Call Status</th>
                  <th className="py-2.5 px-3">Disposition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EBF2] bg-white text-slate-700">
                {[
                  { id: 1, dt: '31 Oct 2026 10:45 AM', name: 'Rohit Sharma', phone: '+91 98765 43210', type: 'Outgoing', agent: 'Amit Kumar', camp: 'Product Demo', dur: '03:42', status: 'Answered', disp: 'Interested' },
                  { id: 2, dt: '31 Oct 2026 09:22 AM', name: 'Priya Khanna', phone: '+91 91234 56789', type: 'Incoming', agent: 'Sneha Verma', camp: 'Sales Outreach', dur: '02:18', status: 'Answered', disp: 'Follow-up' },
                  { id: 3, dt: '30 Oct 2026 06:18 PM', name: 'Amit Jain', phone: '+91 99887 66554', type: 'Outgoing', agent: 'Rahul Mehta', camp: 'Payment Reminder', dur: '01:50', status: 'Answered', disp: 'Closed' },
                  { id: 4, dt: '30 Oct 2026 04:12 PM', name: 'Sunita Patel', phone: '+91 88776 55443', type: 'Incoming', agent: 'Neha Singh', camp: 'Follow-up', dur: '05:21', status: 'Answered', disp: 'Interested' },
                  { id: 5, dt: '30 Oct 2026 02:45 PM', name: 'Vikram Singh', phone: '+91 77665 44332', type: 'Outgoing', agent: 'Arjun Rao', camp: 'Re-engagement', dur: '03:14', status: 'Answered', disp: 'Not Interested' },
                  { id: 6, dt: '29 Oct 2026 05:32 PM', name: 'Neha Tiwari', phone: '+91 98712 34567', type: 'Incoming', agent: 'Pooja Sharma', camp: 'Product Demo', dur: '04:26', status: 'Answered', disp: 'Interested' },
                  { id: 7, dt: '29 Oct 2026 03:18 PM', name: 'Deepak Soni', phone: '+91 91789 65432', type: 'Outgoing', agent: 'Karan Mehta', camp: 'Sales Outreach', dur: '02:56', status: 'Answered', disp: 'Follow-up' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{row.id}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">{row.dt}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{row.name}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{row.phone}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {row.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{row.agent}</td>
                    <td className="py-2.5 px-3 text-slate-600">{row.camp}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{row.dur}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E9F9EE] text-[#13AB4A]">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {row.disp}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Saved Reports & Scheduled Reports */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Saved Reports (12)</h3>
              <button onClick={() => toast.info('Saved Library', 'Viewing all saved query models.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {[
                { title: 'Daily Call Summary', dt: '10 Oct 2026', icon: FileText, color: 'text-purple-600' },
                { title: 'Monthly Sales Report', dt: '05 Oct 2026', icon: FileText, color: 'text-emerald-600' },
                { title: 'Agent Performance', dt: '01 Oct 2026', icon: Users, color: 'text-amber-600' },
                { title: 'Campaign ROI Report', dt: '28 Sep 2026', icon: Target, color: 'text-blue-600' },
              ].map((r, i) => (
                <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">{r.title}</div>
                    <div className="text-[10px] text-slate-400">Created {r.dt}</div>
                  </div>
                  <button onClick={() => toast.info('Load Report', `Loaded parameters for ${r.title}`)} className="text-slate-400 hover:text-slate-700">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Scheduled Reports (4)</h3>
              <button onClick={() => toast.info('Schedules', 'Viewing automated delivery cron jobs.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {[
                { title: 'Daily Call Report', freq: 'Every day at 9:00 AM' },
                { title: 'Weekly Sales Report', freq: 'Every Monday at 9:00 AM' },
                { title: 'Monthly Performance', freq: '1st of every month' },
              ].map((s, i) => (
                <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">{s.title}</div>
                    <div className="text-[10px] text-slate-400">{s.freq}</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-[#0362FA]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
