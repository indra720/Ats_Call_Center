import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Users,
  UserPlus,
  CheckCircle2,
  TrendingUp,
  UserCheck,
  UserX,
  IndianRupee,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const CustomerReportsPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');

  const topCustomers = [
    { id: 1, name: 'Rajesh Kumar', company: 'RK Enterprises', calls: 48, status: 'Converted', rev: '₹1,28,000', lastAct: '21 Oct 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
    { id: 2, name: 'Priya Sharma', company: 'Sharma Solutions', calls: 36, status: 'Converted', rev: '₹98,000', lastAct: '20 Oct 2026', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
    { id: 3, name: 'Amit Verma', company: 'AV Traders', calls: 28, status: 'Qualified', rev: '₹86,000', lastAct: '20 Oct 2026', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop' },
    { id: 4, name: 'Neha Singh', company: 'NS Marketing', calls: 32, status: 'Converted', rev: '₹72,000', lastAct: '19 Oct 2026', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' },
    { id: 5, name: 'Vikram Mehta', company: 'Mehta & Co.', calls: 26, status: 'Interested', rev: '₹65,000', lastAct: '19 Oct 2026', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
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
            <span className="text-slate-800 font-semibold">Customer Reports</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed analysis of customers, lead sources, customer behavior, and lifetime value.
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
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="All Status">All Status</option>
            <option value="Converted">Converted</option>
            <option value="Qualified">Qualified</option>
            <option value="Interested">Interested</option>
          </select>

          <button
            onClick={() => toast.success('Report Exported', 'Customer report downloaded in PDF format.')}
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
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">5,842</div>
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
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">New Customers</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">1,248</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">18% growth</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <UserPlus className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Qualified</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">892</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">24% qualified</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Converted</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">624</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">28% closed</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Inactive</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">1,086</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#E73647] truncate">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">-12% churn</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <UserX className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Revenue</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">₹12,48,000</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">32% YoY growth</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Row 2: Customer Growth Trend + Customer Source Donut + Customer Status Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Trend (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Growth Trend</h3>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> Total</span>
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> New</span>
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#EF9612]" /> Conv.</span>
            </div>
          </div>
          <div className="relative h-44 w-full pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none">
              <line x1="0" y1="30" x2="400" y2="30" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="#F1F5F9" strokeWidth="1" />
              <polyline fill="none" stroke="#0362FA" strokeWidth="2" points="10,90 60,80 120,65 180,75 240,55 300,50 360,40" />
              <polyline fill="none" stroke="#13AB4A" strokeWidth="2" points="10,115 60,105 120,95 180,105 240,90 300,85 360,95" />
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

        {/* Source Donut (3.5 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Source Distribution</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="32, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="21, 100" strokeDashoffset="-32" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="17, 100" strokeDashoffset="-53" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="13, 100" strokeDashoffset="-70" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="11, 100" strokeDashoffset="-83" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="6, 100" strokeDashoffset="-94" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">5,842</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">Website</span><span className="font-bold">1,842 (32%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Campaign</span><span className="font-bold">1,248 (21%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Referral</span><span className="font-bold">986 (17%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Manual</span><span className="font-bold">742 (13%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Social</span><span className="font-bold">624 (11%)</span></div>
            </div>
          </div>
        </div>

        {/* Status Donut (3.5 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Status Distribution</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="21, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="19, 100" strokeDashoffset="-21" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="15, 100" strokeDashoffset="-40" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="11, 100" strokeDashoffset="-55" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="19, 100" strokeDashoffset="-66" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="15, 100" strokeDashoffset="-85" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">5,842</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">New</span><span className="font-bold">1,248 (21%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Interested</span><span className="font-bold">1,120 (19%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Qualified</span><span className="font-bold">892 (15%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Converted</span><span className="font-bold">624 (11%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Inactive</span><span className="font-bold">1,086 (19%)</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Top Customers by Revenue Table + CLV Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>👥</span> Top Customers by Revenue
            </h3>
            <button onClick={() => toast.info('Customer Directory', 'Opening full CRM customer base.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Customer Name</th>
                  <th className="py-2.5 px-2">Company</th>
                  <th className="py-2.5 px-2">Total Calls</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2">Revenue</th>
                  <th className="py-2.5 px-2">Last Activity</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {topCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{c.id}</td>
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-1.5">
                        <img src={c.avatar} alt={c.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-semibold text-slate-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600">{c.company}</td>
                    <td className="py-2.5 px-2 font-medium text-slate-900">{c.calls}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.status === 'Converted'
                          ? 'bg-[#E9F9EE] text-[#13AB4A]'
                          : c.status === 'Qualified'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-semibold text-[#13AB4A]">{c.rev}</td>
                    <td className="py-2.5 px-2 text-slate-500">{c.lastAct}</td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => toast.info('Profile View', `Opening customer details for ${c.name}`)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-[#0362FA] rounded text-[10px] font-semibold hover:bg-blue-100"
                      >
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

        {/* Customer Lifetime Value (CLV) Bars (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Lifetime Value (CLV)</h3>
          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-1">
            {[
              { label: '< 10K', count: '1,842', h: 90, color: 'bg-blue-600' },
              { label: '10K-50K', count: '1,248', h: 65, color: 'bg-emerald-600' },
              { label: '50K-1L', count: '986', h: 50, color: 'bg-amber-500' },
              { label: '1L-5L', count: '624', h: 32, color: 'bg-purple-600' },
              { label: '> 5L', count: '142', h: 12, color: 'bg-rose-500' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[9px] font-bold text-slate-700">{col.count}</span>
                <div className={`w-full ${col.color} rounded-t transition-all`} style={{ height: `${col.h}%` }} />
                <span className="text-[8px] text-slate-500 mt-1 whitespace-nowrap">{col.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Customer Acquisition by Campaign + Customer Activity + Recent Customer Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Acquisition Bars (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Acquisition by Campaign</h3>
          <div className="flex items-center gap-3 text-[10px] text-slate-600">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-600" /> Total Customers</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#13AB4A]" /> Converted</span>
          </div>
          <div className="h-40 flex items-end justify-between gap-2 pt-4 px-1">
            {[
              { camp: 'New Outreach', tot: 1842, conv: 624 },
              { camp: 'Re-engagement', tot: 1248, conv: 356 },
              { camp: 'Product Demo', tot: 986, conv: 264 },
              { camp: 'Payment Follow', tot: 742, conv: 186 },
              { camp: 'Feedback', tot: 624, conv: 132 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="flex items-end gap-1 w-full justify-center">
                  <div className="w-2.5 bg-blue-600 rounded-t" style={{ height: `${(col.tot / 1842) * 100}px` }} />
                  <div className="w-2.5 bg-[#13AB4A] rounded-t" style={{ height: `${(col.conv / 1842) * 100}px` }} />
                </div>
                <span className="text-[8px] text-slate-500 truncate w-full text-center mt-1">{col.camp.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Bars (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Activity by Call Type</h3>
          <div className="space-y-2 text-xs">
            {[
              { type: 'Outbound Calls', pct: '42%', color: 'bg-blue-600' },
              { type: 'Inbound Calls', pct: '28%', color: 'bg-emerald-600' },
              { type: 'Follow-up Calls', pct: '16%', color: 'bg-amber-500' },
              { type: 'Demo Calls', pct: '8%', color: 'bg-purple-600' },
              { type: 'Support Calls', pct: '4%', color: 'bg-rose-500' },
              { type: 'Other Calls', pct: '2%', color: 'bg-slate-400' },
            ].map((a, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-800">{a.type}</span>
                  <span className="font-bold text-slate-900">{a.pct}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${a.color}`} style={{ width: a.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Customer Activity (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Customer Activity</h3>
            <button onClick={() => toast.info('Activity Logs', 'Navigating to activity trail.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { time: '21 Oct 04:32 PM', customer: 'Rajesh Kumar', act: 'Call completed', agent: 'Aakash Sharma', status: 'Converted' },
              { time: '21 Oct 04:28 PM', customer: 'Priya Sharma', act: 'Follow-up call', agent: 'Yashika Kanwar', status: 'Interested' },
              { time: '21 Oct 04:15 PM', customer: 'Amit Verma', act: 'Product demo', agent: 'Rohan Mehta', status: 'Qualified' },
              { time: '21 Oct 04:10 PM', customer: 'Neha Singh', act: 'Payment discussion', agent: 'Priya Singh', status: 'Converted' },
              { time: '21 Oct 03:58 PM', customer: 'Vikram Mehta', act: 'Survey completed', agent: 'Neha Verma', status: 'Inactive' },
            ].map((row, idx) => (
              <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 text-[11px]">{row.customer}</div>
                  <div className="text-[10px] text-slate-400">{row.act} • {row.time}</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  row.status === 'Converted'
                    ? 'bg-emerald-100 text-emerald-800'
                    : row.status === 'Qualified'
                    ? 'bg-blue-100 text-blue-800'
                    : row.status === 'Interested'
                    ? 'bg-amber-100 text-amber-800'
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
