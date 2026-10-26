import React from 'react';
import { Outlet } from 'react-router-dom';
import { BrandLogo } from '@/components/common/BrandLogo';
import { ShieldCheck, Sparkles, PhoneCall, Headphones } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#0B1530] text-white">
      {/* Left Marketing / Brand Visual Column */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-[#0B1530] via-[#0F1F4A] to-[#182C66] border-r border-blue-900/40 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand */}
        <div className="z-10">
          <BrandLogo variant="full" theme="dark" size="lg" />
        </div>

        {/* Center Feature Callout */}
        <div className="z-10 space-y-6 max-w-lg my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-400/30 text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Indian Telecalling & CRM</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Empower your calling teams with real-time AI assistance & lead intelligence.
          </h1>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 space-y-1">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <div className="text-sm font-bold text-white">Smart Auto Dialer</div>
              <div className="text-xs text-slate-300">Predictive IVR and automated disposition logging</div>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 space-y-1">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <div className="text-sm font-bold text-white">Role-Based Access</div>
              <div className="text-xs text-slate-300">Granular permissions from Agent to Super Admin</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="z-10 text-xs text-slate-400 flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} ATS Call Center. All rights reserved.</span>
          <span className="flex items-center gap-1">
            <Headphones className="w-3.5 h-3.5" />
            24/7 Operations Ready
          </span>
        </div>
      </div>

      {/* Right Login Form Stage */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-page-bg">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
