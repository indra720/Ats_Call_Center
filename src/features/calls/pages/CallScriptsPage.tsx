import React, { useState } from 'react';
import {
  FileCode2,
  BookOpen,
  Plus,
  Search,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Copy,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { toast } from '@/store/toastStore';

export const CallScriptsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Scripts');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const scripts = [
    {
      id: 's1',
      title: 'Inbound Sales Opening & Discovery',
      category: 'Inbound Sales',
      version: 'v2.4',
      conversionRate: '32.4%',
      opener: 'Hello, this is [Agent Name] with ATS Call Center! Thank you for requesting a demo of our AI Telephony CRM.',
      discoveryQuestions: [
        'How many sales representatives currently make outbound calls daily?',
        'Are you currently using WhatsApp Business automation or manual messaging?',
        'What CRM or database are you looking to integrate with?',
      ],
      closingPitch: 'We can set up a live trial with 5 agent seats and free DID numbers this afternoon.',
    },
    {
      id: 's2',
      title: 'Objection Handler: Price & Budget Concerns',
      category: 'Objection Handling',
      version: 'v3.1',
      conversionRate: '28.0%',
      opener: 'I completely understand budget considerations. Most of our enterprise clients were initially evaluating raw VoIP costs.',
      discoveryQuestions: [
        'If our AI transcription saves 45 minutes per agent per day, what does that save in monthly payroll?',
        'Did you know our annual plan includes unlimited incoming DID lines and free WhatsApp templates?',
      ],
      closingPitch: 'Let me apply our quarterly executive 15% discount for your team today.',
    },
    {
      id: 's3',
      title: 'Outbound Cold Outreach: Real Estate & FinTech',
      category: 'Outbound Cold',
      version: 'v1.8',
      conversionRate: '19.5%',
      opener: 'Hi [Customer Name], this is [Agent Name] from ATS Call Center. The reason for my call is your listing on commercial property portal.',
      discoveryQuestions: [
        'Are you currently facing high missed call rates during peak marketing hours?',
        'Would an automated IVR that distributes leads across your 10 nearest brokers improve conversions?',
      ],
      closingPitch: 'Can I send a 2-minute video walkthrough to your WhatsApp number right now?',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Dynamic Call Scripts & Playbooks
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            AI-assisted talking points, discovery questions, and objection handling scripts for agents.
          </p>
        </div>

        <button
          onClick={() =>
            toast.info(
              'Call Script Studio',
              'Dynamic branching playbook builder initialized.'
            )
          }
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Call Script</span>
        </button>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Active Scripts"
          value="12 Scripts"
          change="Updated"
          changeType="positive"
          timeframe="across all campaigns"
          icon={<FileCode2 className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Script Adherence Rate"
          value="89.4%"
          change="+4.2%"
          changeType="positive"
          timeframe="QA speech analysis"
          icon={<CheckCircle2 className="w-4 h-4" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Avg Call Conversion"
          value="26.8%"
          change="High"
          changeType="positive"
          timeframe="with guided scripts"
          icon={<Sparkles className="w-4 h-4 text-[#871CF4]" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
        <StatCard
          title="Objections Handled"
          value="1,420"
          change="92% Win"
          changeType="positive"
          timeframe="resolved on call"
          icon={<HelpCircle className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
      </div>

      {/* 3. Script Cards List */}
      <div className="space-y-4">
        {scripts.map((sc) => (
          <div
            key={sc.id}
            className="bg-white rounded-2xl border border-[#E5EBF2] p-5 shadow-card space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0362FA] flex items-center justify-center font-bold">
                  <FileCode2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{sc.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                    <span className="font-semibold text-[#0362FA]">{sc.category}</span>
                    <span>•</span>
                    <span>{sc.version}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">{sc.conversionRate} Avg Win</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(sc.id, `${sc.opener}\n\nQuestions:\n${sc.discoveryQuestions.join('\n')}\n\nClosing:\n${sc.closingPitch}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 self-start sm:self-auto"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedId === sc.id ? 'Copied to Clipboard!' : 'Copy Script Text'}</span>
              </button>
            </div>

            {/* Pitch Body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                  1. Opening Pitch (Hook)
                </span>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{sc.opener}"
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                  2. Discovery Questions
                </span>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  {sc.discoveryQuestions.map((q, idx) => (
                    <li key={idx} className="leading-tight">{q}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                  3. Closing Offer (Call to Action)
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  "{sc.closingPitch}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
