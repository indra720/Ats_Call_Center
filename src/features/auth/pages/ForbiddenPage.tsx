import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const setRole = useAuthStore((state) => state.setRole);

  const deniedPermission = (location.state as any)?.deniedPermission;

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-card-border shadow-card text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
            HTTP 403 Forbidden
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Access Restricted
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your current role (<strong className="text-slate-800">{user?.role}</strong>) does not have
            authorization to view this resource.
          </p>
        </div>

        {deniedPermission && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs font-mono text-slate-700">
            <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
              Required Permission:
            </span>
            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-semibold">
              {deniedPermission}
            </span>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-2.5 bg-brand-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-brand-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </button>

          <button
            onClick={() => {
              setRole('Admin');
              window.location.reload();
            }}
            className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Switch to Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};
