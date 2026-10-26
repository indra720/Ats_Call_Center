import React, { useState } from 'react';
import {
  RotateCcw,
  User,
  Mail,
  Star,
  MessageCircle,
  BarChart2,
  ChevronRight,
  Filter,
  Layers,
  ArrowRightLeft,
  Sparkles,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

export interface PipelineStage {
  label: string;
  count: string | number;
  percentage: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
}

interface LeadPipelineStripProps {
  title?: string;
  subtitle?: string;
  campaignFilter?: boolean;
  totalLeadsLabel?: string;
  stages?: PipelineStage[];
  className?: string;
}

export const LeadPipelineStrip: React.FC<LeadPipelineStripProps> = ({
  title = 'Lead Pipeline',
  subtitle = 'Track your leads across different stages',
  campaignFilter = true,
  totalLeadsLabel,
  stages = [
    {
      label: 'New Leads',
      count: '3,240',
      percentage: '26%',
      color: '#0362FA',
      badgeBg: 'bg-[#EBF3FE]',
      badgeText: 'text-[#0362FA]',
      icon: <RotateCcw className="w-3.5 h-3.5" />,
    },
    {
      label: 'Contacted',
      count: '2,980',
      percentage: '24%',
      color: '#0362FA',
      badgeBg: 'bg-[#EBF3FE]',
      badgeText: 'text-[#0362FA]',
      icon: <User className="w-3.5 h-3.5" />,
    },
    {
      label: 'Qualified',
      count: '2,160',
      percentage: '17%',
      color: '#871CF4',
      badgeBg: 'bg-[#F3E8FF]',
      badgeText: 'text-[#871CF4]',
      icon: <Mail className="w-3.5 h-3.5" />,
    },
    {
      label: 'Proposal',
      count: '1,840',
      percentage: '15%',
      color: '#EF9612',
      badgeBg: 'bg-[#FEF3E6]',
      badgeText: 'text-[#EF9612]',
      icon: <Star className="w-3.5 h-3.5" />,
    },
    {
      label: 'Negotiation',
      count: '1,120',
      percentage: '9%',
      color: '#E73647',
      badgeBg: 'bg-[#FDE8E8]',
      badgeText: 'text-[#E73647]',
      icon: <MessageCircle className="w-3.5 h-3.5" />,
    },
    {
      label: 'Won',
      count: '890',
      percentage: '7%',
      color: '#13AB4A',
      badgeBg: 'bg-[#E6F7EC]',
      badgeText: 'text-[#13AB4A]',
      icon: <BarChart2 className="w-3.5 h-3.5" />,
    },
  ],
  className,
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');

  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCampaign(e.target.value);
    toast.info('Pipeline Filter Applied', `Showing conversion funnel for: ${e.target.value}`);
  };

  return (
    <div
      className={cn(
        'bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-3',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-[14px] font-bold text-[#0F172A] whitespace-nowrap">{title}</h3>
          {totalLeadsLabel && (
            <span className="text-xs font-semibold text-[#0362FA] bg-[#EBF3FE] px-2 py-0.5 rounded-full whitespace-nowrap">
              {totalLeadsLabel}
            </span>
          )}
          {subtitle && (
            <span className="hidden sm:inline text-xs text-[#8A99AD] truncate">— {subtitle}</span>
          )}
        </div>

        {campaignFilter && (
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedCampaign}
              onChange={handleCampaignChange}
              className="text-xs bg-white border border-[#E5EBF2] rounded-lg px-2.5 py-1 text-[#475569] font-medium focus:outline-none cursor-pointer"
            >
              <option value="All Campaigns">All Campaigns</option>
              <option value="Product Demo Q4">Product Demo Q4</option>
              <option value="New Year Inbound">New Year Inbound</option>
              <option value="Enterprise Tier Retargeting">Enterprise Retargeting</option>
            </select>

            <ActionMenu
              align="right"
              items={[
                {
                  label: 'Reorder Pipeline Stages',
                  icon: Layers,
                  onClick: () => toast.info('Pipeline Configuration', 'Stage ordering editor opened.'),
                },
                {
                  label: 'Recalculate Stage Velocity',
                  icon: RotateCcw,
                  onClick: () => toast.success('Velocity Updated', 'Recalculated conversion times across all stages.'),
                },
                {
                  label: 'Predict Stage Win Rates',
                  icon: Sparkles,
                  onClick: () => toast.info('AI Predictions', 'Forecasting 74.2% close probability for Qualified leads.'),
                },
              ]}
            />
          </div>
        )}
      </div>

      {/* 6 Stage Cards - Flexible, never squished or truncated */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none pb-1">
        {stages.map((stg, i) => (
          <div
            key={i}
            className="flex-1 min-w-[130px] bg-[#F8FAFD] border border-[#E5EBF2] rounded-xl p-2.5 flex items-center justify-between gap-1.5 shrink-0 hover:border-[#CBD5E1] transition-colors cursor-pointer"
            onClick={() => toast.info(`Stage: ${stg.label}`, `${stg.count} active leads (${stg.percentage} of pipeline)`)}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                  stg.badgeBg,
                  stg.badgeText
                )}
              >
                {stg.icon}
              </div>

              <div className="min-w-0">
                <span className="text-[11px] font-medium text-[#64748B] block whitespace-nowrap">
                  {stg.label}
                </span>
                <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-extrabold text-[#0F172A]">{stg.count}</span>
                  <span className="text-[10px] font-bold text-[#8A99AD]">{stg.percentage}</span>
                </div>
              </div>
            </div>

            {i < stages.length - 1 && (
              <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1] shrink-0 hidden xl:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
