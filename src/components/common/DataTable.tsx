import React, { useState, useMemo } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  searchable?: boolean;
  minWidth?: string;
  sticky?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  enableSelection?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  pageSizeDefault?: number;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  enableSelection = false,
  selectedIds = [],
  onSelectionChange,
  pageSizeDefault = 10,
  searchPlaceholder = 'Search records...',
  emptyMessage = 'No records found matching criteria',
  className,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeDefault);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() =>
    columns.reduce((acc, col) => ({ ...acc, [col.id]: true }), {})
  );
  const [showColMenu, setShowColMenu] = useState(false);

  // Filter by search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();

    return data.filter((row) => {
      return columns.some((col) => {
        if (col.searchable === false) return false;
        let value: any;
        if (col.accessorKey) {
          value = row[col.accessorKey];
        } else if (col.cell) {
          // If no accessor, check the raw key with same id
          value = row[col.id];
        }
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(term);
      });
    });
  }, [data, searchTerm, columns]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    const col = columns.find((c) => c.id === sortColumn);
    if (!col) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valA = col.accessorKey ? a[col.accessorKey] : a[col.id];
      const valB = col.accessorKey ? b[col.accessorKey] : b[col.id];

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      let comparison = 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      } else {
        comparison = String(valA).localeCompare(String(valB), undefined, { numeric: true });
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection, columns]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Reset page if data length shrinks
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Sort handler
  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  // Selection handlers
  const allPageIds = paginatedData.map(keyExtractor);
  const isAllPageSelected =
    allPageIds.length > 0 && allPageIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      const merged = Array.from(new Set([...selectedIds, ...allPageIds]));
      onSelectionChange(merged);
    } else {
      onSelectionChange(selectedIds.filter((id) => !allPageIds.includes(id)));
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter((item) => item !== id));
    }
  };

  const activeCols = columns.filter((col) => visibleColumns[col.id]);

  return (
    <div className={cn('w-full flex flex-col bg-white rounded-card border border-card-border shadow-card overflow-hidden', className)}>
      {/* Top Table Control Bar */}
      <div className="p-3.5 sm:p-4 border-b border-card-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-2">
          {/* Column Chooser Popover */}
          <div className="relative">
            <button
              onClick={() => setShowColMenu(!showColMenu)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors',
                showColMenu
                  ? 'bg-slate-100 border-slate-300 text-slate-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Columns</span>
            </button>

            {showColMenu && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-modal border border-slate-200 p-2 z-30">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Toggle Columns
                </p>
                <div className="space-y-1 mt-1 max-h-56 overflow-y-auto">
                  {columns.map((c) => (
                    <button
                      key={c.id}
                      onClick={() =>
                        setVisibleColumns((prev) => ({ ...prev, [c.id]: !prev[c.id] }))
                      }
                      className="w-full flex items-center justify-between px-2 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg text-left"
                    >
                      <span className="truncate">{c.header}</span>
                      {visibleColumns[c.id] && <Check className="w-3.5 h-3.5 text-brand-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Container with Modern Semantic & Sticky Positioning */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Data Table Content"
        className="table-wrapper relative overflow-x-auto min-h-[220px]"
      >
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-[#F8FAFC] text-slate-600 uppercase text-[11px] font-bold tracking-wider border-b border-card-border">
            <tr>
              {enableSelection && (
                <th className="w-10 px-4 py-3 text-center sticky-col bg-[#F8FAFC]">
                  <input
                    type="checkbox"
                    checked={isAllPageSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 rounded cursor-pointer"
                  />
                </th>
              )}

              {activeCols.map((col) => {
                const isSorted = sortColumn === col.id;
                return (
                  <th
                    key={col.id}
                    scope="col"
                    style={{ minWidth: col.minWidth || '140px' }}
                    className={cn(
                      'px-4 py-3 font-semibold select-none',
                      col.sortable !== false && 'cursor-pointer hover:bg-slate-100/80 transition-colors',
                      col.sticky && 'sticky-col bg-[#F8FAFC]'
                    )}
                    onClick={() => col.sortable !== false && handleSort(col.id)}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable !== false && (
                        <span className="text-slate-400">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-brand-600" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-brand-600" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-3 h-3 text-slate-400 opacity-60" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: pageSize }).map((_, rIdx) => (
                <tr key={`skel-${rIdx}`} className="animate-pulse">
                  {enableSelection && (
                    <td className="px-4 py-3.5 text-center">
                      <div className="w-4 h-4 bg-slate-200 rounded mx-auto" />
                    </td>
                  )}
                  {activeCols.map((col) => (
                    <td key={`skel-td-${col.id}`} className="px-4 py-3.5">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              // Empty State
              <tr>
                <td
                  colSpan={activeCols.length + (enableSelection ? 1 : 0)}
                  className="px-4 py-12 text-center text-slate-500"
                >
                  <p className="text-sm font-medium">{emptyMessage}</p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-2 text-xs text-brand-600 hover:underline font-semibold"
                    >
                      Clear search filter
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              // Render Data Rows
              paginatedData.map((row, index) => {
                const rowKey = keyExtractor(row);
                const isSelected = selectedIds.includes(rowKey);

                return (
                  <tr
                    key={rowKey}
                    className={cn(
                      'hover:bg-slate-50/80 transition-colors',
                      isSelected && 'bg-blue-50/50'
                    )}
                  >
                    {enableSelection && (
                      <td className="px-4 py-3.5 text-center sticky-col bg-inherit">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(rowKey, e.target.checked)}
                          className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 rounded cursor-pointer"
                        />
                      </td>
                    )}

                    {activeCols.map((col) => {
                      const content = col.cell
                        ? col.cell(row, index)
                        : col.accessorKey
                        ? String(row[col.accessorKey] ?? '-')
                        : String(row[col.id] ?? '-');

                      return (
                        <td
                          key={col.id}
                          className={cn(
                            'px-4 py-3.5 text-slate-800 text-sm align-middle',
                            col.sticky && 'sticky-col bg-inherit font-medium'
                          )}
                        >
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-3 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 bg-slate-50/60">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <span className="hidden sm:inline text-slate-400">|</span>
          <span>
            Showing <strong className="text-slate-700">{sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> to{' '}
            <strong className="text-slate-700">{Math.min(currentPage * pageSize, sortedData.length)}</strong> of{' '}
            <strong className="text-slate-700">{sortedData.length}</strong> records
          </span>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 px-1">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    'w-7 h-7 rounded-lg text-xs font-semibold transition-colors',
                    currentPage === pageNum
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
