import React, { useState, useMemo, useRef, useEffect } from 'react';
import { LayoutGrid, Table as TableIcon, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { DataTable, ColumnDef } from './DataTable';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

export interface CardField<T> {
  label: string;
  render: (item: T) => React.ReactNode;
  isSecondary?: boolean; // Shown under 'Expand details'
}

interface ResponsiveDataViewProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T) => string;
  renderCardHeader?: (item: T) => React.ReactNode;
  cardFields?: CardField<T>[];
  renderCardActions?: (item: T) => React.ReactNode;
  onCardClick?: (item: T) => void;
  isLoading?: boolean;
  enableSelection?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  pageSizeDefault?: number;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function ResponsiveDataView<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  renderCardHeader,
  cardFields = [],
  renderCardActions,
  onCardClick,
  isLoading = false,
  enableSelection = false,
  selectedIds = [],
  onSelectionChange,
  pageSizeDefault = 10,
  searchPlaceholder = 'Search records...',
  emptyMessage = 'No records found',
  className,
}: ResponsiveDataViewProps<T>) {
  const isMobile = useIsMobile();
  const [mobileMode, setMobileMode] = useState<'cards' | 'table'>('cards');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(15);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Toggle card expansion
  const toggleCardExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // IntersectionObserver for mobile infinite scroll
  useEffect(() => {
    if (!isMobile || mobileMode !== 'cards') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 10, data.length));
        }
      },
      { threshold: 0.1 }
    );

    const target = observerTarget.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [isMobile, mobileMode, data.length]);

  const visibleCardData = useMemo(() => {
    return data.slice(0, visibleCount);
  }, [data, visibleCount]);

  // On Desktop/Tablet, always render the full DataTable
  if (!isMobile) {
    return (
      <DataTable
        data={data}
        columns={columns}
        keyExtractor={keyExtractor}
        isLoading={isLoading}
        enableSelection={enableSelection}
        selectedIds={selectedIds}
        onSelectionChange={onSelectionChange}
        pageSizeDefault={pageSizeDefault}
        searchPlaceholder={searchPlaceholder}
        emptyMessage={emptyMessage}
        className={className}
      />
    );
  }

  // Mobile View: Segmented toggle between Cards & Horizontally Scrollable Table
  return (
    <div className={cn('w-full flex flex-col space-y-3', className)}>
      {/* Mobile Mode Switcher Bar */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-slate-500">
          {data.length} records found
        </span>

        <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl border border-slate-300/40">
          <button
            onClick={() => setMobileMode('cards')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
              mobileMode === 'cards'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setMobileMode('table')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
              mobileMode === 'table'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>
        </div>
      </div>

      {mobileMode === 'table' ? (
        // Mobile Table Mode: horizontal scrolling with swipe hint
        <div className="space-y-2">
          <div className="flex items-center justify-end px-1 text-[11px] text-brand-600 font-medium">
            <span>Swipe horizontally for all columns</span>
            <ArrowRight className="w-3 h-3 ml-1 animate-pulse" />
          </div>
          <DataTable
            data={data}
            columns={columns}
            keyExtractor={keyExtractor}
            isLoading={isLoading}
            enableSelection={enableSelection}
            selectedIds={selectedIds}
            onSelectionChange={onSelectionChange}
            pageSizeDefault={10}
            searchPlaceholder={searchPlaceholder}
            emptyMessage={emptyMessage}
          />
        </div>
      ) : (
        // Mobile Cards Mode: Rich native cards with infinite scroll
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`mob-skel-${idx}`}
                className="bg-white p-4 rounded-2xl border border-card-border shadow-sm space-y-3 animate-pulse"
              >
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-slate-200 rounded w-1/2" />
                  <div className="h-5 bg-slate-200 rounded-full w-16" />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                </div>
              </div>
            ))
          ) : visibleCardData.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-card-border text-center text-slate-500">
              <p className="text-sm font-medium">{emptyMessage}</p>
            </div>
          ) : (
            visibleCardData.map((item) => {
              const id = keyExtractor(item);
              const isExpanded = !!expandedCards[id];
              const primaryFields = cardFields.filter((f) => !f.isSecondary);
              const secondaryFields = cardFields.filter((f) => f.isSecondary);

              return (
                <div
                  key={id}
                  onClick={() => onCardClick?.(item)}
                  className={cn(
                    'bg-white rounded-2xl border border-card-border p-4 shadow-card transition-all touch-press',
                    onCardClick ? 'cursor-pointer active:scale-[0.99]' : ''
                  )}
                >
                  {/* Card Header */}
                  {renderCardHeader ? (
                    renderCardHeader(item)
                  ) : (
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                      <div className="font-bold text-slate-900 text-base truncate">
                        {String(item.name || item.title || item.id)}
                      </div>
                      {item.status && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700">
                          {String(item.status)}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Primary Fields (2-column grid, min 14px font) */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs text-slate-600">
                    {primaryFields.length > 0
                      ? primaryFields.map((field, fIdx) => (
                          <div key={fIdx} className="flex flex-col">
                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                              {field.label}
                            </span>
                            <span className="text-slate-800 font-semibold text-sm mt-0.5 truncate">
                              {field.render(item)}
                            </span>
                          </div>
                        ))
                      : columns.slice(0, 4).map((col) => (
                          <div key={col.id} className="flex flex-col">
                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                              {col.header}
                            </span>
                            <span className="text-slate-800 font-semibold text-sm mt-0.5 truncate">
                              {col.cell ? col.cell(item, 0) : String(item[col.accessorKey || col.id] ?? '-')}
                            </span>
                          </div>
                        ))}
                  </div>

                  {/* Secondary Fields (Expandable) */}
                  {secondaryFields.length > 0 && (
                    <>
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-x-3 gap-y-2 text-xs animate-in fade-in duration-150">
                          {secondaryFields.map((field, sIdx) => (
                            <div key={sIdx} className="flex flex-col">
                              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                {field.label}
                              </span>
                              <span className="text-slate-800 font-medium text-sm mt-0.5 truncate">
                                {field.render(item)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={(e) => toggleCardExpand(id, e)}
                        className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                      >
                        <span>{isExpanded ? 'Less details' : 'More details'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </>
                  )}

                  {/* Card Actions Footer */}
                  {renderCardActions && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-end gap-2"
                    >
                      {renderCardActions(item)}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Infinite Scroll Trigger / Fallback Button */}
          {visibleCount < data.length && (
            <div ref={observerTarget} className="py-2 text-center">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 10, data.length))}
                className="w-full py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm active:bg-slate-50"
              >
                Load More ({data.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
