import React, { useState } from 'react';
import {
  Radio,
  Play,
  Pause,
  Plus,
  Users,
  PhoneCall,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  MoreVertical,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

export const CampaignsPage: React.FC = () => {
  const [campaignsList, setCampaignsList] = useState([
    {
      id: 'cmp1',
      name: 'Product Demo Q4 Inbound Followup',
      type: 'Predictive Auto-Dialer',
      totalLeads: 2480,
      dialed: 1840,
      connected: 1240,
      connectRate: '67.4%',
      status: 'Running',
      assignedAgents: 8,
      startDate: '12 Oct 2026',
    },
    {
      id: 'cmp2',
      name: 'New Year Inbound High Networth',
      type: 'Progressive Dialer',
      totalLeads: 1200,
      dialed: 980,
      connected: 750,
      connectRate: '76.5%',
      status: 'Running',
      assignedAgents: 6,
      startDate: '15 Oct 2026',
    },
    {
      id: 'cmp3',
      name: 'Enterprise Outbound Cold Calling',
      type: 'Preview Dialer',
      totalLeads: 3500,
      dialed: 1200,
      connected: 680,
      connectRate: '56.6%',
      status: 'Paused',
      assignedAgents: 4,
      startDate: '08 Oct 2026',
    },
    {
      id: 'cmp4',
      name: 'WhatsApp Lead Reactivation Drip',
      type: 'Omni-Channel Blast',
      totalLeads: 5000,
      dialed: 4850,
      connected: 3900,
      connectRate: '80.4%',
      status: 'Completed',
      assignedAgents: 2,
      startDate: '01 Oct 2026',
    },
  ]);

  const toggleCampaignStatus = (id: string) => {
    setCampaignsList(
      campaignsList.map((c) => {
        if (c.id === id) {
          const newStatus = c.status === 'Running' ? 'Paused' : 'Running';
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Campaigns & Auto Dialer
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Predictive, progressive and preview outbound dialer campaign engine.
          </p>
        </div>

        <button
          onClick={() =>
            toast.info(
              'Campaign Wizard Initialized',
              'Choose dialer mode: Predictive AI, Progressive Power, or Preview Autodial.'
            )
          }
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Launch New Campaign</span>
        </button>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Active Campaigns"
          value="2 Running"
          change="Auto-dialing"
          changeType="positive"
          timeframe="predictive pacing"
          icon={<Radio className="w-4 h-4 text-[#10B981] animate-pulse" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Dialer Connect Rate"
          value="71.8%"
          change="+4.2%"
          changeType="positive"
          timeframe="vs target 65%"
          icon={<PhoneCall className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Leads Dialed Today"
          value="2,840"
          change="+18.5%"
          changeType="positive"
          timeframe="outbound calls"
          icon={<Users className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
        <StatCard
          title="Agent Occupancy"
          value="84.6%"
          change="Optimal"
          changeType="positive"
          timeframe="active talk time"
          icon={<Sparkles className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* 3. Campaigns Table */}
      <div className="bg-white rounded-2xl border border-[#E5EBF2] shadow-card overflow-hidden">
        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-[#F8FAFD] text-[#64748B] uppercase text-[10px] font-bold border-b border-[#E5EBF2]">
              <tr>
                <th className="px-3 py-2.5">Campaign Name</th>
                <th className="px-3 py-2.5">Dialer Strategy</th>
                <th className="px-3 py-2.5">Progress</th>
                <th className="px-3 py-2.5">Connected</th>
                <th className="px-3 py-2.5">Connect Rate</th>
                <th className="px-3 py-2.5">Agents</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5 text-center">Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {campaignsList.map((c) => {
                const progressPct = Math.round((c.dialed / c.totalLeads) * 100);
                return (
                  <tr key={c.id} className="hover:bg-[#F8FAFD] transition-colors">
                    <td className="px-3 py-2.5 font-bold text-[#0F172A]">
                      <div>{c.name}</div>
                      <span className="text-[10px] text-slate-400 font-normal">Started: {c.startDate}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {c.type}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-600 font-medium">
                          <span>{c.dialed} / {c.totalLeads}</span>
                          <span>{progressPct}%</span>
                        </div>
                        <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${progressPct}%` }}
                            className="h-full bg-[#0362FA] rounded-full"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-slate-900">{c.connected}</td>
                    <td className="px-3 py-2.5 font-extrabold text-[#10B981]">{c.connectRate}</td>
                    <td className="px-3 py-2.5 text-slate-700">{c.assignedAgents} Reps</td>
                    <td className="px-3 py-2.5">
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-[10px] font-bold',
                          c.status === 'Running' && 'bg-emerald-50 text-emerald-600 border border-emerald-200',
                          c.status === 'Paused' && 'bg-amber-50 text-amber-600 border border-amber-200',
                          c.status === 'Completed' && 'bg-blue-50 text-blue-600 border border-blue-200'
                        )}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <button
                        onClick={() => toggleCampaignStatus(c.id)}
                        className={cn(
                          'px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 mx-auto transition-colors',
                          c.status === 'Running'
                            ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        )}
                      >
                        {c.status === 'Running' ? (
                          <>
                            <Pause className="w-3 h-3" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3" />
                            <span>Resume</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
