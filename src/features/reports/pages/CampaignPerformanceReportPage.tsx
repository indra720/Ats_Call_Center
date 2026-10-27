import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  Target,
  IndianRupee,
  TrendingUp,
  Search,
  Eye,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Radio,
  Filter,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const CampaignPerformanceReportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const campaigns = [
    { id: 1, name: 'New Customer Outreach', total: '2,842', ans: '1,980 (70%)', mis: '862 (30%)', conv: '22%', rev: '₹42,80,000', cost: '₹10,00,000', roi: '328%', status: 'Active', conversions: 624 },
    { id: 2, name: 'Re-engagement Campaign', total: '1,980', ans: '1,362 (69%)', mis: '618 (31%)', conv: '18%', rev: '₹28,60,000', cost: '₹8,00,000', roi: '258%', status: 'Active', conversions: 356 },
    { id: 3, name: 'Product Demo Calls', total: '1,642', ans: '1,148 (70%)', mis: '494 (30%)', conv: '16%', rev: '₹21,40,000', cost: '₹6,50,000', roi: '229%', status: 'Active', conversions: 264 },
    { id: 4, name: 'Payment Follow-up', total: '1,324', ans: '932 (70%)', mis: '392 (30%)', conv: '14%', rev: '₹18,60,000', cost: '₹5,00,000', roi: '272%', status: 'Active', conversions: 186 },
    { id: 5, name: 'Feedback & Survey', total: '1,086', ans: '812 (75%)', mis: '274 (25%)', conv: '12%', rev: '₹12,80,000', cost: '₹4,00,000', roi: '220%', status: 'Completed', conversions: 132 },
    { id: 6, name: 'Upsell Campaign', total: '972', ans: '694 (71%)', mis: '278 (29%)', conv: '11%', rev: '₹10,50,000', cost: '₹3,50,000', roi: '200%', status: 'Active', conversions: 108 },
  ];

  const filteredCampaigns = campaigns.filter((c) => {
    if (selectedFilter !== 'All' && c.status !== selectedFilter) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
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
            <span className="text-slate-800 font-semibold">Campaign Reports</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Campaign Performance Report</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed analysis of campaign performance with call metrics, conversion rates, and ROI insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 21 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button
            onClick={() => toast.success('Report Exported', 'Campaign Performance report downloaded in PDF format.')}
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
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Calls</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">18,642</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">22% vs last period</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Phone className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Answered</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">12,486</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">24% connected</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <PhoneIncoming className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Missed Calls</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">4,106</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#E73647] truncate">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">-8% drop</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <PhoneMissed className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Conversions</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">3,124</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">28% closed</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <Target className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Revenue</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">₹4,28,000</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">32% YoY growth</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Campaign ROI</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">320%</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">18% return</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Row 2: Campaign Call Volume Trend + Campaign Status Donut + Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Trend (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Campaign Call Volume Trend</h3>
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

        {/* Status Donut (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Campaign Status</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="67, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="22, 100" strokeDashoffset="-67" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="6, 100" strokeDashoffset="-89" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="3, 100" strokeDashoffset="-95" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="2, 100" strokeDashoffset="-98" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">18,642</span>
                <span className="text-[9px] text-slate-400">Calls</span>
              </div>
            </div>
            <div className="space-y-1 text-[11px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">Connected</span><span className="font-bold text-slate-900">12,486 (67%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Not Connected</span><span className="font-bold text-slate-900">4,106 (22%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Voicemail</span><span className="font-bold text-slate-900">1,124 (6%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Busy</span><span className="font-bold text-slate-900">648 (3%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">No Answer</span><span className="font-bold text-slate-900">278 (2%)</span></div>
            </div>
          </div>
        </div>

        {/* Funnel (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Conversion Funnel</h3>
          <div className="space-y-1.5 text-xs">
            {[
              { label: 'Total Calls', count: '18,642 (100%)', color: 'bg-blue-600', w: 'w-full' },
              { label: 'Interested', count: '6,824 (37%)', color: 'bg-teal-500', w: 'w-[85%]' },
              { label: 'Qualified', count: '4,286 (23%)', color: 'bg-amber-500', w: 'w-[70%]' },
              { label: 'Proposal', count: '2,148 (12%)', color: 'bg-orange-500', w: 'w-[55%]' },
              { label: 'Converted', count: '3,124 (17%)', color: 'bg-rose-500', w: 'w-[45%]' },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`${f.color} ${f.w} py-1 rounded text-white text-center font-bold text-[10px] shadow-xs`}>
                  {f.label} ({f.count})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Campaign Performance Details Table + Top Performing Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎯</span> Campaign Performance Details
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2 py-1 text-xs border border-slate-200 rounded-lg w-40"
                />
              </div>
              <button onClick={() => toast.info('Full Campaign View', 'Displaying all recorded campaigns.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
                View All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Campaign Name</th>
                  <th className="py-2.5 px-2">Total Calls</th>
                  <th className="py-2.5 px-2">Answered</th>
                  <th className="py-2.5 px-2">Missed</th>
                  <th className="py-2.5 px-2">Conversion</th>
                  <th className="py-2.5 px-2">Revenue</th>
                  <th className="py-2.5 px-2">Cost</th>
                  <th className="py-2.5 px-2">ROI</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {filteredCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{c.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-2.5 px-2 text-slate-700 font-medium">{c.total}</td>
                    <td className="py-2.5 px-2 text-[#13AB4A] font-medium">{c.ans}</td>
                    <td className="py-2.5 px-2 text-[#E73647] font-medium">{c.mis}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-900">{c.conv}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{c.rev}</td>
                    <td className="py-2.5 px-2 text-slate-500">{c.cost}</td>
                    <td className="py-2.5 px-2 text-[#13AB4A] font-bold">{c.roi}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.status === 'Active' ? 'bg-[#E9F9EE] text-[#13AB4A]' : 'bg-purple-50 text-purple-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => toast.info('Campaign Details', `Opening telemetry for ${c.name}`)}
                        className="p-1 text-[#0362FA] hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performing Campaigns (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>🏆</span> Top Performing Campaigns
            </h3>
            <button onClick={() => toast.info('Leaderboard', 'Displaying all campaigns rankings.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Campaign Name</th>
                  <th className="py-2.5 px-2">Conversions</th>
                  <th className="py-2.5 px-2 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {campaigns.slice(0, 5).map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{c.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-2.5 px-2 font-bold text-[#13AB4A]">{c.conversions}</td>
                    <td className="py-2.5 px-2 text-right font-semibold text-slate-900">{c.rev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 4: Call Type Distribution + Campaign Conversion Rate + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Call Type Distribution (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Type Distribution</h3>
          <div className="h-40 flex items-end justify-between gap-2 pt-4 px-1">
            {campaigns.slice(0, 5).map((c, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                <div className="w-full flex flex-col rounded overflow-hidden">
                  <div className="bg-purple-600 h-3" />
                  <div className="bg-amber-500 h-3" />
                  <div className="bg-emerald-600 h-6" />
                  <div className="bg-blue-600 h-10" />
                </div>
                <span className="text-[8px] text-slate-500 truncate w-full text-center mt-1">{c.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Conversion Rate (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Campaign Conversion Rate</h3>
          <div className="space-y-2.5 text-xs">
            {campaigns.map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-800">{c.name}</span>
                  <span className="font-bold text-[#0362FA]">{c.conv}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: c.conv }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Campaign Activity (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Campaign Activity</h3>
            <button onClick={() => toast.info('Activity Logs', 'Showing live campaign events.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { time: '21 Oct 04:32 PM', camp: 'New Customer Outreach', act: 'Call completed', status: 'Interested' },
              { time: '21 Oct 04:28 PM', camp: 'Re-engagement', act: 'Call with Rajesh Kumar', status: 'Qualified' },
              { time: '21 Oct 04:15 PM', camp: 'Product Demo', act: 'Follow-up call', status: 'Not Interested' },
              { time: '21 Oct 04:10 PM', camp: 'Payment Follow-up', act: 'Payment discussion', status: 'Converted' },
              { time: '21 Oct 03:58 PM', camp: 'Feedback & Survey', act: 'Survey completed', status: 'Completed' },
            ].map((row, idx) => (
              <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 text-[11px]">{row.camp}</div>
                  <div className="text-[10px] text-slate-400">{row.act} • {row.time}</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  row.status === 'Converted' || row.status === 'Interested'
                    ? 'bg-emerald-100 text-emerald-800'
                    : row.status === 'Qualified'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
