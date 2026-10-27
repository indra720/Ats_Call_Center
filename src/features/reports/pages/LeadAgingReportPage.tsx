import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Clock,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Hourglass,
  Target,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const LeadAgingReportPage: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');
  const [selectedAgent, setSelectedAgent] = useState('All Agents');

  const urgentLeads = [
    { id: 1, name: 'Rajesh Kumar', src: 'Website', age: '18 days', lastFup: '02 Oct 2026', nextFup: 'Overdue', status: 'Overdue' },
    { id: 2, name: 'Priya Sharma', src: 'Facebook', age: '12 days', lastFup: '08 Oct 2026', nextFup: 'Overdue', status: 'Overdue' },
    { id: 3, name: 'Amit Verma', src: 'Google Ads', age: '10 days', lastFup: '10 Oct 2026', nextFup: 'Today', status: 'Due Today' },
    { id: 4, name: 'Neha Singh', src: 'Referral', age: '9 days', lastFup: '11 Oct 2026', nextFup: 'Today', status: 'Due Today' },
    { id: 5, name: 'Vikram Mehta', src: 'Website', age: '8 days', lastFup: '12 Oct 2026', nextFup: 'Today', status: 'Due Today' },
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
            <span className="text-slate-800 font-semibold">Lead Aging & Follow-up</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lead Aging & Follow-up Report</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Analyze lead aging, follow-up activities, response time, and identify leads that need immediate attention.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 21 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button
            onClick={() => toast.success('Report Exported', 'Lead Aging report downloaded in PDF format.')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0362FA] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-blue-600 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 6 Top Metric Cards */}
      {/* 2. Top KPI Metric Cards - Balanced, non-shrinking layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Leads</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">13,286</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">18% vs last period</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Hourglass className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Overdue Follow-ups</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">2,842</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#E73647] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">24% urgency</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Due Today</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">1,486</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">12% target pace</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <PhoneCall className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Completed</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">8,642</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">28% resolved</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Avg. Lead Age</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">4.2 days</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">-0.8d speedup</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Conversion Rate</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">32%</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#E73647] truncate">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">6% drop</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <Target className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Row 2: Lead Aging Distribution + Follow-up Status Donut + Lead Aging by Source */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Aging Distribution Bars (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Lead Aging Distribution</h3>
          <div className="h-44 flex items-end justify-between gap-1.5 pt-6 px-1">
            {[
              { label: '< 1 Day', count: '3,214', h: 90, color: 'bg-emerald-500' },
              { label: '1-3 Days', count: '2,842', h: 80, color: 'bg-blue-600' },
              { label: '4-7 Days', count: '2,128', h: 60, color: 'bg-amber-500' },
              { label: '8-15 Days', count: '1,986', h: 55, color: 'bg-orange-500' },
              { label: '16-30 Days', count: '1,642', h: 45, color: 'bg-rose-500' },
              { label: '> 30 Days', count: '1,474', h: 40, color: 'bg-purple-600' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[8px] font-bold text-slate-700">{col.count}</span>
                <div className={`w-full ${col.color} rounded-t transition-all`} style={{ height: `${col.h}%` }} />
                <span className="text-[8px] text-slate-500 mt-1 whitespace-nowrap">{col.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Follow-up Status Donut (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Follow-up Status</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="65, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="16, 100" strokeDashoffset="-65" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="11, 100" strokeDashoffset="-81" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="7, 100" strokeDashoffset="-92" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="1, 100" strokeDashoffset="-99" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">13,286</span>
              </div>
            </div>
            <div className="space-y-1 text-[11px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">Completed</span><span className="font-bold">8,642 (65%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Pending</span><span className="font-bold">2,128 (16%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Overdue</span><span className="font-bold">2,842 (11%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Not Sched.</span><span className="font-bold">986 (7%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Others</span><span className="font-bold">688 (5%)</span></div>
            </div>
          </div>
        </div>

        {/* Lead Aging by Source Stacked Bars (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Lead Aging by Source</h3>
          <div className="h-44 flex items-end justify-between gap-2 pt-4 px-1">
            {[
              { src: 'Website', tot: 3214 },
              { src: 'Facebook', tot: 2842 },
              { src: 'Google Ads', tot: 2128 },
              { src: 'Referral', tot: 1986 },
              { src: 'Other', tot: 1116 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                <div className="w-full flex flex-col rounded overflow-hidden">
                  <div className="bg-rose-500 h-3" />
                  <div className="bg-orange-500 h-3" />
                  <div className="bg-amber-500 h-4" />
                  <div className="bg-blue-600 h-6" />
                  <div className="bg-emerald-500 h-10" />
                </div>
                <span className="text-[8px] text-slate-500 truncate w-full text-center mt-1">{col.src}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Leads Requiring Immediate Follow-up Table + Activity Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Urgent Leads Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-rose-600">
              <AlertTriangle className="w-4 h-4" /> Leads Requiring Immediate Follow-up
            </h3>
            <button onClick={() => toast.info('Overdue Queue', 'Loading all prioritized leads.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Customer Name</th>
                  <th className="py-2.5 px-2">Source</th>
                  <th className="py-2.5 px-2">Lead Age</th>
                  <th className="py-2.5 px-2">Last Follow-up</th>
                  <th className="py-2.5 px-2">Next Follow-up</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {urgentLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{l.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{l.name}</td>
                    <td className="py-2.5 px-2 text-slate-600">{l.src}</td>
                    <td className="py-2.5 px-2 font-medium text-rose-600">{l.age}</td>
                    <td className="py-2.5 px-2 text-slate-500">{l.lastFup}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-800">{l.nextFup}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        l.status === 'Overdue' ? 'bg-[#FEECEE] text-[#E73647]' : 'bg-[#FEF3E6] text-[#EF9612]'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => toast.success('Follow-up Initiated', `Opening dialer for ${l.name}`)}
                        className="px-2.5 py-1 bg-[#EBF3FE] text-[#0362FA] font-semibold rounded text-[11px] hover:bg-blue-100 transition-colors"
                      >
                        Follow Up
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Trend (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Follow-up Activity Trend</h3>
          <div className="relative h-44 w-full pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none">
              <line x1="0" y1="30" x2="400" y2="30" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="#F1F5F9" strokeWidth="1" />
              <polyline fill="none" stroke="#13AB4A" strokeWidth="2" points="10,80 60,70 120,55 180,65 240,45 300,50 360,40" />
              <polyline fill="none" stroke="#0362FA" strokeWidth="2" points="10,110 60,95 120,85 180,95 240,80 300,75 360,85" />
              <polyline fill="none" stroke="#E73647" strokeWidth="2" points="10,135 60,130 120,120 180,125 240,115 300,110 360,115" />
            </svg>
            <div className="flex justify-between text-[9px] text-slate-400 mt-1">
              <span>1 Oct</span>
              <span>7 Oct</span>
              <span>13 Oct</span>
              <span>19 Oct</span>
              <span>21 Oct</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Follow-up Performance by Agent + Aging vs Conversion + Outcome Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Agent Table (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Follow-up Performance by Agent</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[450px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[10px]">
                  <th className="py-2 px-2 w-6">#</th>
                  <th className="py-2 px-2">Agent Name</th>
                  <th className="py-2 px-2">Total Leads</th>
                  <th className="py-2 px-2">Follow-ups</th>
                  <th className="py-2 px-2">Conv.</th>
                  <th className="py-2 px-2 text-right">Avg Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { id: 1, name: 'Aakash Sharma', leads: '1,482', fup: '1,128', conv: '36%', resp: '2.4 hours' },
                  { id: 2, name: 'Yashika Kanwar', leads: '1,326', fup: '986', conv: '32%', resp: '3.1 hours' },
                  { id: 3, name: 'Rohan Mehta', leads: '1,148', fup: '842', conv: '28%', resp: '3.6 hours' },
                  { id: 4, name: 'Priya Singh', leads: '986', fup: '684', conv: '26%', resp: '4.2 hours' },
                ].map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-2 text-slate-400 font-mono text-[10px]">{a.id}</td>
                    <td className="py-2 px-2 font-semibold text-slate-900">{a.name}</td>
                    <td className="py-2 px-2 text-slate-600">{a.leads}</td>
                    <td className="py-2 px-2 font-medium text-slate-900">{a.fup}</td>
                    <td className="py-2 px-2 font-bold text-[#13AB4A]">{a.conv}</td>
                    <td className="py-2 px-2 text-right text-slate-500 font-mono">{a.resp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Aging vs Conversion Rate (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Lead Aging vs Conversion Rate</h3>
          <div className="h-44 flex items-end justify-between gap-1.5 pt-6 px-1">
            {[
              { label: '< 1 Day', bar: 80, rate: '45%' },
              { label: '1-3 Days', bar: 65, rate: '35%' },
              { label: '4-7 Days', bar: 45, rate: '25%' },
              { label: '8-15 Days', bar: 30, rate: '15%' },
              { label: '> 30 Days', bar: 15, rate: '5%' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[8px] font-bold text-rose-600">{col.rate}</span>
                <div className="w-full bg-[#0362FA] rounded-t transition-all" style={{ height: `${col.bar}%` }} />
                <span className="text-[8px] text-slate-500 mt-1 whitespace-nowrap">{col.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Outcome Donut (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Follow-up Outcome</h3>
          <div className="flex flex-col items-center justify-center pt-1">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="50, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="21, 100" strokeDashoffset="-50" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="15, 100" strokeDashoffset="-71" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="10, 100" strokeDashoffset="-86" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="4, 100" strokeDashoffset="-96" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">8,642</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px] w-full pt-2">
              <div className="flex justify-between"><span className="text-slate-600">Connected</span><span className="font-bold">50%</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Unreachable</span><span className="font-bold">21%</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Interested</span><span className="font-bold">15%</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Not Interested</span><span className="font-bold">10%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
