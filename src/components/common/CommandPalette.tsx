import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone, Users, FileText, Settings, Shield, Plus, X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { usePermission } from '@/hooks/usePermission';
import { cn } from '@/lib/utils';

export const CommandPalette: React.FC = () => {
  const navigate = useNavigate();
  const isOpen = useUIStore((state) => state.isCommandPaletteOpen);
  const setOpen = useUIStore((state) => state.setCommandPaletteOpen);
  const { can } = usePermission();
  const [query, setQuery] = useState('');

  // Handle Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  const quickActions = [
    { label: 'Add New Lead', path: '/leads/new', perm: 'leads:create', icon: Plus },
    { label: 'Open Phone Dialer', path: '/calls/dialer', perm: 'calls:make', icon: Phone },
    { label: 'View All Leads', path: '/leads', perm: 'leads:view', icon: Users },
    { label: 'Call History & Recordings', path: '/calls/history', perm: 'calls:view_history', icon: Phone },
    { label: 'Call Performance Report', path: '/reports/call-performance', perm: 'reports:view', icon: FileText },
    { label: 'Sales & Revenue Report', path: '/reports/sales', perm: 'reports:view', icon: FileText },
    { label: 'Users & Roles Management', path: '/settings/users-roles', perm: 'users:view', icon: Shield },
    { label: 'Organization & System Settings', path: '/settings/system', perm: 'settings:edit_system', icon: Settings },
  ] as const;

  const filteredActions = quickActions.filter(
    (item) =>
      (!item.perm || can(item.perm as any)) &&
      item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white rounded-2xl shadow-modal border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a page, action, report, or command..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-100 rounded border border-slate-200">
            ESC
          </kbd>
          <button onClick={() => setOpen(false)} className="sm:hidden text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
            Navigation & Actions
          </span>
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    navigate(action.path);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-brand-100 flex items-center justify-center text-slate-500 group-hover:text-brand-600 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">{action.label}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
