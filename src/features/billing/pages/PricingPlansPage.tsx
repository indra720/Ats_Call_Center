import React, { useState } from 'react';
import {
  Crown,
  Check,
  Zap,
  Shield,
  HelpCircle,
  Phone,
  MessageSquare,
  Users,
  Database,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronDown,
  X,
  CreditCard,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  isCurrent?: boolean;
  features: string[];
  limits: {
    seats: string;
    minutes: string;
    phoneNumbers: string;
    recordingStorage: string;
    aiSentiment: boolean;
  };
}

const PLANS: PlanTier[] = [
  {
    id: 'starter',
    name: 'Starter AI Calling',
    monthlyPrice: 7999,
    annualPrice: 6399,
    description: 'Perfect for fast-growing sales teams starting with cloud telephony.',
    isCurrent: false,
    features: [
      'Up to 10 Agent Seats included',
      '20,000 Outbound/Inbound Mins/month',
      'Single IVR virtual number (011 / 080 / 022)',
      'Basic Call Recording (30-day retention)',
      'WhatsApp Business & SMS notifications',
      'Lead pipeline tracking & CRM sync',
      'Standard business hours email support',
    ],
    limits: {
      seats: '10 Agents',
      minutes: '20,000 Mins',
      phoneNumbers: '1 DID Number',
      recordingStorage: '30 Days',
      aiSentiment: false,
    },
  },
  {
    id: 'professional',
    name: 'Professional CRM & AI',
    badge: 'Most Popular',
    monthlyPrice: 19999,
    annualPrice: 15999,
    description: 'Advanced real-time AI transcription, automated multi-level IVR, and omnichannel routing.',
    isCurrent: false,
    features: [
      'Up to 25 Agent Seats included',
      '60,000 Outbound/Inbound Mins/month',
      '3 Dedicated virtual phone numbers + 1 Toll-free (1800)',
      'Unlimited Call Recording (1-year cloud retention)',
      'Real-time Speech-to-Text & AI Call Summaries',
      'Custom IVR trees & Skill-based queue routing',
      'Full REST API & Outbound Webhooks',
      'Priority 24/7 WhatsApp & Ticket support',
    ],
    limits: {
      seats: '25 Agents',
      minutes: '60,000 Mins',
      phoneNumbers: '4 Numbers (1 Toll-free)',
      recordingStorage: '1 Year',
      aiSentiment: true,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise AI Suite',
    badge: 'Current Plan',
    monthlyPrice: 39999,
    annualPrice: 31999,
    description: 'Dedicated cloud SIP trunks, custom AI agent voice cloning, unlimited scale & SLA.',
    isCurrent: true,
    features: [
      '40+ Agent Seats (Unlimited expandable)',
      '1,20,000 Outbound/Inbound Mins/month',
      '10 Dedicated DID numbers + 2 Toll-free (1800)',
      'Perpetual Cloud Storage with S3 backup sync',
      'Live AI sentiment score, Whisper agent coaching',
      'Custom DLT SMS registration assistance',
      'Dedicated Account Manager & 99.99% Uptime SLA',
      'Custom CRM bi-directional integrations (Salesforce/Zoho)',
    ],
    limits: {
      seats: '40+ Agents',
      minutes: '1,20,000 Mins',
      phoneNumbers: '12 Numbers',
      recordingStorage: 'Perpetual (No Expiry)',
      aiSentiment: true,
    },
  },
];

export const PricingPlansPage: React.FC = () => {
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [upgradeModalPlan, setUpgradeModalPlan] = useState<PlanTier | null>(null);

  const handleSelectPlan = (plan: PlanTier) => {
    if (plan.isCurrent) {
      toast.info('Active Plan', `You are currently subscribed to ${plan.name}`);
      return;
    }
    setUpgradeModalPlan(plan);
  };

  const confirmPlanChange = () => {
    if (!upgradeModalPlan) return;
    toast.success('Subscription Updated', `Switched to ${upgradeModalPlan.name}. Changes reflect immediately.`);
    setUpgradeModalPlan(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Billing & Plan</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Pricing & Plan Upgrades</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pricing & Plan Upgrades</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Scale calling trunks, agent seats, and AI sentiment capabilities with transparent pricing.
          </p>
        </div>

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
          <button
            onClick={() => setCycle('monthly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              cycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setCycle('yearly')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              cycle === 'yearly' ? 'bg-[#0362FA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Annual Billing</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase ${
                cycle === 'yearly' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Current Subscription</span>
            <div className="text-lg font-bold text-slate-900 mt-1 truncate">Enterprise AI Suite</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Renews 01 Nov 2026</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Crown className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Active Agent Seats</span>
            <div className="text-xl font-bold text-slate-900 mt-1">24 / 40 Used</div>
            <div className="text-[11px] text-[#0362FA] font-semibold mt-1">16 Seats Available</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Calling Consumption</span>
            <div className="text-xl font-bold text-slate-900 mt-1">74,210 Mins</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">62% of monthly bundle</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">AI Whisper Coaching</span>
            <div className="text-xl font-bold text-slate-900 mt-1">Enabled</div>
            <div className="text-[11px] text-purple-600 font-semibold mt-1">Live sentiment active</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3 Tier Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PLANS.map((plan) => {
          const price = cycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
          return (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all relative ${
                plan.isCurrent
                  ? 'bg-gradient-to-b from-blue-50/40 via-white to-white border-[#0362FA] shadow-md ring-2 ring-[#0362FA]/20'
                  : 'bg-white border-[#E5EBF2] shadow-sm hover:shadow-md'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 right-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs ${
                      plan.isCurrent
                        ? 'bg-[#0362FA] text-white'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>

                <div className="mt-5 pb-5 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">₹{price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {cycle === 'yearly' ? 'Billed annually + GST' : 'Billed monthly + GST'}
                  </div>
                </div>

                {/* Features list */}
                <div className="mt-5 space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    What's included:
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-[#13AB4A] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={plan.isCurrent}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    plan.isCurrent
                      ? 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200'
                      : 'bg-[#0362FA] hover:bg-blue-600 text-white shadow-sm hover:shadow'
                  }`}
                >
                  {plan.isCurrent ? (
                    <span>Currently Active Plan</span>
                  ) : (
                    <>
                      <span>Choose {plan.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix (Anti-Shrink Table) */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E5EBF2] bg-[#FAFCFF]">
          <h3 className="text-sm font-bold text-slate-900">Compare Plan Specifications & Limits</h3>
          <p className="text-xs text-slate-400 mt-0.5">Detailed breakdown of quotas, SLA, and cloud capabilities</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[850px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5EBF2] text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-4">Feature / Capability</th>
                <th className="py-3 px-4 text-center">Starter</th>
                <th className="py-3 px-4 text-center">Professional</th>
                <th className="py-3 px-4 text-center bg-blue-50/50 text-[#0362FA]">Enterprise (Active)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBF2] text-slate-700">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Included Agent Seats</td>
                <td className="py-3 px-4 text-center">10 Seats</td>
                <td className="py-3 px-4 text-center">25 Seats</td>
                <td className="py-3 px-4 text-center font-bold text-[#0362FA] bg-blue-50/20">40+ Seats (Scalable)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Included Telephony Minutes</td>
                <td className="py-3 px-4 text-center font-mono">20,000 Mins</td>
                <td className="py-3 px-4 text-center font-mono">60,000 Mins</td>
                <td className="py-3 px-4 text-center font-mono font-bold text-[#0362FA] bg-blue-50/20">1,20,000 Mins</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Virtual IVR Numbers (DID)</td>
                <td className="py-3 px-4 text-center">1 Number</td>
                <td className="py-3 px-4 text-center">4 Numbers (1 Toll-free)</td>
                <td className="py-3 px-4 text-center font-bold text-[#0362FA] bg-blue-50/20">12 Numbers (2 Toll-free)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Call Recording Retention</td>
                <td className="py-3 px-4 text-center">30 Days</td>
                <td className="py-3 px-4 text-center">365 Days</td>
                <td className="py-3 px-4 text-center font-bold text-[#0362FA] bg-blue-50/20">Perpetual (No Expiry)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Live AI Whisper & Sentiment</td>
                <td className="py-3 px-4 text-center text-slate-400">—</td>
                <td className="py-3 px-4 text-center text-emerald-600 font-bold">Included</td>
                <td className="py-3 px-4 text-center text-emerald-600 font-bold bg-blue-50/20">Included + Custom Fine-tune</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Dedicated Account Manager</td>
                <td className="py-3 px-4 text-center text-slate-400">—</td>
                <td className="py-3 px-4 text-center text-slate-400">—</td>
                <td className="py-3 px-4 text-center text-emerald-600 font-bold bg-blue-50/20">Dedicated POC</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      {upgradeModalPlan && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#0362FA]" />
                <h3 className="font-bold text-slate-900 text-sm">Confirm Subscription Change</h3>
              </div>
              <button
                onClick={() => setUpgradeModalPlan(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-[11px] text-[#0362FA] font-bold uppercase">Selected Plan:</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">{upgradeModalPlan.name}</div>
                <div className="text-slate-600 text-xs mt-1">
                  ₹{(cycle === 'monthly' ? upgradeModalPlan.monthlyPrice : upgradeModalPlan.annualPrice).toLocaleString('en-IN')}{' '}
                  / month + 18% GST
                </div>
              </div>

              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Billing Frequency:</span>
                  <span className="font-semibold text-slate-800 capitalize">{cycle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Charge Method:</span>
                  <span className="font-semibold text-slate-800">Primary Card (•••• 4921)</span>
                </div>
                <div className="flex justify-between">
                  <span>Prorated credit for unused period:</span>
                  <span className="font-semibold text-emerald-600">-₹4,250.00</span>
                </div>
              </div>

              <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-700 text-[11px]">
                Your new limits (seats & VoIP lines) will activate immediately. The next billing statement will reflect prorated adjustments.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setUpgradeModalPlan(null)}
                className="px-3 py-1.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmPlanChange}
                className="px-4 py-1.5 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
