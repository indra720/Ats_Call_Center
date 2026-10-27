import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Users,
  Mail,
  Target,
  Clock,
  IndianRupee,
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
  HeartHandshake,
  Eye,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const LeadNurturingReportPage: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');
  const [selectedAgent, setSelectedAgent] = useState('All Agents');

  const topNurtured = [
    { id: 1, name: 'Rajesh Kumar', src: 'Website', stage: 'Engaged', lastTouch: '20 Oct 2026', duration: '5 days', score: 92, status: 'Hot' },
    { id: 2, name: 'Priya Sharma', src: 'Facebook', stage: 'In Nurturing', lastTouch: '19 Oct 2026', duration: '7 days', score: 86, status: 'Warm' },
    { id: 3, name: 'Amit Verma', src: 'Google Ads', stage: 'In Nurturing', lastTouch: '18 Oct 2026', duration: '9 days', score: 78, status: 'Warm' },
    { id: 4, name: 'Neha Singh', src: 'Referral', stage: 'Converted', lastTouch: '17 Oct 2026', duration: '4 days', score: 95, status: 'Converted' },
    { id: 5, name: 'Vikram Mehta', src: 'Website', stage: 'In Nurturing', lastTouch: '16 Oct 2026', duration: '11 days', score: 72, status: 'Warm' },
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
            <span className="text-slate-800 font-semibold">Lead Nurturing Report</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lead Nurturing Report</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Analyze lead nurturing activities, engagement, and conversion across the customer journey.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 21 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button
            onClick={() => toast.success('Report Exported', 'Lead Nurturing report downloaded in PDF format.')}
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
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Nurtured</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">6,842</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">22% vs last period</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Touchpoints</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">24,862</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">18% engagement</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <Mail className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Engaged Leads</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">4,286</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">28% active</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <HeartHandshake className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Conversion Rate</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">32%</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">12% boost</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <Target className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Avg. Duration</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">6.4 days</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">18% velocity</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Revenue</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">₹4,28,000</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">32% ARR growth</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Row 2: Lead Nurturing Trend + Nurturing Stage Distribution + Engagement by Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Trend (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Lead Nurturing Trend</h3>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> Total</span>
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Engaged</span>
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

        {/* Stage Donut (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Nurturing Stage Distribution</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="27, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="36, 100" strokeDashoffset="-27" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="21, 100" strokeDashoffset="-63" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="9, 100" strokeDashoffset="-84" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="7, 100" strokeDashoffset="-93" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">6,842</span>
              </div>
            </div>
            <div className="space-y-1 text-[11px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">New</span><span className="font-bold">1,842 (27%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">In Nurturing</span><span className="font-bold">2,486 (36%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Engaged</span><span className="font-bold">1,428 (21%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Converted</span><span className="font-bold">624 (9%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Dropped</span><span className="font-bold">462 (7%)</span></div>
            </div>
          </div>
        </div>

        {/* Channel Bars (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Engagement by Channel</h3>
          <div className="h-44 flex items-end justify-between gap-1.5 pt-6 px-1">
            {[
              { ch: 'Phone', count: '8,642', h: 95, color: 'bg-blue-600' },
              { ch: 'WhatsApp', count: '6,286', h: 72, color: 'bg-emerald-600' },
              { ch: 'Email', count: '4,982', h: 58, color: 'bg-amber-500' },
              { ch: 'SMS', count: '3,286', h: 38, color: 'bg-purple-600' },
              { ch: 'Other', count: '1,666', h: 20, color: 'bg-rose-500' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[8px] font-bold text-slate-700">{col.count}</span>
                <div className={`w-full ${col.color} rounded-t transition-all`} style={{ height: `${col.h}%` }} />
                <span className="text-[8px] text-slate-500 mt-1 truncate w-full text-center">{col.ch}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Top Nurtured Leads Table + Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>🌟</span> Top Nurtured Leads
            </h3>
            <button onClick={() => toast.info('Nurtured Leads', 'Displaying all enrolled leads.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
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
                  <th className="py-2.5 px-2">Stage</th>
                  <th className="py-2.5 px-2">Last Touchpoint</th>
                  <th className="py-2.5 px-2">Duration</th>
                  <th className="py-2.5 px-2 text-center">Score</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {topNurtured.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{l.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{l.name}</td>
                    <td className="py-2.5 px-2 text-slate-600">{l.src}</td>
                    <td className="py-2.5 px-2 font-medium text-slate-800">{l.stage}</td>
                    <td className="py-2.5 px-2 text-slate-500">{l.lastTouch}</td>
                    <td className="py-2.5 px-2 text-slate-600">{l.duration}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#0362FA]">{l.score}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        l.status === 'Hot' ? 'bg-[#FEECEE] text-[#E73647]' : l.status === 'Converted' ? 'bg-[#E9F9EE] text-[#13AB4A]' : 'bg-[#FEF3E6] text-[#EF9612]'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => toast.info('Lead Timeline', `Viewing timeline for ${l.name}`)}
                        className="px-2 py-0.5 bg-blue-50 text-[#0362FA] rounded text-[10px] font-semibold hover:bg-blue-100"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Funnel (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Nurturing Stage Conversion Rate</h3>
          <div className="space-y-1.5 text-xs">
            {[
              { label: 'Total Leads', count: '6,842 (100%)', color: 'bg-blue-600', w: 'w-full' },
              { label: 'Engaged', count: '4,286 (63%)', color: 'bg-teal-500', w: 'w-[82%]' },
              { label: 'Interested', count: '2,128 (31%)', color: 'bg-amber-500', w: 'w-[68%]' },
              { label: 'Proposal', count: '842 (12%)', color: 'bg-purple-600', w: 'w-[54%]' },
              { label: 'Converted', count: '624 (9%)', color: 'bg-rose-500', w: 'w-[40%]' },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`${f.color} ${f.w} py-1.5 rounded text-white text-center font-bold text-[10px] shadow-xs`}>
                  {f.label} ({f.count})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Nurturing Activity by Agent + Duration by Stage + Outcome Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Agent Activity (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Nurturing Activity by Agent</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[340px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[10px]">
                  <th className="py-2 px-1 w-6">#</th>
                  <th className="py-2 px-1">Agent</th>
                  <th className="py-2 px-1">Touchpoints</th>
                  <th className="py-2 px-1">Engaged</th>
                  <th className="py-2 px-1 text-right">Conv.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { id: 1, name: 'Aakash Sharma', t: '4,286', e: '986', c: '19%' },
                  { id: 2, name: 'Yashika Kanwar', t: '3,842', e: '842', c: '19%' },
                  { id: 3, name: 'Rohan Mehta', t: '3,286', e: '628', c: '20%' },
                  { id: 4, name: 'Priya Singh', t: '2,842', e: '514', c: '18%' },
                  { id: 5, name: 'Neha Verma', t: '2,486', e: '486', c: '17%' },
                ].map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-1 text-slate-400 font-mono text-[10px]">{a.id}</td>
                    <td className="py-2 px-1 font-semibold text-slate-900">{a.name}</td>
                    <td className="py-2 px-1 text-slate-600">{a.t}</td>
                    <td className="py-2 px-1 font-medium text-slate-800">{a.e}</td>
                    <td className="py-2 px-1 text-right font-bold text-[#13AB4A]">{a.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Average Duration by Stage (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Average Nurturing Duration by Stage</h3>
          <div className="space-y-2 text-xs">
            {[
              { stage: 'New to Contacted', dur: '1.2 days', w: '30%', color: 'bg-blue-600' },
              { stage: 'Contacted to Engaged', dur: '2.4 days', w: '50%', color: 'bg-emerald-600' },
              { stage: 'Engaged to Interested', dur: '4.6 days', w: '70%', color: 'bg-amber-500' },
              { stage: 'Interested to Proposal', dur: '6.8 days', w: '90%', color: 'bg-purple-600' },
              { stage: 'Proposal to Converted', dur: '3.2 days', w: '60%', color: 'bg-rose-500' },
            ].map((d, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-800">{d.stage}</span>
                  <span className="font-mono text-slate-500">{d.dur}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${d.color}`} style={{ width: d.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcome Donut (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Lead Nurturing Outcome</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="9, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="48, 100" strokeDashoffset="-9" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="21, 100" strokeDashoffset="-57" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="12, 100" strokeDashoffset="-78" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="10, 100" strokeDashoffset="-90" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">6,842</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">Converted</span><span className="font-bold">9%</span></div>
              <div className="flex justify-between"><span className="text-slate-600">In Progress</span><span className="font-bold">48%</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Interested</span><span className="font-bold">21%</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Not Interested</span><span className="font-bold">12%</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Lost</span><span className="font-bold">7%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
