import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Users,
  UserPlus,
  Target,
  CheckCircle2,
  IndianRupee,
  TrendingUp,
  ChevronDown,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const CustomerConversionReportPage: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');
  const [selectedTeam, setSelectedTeam] = useState('All Teams');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Customer Conversion Report</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Conversion Report</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track customer journey from first contact to conversion with detailed insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 21 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="All Campaigns">All Campaigns</option>
            <option value="New Outreach">New Outreach</option>
            <option value="Product Demo">Product Demo</option>
          </select>

          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="All Teams">All Teams</option>
            <option value="Sales Team">Sales Team</option>
            <option value="Support Team">Support Team</option>
          </select>

          <button
            onClick={() => toast.success('Report Exported', 'Conversion report downloaded in PDF format.')}
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
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Customers</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">13,286</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">18% vs last period</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">New Customers</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">4,286</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">24% onboarding</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <UserPlus className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Qualified</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">2,842</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">28% pipeline</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <Target className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Converted</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">1,842</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">32% won</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Revenue</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">₹4,28,000</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">32% vs target</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Conversion Rate</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">14%</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">22% higher</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Row 2: Customer Conversion Funnel + Customer Growth Trend + Customer Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Funnel (3.5 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Conversion Funnel</h3>
          <div className="space-y-1.5 text-xs">
            {[
              { label: 'Total Customers', count: '13,286 (100%)', color: 'bg-blue-600', w: 'w-full' },
              { label: 'Contacted', count: '8,642 (65%)', color: 'bg-teal-500', w: 'w-[82%]' },
              { label: 'Interested', count: '4,286 (32%)', color: 'bg-amber-500', w: 'w-[68%]' },
              { label: 'Qualified', count: '2,842 (21%)', color: 'bg-purple-600', w: 'w-[54%]' },
              { label: 'Converted', count: '1,842 (14%)', color: 'bg-rose-500', w: 'w-[40%]' },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`${f.color} ${f.w} py-1.5 rounded text-white text-center font-bold text-[10px] shadow-xs`}>
                  {f.label} ({f.count})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Trend (4.5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Growth Trend</h3>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> New</span>
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Qual.</span>
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

        {/* Status Distribution Donut (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Status Distribution</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="32, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="24, 100" strokeDashoffset="-32" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="21, 100" strokeDashoffset="-56" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="14, 100" strokeDashoffset="-77" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="9, 100" strokeDashoffset="-91" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">13,286</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">New</span><span className="font-bold">4,286 (32%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Interested</span><span className="font-bold">3,218 (24%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Qualified</span><span className="font-bold">2,842 (21%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Converted</span><span className="font-bold">1,842 (14%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Inactive</span><span className="font-bold">1,098 (8%)</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Conversion by Source + Monthly Conversion Rate + Conversion by Campaign */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Source Donut (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Conversion by Source</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="32, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="21, 100" strokeDashoffset="-32" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="16, 100" strokeDashoffset="-53" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="14, 100" strokeDashoffset="-69" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="8, 100" strokeDashoffset="-83" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="9, 100" strokeDashoffset="-91" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">13,286</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">Website</span><span className="font-bold">4,286 (32%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Campaign</span><span className="font-bold">2,842 (21%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Referral</span><span className="font-bold">2,128 (16%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Manual</span><span className="font-bold">1,842 (14%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Social</span><span className="font-bold">1,098 (8%)</span></div>
            </div>
          </div>
        </div>

        {/* Monthly Conversion Rate (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Monthly Conversion Rate</h3>
          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-1">
            {[
              { m: 'May', h: 35, rate: '8%' },
              { m: 'Jun', h: 48, rate: '10%' },
              { m: 'Jul', h: 62, rate: '11%' },
              { m: 'Aug', h: 75, rate: '12%' },
              { m: 'Sep', h: 88, rate: '13%' },
              { m: 'Oct', h: 100, rate: '14%' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[9px] font-bold text-slate-700">{col.rate}</span>
                <div className="w-full bg-[#0362FA] rounded-t transition-all" style={{ height: `${col.h}%` }} />
                <span className="text-[8px] text-slate-500 mt-1">{col.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion by Campaign (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Conversion by Campaign</h3>
          <div className="space-y-2 text-xs">
            {[
              { name: 'New Customer Outreach', pct: '24%', color: 'bg-blue-600' },
              { name: 'Re-engagement Campaign', pct: '21%', color: 'bg-emerald-600' },
              { name: 'Product Demo Calls', pct: '18%', color: 'bg-amber-500' },
              { name: 'Payment Follow-up', pct: '16%', color: 'bg-purple-600' },
              { name: 'Feedback & Survey', pct: '12%', color: 'bg-rose-500' },
              { name: 'Upsell Campaign', pct: '9%', color: 'bg-slate-400' },
            ].map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-800">{c.name}</span>
                  <span className="font-bold text-slate-900">{c.pct}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: c.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Top Customers by Revenue Table + Recent Customer Conversions Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Top Customers (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Top Customers by Revenue</h3>
            <button onClick={() => toast.info('Customer Directory', 'Opening full CRM customer base.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[550px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Customer Name</th>
                  <th className="py-2.5 px-2">Company</th>
                  <th className="py-2.5 px-2">Calls</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { id: 1, name: 'Rajesh Kumar', co: 'Sharma Enterprises', calls: 24, status: 'Converted', rev: '₹48,000' },
                  { id: 2, name: 'Priya Sharma', co: 'PS Retail', calls: 18, status: 'Converted', rev: '₹32,000' },
                  { id: 3, name: 'Amit Verma', co: 'Verma Traders', calls: 16, status: 'Qualified', rev: '₹28,000' },
                  { id: 4, name: 'Neha Singh', co: 'NS Solutions', calls: 14, status: 'Converted', rev: '₹24,000' },
                  { id: 5, name: 'Vikram Mehta', co: 'VM Industries', calls: 12, status: 'Interested', rev: '₹18,000' },
                ].map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{c.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-2.5 px-2 text-slate-600">{c.co}</td>
                    <td className="py-2.5 px-2 text-slate-600">{c.calls}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.status === 'Converted' ? 'bg-[#E9F9EE] text-[#13AB4A]' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-semibold text-[#13AB4A]">{c.rev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Conversions (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Customer Conversions</h3>
            <button onClick={() => toast.info('Conversion Audit', 'Showing real-time converted deals.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[550px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Customer</th>
                  <th className="py-2.5 px-2">Campaign</th>
                  <th className="py-2.5 px-2">Source</th>
                  <th className="py-2.5 px-2">Amount</th>
                  <th className="py-2.5 px-2 text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { id: 1, name: 'Rajesh Kumar', camp: 'New Outreach', src: 'Website', amt: '₹48,000', dt: '21 Oct 04:32 PM' },
                  { id: 2, name: 'Priya Sharma', camp: 'Re-engagement', src: 'Campaign', amt: '₹32,000', dt: '21 Oct 03:18 PM' },
                  { id: 3, name: 'Amit Verma', camp: 'Product Demo', src: 'Referral', amt: '₹28,000', dt: '21 Oct 02:45 PM' },
                  { id: 4, name: 'Neha Singh', camp: 'Follow-up', src: 'Manual', amt: '₹24,000', dt: '21 Oct 01:22 PM' },
                  { id: 5, name: 'Sunita Devi', camp: 'Survey', src: 'Campaign', amt: '₹18,000', dt: '21 Oct 12:10 PM' },
                ].map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{c.id}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-2.5 px-2 text-slate-600">{c.camp}</td>
                    <td className="py-2.5 px-2 text-slate-600">{c.src}</td>
                    <td className="py-2.5 px-2 font-semibold text-[#13AB4A]">{c.amt}</td>
                    <td className="py-2.5 px-2 text-right text-slate-500 font-mono text-[11px]">{c.dt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
