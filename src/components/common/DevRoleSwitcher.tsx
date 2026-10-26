import React, { useState } from 'react';
import { useAuthStore, DEMO_USERS } from '@/store/authStore';
import { usePermissionStore } from '@/store/permissionStore';
import { UserRole } from '@/lib/roles';
import { Shield, ChevronDown, Check, UserCheck, RefreshCw, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DevRoleSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setRole = useAuthStore((state) => state.setRole);
  const switchDemoUser = useAuthStore((state) => state.switchDemoUser);
  const roles = usePermissionStore((state) => state.roles);
  const resetToDefaults = usePermissionStore((state) => state.resetToDefaults);

  const demoUserList = [
    { key: 'admin', label: 'Admin (Kamlesh)', role: 'Admin' },
    { key: 'team_leader', label: 'Team Leader (Yashika)', role: 'Team Leader' },
    { key: 'agent', label: 'Agent (Aakash)', role: 'Agent' },
    { key: 'supervisor', label: 'Supervisor (Priya)', role: 'Supervisor' },
    { key: 'qa', label: 'Quality Analyst (Rohan)', role: 'Quality Analyst' },
    { key: 'data_analyst', label: 'Data Analyst (Arjun)', role: 'Data Analyst' },
    { key: 'hr', label: 'HR Manager (Neha)', role: 'HR Manager' },
    { key: 'viewer', label: 'Viewer (Rajesh)', role: 'Viewer' },
  ] as const;

  if (!user) return null;

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-full shadow-float text-xs font-semibold tracking-wide transition-all duration-200 border',
            'bg-navy-900 text-white hover:bg-navy-800 border-brand-500/30 backdrop-blur-md',
            isOpen ? 'ring-2 ring-brand-500 shadow-xl' : 'opacity-90 hover:opacity-100'
          )}
          title="Dev Role Switcher (Simulate Roles)"
        >
          <Shield className="w-3.5 h-3.5 text-brand-400" />
          <span className="hidden sm:inline">Role:</span>
          <span className="bg-brand-600/60 px-2 py-0.5 rounded-full text-blue-200 font-medium">
            {user.role}
          </span>
          <ChevronDown className={cn('w-3.5 h-3.5 text-slate-300 transition-transform duration-200', isOpen && 'rotate-180')} />
        </button>
      </div>

      {/* Popover Card */}
      {isOpen && (
        <div className="fixed bottom-32 right-4 md:bottom-16 md:right-6 z-50 w-80 max-w-[92vw] bg-white rounded-2xl shadow-modal border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-navy-900 p-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-400" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Simulate Role & Demo User</h4>
                <p className="text-[11px] text-slate-400">Tests permission matrices instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 max-h-96 overflow-y-auto space-y-3 text-xs">
            {/* Quick Demo Personas */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                Quick Demo Personas
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {demoUserList.map((item) => {
                  const isCurrent = user.email === DEMO_USERS[item.key]?.email;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        switchDemoUser(item.key);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'flex items-center justify-between p-2 rounded-lg text-left transition-colors border',
                        isCurrent
                          ? 'bg-brand-50 border-brand-300 text-brand-700 font-medium'
                          : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100'
                      )}
                    >
                      <div className="truncate">
                        <p className="font-semibold truncate">{item.role}</p>
                        <p className="text-[10px] text-slate-500 truncate">{DEMO_USERS[item.key]?.name}</p>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Change Role Only */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                Switch Role for Current User ({user.name})
              </span>
              <div className="space-y-1">
                {roles.map((r) => {
                  const isActive = user.role === r.name;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRole(r.name as UserRole);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors',
                        isActive
                          ? 'bg-brand-600 text-white font-medium'
                          : 'hover:bg-slate-100 text-slate-700'
                      )}
                    >
                      <span className="truncate">{r.name}</span>
                      <span className={cn('text-[10px] px-1.5 py-0.5 rounded', isActive ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-500')}>
                        {r.permissions.length} perms
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Defaults */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  resetToDefaults();
                  setRole('Admin');
                }}
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-[11px]"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Permissions
              </button>
              <span className="text-[10px] text-slate-400 font-mono">Dev Mode</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
