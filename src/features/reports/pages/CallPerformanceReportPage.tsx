import React from 'react';
import {
  Calendar,
  Download,
  Share2,
  BookmarkPlus,
  Clock,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  CheckCircle2,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from 'lucide-react';

export const CallPerformanceReportPage: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span>Report Templates</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">Report Details</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Call Center Performance Report</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete overview of call center performance including call volume, agent metrics, and conversions.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              <span>Generated Successfully</span>
            </span>
            <span className="text-[11px] text-slate-400">
              Generated on 21 Oct 2026, 10:30 AM by Kamlesh Kumar (Admin)
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Schedule</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <BookmarkPlus className="w-3.5 h-3.5 text-slate-500" />
            <span>Save as Template</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Date Range & Team Filters Bar */}
      <div className="flex justify-end gap-2">
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>01 Oct 2026 - 21 Oct 2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm">
          <span>All Teams</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* 5 KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900">12,846</div>
            <div className="text-xs font-semibold text-slate-500">Total Calls</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>18% from last period</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-7 h-7 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A]">
              <PhoneIncoming className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900">9,842</div>
            <div className="text-xs font-semibold text-slate-500">Answered Calls</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>22%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-7 h-7 rounded-lg bg-[#FEECEE] flex items-center justify-center text-[#E73647]">
              <PhoneMissed className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900">2,104</div>
            <div className="text-xs font-semibold text-slate-500">Missed Calls</div>
            <div className="flex items-center text-[11px] font-semibold text-[#E73647]">
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
              <span>8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900">186h 32m</div>
            <div className="text-xs font-semibold text-slate-500">Total Call Duration</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>16%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between col-span-2 md:col-span-1">
          <div className="space-y-1">
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#871CF4]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-slate-900">1,248</div>
            <div className="text-xs font-semibold text-slate-500">Conversions</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>28%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Charts (Call Volume Trend + Status Distribution + Type Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Call Volume Trend (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>📈</span> Call Volume Trend
            </h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#0362FA]" /> Total Calls
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Answered
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#E73647]" /> Missed
              </span>
            </div>
          </div>

          <div className="h-56 relative flex items-end justify-between pt-6 px-2">
            {/* SVG Trend Lines */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
              {/* Grid lines */}
              <line x1="0" y1="40" x2="400" y2="40" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="400" y2="80" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="#f1f5f9" strokeDasharray="3 3" />

              {/* Blue Total Line */}
              <polyline
                fill="none"
                stroke="#0362FA"
                strokeWidth="2.5"
                points="10,120 50,110 90,130 130,105 170,95 210,110 250,90 290,105 330,85 370,88 390,98"
              />
              {/* Green Answered Line */}
              <polyline
                fill="none"
                stroke="#13AB4A"
                strokeWidth="2.5"
                points="10,135 50,125 90,140 130,125 170,115 210,125 250,110 290,120 330,105 370,108 390,118"
              />
              {/* Red Missed Line */}
              <polyline
                fill="none"
                stroke="#E73647"
                strokeWidth="2"
                points="10,150 50,145 90,152 130,145 170,140 210,145 250,140 290,142 330,138 370,140 390,142"
              />
            </svg>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 px-1 border-t border-slate-100 pt-1 font-mono">
            <span>1 Oct</span>
            <span>4 Oct</span>
            <span>7 Oct</span>
            <span>10 Oct</span>
            <span>13 Oct</span>
            <span>16 Oct</span>
            <span>19 Oct</span>
            <span>21 Oct</span>
          </div>
        </div>

        {/* Call Status Distribution Donut (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>📊</span> Call Status Distribution
          </h3>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="77, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="16, 100" strokeDashoffset="-77" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="4, 100" strokeDashoffset="-93" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-extrabold text-slate-900 leading-none">12,846</span>
                <span className="text-[10px] text-slate-400">Total Calls</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Answered</span>
              <span className="font-semibold text-slate-900">9,842 (77%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#E73647]" /> Missed</span>
              <span className="font-semibold text-slate-900">2,104 (16%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> Voicemail</span>
              <span className="font-semibold text-slate-900">512 (4%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#EF9612]" /> Busy</span>
              <span className="font-semibold text-slate-900">276 (2%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-purple-500" /> No Answer</span>
              <span className="font-semibold text-slate-900">112 (1%)</span>
            </div>
          </div>
        </div>

        {/* Call Type Distribution Donut (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>📞</span> Call Type Distribution
          </h3>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="61, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="28, 100" strokeDashoffset="-61" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="9, 100" strokeDashoffset="-89" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="2, 100" strokeDashoffset="-98" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-extrabold text-slate-900 leading-none">12,846</span>
                <span className="text-[10px] text-slate-400">Total Calls</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> Outbound</span>
              <span className="font-semibold text-slate-900">7,824 (61%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Inbound</span>
              <span className="font-semibold text-slate-900">3,642 (28%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#871CF4]" /> Campaign</span>
              <span className="font-semibold text-slate-900">1,124 (9%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#EF9612]" /> Follow-up</span>
              <span className="font-semibold text-slate-900">256 (2%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Tables (Top Performing Agents + Top Campaigns by Conversion) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Top Performing Agents (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>👥</span> Top Performing Agents
            </h3>
            <a href="#/reports/agents" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Agent Name</th>
                  <th className="py-2.5 px-2">Total Calls</th>
                  <th className="py-2.5 px-2">Answered</th>
                  <th className="py-2.5 px-2">Missed</th>
                  <th className="py-2.5 px-2">Avg Talk Time</th>
                  <th className="py-2.5 px-2">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { id: 1, name: 'Aakash Sharma', calls: '1,482', answered: '1,212 (82%)', missed: '270 (18%)', talkTime: '4m 12s', conv: '18%', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
                  { id: 2, name: 'Yashika Kanwar', calls: '1,326', answered: '1,104 (83%)', missed: '222 (17%)', talkTime: '3m 48s', conv: '16%', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
                  { id: 3, name: 'Rohan Mehta', calls: '1,148', answered: '932 (81%)', missed: '216 (19%)', talkTime: '3m 22s', conv: '14%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
                  { id: 4, name: 'Priya Singh', calls: '986', answered: '812 (82%)', missed: '174 (18%)', talkTime: '3m 10s', conv: '12%', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' },
                  { id: 5, name: 'Neha Verma', calls: '842', answered: '694 (82%)', missed: '148 (18%)', talkTime: '2m 56s', conv: '11%', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop' },
                ].map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{a.id}</td>
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-1.5">
                        <img src={a.avatar} alt={a.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-semibold text-slate-900">{a.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{a.calls}</td>
                    <td className="py-2.5 px-2 text-[#13AB4A] font-medium">{a.answered}</td>
                    <td className="py-2.5 px-2 text-[#E73647] font-medium">{a.missed}</td>
                    <td className="py-2.5 px-2 text-slate-600">{a.talkTime}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-900">{a.conv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Campaigns by Conversion (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎯</span> Top Campaigns by Conversion
            </h3>
            <a href="#/reports/campaigns" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[550px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Campaign Name</th>
                  <th className="py-2.5 px-2">Total Calls</th>
                  <th className="py-2.5 px-2">Conversion</th>
                  <th className="py-2.5 px-2">Revenue</th>
                  <th className="py-2.5 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { id: 1, name: 'New Customer Outreach', calls: '2,842', conv: '22%', rev: '₹4,28,000', status: 'Active' },
                  { id: 2, name: 'Re-engagement Campaign', calls: '1,980', conv: '18%', rev: '₹2,86,000', status: 'Active' },
                  { id: 3, name: 'Product Demo Calls', calls: '1,642', conv: '16%', rev: '₹2,14,000', status: 'Active' },
                  { id: 4, name: 'Payment Follow-up', calls: '1,324', conv: '14%', rev: '₹1,86,000', status: 'Active' },
                  { id: 5, name: 'Feedback & Survey', calls: '1,086', conv: '12%', rev: '₹1,28,000', status: 'Completed' },
                  { id: 6, name: 'Upsell Campaign', calls: '972', conv: '11%', rev: '₹1,05,000', status: 'Active' },
                ].map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{c.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-2.5 px-2 text-slate-600">{c.calls}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-900">{c.conv}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{c.rev}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.status === 'Active' ? 'bg-[#E9F9EE] text-[#13AB4A]' : 'bg-purple-50 text-purple-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 4: Call Duration Analysis + Call Outcomes + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Call Duration Analysis Bar Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>⏱</span> Call Duration Analysis
          </h3>
          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
            {[
              { label: '< 1 min', count: '312', h: 25 },
              { label: '1-3 min', count: '1,024', h: 48 },
              { label: '3-5 min', count: '1,842', h: 65 },
              { label: '5-10 min', count: '2,986', h: 95 },
              { label: '10-20 min', count: '2,104', h: 72 },
              { label: '> 20 min', count: '578', h: 32 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-700">{col.count}</span>
                <div className="w-full bg-purple-500 rounded-t-md transition-all" style={{ height: `${col.h}%` }} />
                <span className="text-[9px] text-slate-500 whitespace-nowrap mt-1">{col.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call Outcomes Progress Bars (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>🎯</span> Call Outcomes
          </h3>
          <div className="space-y-2 text-xs">
            {[
              { label: 'Interested', pct: '32%', color: 'bg-[#13AB4A]' },
              { label: 'Not Interested', pct: '28%', color: 'bg-blue-600' },
              { label: 'Callback', pct: '18%', color: 'bg-purple-600' },
              { label: 'Appointment Scheduled', pct: '12%', color: 'bg-amber-500' },
              { label: 'Sale Closed', pct: '8%', color: 'bg-sky-500' },
              { label: 'Wrong Number', pct: '2%', color: 'bg-red-500' },
            ].map((o, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 font-medium">{o.label}</span>
                  <span className="font-bold text-slate-900">{o.pct}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${o.color} h-full rounded-full`} style={{ width: o.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚡</span> Recent Activity
            </h3>
            <a href="#/activity-logs" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { time: '21 Oct 04:32 PM', agent: 'Aakash Sharma', act: 'Call with Rajesh Kumar', status: 'Interested' },
              { time: '21 Oct 04:28 PM', agent: 'Yashika Kanwar', act: 'Follow-up call', status: 'Callback' },
              { time: '21 Oct 04:15 PM', agent: 'Rohan Mehta', act: 'Product discussion', status: 'Not Interested' },
              { time: '21 Oct 04:10 PM', agent: 'Priya Singh', act: 'Demo scheduled', status: 'Scheduled' },
              { time: '21 Oct 03:58 PM', agent: 'Neha Verma', act: 'Payment follow-up', status: 'Interested' },
            ].map((row, idx) => (
              <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100 space-y-0.5">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>{row.time}</span>
                  <span className="font-semibold text-slate-700">{row.agent}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">{row.act}</span>
                  <span className="text-[10px] font-bold text-[#0362FA]">{row.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
