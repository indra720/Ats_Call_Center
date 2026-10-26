import React, { useState } from 'react';
import {
  Workflow,
  Zap,
  Play,
  Pause,
  Plus,
  ArrowRight,
  PhoneCall,
  MessageSquare,
  Mail,
  CheckCircle2,
  Clock,
  Settings,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

export const AutomationWorkflowsPage: React.FC = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 'w1',
      name: 'Missed Call Instant WhatsApp Recovery',
      trigger: 'Missed Call on any DID',
      action: 'Send WhatsApp apology template + Create priority callback task',
      executions: '1,420 runs',
      successRate: '99.2%',
      status: 'Active',
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'w2',
      name: 'Website Form Lead Instant Dialer Push',
      trigger: 'New lead webhook ingested',
      action: 'Assign to free agent via Round-Robin and initiate progressive call within 60s',
      executions: '3,240 runs',
      successRate: '97.8%',
      status: 'Active',
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'w3',
      name: 'Deal Won Billing & Invoicing Dispatch',
      trigger: 'Pipeline stage moved to Won',
      action: 'Generate GST-compliant tax invoice & email customer onboarding kit',
      executions: '890 runs',
      successRate: '100%',
      status: 'Active',
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'w4',
      name: 'Stalled Lead Re-engagement Drip',
      trigger: 'No contact for 7 consecutive days',
      action: 'Trigger 3-step WhatsApp follow-up sequence with promotional offer',
      executions: '680 runs',
      successRate: '94.5%',
      status: 'Paused',
      iconBg: 'bg-amber-50 text-amber-600',
    },
  ]);

  const toggleStatus = (id: string) => {
    setWorkflows(
      workflows.map((w) =>
        w.id === id ? { ...w, status: w.status === 'Active' ? 'Paused' : 'Active' } : w
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Automation & Workflows
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Configure automated event triggers, webhook dispatches and omni-channel drip campaigns.
          </p>
        </div>

        <button
          onClick={() =>
            toast.info(
              'Visual Workflow Studio',
              'Canvas initialized. Drag event nodes to construct custom automations.'
            )
          }
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Workflow</span>
        </button>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Active Workflows"
          value="3 Live"
          change="Automated"
          changeType="positive"
          timeframe="running in background"
          icon={<Zap className="w-4 h-4 text-[#10B981]" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Triggers Fired (30d)"
          value="6,230"
          change="+24.2%"
          changeType="positive"
          timeframe="total automated actions"
          icon={<Workflow className="w-4 h-4 text-[#0362FA]" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Automation Success"
          value="98.8%"
          change="High SLA"
          changeType="positive"
          timeframe="execution reliability"
          icon={<CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Hours Saved (Est.)"
          value="340 hrs"
          change="~2 Full Reps"
          changeType="positive"
          timeframe="manual work automated"
          icon={<Clock className="w-4 h-4 text-[#871CF4]" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* 3. Workflows List */}
      <div className="space-y-3">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="bg-white rounded-2xl border border-[#E5EBF2] p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', wf.iconBg)}>
                <Zap className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{wf.name}</h4>
                  <span
                    className={cn(
                      'text-[9px] font-bold px-2 py-0.5 rounded-full',
                      wf.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                    )}
                  >
                    {wf.status}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 text-xs text-slate-600">
                  <span className="font-semibold text-[#0362FA]">When: {wf.trigger}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
                  <span className="text-slate-700">Then: {wf.action}</span>
                </div>

                <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1">
                  <span>{wf.executions} executed</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">{wf.successRate} success rate</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                onClick={() => toggleStatus(wf.id)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5',
                  wf.status === 'Active'
                    ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                )}
              >
                {wf.status === 'Active' ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Enable</span>
                  </>
                )}
              </button>

              <button
                onClick={() =>
                  toast.info(`Workflow Settings: ${wf.name}`, 'Webhooks, conditions and rate limits updated.')
                }
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                title="Configure"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
