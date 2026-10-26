import React from 'react';
import {
  Calendar,
  Download,
  DollarSign,
  ShoppingCart,
  Percent,
  Tag,
  Target,
  BarChart2,
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

export const SalesReportPage: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">Sales & Revenue Report</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sales & Revenue Report</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete analysis of sales performance, revenue generation, conversion rates, and ROI insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 21 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm">
            <span>All Campaigns</span>
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
          <div className="w-7 h-7 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] font-bold text-sm">
            ₹
          </div>
          <div className="text-2xl font-bold text-slate-900">₹4,28,000</div>
          <div className="text-xs font-semibold text-slate-500">Total Revenue</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>32% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-slate-900">124</div>
          <div className="text-xs font-semibold text-slate-500">Total Sales</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>28%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#871CF4]">
            <Percent className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-slate-900">18%</div>
          <div className="text-xs font-semibold text-slate-500">Conversion Rate</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>12%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-[#EF9612]">
            <Tag className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-slate-900">₹3,452</div>
          <div className="text-xs font-semibold text-slate-500">Avg. Sale Value</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>18%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="w-7 h-7 rounded-lg bg-[#FEECEE] flex items-center justify-center text-[#E73647]">
            <Target className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-slate-900">₹2,86,000</div>
          <div className="text-xs font-semibold text-slate-500">Target Revenue</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>149%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-1">
          <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-slate-900">320%</div>
          <div className="text-xs font-semibold text-slate-500">ROI</div>
          <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>22%</span>
          </div>
        </div>
      </div>

      {/* Row 2: Revenue Trend + Sales by Campaign + Revenue by Product */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Revenue Trend Line & Bar */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>📈</span> Revenue Trend
            </h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#0362FA]" /> Revenue (₹)
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Sales Count
              </span>
            </div>
          </div>

          <div className="h-56 relative flex items-end justify-between pt-6 px-2">
            {/* Background Bars (Sales Count) */}
            <div className="absolute inset-x-2 bottom-6 top-6 flex items-end justify-between gap-1.5 pointer-events-none">
              {[20, 30, 25, 45, 35, 55, 40, 60, 50, 65, 75].map((h, i) => (
                <div key={i} className="flex-1 bg-[#13AB4A]/70 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>

            {/* Foreground Polyline (Revenue) */}
            <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 400 160">
              <polyline
                fill="none"
                stroke="#0362FA"
                strokeWidth="3"
                points="10,110 45,95 80,105 115,85 150,90 185,75 220,80 255,65 290,75 325,55 360,60 395,45"
              />
              {[
                { cx: 10, cy: 110 }, { cx: 45, cy: 95 }, { cx: 80, cy: 105 }, { cx: 115, cy: 85 },
                { cx: 150, cy: 90 }, { cx: 185, cy: 75 }, { cx: 220, cy: 80 }, { cx: 255, cy: 65 },
                { cx: 290, cy: 75 }, { cx: 325, cy: 55 }, { cx: 360, cy: 60 }, { cx: 395, cy: 45 },
              ].map((pt, i) => (
                <circle key={i} cx={pt.cx} cy={pt.cy} r="3.5" fill="#0362FA" stroke="#ffffff" strokeWidth="1.5" />
              ))}
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

        {/* Sales by Campaign Donut */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>👥</span> Sales by Campaign
          </h3>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="34, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="21, 100" strokeDashoffset="-34" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="15, 100" strokeDashoffset="-55" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="13, 100" strokeDashoffset="-70" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="10, 100" strokeDashoffset="-83" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-extrabold text-slate-900 leading-none">124</span>
                <span className="text-[10px] text-slate-400">Total Sales</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> New Customer</span>
              <span className="font-semibold text-slate-900">42 (34%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Re-engagement</span>
              <span className="font-semibold text-slate-900">26 (21%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#EF9612]" /> Product Demo</span>
              <span className="font-semibold text-slate-900">18 (15%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#871CF4]" /> Payment Follow-up</span>
              <span className="font-semibold text-slate-900">16 (13%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#E73647]" /> Feedback & Survey</span>
              <span className="font-semibold text-slate-900">12 (10%)</span>
            </div>
          </div>
        </div>

        {/* Revenue by Product/Service Donut */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>📦</span> Revenue by Product/Service
          </h3>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="39, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="23, 100" strokeDashoffset="-39" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="17, 100" strokeDashoffset="-62" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#871CF4" strokeWidth="4.5" strokeDasharray="11, 100" strokeDashoffset="-79" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="7, 100" strokeDashoffset="-90" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-extrabold text-slate-900 leading-none">₹4,28,000</span>
                <span className="text-[9px] text-slate-400">Total Revenue</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> AI Call Center</span>
              <span className="font-semibold text-slate-900">₹1,65,000 (39%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> CRM Setup</span>
              <span className="font-semibold text-slate-900">₹98,000 (23%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#EF9612]" /> Integration Services</span>
              <span className="font-semibold text-slate-900">₹72,000 (17%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#871CF4]" /> Training & Support</span>
              <span className="font-semibold text-slate-900">₹48,000 (11%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#E73647]" /> Custom Dev</span>
              <span className="font-semibold text-slate-900">₹32,000 (7%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Top Agents + Revenue by Month + Payment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Top Agents by Revenue (6 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Top Performing Agents by Revenue</h3>
            <a href="#/reports/agents" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2 w-6">#</th>
                  <th className="py-2">Agent Name</th>
                  <th className="py-2">Total Sales</th>
                  <th className="py-2">Conversion</th>
                  <th className="py-2">Revenue</th>
                  <th className="py-2">Avg. Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { id: 1, name: 'Aakash Sharma', sales: 32, conv: '22%', rev: '₹1,28,000', avg: '₹4,000', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
                  { id: 2, name: 'Yashika Kanwar', sales: 28, conv: '20%', rev: '₹98,000', avg: '₹3,500', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
                  { id: 3, name: 'Rohan Mehta', sales: 24, conv: '18%', rev: '₹72,000', avg: '₹3,000', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
                  { id: 4, name: 'Priya Singh', sales: 18, conv: '16%', rev: '₹48,000', avg: '₹2,800', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' },
                  { id: 5, name: 'Neha Verma', sales: 14, conv: '14%', rev: '₹32,000', avg: '₹2,200', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop' },
                ].map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="py-2 text-slate-400 font-mono text-[11px]">{a.id}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-1.5">
                        <img src={a.avatar} alt={a.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-semibold text-slate-900">{a.name}</span>
                      </div>
                    </td>
                    <td className="py-2">{a.sales}</td>
                    <td className="py-2 font-bold text-slate-900">{a.conv}</td>
                    <td className="py-2 font-semibold text-[#13AB4A]">{a.rev}</td>
                    <td className="py-2">{a.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue by Month (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Revenue by Month</h3>
            <a href="#/reports/sales" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
          </div>
          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { month: 'May', rev: '₹1.2L', h: 30 },
              { month: 'Jun', rev: '₹1.8L', h: 42 },
              { month: 'Jul', rev: '₹2.4L', h: 56 },
              { month: 'Aug', rev: '₹3.1L', h: 72 },
              { month: 'Sep', rev: '₹3.6L', h: 84 },
              { month: 'Oct', rev: '₹4.3L', h: 100 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-700">{col.rev}</span>
                <div className="w-full bg-[#0362FA] rounded-t-md transition-all" style={{ height: `${col.h}%` }} />
                <span className="text-[10px] text-slate-500 mt-1">{col.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Status Donut (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Payment Status</h3>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="76, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#EF9612" strokeWidth="4.5" strokeDasharray="16, 100" strokeDashoffset="-76" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="6, 100" strokeDashoffset="-92" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#94A3B8" strokeWidth="4.5" strokeDasharray="2, 100" strokeDashoffset="-98" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-extrabold text-slate-900 leading-none">₹4,28,000</span>
                <span className="text-[9px] text-slate-400">Total Revenue</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Paid</span>
              <span className="font-semibold text-slate-900">₹3,24,000 (76%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#EF9612]" /> Pending</span>
              <span className="font-semibold text-slate-900">₹68,000 (16%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#E73647]" /> Failed</span>
              <span className="font-semibold text-slate-900">₹24,000 (6%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-slate-400" /> Refunded</span>
              <span className="font-semibold text-slate-900">₹12,000 (2%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Sales Funnel + Revenue by Campaign Detailed + Recent Sales Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Sales Funnel (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>🔻</span> Sales Funnel
          </h3>
          <div className="space-y-1 text-xs">
            {[
              { label: 'Total Leads', count: '12,846', pct: '100%', color: 'bg-sky-500', w: 'w-full' },
              { label: 'Contacted', count: '8,606', pct: '67%', color: 'bg-emerald-500', w: 'w-[85%]' },
              { label: 'Interested', count: '4,110', pct: '32%', color: 'bg-amber-500', w: 'w-[70%]' },
              { label: 'Proposal', count: '2,954', pct: '23%', color: 'bg-orange-500', w: 'w-[55%]' },
              { label: 'Negotiation', count: '1,670', pct: '13%', color: 'bg-rose-500', w: 'w-[40%]' },
              { label: 'Closed (Sales)', count: '1,284', pct: '10%', color: 'bg-blue-600', w: 'w-[28%]' },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`${f.color} ${f.w} py-1.5 rounded text-white text-center font-bold text-[11px] shadow-xs`}>
                  {f.label} ({f.pct})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Campaign Detailed (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Revenue by Campaign (Detailed)</h3>
            <a href="#/reports/campaigns" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2 w-6">#</th>
                  <th className="py-2">Campaign Name</th>
                  <th className="py-2">Total Sales</th>
                  <th className="py-2">Revenue</th>
                  <th className="py-2">ROI</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {[
                  { id: 1, name: 'New Customer Outreach', sales: 42, rev: '₹1,65,000', roi: '328%', status: 'Active' },
                  { id: 2, name: 'Re-engagement Campaign', sales: 26, rev: '₹98,000', roi: '258%', status: 'Active' },
                  { id: 3, name: 'Product Demo Calls', sales: 18, rev: '₹72,000', roi: '229%', status: 'Active' },
                  { id: 4, name: 'Payment Follow-up', sales: 16, rev: '₹48,000', roi: '272%', status: 'Active' },
                  { id: 5, name: 'Feedback & Survey', sales: 12, rev: '₹32,000', roi: '220%', status: 'Completed' },
                  { id: 6, name: 'Upsell Campaign', sales: 10, rev: '₹13,000', roi: '180%', status: 'Active' },
                ].map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="py-2 text-slate-400 font-mono text-[11px]">{c.id}</td>
                    <td className="py-2 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-2">{c.sales}</td>
                    <td className="py-2 font-semibold text-slate-900">{c.rev}</td>
                    <td className="py-2 text-[#13AB4A] font-bold">{c.roi}</td>
                    <td className="py-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E9F9EE] text-[#13AB4A]">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Sales Activity (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Sales Activity</h3>
            <a href="#/activity-logs" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { time: '21 Oct 04:32 PM', customer: 'Rajesh Kumar', camp: 'New Customer', amt: '₹12,000', status: 'Paid' },
              { time: '21 Oct 04:28 PM', customer: 'Priya Sharma', camp: 'Re-engagement', amt: '₹8,000', status: 'Pending' },
              { time: '21 Oct 04:15 PM', customer: 'Amit Verma', camp: 'Product Demo', amt: '₹6,000', status: 'Paid' },
              { time: '21 Oct 04:10 PM', customer: 'Neha Singh', camp: 'Payment Follow-up', amt: '₹4,000', status: 'Paid' },
              { time: '21 Oct 03:58 PM', customer: 'Vikram Mehta', camp: 'Feedback & Survey', amt: '₹3,500', status: 'Pending' },
              { time: '21 Oct 03:45 PM', customer: 'Sunita Devi', camp: 'Upsell Campaign', amt: '₹2,500', status: 'Failed' },
            ].map((row, idx) => (
              <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{row.customer}</div>
                  <div className="text-[10px] text-slate-400">{row.camp} • {row.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{row.amt}</div>
                  <span className={`text-[10px] font-semibold ${
                    row.status === 'Paid' ? 'text-[#13AB4A]' : row.status === 'Pending' ? 'text-[#EF9612]' : 'text-[#E73647]'
                  }`}>
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
