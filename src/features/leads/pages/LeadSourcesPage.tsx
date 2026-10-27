import React, { useState } from 'react';
import {
  GitFork,
  Globe,
  Share2,
  PhoneCall,
  MessageSquare,
  Users,
  Plus,
  TrendingUp,
  Settings,
  MoreVertical,
  Activity,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { ActionMenu } from '@/components/common/ActionMenu';
import { AddLeadSourceModal } from '@/features/leads/components/AddLeadSourceModal';
import { toast } from '@/store/toastStore';

export const LeadSourcesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sources, setSources] = useState([
    {
      id: '1',
      name: 'Corporate Website Inbound',
      category: 'Inbound Web',
      leadsCount: '3,240',
      conversionRate: '28.5%',
      costPerLead: '₹140',
      roi: '420%',
      iconName: 'Globe',
      bg: 'bg-blue-50 text-blue-600',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Google Ads (Search & Performance Max)',
      category: 'Paid Search',
      leadsCount: '2,480',
      conversionRate: '22.1%',
      costPerLead: '₹380',
      roi: '310%',
      iconName: 'Share2',
      bg: 'bg-emerald-50 text-emerald-600',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Facebook & Instagram Lead Gen',
      category: 'Paid Social',
      leadsCount: '1,960',
      conversionRate: '18.4%',
      costPerLead: '₹220',
      roi: '260%',
      iconName: 'Share2',
      bg: 'bg-purple-50 text-purple-600',
      status: 'Active',
    },
    {
      id: '4',
      name: 'WhatsApp Business API Bot',
      category: 'Messaging Automation',
      leadsCount: '1,520',
      conversionRate: '34.2%',
      costPerLead: '₹60',
      roi: '580%',
      iconName: 'MessageSquare',
      bg: 'bg-emerald-50 text-emerald-600',
      status: 'Active',
    },
    {
      id: '5',
      name: 'Direct Inbound Calling (DID)',
      category: 'Telephony',
      leadsCount: '1,280',
      conversionRate: '41.0%',
      costPerLead: '₹0',
      roi: '750%',
      iconName: 'PhoneCall',
      bg: 'bg-rose-50 text-rose-600',
      status: 'Active',
    },
    {
      id: '6',
      name: 'Client Referrals & Partners',
      category: 'Partner Channel',
      leadsCount: '2,000',
      conversionRate: '38.0%',
      costPerLead: '₹500',
      roi: '620%',
      iconName: 'Users',
      bg: 'bg-amber-50 text-amber-600',
      status: 'Active',
    },
  ]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      default:
        return <Share2 className="w-5 h-5" />;
    }
  };

  const toggleStatus = (id: string, name: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: nextStatus } : s))
    );
    if (nextStatus === 'Active') {
      toast.success('Channel Resumed', `${name} is actively ingesting leads.`);
    } else {
      toast.warning('Channel Paused', `${name} has been paused from auto-ingestion.`);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Lead Sources & Resources
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Screen 007: Ingestion channels, conversion ratios, CPL tracking and automated routing.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Connect New Source</span>
        </button>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Active Channels"
          value={`${sources.filter((s) => s.status === 'Active').length} Connected`}
          change="100% Up"
          changeType="positive"
          timeframe="operational"
          icon={<GitFork className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Top Performing"
          value="WhatsApp API"
          change="34.2%"
          changeType="positive"
          timeframe="highest conversion"
          icon={<MessageSquare className="w-4 h-4" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Avg Cost Per Lead"
          value="₹195"
          change="-12%"
          changeType="positive"
          timeframe="vs last quarter"
          icon={<TrendingUp className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
        <StatCard
          title="Total Ingested Leads"
          value="12,480"
          change="+18.6%"
          changeType="positive"
          timeframe="lifetime volume"
          icon={<Globe className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* 3. Channels Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sources.map((src) => (
          <div
            key={src.id}
            className="bg-white rounded-2xl border border-[#E5EBF2] p-4 shadow-card hover:border-[#CBD5E1] transition-all space-y-3 relative"
          >
            <div className="flex items-start justify-between gap-2 min-w-0">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className={`w-10 h-10 rounded-xl ${src.bg} flex items-center justify-center shrink-0`}>
                  {renderIcon(src.iconName)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 leading-tight truncate" title={src.name}>
                    {src.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 truncate block">{src.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pl-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    src.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : 'bg-amber-50 text-amber-600 border-amber-200'
                  }`}
                >
                  {src.status}
                </span>

                <ActionMenu
                  items={[
                    {
                      label: src.status === 'Active' ? 'Pause Channel' : 'Resume Channel',
                      icon: src.status === 'Active' ? PauseCircle : PlayCircle,
                      onClick: () => toggleStatus(src.id, src.name, src.status),
                    },
                    {
                      label: 'Copy Webhook Endpoint',
                      icon: GitFork,
                      onClick: () => {
                        navigator.clipboard.writeText(
                          `https://api.atscallcenter.in/v1/leads/ingest?source=${src.id}`
                        );
                        toast.info('Webhook URL Copied', 'Endpoint ready for lead payload ingestion.');
                      },
                    },
                    {
                      label: 'Send Test Lead Payload',
                      icon: Sparkles,
                      onClick: () => {
                        toast.success(
                          'Test Payload Ingested',
                          `Simulated lead arrived via ${src.name} and assigned to queue.`
                        );
                      },
                    },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Leads</span>
                <span className="text-xs font-extrabold text-slate-900">{src.leadsCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Conv. Rate</span>
                <span className="text-xs font-extrabold text-[#10B981]">{src.conversionRate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Avg CPL</span>
                <span className="text-xs font-extrabold text-slate-900">{src.costPerLead}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-medium">
                ROI: <strong className="text-[#0362FA]">{src.roi}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  toast.info(
                    `Channel Parameters: ${src.name}`,
                    'Rate limits: 50 req/sec · SSL Enforced · UTM Deduplication Enabled'
                  );
                }}
                className="flex items-center gap-1 text-[11px] font-bold text-[#0362FA] hover:underline cursor-pointer"
              >
                <Settings className="w-3 h-3" />
                <span>Configure</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lead Source Modal Form */}
      <AddLeadSourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSourceCreated={(newSource) => setSources([newSource, ...sources])}
      />
    </div>
  );
};
