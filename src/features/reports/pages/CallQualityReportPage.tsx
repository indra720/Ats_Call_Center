import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Smile,
  Frown,
  Play,
  Pause,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  CheckCheck,
  Eye,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const CallQualityReportPage: React.FC = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const topAgents = [
    { id: 1, name: 'Aakash Sharma', team: 'Sales Team', calls: '1,482', score: '9.2/10', pos: '86%', neg: '4%', status: 'Excellent', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
    { id: 2, name: 'Yashika Kanwar', team: 'Support Team', calls: '1,326', score: '8.8/10', pos: '78%', neg: '6%', status: 'Good', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
    { id: 3, name: 'Rohan Mehta', team: 'Lead Gen', calls: '1,148', score: '8.4/10', pos: '72%', neg: '8%', status: 'Good', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
    { id: 4, name: 'Priya Singh', team: 'Follow-up Team', calls: '986', score: '7.6/10', pos: '68%', neg: '10%', status: 'Average', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' },
    { id: 5, name: 'Neha Verma', team: 'Retention Team', calls: '842', score: '7.4/10', pos: '64%', neg: '12%', status: 'Needs Improvement', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop' },
  ];

  const parameters = [
    { id: 1, name: 'Greeting & Introduction', target: '90%', actual: '86%', status: 'Good' },
    { id: 2, name: 'Script Adherence', target: '90%', actual: '82%', status: 'Good' },
    { id: 3, name: 'Product Knowledge', target: '90%', actual: '78%', status: 'Average' },
    { id: 4, name: 'Customer Handling', target: '90%', actual: '84%', status: 'Good' },
    { id: 5, name: 'Call Closure', target: '90%', actual: '76%', status: 'Average' },
    { id: 6, name: 'Compliance & Disclaimers', target: '90%', actual: '92%', status: 'Excellent' },
  ];

  const recentReviews = [
    { id: 1, dt: '21 Oct 04:32 PM', customer: 'Rajesh Kumar', agent: 'Aakash Sharma', dur: '05:24', score: '9.4/10', sent: 'Positive' },
    { id: 2, dt: '21 Oct 03:18 PM', customer: 'Priya Sharma', agent: 'Yashika Kanwar', dur: '04:12', score: '8.6/10', sent: 'Positive' },
    { id: 3, dt: '21 Oct 02:45 PM', customer: 'Amit Verma', agent: 'Rohan Mehta', dur: '06:38', score: '7.8/10', sent: 'Neutral' },
    { id: 4, dt: '21 Oct 01:22 PM', customer: 'Neha Singh', agent: 'Priya Singh', dur: '03:56', score: '6.4/10', sent: 'Negative' },
    { id: 5, dt: '21 Oct 12:10 PM', customer: 'Vikram Mehta', agent: 'Neha Verma', dur: '05:18', score: '8.2/10', sent: 'Positive' },
  ];

  const togglePlay = (id: number) => {
    if (playingId === id) {
      setPlayingId(null);
      toast.info('Audio Paused', 'Call playback paused.');
    } else {
      setPlayingId(id);
      toast.success('Playing Recording', `Listening to review session #${id}`);
    }
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
            <span className="text-slate-800 font-semibold">Call Quality & Monitoring</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Call Quality & Monitoring Report</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor call quality, agent performance, compliance, and customer sentiment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Oct 2026 - 21 Oct 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button
            onClick={() => toast.success('Report Exported', 'Call Quality report downloaded in PDF format.')}
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
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Monitored</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">6,842</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">22% vs last period</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <Phone className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Quality Score</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">8.4/10</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">12% target</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Reviewed</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">2,486</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">18% coverage</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Issues Flagged</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">186</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#EF9612] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">8% escalated</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Positive CSAT</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">72%</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">14% customer cheer</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <Smile className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Negative CSAT</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">6%</div>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">-18% reduction</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <Frown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Row 2: Call Quality Trend + Sentiment Donut + Quality by Call Type */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Trend (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Quality Trend</h3>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> Score</span>
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Positive %</span>
              <span className="flex items-center gap-1 text-slate-600"><span className="w-2 h-2 rounded-full bg-[#E73647]" /> Negative %</span>
            </div>
          </div>
          <div className="relative h-44 w-full pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none">
              <line x1="0" y1="30" x2="400" y2="30" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="#F1F5F9" strokeWidth="1" />
              <polyline fill="none" stroke="#0362FA" strokeWidth="2" points="10,60 60,55 120,45 180,50 240,40 300,35 360,40" />
              <polyline fill="none" stroke="#13AB4A" strokeWidth="2" points="10,85 60,80 120,70 180,75 240,65 300,60 360,70" />
              <polyline fill="none" stroke="#E73647" strokeWidth="2" points="10,135 60,130 120,132 180,128 240,130 300,135 360,132" />
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

        {/* Sentiment Donut (3.5 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Sentiment Analysis</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path stroke="#13AB4A" strokeWidth="4.5" strokeDasharray="72, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#0362FA" strokeWidth="4.5" strokeDasharray="22, 100" strokeDashoffset="-72" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path stroke="#E73647" strokeWidth="4.5" strokeDasharray="6, 100" strokeDashoffset="-94" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 leading-none">6,842</span>
              </div>
            </div>
            <div className="space-y-1 text-[10px] flex-1">
              <div className="flex justify-between"><span className="text-slate-600">Positive</span><span className="font-bold">4,924 (72%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Neutral</span><span className="font-bold">1,498 (22%)</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Negative</span><span className="font-bold">420 (6%)</span></div>
            </div>
          </div>
        </div>

        {/* Quality by Type (3.5 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Quality by Call Type</h3>
          <div className="h-44 flex items-end justify-between gap-2 pt-4 px-1">
            {[
              { type: 'Outbound', score: '8.6', h: 86, issues: 12 },
              { type: 'Inbound', score: '8.2', h: 82, issues: 28 },
              { type: 'Follow-up', score: '7.8', h: 78, issues: 42 },
              { type: 'Demo', score: '8.4', h: 84, issues: 18 },
              { type: 'Support', score: '8.0', h: 80, issues: 86 },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[8px] font-bold text-[#0362FA]">{col.score}</span>
                <div className="w-full bg-[#0362FA] rounded-t" style={{ height: `${col.h}%` }} />
                <span className="text-[8px] text-slate-500 truncate w-full text-center mt-1">{col.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Top Agents by Call Quality + Call Quality Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Top Agents (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Top Agents by Call Quality</h3>
            <button onClick={() => toast.info('Agent Leaderboard', 'Opening full QA agent roster.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Agent Name</th>
                  <th className="py-2.5 px-2">Team</th>
                  <th className="py-2.5 px-2">Calls</th>
                  <th className="py-2.5 px-2">Quality Score</th>
                  <th className="py-2.5 px-2">Positive</th>
                  <th className="py-2.5 px-2">Negative</th>
                  <th className="py-2.5 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {topAgents.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{a.id}</td>
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-1.5">
                        <img src={a.avatar} alt={a.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-semibold text-slate-900">{a.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600">{a.team}</td>
                    <td className="py-2.5 px-2 text-slate-600">{a.calls}</td>
                    <td className="py-2.5 px-2 font-bold text-[#0362FA]">{a.score}</td>
                    <td className="py-2.5 px-2 text-[#13AB4A] font-semibold">{a.pos}</td>
                    <td className="py-2.5 px-2 text-[#E73647] font-semibold">{a.neg}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        a.status === 'Excellent' || a.status === 'Good'
                          ? 'bg-[#E9F9EE] text-[#13AB4A]'
                          : a.status === 'Average'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quality Parameters (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Quality Parameters</h3>
            <button onClick={() => toast.info('QA Parameters', 'Opening QA scorecard metrics.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Parameter</th>
                  <th className="py-2.5 px-2">Target</th>
                  <th className="py-2.5 px-2">Actual</th>
                  <th className="py-2.5 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {parameters.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{p.id}</td>
                    <td className="py-2.5 px-2 font-medium text-slate-900">{p.name}</td>
                    <td className="py-2.5 px-2 text-slate-500">{p.target}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-900">{p.actual}</td>
                    <td className="py-2.5 px-2 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        p.status === 'Excellent' || p.status === 'Good'
                          ? 'bg-[#E9F9EE] text-[#13AB4A]'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 4: Recent Call Recordings & Reviews Table + Common Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Recent Recordings (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Call Recordings & Reviews</h3>
            <button onClick={() => toast.info('QA Archive', 'Opening full QA evaluation logs.')} className="text-[11px] font-semibold text-[#0362FA] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                  <th className="py-2.5 px-2 w-6">#</th>
                  <th className="py-2.5 px-2">Date & Time</th>
                  <th className="py-2.5 px-2">Customer</th>
                  <th className="py-2.5 px-2">Agent</th>
                  <th className="py-2.5 px-2">Duration</th>
                  <th className="py-2.5 px-2">Score</th>
                  <th className="py-2.5 px-2">Sentiment</th>
                  <th className="py-2.5 px-2 text-center">Audio</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {recentReviews.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{r.id}</td>
                    <td className="py-2.5 px-2 font-medium text-slate-700">{r.dt}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">{r.customer}</td>
                    <td className="py-2.5 px-2 text-slate-700">{r.agent}</td>
                    <td className="py-2.5 px-2 font-mono text-slate-600">{r.dur}</td>
                    <td className="py-2.5 px-2 font-bold text-[#0362FA]">{r.score}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.sent === 'Positive'
                          ? 'bg-emerald-100 text-emerald-800'
                          : r.sent === 'Neutral'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {r.sent}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => togglePlay(r.id)}
                        className={`p-1 rounded-full transition-colors ${
                          playingId === r.id ? 'bg-blue-600 text-white animate-pulse' : 'bg-blue-50 text-[#0362FA] hover:bg-blue-100'
                        }`}
                      >
                        {playingId === r.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </button>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => toast.info('Scorecard Audit', `Viewing QA scorecard for review #${r.id}`)}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold hover:bg-slate-200"
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

        {/* Common Call Issues (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Common Call Issues</h3>
          <div className="space-y-2 text-xs">
            {[
              { issue: 'Script Not Followed', count: 64, pct: 34 },
              { issue: 'Incomplete Information', count: 42, pct: 23 },
              { issue: 'Poor Call Etiquette', count: 28, pct: 15 },
              { issue: 'No Proper Closing', count: 18, pct: 10 },
              { issue: 'Irrelevant Conversation', count: 16, pct: 9 },
              { issue: 'Compliance Missing', count: 12, pct: 6 },
              { issue: 'Background Noise', count: 10, pct: 5 },
            ].map((iss, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-800">{iss.issue}</span>
                  <span className="font-mono text-slate-500">{iss.count} ({iss.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${iss.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
