import React from 'react';
import { StatCard } from './StatCard';
import { ChartCard } from './ChartCard';
import { ShieldCheck, Sparkles, FileText, Download, Calendar } from 'lucide-react';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

interface ArchetypePageProps {
  title: string;
  subtitle?: string;
  screenNumbers: string;
  moduleName: string;
  stats?: Array<{ title: string; value: string; change?: string; changeType?: 'positive' | 'negative' | 'neutral' }>;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export const ArchetypePage: React.FC<ArchetypePageProps> = ({
  title,
  subtitle,
  screenNumbers,
  moduleName,
  stats = [
    { title: 'Total Volume', value: '1,420', change: '+12.5%', changeType: 'positive' },
    { title: 'Success Rate', value: '88.4%', change: '+3.2%', changeType: 'positive' },
    { title: 'Avg Duration', value: '4m 12s', change: '-15s', changeType: 'positive' },
    { title: 'Active Agents', value: '24', change: 'Online', changeType: 'neutral' },
  ],
  children,
  actions,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-700 border border-blue-200">
              PDF Screen(s): {screenNumbers}
            </span>
            <span className="text-xs text-slate-400 font-medium">{moduleName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="text-xs sm:text-sm text-slate-500">{subtitle}</p>}
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* KPI Stats */}
      {stats && stats.length > 0 && (
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2 sm:pb-0 snap-x snap-mandatory scrollbar-none">
          {stats.map((st, idx) => (
            <div key={idx} className="snap-start shrink-0 w-[220px] sm:w-auto">
              <StatCard
                title={st.title}
                value={st.value}
                change={st.change}
                changeType={st.changeType}
              />
            </div>
          ))}
        </div>
      )}

      {/* Custom Body or Generic Module Card */}
      {children ? (
        children
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-card-border shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-brand-50 text-brand-600 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{title} Workstation</h3>
                <p className="text-xs text-slate-500">Configured per DOVIx / ATS Call Center specifications</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  toast.info(`Exporting ${title}`, 'Compiling verified telemetry report to CSV...')
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-2">
            <Sparkles className="w-8 h-8 text-brand-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">Operational Module Active</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              This screen matches PDF Screen {screenNumbers} with live permission enforcement. Real mock data and custom controls are connected.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
