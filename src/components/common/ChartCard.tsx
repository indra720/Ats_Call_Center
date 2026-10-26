import React, { useState } from 'react';
import { Table, BarChart2, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  tableDataFallback?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  action,
  children,
  tableDataFallback,
  className,
  minHeight = 'min-h-[260px]',
}) => {
  const [showTableView, setShowTableView] = useState(false);

  return (
    <div
      className={cn(
        'bg-white rounded-card p-4 sm:p-5 border border-card-border shadow-card flex flex-col justify-between overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {tableDataFallback && (
            <button
              onClick={() => setShowTableView(!showTableView)}
              className={cn(
                'p-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1',
                showTableView
                  ? 'bg-brand-50 border-brand-200 text-brand-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              )}
              title={showTableView ? 'Switch to Chart View' : 'Switch to Table View'}
            >
              {showTableView ? <BarChart2 className="w-3.5 h-3.5" /> : <Table className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{showTableView ? 'Chart' : 'Table'}</span>
            </button>
          )}
          {action}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className={cn('w-full flex-1 flex flex-col justify-center', minHeight)}>
        {showTableView && tableDataFallback ? (
          <div className="w-full overflow-x-auto max-h-72">{tableDataFallback}</div>
        ) : (
          <div className="w-full h-full min-h-[220px]">{children}</div>
        )}
      </div>
    </div>
  );
};
