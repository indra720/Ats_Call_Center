import React from 'react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  timeframe?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  sparklineColor?: string;
  sparklineHeights?: number[];
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  timeframe = 'vs last month',
  icon,
  iconBgColor = 'bg-[#EBF3FE] text-[#0362FA]',
  sparklineColor = 'bg-[#B0D2FB]',
  sparklineHeights = [35, 55, 40, 85, 70, 95],
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-[12px] p-3.5 sm:p-4 border border-[#E5EBF2] shadow-card flex items-center justify-between gap-2 overflow-hidden transition-all duration-150 relative',
        onClick ? 'cursor-pointer hover:border-[#CBD5E1]' : '',
        'min-w-0 flex-1',
        className
      )}
    >
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 min-w-0">
          {icon && (
            <div
              className={cn(
                'w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 text-sm',
                iconBgColor
              )}
            >
              {icon}
            </div>
          )}
          <span className="text-[11px] sm:text-xs font-semibold text-[#64748B] truncate">
            {title}
          </span>
        </div>

        <div className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight truncate pt-0.5">
          {value}
        </div>

        {(change || timeframe) && (
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] pt-0.5 whitespace-nowrap overflow-hidden">
            {change && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 font-bold shrink-0',
                  changeType === 'positive' && 'text-[#10B981]',
                  changeType === 'negative' && 'text-[#E73647]',
                  changeType === 'neutral' && 'text-[#64748B]'
                )}
              >
                {changeType === 'positive' && <span>↗</span>}
                {changeType === 'negative' && <span>↘</span>}
                {change}
              </span>
            )}
            {timeframe && (
              <span className="text-[#8A99AD] truncate text-[10px] sm:text-[11px]">
                {timeframe}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Mini Bar Sparkline - Guarded against overflow */}
      <div className="flex items-end gap-1 h-8 shrink-0 max-w-[65px] pl-1.5 self-center">
        {sparklineHeights.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className={cn('w-1 sm:w-1.5 rounded-t-xs transition-all', sparklineColor)}
          />
        ))}
      </div>
    </div>
  );
};
