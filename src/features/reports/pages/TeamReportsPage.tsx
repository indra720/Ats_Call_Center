import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Users,
  CheckCircle2,
  Phone,
  CheckSquare,
  TrendingUp,
  Target,
  ChevronDown,
  ArrowUpRight,
  Filter,
  BarChart3,
  Layers,
  Award,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const TeamReportsPage: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');

  const teamData = [
    { id: 1, name: 'Sales Team', agents: 6, calls: '5,842', tasks: '2,124', meetings: 428, conv: 624, convRate: '32%', rev: '₹1,28,000', prod: '8.6/10', avgCalls: 974, status: 'Active', color: 'bg-blue-600' },
    { id: 2, name: 'Support Team', agents: 5, calls: '4,286', tasks: '1,842', meetings: 356, conv: 442, convRate: '24%', rev: '₹98,000', prod: '8.2/10', avgCalls: 857, status: 'Active', color: 'bg-emerald-600' },
    { id: 3, name: 'Lead Generation', agents: 4, calls: '3,642', tasks: '1,286', meetings: 248, conv: 324, convRate: '18%', rev: '₹72,000', prod: '7.8/10', avgCalls: 911, status: 'Active', color: 'bg-amber-500' },
    { id: 4, name: 'Follow-up Team', agents: 4, calls: '2,486', tasks: '842', meetings: 186, conv: 224, convRate: '16%', rev: '₹48,000', prod: '7.5/10', avgCalls: 622, status: 'Active', color: 'bg-purple-600' },
    { id: 5, name: 'Retention Team', agents: 3, calls: '1,428', tasks: '486', meetings: 124, conv: 148, convRate: '12%', rev: '₹32,000', prod: '7.2/10', avgCalls: 476, status: 'Active', color: 'bg-rose-500' },
    { id: 6, name: 'Other Teams', agents: 2, calls: '958', tasks: '262', meetings: 86, conv: 92, convRate: '8%', rev: '₹18,000', prod: '6.8/10', avgCalls: 479, status: 'Active', color: 'bg-slate-500' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Team Reports</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Team Performance Report</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare team performance, productivity, call metrics, and achievement against targets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 21 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="All Teams">All Teams</option>
            <option value="Sales Team">Sales Team</option>
            <option value="Support Team">Support Team</option>
            <option value="Lead Generation">Lead Generation</option>
          </select>

          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="All Campaigns">All Campaigns</option>
            <option value="New Outreach">New Outreach</option>
            <option value="Re-engagement">Re-engagement</option>
          </select>

          <button
            onClick={() => toast.success('Report Exported', 'Team Performance report downloaded in PDF format.')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0362FA] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-blue-600 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Metric Cards - Balanced, non-shrinking layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Teams</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">6</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">20% expansion</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Active Agents</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">24</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">18% capacity</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Calls</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">18,642</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">22% pace</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <Phone className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Task Complete</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">6,842</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">28% efficiency</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <CheckSquare className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Productivity</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">8.4/10</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">12% score</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Award className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Conversion</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">18%</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">24% over target</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <Target className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Row 2: Team Performance Trend + Calls Distribution + Team Conversion Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Trend (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Team Performance Trend</h3>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> Calls</span>
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Tasks</span>
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#EF9612]" /> Conv.</span>
            </div>
          </div>
          <div className="relative h-44 w-full pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none">
              <line x1="0" y1="30" x2="400" y2="30" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="#F1F5F9" strokeWidth="1" />
              <polyline fill="none" stroke="#0362FA" strokeWidth="2" points="10,80 60,70 120,55 180,65 240,45 300,50 360,40" />
              <polyline fill="none" stroke="#13AB4A" strokeWidth="2" points="10,110 60,95 120,85 180,95 240,80 300,75 360,85" />
              <polyline fill="none" stroke="#EF9612" strokeWidth="2" points="10,135 60,130 120,120 180,125 240,115 300,110 360,115" />
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

        {/* Calls Distribution by Team Donut (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Calls Distribution by Team</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="31, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="23, 100" strokeDashoffset="-31" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="20, 100" strokeDashoffset="-54" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="13, 100" strokeDashoffset="-74" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="8, 100" strokeDashoffset="-87" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="5, 100" strokeDashoffset="-95" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">18,642</span>
                <span className="text-[9px] text-slate-400">Total</span>
              </div>
            </div>
            <div className="space-y-1 text-[11px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">Sales</span><span className="font-bold text-slate-900">5,842 (31%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Support</span><span className="font-bold text-slate-900">4,286 (23%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Lead Gen</span><span className="font-bold text-slate-900">3,642 (20%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Follow-up</span><span className="font-bold text-slate-900">2,486 (13%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Retention</span><span className="font-bold text-slate-900">1,428 (8%)</span></div>
            </div>
          </div>
        </div>

        {/* Team Conversion Rate Bars (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Team Conversion Rate</h3>
          <div className="h-44 flex items-end justify-between gap-1.5 pt-6 px-1">
            {[
              { team: 'Sales', rate: '32%', h: 80, color: 'bg-blue-600' },
              { team: 'Support', rate: '24%', h: 60, color: 'bg-emerald-600' },
              { team: 'Lead Gen', rate: '18%', h: 45, color: 'bg-amber-500' },
              { team: 'Follow-up', rate: '16%', h: 40, color: 'bg-purple-600' },
              { team: 'Retention', rate: '12%', h: 30, color: 'bg-rose-500' },
              { team: 'Other', rate: '8%', h: 20, color: 'bg-slate-400' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[9px] font-bold text-slate-700">{col.rate}</span>
                <div className={`w-full ${col.color} rounded-t transition-all`} style={{ height: `${col.h}%` }} />
                <span className="text-[8px] text-slate-500 truncate w-full text-center mt-1">{col.team}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Team Performance Overview Table + Top Performing Teams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>👥</span> Team Performance Overview
            </h3>
            <button onClick={() => toast.info('Full Team Report', 'Navigating to detailed team audit.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Team Name</th>
                  <th className="py-2.5 px-2">Agents</th>
                  <th className="py-2.5 px-2">Total Calls</th>
                  <th className="py-2.5 px-2">Tasks</th>
                  <th className="py-2.5 px-2">Meetings</th>
                  <th className="py-2.5 px-2">Conversions</th>
                  <th className="py-2.5 px-2">Revenue</th>
                  <th className="py-2.5 px-2">Productivity</th>
                  <th className="py-2.5 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {teamData.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{t.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{t.name}</td>
                    <td className="py-2.5 px-2 text-slate-600">{t.agents}</td>
                    <td className="py-2.5 px-2 font-medium text-slate-900">{t.calls}</td>
                    <td className="py-2.5 px-2 text-slate-600">{t.tasks}</td>
                    <td className="py-2.5 px-2 text-slate-600">{t.meetings}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-900">{t.conv}</td>
                    <td className="py-2.5 px-2 font-semibold text-[#13AB4A]">{t.rev}</td>
                    <td className="py-2.5 px-2 font-bold text-[#0362FA]">{t.prod}</td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E9F9EE] text-[#13AB4A]">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performing Teams (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>🏆</span> Top Performing Teams
            </h3>
            <button onClick={() => toast.info('Leaderboard', 'Displaying full performance rankings.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Team Name</th>
                  <th className="py-2.5 px-2">Conversion</th>
                  <th className="py-2.5 px-2">Revenue</th>
                  <th className="py-2.5 px-2 text-right">Calls/Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {teamData.slice(0, 5).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{t.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{t.name}</td>
                    <td className="py-2.5 px-2 font-bold text-[#13AB4A]">{t.convRate}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{t.rev}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-600">{t.avgCalls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 4: Team Activity by Call Type + Productivity Score + Target vs Achievement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Activity Stacked Bars (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Team Activity by Call Type</h3>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-600">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-600" /> Outbound</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-600" /> Inbound</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500" /> Follow-up</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-purple-600" /> Demo</span>
          </div>
          <div className="h-40 flex items-end justify-between gap-2 pt-4">
            {teamData.map((t, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                <div className="w-full flex flex-col rounded overflow-hidden">
                  <div className="bg-purple-600 h-2.5" />
                  <div className="bg-amber-500 h-3" />
                  <div className="bg-emerald-600 h-6" />
                  <div className="bg-blue-600 h-10" />
                </div>
                <span className="text-[8px] text-slate-500 truncate w-full text-center mt-1">{t.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity Score by Team (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Productivity Score by Team</h3>
          <div className="space-y-2.5 text-xs">
            {teamData.map((t, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-800">{t.name}</span>
                  <span className="font-bold text-[#0362FA]">{t.prod}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: `${parseFloat(t.prod) * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target vs Achievement (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Target vs Achievement</h3>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-slate-300" /> Target</span>
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Achieved</span>
            </div>
          </div>
          <div className="h-40 flex items-end justify-between gap-2 pt-4 px-1">
            {[
              { team: 'Sales', target: '6,000', act: '5,842', pct: 97 },
              { team: 'Support', target: '4,500', act: '4,286', pct: 95 },
              { team: 'Lead Gen', target: '4,000', act: '3,642', pct: 91 },
              { team: 'Follow-up', target: '3,000', act: '2,486', pct: 83 },
              { team: 'Retention', target: '2,000', act: '1,428', pct: 71 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="flex items-end gap-1 w-full justify-center">
                  <div className="w-2.5 bg-slate-300 rounded-t h-28" />
                  <div className="w-2.5 bg-[#13AB4A] rounded-t" style={{ height: `${col.pct * 0.28}px` }} />
                </div>
                <span className="text-[8px] text-slate-500 truncate w-full text-center mt-1">{col.team}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
