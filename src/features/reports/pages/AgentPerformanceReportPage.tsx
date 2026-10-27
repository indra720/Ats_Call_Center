import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  Clock,
  Target,
  Star,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';

export const AgentPerformanceReportPage: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState('Aakash Sharma');

  return (
    <div className="space-y-4">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">Agent Performance Report</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Agent Performance Report</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed performance analysis of individual agents and team members with productivity insights, call metrics, and conversion analysis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 21 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm">
            <span>All Teams</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 6 Top KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3.5">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
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

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
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

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
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

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-slate-900">4m 12s</div>
          <div className="text-xs font-semibold text-slate-500">Avg Talk Time</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>16%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#871CF4]">
            <Target className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-slate-900">18%</div>
          <div className="text-xs font-semibold text-slate-500">Conversion Rate</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>28%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-[#EF9612]">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <div className="text-2xl font-bold text-slate-900">8.6/10</div>
          <div className="text-xs font-semibold text-slate-500">Productivity Score</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>12%</span>
          </div>
        </div>
      </div>

      {/* Row 2: Agent Performance Trend + Call Status by Agent + Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Trend (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Agent Performance Trend</h3>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> Aakash</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Yashika</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#EF9612]" /> Rohan</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#E73647]" /> Priya</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#871CF4]" /> Neha</span>
            </div>
          </div>
          <div className="h-48 relative flex items-end justify-between pt-6 px-1">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 350 140">
              <polyline fill="none" stroke="#0362FA" strokeWidth="2" points="10,80 50,70 90,85 130,65 170,60 210,75 250,55 290,65 330,50" />
              <polyline fill="none" stroke="#13AB4A" strokeWidth="2" points="10,95 50,85 90,100 130,85 170,75 210,90 250,75 290,80 330,68" />
              <polyline fill="none" stroke="#EF9612" strokeWidth="2" points="10,110 50,105 90,115 130,100 170,95 210,105 250,90 290,95 330,85" />
              <polyline fill="none" stroke="#E73647" strokeWidth="2" points="10,120 50,115 90,122 130,110 170,108 210,115 250,105 290,110 330,100" />
              <polyline fill="none" stroke="#871CF4" strokeWidth="2" points="10,130 50,125 90,130 130,120 170,118 210,125 250,115 290,120 330,112" />
            </svg>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-1">
            <span>1 Oct</span><span>4 Oct</span><span>7 Oct</span><span>10 Oct</span><span>13 Oct</span><span>16 Oct</span><span>19 Oct</span><span>21 Oct</span>
          </div>
        </div>

        {/* Stacked Bar by Agent (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Status by Agent</h3>
            <div className="flex items-center gap-1.5 text-[9px] text-slate-600">
              <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#13AB4A]" /> Answered</span>
              <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#E73647]" /> Missed</span>
              <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#0362FA]" /> Voicemail</span>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { name: 'Aakash', ans: 55, mis: 15, vm: 12 },
              { name: 'Yashika', ans: 48, mis: 12, vm: 10 },
              { name: 'Rohan', ans: 45, mis: 14, vm: 11 },
              { name: 'Priya', ans: 35, mis: 10, vm: 8 },
              { name: 'Neha', ans: 30, mis: 8, vm: 6 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full flex flex-col rounded-t-md overflow-hidden" style={{ height: `${col.ans + col.mis + col.vm}%` }}>
                  <div className="bg-[#0362FA] w-full" style={{ height: `${col.vm}%` }} />
                  <div className="bg-[#E73647] w-full" style={{ height: `${col.mis}%` }} />
                  <div className="bg-[#13AB4A] w-full flex-1" />
                </div>
                <span className="text-[10px] text-slate-600 mt-1">{col.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Conversion Funnel</h3>
          <div className="space-y-1.5 text-xs">
            {[
              { label: 'Total Calls', count: '12,846 (100%)', color: 'bg-sky-500', w: 'w-full' },
              { label: 'Interested', count: '4,108 (32%)', color: 'bg-emerald-500', w: 'w-[85%]' },
              { label: 'Qualified', count: '2,896 (23%)', color: 'bg-amber-500', w: 'w-[70%]' },
              { label: 'Proposal', count: '1,642 (13%)', color: 'bg-orange-500', w: 'w-[55%]' },
              { label: 'Converted', count: '1,248 (10%)', color: 'bg-rose-500', w: 'w-[40%]' },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`${f.color} ${f.w} py-1.5 rounded text-white text-center font-bold text-[11px] shadow-xs`}>
                  {f.label} ({f.count})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Agent Performance Details Table + Right Agent Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Table (7 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Agent Performance Details</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  className="pl-7 pr-2 py-1 text-xs border border-slate-200 rounded-lg"
                />
              </div>
              <a href="#/reports/agents" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Agent Name</th>
                  <th className="py-2.5 px-2">Total Calls</th>
                  <th className="py-2.5 px-2">Answered</th>
                  <th className="py-2.5 px-2">Missed</th>
                  <th className="py-2.5 px-2">Avg Talk Time</th>
                  <th className="py-2.5 px-2">Conversion</th>
                  <th className="py-2.5 px-2">Productivity</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { id: 1, name: 'Aakash Sharma', calls: '1,482', ans: '1,212 (82%)', mis: '270 (18%)', time: '4m 12s', conv: '18%', prod: '9.2/10', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
                  { id: 2, name: 'Yashika Kanwar', calls: '1,326', ans: '1,104 (83%)', mis: '222 (17%)', time: '3m 48s', conv: '16%', prod: '8.6/10', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
                  { id: 3, name: 'Rohan Mehta', calls: '1,148', ans: '932 (81%)', mis: '216 (19%)', time: '3m 22s', conv: '14%', prod: '8.1/10', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
                  { id: 4, name: 'Priya Singh', calls: '986', ans: '812 (82%)', mis: '174 (18%)', time: '3m 10s', conv: '12%', prod: '7.8/10', status: 'Active', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' },
                  { id: 5, name: 'Neha Verma', calls: '842', ans: '694 (82%)', mis: '148 (18%)', time: '2m 56s', conv: '11%', prod: '7.5/10', status: 'Active', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop' },
                ].map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => setSelectedAgent(a.name)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{a.id}</td>
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-1.5">
                        <img src={a.avatar} alt={a.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-semibold text-slate-900">{a.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{a.calls}</td>
                    <td className="py-2.5 px-2 text-[#13AB4A] font-medium">{a.ans}</td>
                    <td className="py-2.5 px-2 text-[#E73647] font-medium">{a.mis}</td>
                    <td className="py-2.5 px-2 text-slate-600">{a.time}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-900">{a.conv}</td>
                    <td className="py-2.5 px-2 font-bold text-[#13AB4A]">{a.prod}</td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E9F9EE] text-[#13AB4A]">
                        {a.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-[#0362FA] rounded text-[10px] font-semibold hover:bg-blue-100 transition-colors">
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Agent Summary Card (5 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Agent Summary</h3>
            <div className="flex items-center gap-1 text-xs">
              <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <span className="font-semibold text-slate-800">{selectedAgent}</span>
              <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                alt="Agent"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#0362FA]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-sm">{selectedAgent}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-[#E9F9EE] text-[#13AB4A]">
                    Active
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">Team: Sales Team</div>
                <div className="text-[10px] text-slate-400">Joined: 12 Aug 2026</div>
              </div>
            </div>

            {/* Radial Productivity Badge */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#13AB4A" strokeWidth="3.5" strokeDasharray="92, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-extrabold text-[#13AB4A] leading-none">9.2</span>
                <span className="text-[7px] text-slate-400">Score</span>
              </div>
            </div>
          </div>

          {/* 6 Mini Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Total Calls</span>
              <span className="font-bold text-slate-900 text-sm">1,482</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Answered</span>
              <span className="font-bold text-[#13AB4A] text-sm">1,212 (82%)</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Missed</span>
              <span className="font-bold text-[#E73647] text-sm">270 (18%)</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Avg Talk Time</span>
              <span className="font-bold text-slate-900 text-sm">4m 12s</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Conversion</span>
              <span className="font-bold text-[#0362FA] text-sm">18%</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Revenue Generated</span>
              <span className="font-bold text-[#13AB4A] text-sm">₹4,28,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
