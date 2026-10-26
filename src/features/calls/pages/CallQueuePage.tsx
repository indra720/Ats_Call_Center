import React, { useState } from 'react';
import {
  Radio,
  Users,
  Clock,
  Phone,
  PhoneForwarded,
  Plus,
  Play,
  Pause,
  Sliders,
  MoreVertical,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useUIStore } from '@/store/uiStore';
import { toast } from '@/store/toastStore';

export const CallQueuePage: React.FC = () => {
  const startCall = useUIStore((state) => state.startCall);

  const waitingCallers = [
    {
      id: 'w1',
      callerName: 'Rajesh Mittal',
      phoneNumber: '+91 98101 22334',
      queue: 'Inbound Sales General',
      waitDuration: '02:14',
      priority: 'High',
      assignedStrategy: 'Round Robin',
    },
    {
      id: 'w2',
      callerName: 'Sunita Menon',
      phoneNumber: '+91 98202 33445',
      queue: 'Technical Support Tier 1',
      waitDuration: '01:48',
      priority: 'Normal',
      assignedStrategy: 'Skills-Based',
    },
    {
      id: 'w3',
      callerName: 'Arun Chopra',
      phoneNumber: '+91 98303 44556',
      queue: 'Enterprise VIP Priority',
      waitDuration: '00:35',
      priority: 'Critical VIP',
      assignedStrategy: 'Direct Agent',
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Live Call Queue & Routing
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Monitor real-time waiting callers, queue SLAs, and dispatch rules.
          </p>
        </div>

        <button
          onClick={() =>
            toast.info(
              'New Inbound Queue',
              'ACD ring group and maximum wait SLA wizard initialized.'
            )
          }
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Call Queue</span>
        </button>
      </div>

      {/* 2. Queue Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Callers in Queue"
          value={waitingCallers.length.toString()}
          change="Real-time"
          changeType="neutral"
          timeframe="waiting callers"
          icon={<Radio className="w-4 h-4 text-[#10B981] animate-pulse" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Avg Queue Wait"
          value="48 sec"
          change="-12s"
          changeType="positive"
          timeframe="SLA within 60s"
          icon={<Clock className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Active Queues"
          value="4 Queues"
          change="100% Up"
          changeType="positive"
          timeframe="all active"
          icon={<Sliders className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
        <StatCard
          title="Queue Abandonment"
          value="1.8%"
          change="Very Low"
          changeType="positive"
          timeframe="industry benchmark 5%"
          icon={<PhoneForwarded className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* 3. Live Waiting Calls Table */}
      <div className="bg-white rounded-2xl border border-[#E5EBF2] shadow-card overflow-hidden">
        <div className="p-3.5 border-b border-[#E5EBF2] flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            Live Waiting Callers
          </h3>
          <span className="text-[11px] text-slate-400">Updates dynamically every 2 seconds</span>
        </div>

        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left text-xs min-w-[750px]">
            <thead className="bg-[#F8FAFD] text-[#64748B] uppercase text-[10px] font-bold border-b border-[#E5EBF2]">
              <tr>
                <th className="px-3 py-2.5">Caller Name</th>
                <th className="px-3 py-2.5">Phone Number</th>
                <th className="px-3 py-2.5">Queue Name</th>
                <th className="px-3 py-2.5">Wait Time</th>
                <th className="px-3 py-2.5">Priority</th>
                <th className="px-3 py-2.5">Routing Strategy</th>
                <th className="px-3 py-2.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {waitingCallers.map((w) => (
                <tr key={w.id} className="hover:bg-[#F8FAFD] transition-colors">
                  <td className="px-3 py-2.5 font-bold text-[#0F172A]">{w.callerName}</td>
                  <td className="px-3 py-2.5 font-mono text-[11px] text-slate-700">{w.phoneNumber}</td>
                  <td className="px-3 py-2.5 font-medium text-slate-800">{w.queue}</td>
                  <td className="px-3 py-2.5 font-extrabold text-[#E73647] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {w.waitDuration}
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        w.priority.includes('VIP')
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : w.priority === 'High'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {w.priority}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-slate-600">{w.assignedStrategy}</td>
                  <td className="px-3 py-2.5 text-center">
                    <button
                      onClick={() =>
                        startCall({
                          contactName: w.callerName,
                          phoneNumber: w.phoneNumber,
                          callType: 'inbound',
                        })
                      }
                      className="px-3 py-1 bg-[#10B981] hover:bg-[#059669] text-white text-[11px] font-bold rounded-lg shadow-sm"
                    >
                      Pickup Call
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
