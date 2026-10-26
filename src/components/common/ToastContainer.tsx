import React from 'react';
import { useToastStore } from '@/store/toastStore';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl shadow-float border transition-all animate-in slide-in-from-top duration-200',
            t.type === 'success' && 'bg-white border-emerald-200 text-slate-800',
            t.type === 'error' && 'bg-white border-rose-200 text-slate-800',
            t.type === 'info' && 'bg-white border-blue-200 text-slate-800',
            t.type === 'warning' && 'bg-white border-amber-200 text-slate-800'
          )}
        >
          {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
          {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
          {t.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />}
          {t.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-slate-900 leading-tight">{t.title}</h5>
            {t.message && <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{t.message}</p>}
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
