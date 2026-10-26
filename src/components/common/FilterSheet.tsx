import React from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';
import { ResponsiveModal } from './ResponsiveModal';

interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: 'select' | 'chips' | 'dateRange';
  options?: FilterOption[];
}

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterConfig[];
  values: Record<string, any>;
  onChange: (filterId: string, value: any) => void;
  onReset: () => void;
  onApply: () => void;
  activeCount?: number;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  isOpen,
  onClose,
  filters,
  values,
  onChange,
  onReset,
  onApply,
  activeCount = 0,
}) => {
  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Records"
      description="Refine your active data list by criteria"
      presentation="sheet"
      footer={
        <div className="w-full flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
          <button
            onClick={() => {
              onApply();
              onClose();
            }}
            className="flex-1 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-brand-700 transition-colors"
          >
            Apply Filters {activeCount > 0 && `(${activeCount})`}
          </button>
        </div>
      }
    >
      <div className="space-y-5 py-1">
        {filters.map((filter) => {
          const currentValue = values[filter.id];

          if (filter.type === 'chips' && filter.options) {
            return (
              <div key={filter.id} className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {filter.label}
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onChange(filter.id, '')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      !currentValue
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    All
                  </button>
                  {filter.options.map((opt) => {
                    const isSelected = currentValue === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => onChange(filter.id, isSelected ? '' : opt.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }

          if (filter.type === 'select' && filter.options) {
            return (
              <div key={filter.id} className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {filter.label}
                </label>
                <select
                  value={currentValue || ''}
                  onChange={(e) => onChange(filter.id, e.target.value)}
                  className="w-full text-base px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                >
                  <option value="">All {filter.label}</option>
                  {filter.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return null;
        })}
      </div>
    </ResponsiveModal>
  );
};
