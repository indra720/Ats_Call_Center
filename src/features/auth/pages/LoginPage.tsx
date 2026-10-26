import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, DEMO_USERS } from '@/store/authStore';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@ats.com');
  const [password, setPassword] = useState('Demo@123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const switchDemoUser = useAuthStore((state) => state.switchDemoUser);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide a valid work email.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDemoPersona = (key: keyof typeof DEMO_USERS) => {
    const demo = DEMO_USERS[key];
    if (demo) {
      setEmail(demo.email);
      setPassword('Demo@123');
      switchDemoUser(key);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-card-border shadow-modal space-y-6">
      {/* Mobile Brand Header */}
      <div className="lg:hidden flex flex-col items-center text-center pb-2">
        <BrandLogo variant="full" theme="light" size="lg" />
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sign In</h2>
        <p className="text-xs text-slate-500">
          Enter your ATS Call Center credentials to access your workspace.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Work Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@ats.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Password
            </label>
            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                toast.info('Demo Credentials', 'Password is: Demo@123 or click a quick persona button below.');
              }}
              className="text-xs text-[#0362FA] hover:underline font-semibold"
            >
              Forgot?
            </a>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 rounded cursor-pointer"
            />
            <span className="text-xs text-slate-600 font-medium">Keep me signed in for 30 days</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Demo Quick-Select Role Chips */}
      <div className="pt-4 border-t border-slate-100 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>Demo Role Quick-Select</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Click any role below to sign in instantly with that persona&apos;s permissions:
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleSelectDemoPersona('admin')}
            className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-left transition-colors"
          >
            <div className="text-xs font-bold text-blue-900">Admin</div>
            <div className="text-[10px] text-blue-700">Kamlesh Kumar (All perms)</div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectDemoPersona('team_leader')}
            className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-left transition-colors"
          >
            <div className="text-xs font-bold text-indigo-900">Team Leader</div>
            <div className="text-[10px] text-indigo-700">Yashika Kanwar (Team scope)</div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectDemoPersona('agent')}
            className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-left transition-colors"
          >
            <div className="text-xs font-bold text-emerald-900">Agent</div>
            <div className="text-[10px] text-emerald-700">Aakash Sharma (Own scope)</div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectDemoPersona('viewer')}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
          >
            <div className="text-xs font-bold text-slate-800">Viewer</div>
            <div className="text-[10px] text-slate-600">Rajesh Kumar (Read-only)</div>
          </button>
        </div>
      </div>
    </div>
  );
};
