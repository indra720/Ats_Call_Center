import React, { useState } from 'react';
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  Users,
  Radio,
  Play,
  RotateCcw,
  Headphones,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useUIStore } from '@/store/uiStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const CallDashboardPage: React.FC = () => {
  const startCall = useUIStore((state) => state.startCall);

  const hourlyCallsData = [
    { hour: '9 AM', inbound: 45, outbound: 70 },
    { hour: '10 AM', inbound: 68, outbound: 110 },
    { hour: '11 AM', inbound: 92, outbound: 135 },
    { hour: '12 PM', inbound: 55, outbound: 85 },
    { hour: '1 PM', inbound: 40, outbound: 60 },
    { hour: '2 PM', inbound: 75, outbound: 115 },
    { hour: '3 PM', inbound: 105, outbound: 140 },
    { hour: '4 PM', inbound: 88, outbound: 120 },
    { hour: '5 PM', inbound: 65, outbound: 90 },
    { hour: '6 PM', inbound: 45, outbound: 55 },
  ];

  const activeQueues = [
    { name: 'Inbound Sales General', waitingCalls: 4, longestWait: '01:45', agentsAvailable: 6, status: 'Normal' },
    { name: 'Enterprise VIP Priority', waitingCalls: 1, longestWait: '00:20', agentsAvailable: 3, status: 'Optimal' },
    { name: 'Technical Support Tier 1', waitingCalls: 7, longestWait: '03:15', agentsAvailable: 4, status: 'Busy' },
    { name: 'Billing & Invoicing Support', waitingCalls: 2, longestWait: '00:55', agentsAvailable: 2, status: 'Optimal' },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Call Center Operations Dashboard
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time telephony telemetry, active queue status, and agent capacity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              startCall({
                contactName: 'Rohit Sharma',
                phoneNumber: '+91 98765 43210',
                companyName: 'Tech Solutions',
              })
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-lg shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Launch Softphone</span>
          </button>
        </div>
      </div>

      {/* 2. Telemetry Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Total Calls Today"
          value="1,284"
          change="12.4%"
          changeType="positive"
          timeframe="vs yesterday"
          icon={<Phone className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Inbound Answered"
          value="542"
          change="94.2%"
          changeType="positive"
          timeframe="answer rate"
          icon={<PhoneIncoming className="w-4 h-4" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Avg Talk Duration"
          value="3m 42s"
          change="-18s"
          changeType="positive"
          timeframe="handling efficiency"
          icon={<Clock className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
        <StatCard
          title="Agents on Call"
          value="18 / 24"
          change="75% Load"
          changeType="neutral"
          timeframe="concurrency rate"
          icon={<Headphones className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* 3. Call Volume Chart + Active Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Hourly Volume Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-4 border border-[#E5EBF2] shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Inbound vs Outbound Concurrency</h3>
              <p className="text-[11px] text-slate-400">Hourly call distributions across all active campaigns</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <span className="w-2.5 h-2.5 rounded bg-[#10B981]" /> Inbound
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <span className="w-2.5 h-2.5 rounded bg-[#0362FA]" /> Outbound
              </span>
            </div>
          </div>

          <div className="h-[220px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyCallsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#8A99AD' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#8A99AD' }} />
                <Tooltip contentStyle={{ backgroundColor: '#02142B', color: '#fff', borderRadius: '8px', fontSize: '11px', border: 'none' }} />
                <Bar dataKey="inbound" fill="#10B981" radius={[3, 3, 0, 0]} barSize={10} />
                <Bar dataKey="outbound" fill="#0362FA" radius={[3, 3, 0, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Queues Status */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-[#E5EBF2] shadow-card space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
                Live Inbound Queues
              </h3>
              <a href="/calls/queue" className="text-xs font-bold text-[#0362FA] hover:underline">
                Manage Queues
              </a>
            </div>

            <div className="space-y-2.5 mt-3">
              {activeQueues.map((q, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#F8FAFD] border border-[#E5EBF2] flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{q.name}</h5>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {q.agentsAvailable} Agents Free • Max Wait: {q.longestWait}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-[#0362FA] block">
                      {q.waitingCalls} Waiting
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                        q.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : q.status === 'Busy' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
