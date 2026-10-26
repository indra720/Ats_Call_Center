import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Bell,
  Phone,
  ChevronRight,
  LogOut,
  User,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { APP_NAVIGATION } from '@/app/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { usePermission } from '@/hooks/usePermission';
import { cn } from '@/lib/utils';

export const MobileShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setCommandPaletteOpen = useUIStore((state) => state.setCommandPaletteOpen);
  const startCall = useUIStore((state) => state.startCall);
  const { can } = usePermission();

  // Filter groups for mobile drawer navigation
  const filteredNavGroups = APP_NAVIGATION.map((group) => {
    const accessibleItems = group.items.filter((item) => {
      if (!item.permission) return true;
      return can(item.permission);
    });
    return {
      ...group,
      items: accessibleItems,
    };
  }).filter((group) => group.items.length > 0);

  const handleLogout = () => {
    logout();
    setIsNavDrawerOpen(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6FAFD] text-slate-800 font-sans">
      {/* 1. Clean Mobile Top App Bar (No bottom app bar) */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5EBF2] px-3.5 py-2.5 safe-top flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          {/* Hamburger button to open navigation drawer */}
          <button
            onClick={() => setIsNavDrawerOpen(true)}
            className="w-9 h-9 rounded-lg bg-[#F4F7FB] border border-[#E5EBF2] flex items-center justify-center text-slate-700 active:bg-slate-200 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>

          <BrandLogo variant="compact" theme="light" size="sm" />
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Search */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-8 h-8 rounded-full bg-[#F4F7FB] flex items-center justify-center text-slate-600 active:bg-slate-200"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-slate-600" />
          </button>

          {/* Quick Call / Dialer */}
          {can('calls:make') && (
            <button
              onClick={() => navigate('/calls/dialer')}
              className="w-8 h-8 rounded-full bg-[#EBF3FE] text-[#0362FA] flex items-center justify-center hover:bg-blue-100"
              aria-label="Make a Call"
            >
              <Phone className="w-4 h-4" />
            </button>
          )}

          {/* Activity Notifications */}
          <button
            onClick={() => navigate('/settings/activity-logs')}
            className="w-8 h-8 rounded-full bg-[#F4F7FB] flex items-center justify-center text-slate-600 relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E73647] rounded-full" />
          </button>

          {/* User Avatar */}
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name || 'User'}
            onClick={() => setIsNavDrawerOpen(true)}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20 cursor-pointer ml-1"
          />
        </div>
      </header>

      {/* 2. Main Mobile Page Outlet (Clean, spacious, no squished bottom bar) */}
      <main className="flex-1 p-3.5 sm:p-4 w-full max-w-full overflow-x-hidden">
        {children}
      </main>

      {/* 3. Full Mobile Navigation Slide-out Drawer (Replaces bottom app bar) */}
      {isNavDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#02142B]/70 backdrop-blur-sm flex justify-start animate-in fade-in duration-200">
          <div className="w-[85vw] max-w-[340px] h-full bg-[#02142B] text-[#8A99AD] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-left duration-250">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#0B203E] flex items-center justify-between">
              <BrandLogo variant="full" theme="dark" size="sm" />
              <button
                onClick={() => setIsNavDrawerOpen(false)}
                className="p-1.5 text-[#8A99AD] hover:text-white rounded-lg hover:bg-[#0B203E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile Card */}
            <div className="p-3.5 mx-3 mt-3 rounded-xl bg-[#0B203E] border border-[#142D52] flex items-center gap-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/30"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white text-xs truncate">{user?.name}</h4>
                <p className="text-[11px] text-[#8A99AD] truncate">{user?.email}</p>
                <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#0362FA] text-white">
                  {user?.role}
                </span>
              </div>
            </div>

            {/* Menu Sections List with Hidden Scrollbar */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 no-scrollbar scrollbar-none">
              {filteredNavGroups.map((group) => (
                <div key={group.id} className="space-y-1">
                  <span className="text-[10px] font-bold text-[#4E6178] uppercase tracking-wider block px-2 pt-1">
                    {group.title}
                  </span>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        item.path === '/dashboard'
                          ? location.pathname === '/dashboard'
                          : location.pathname.startsWith(item.path);

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            navigate(item.path);
                            setIsNavDrawerOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs font-medium transition-colors',
                            isActive
                              ? 'bg-[#0362FA] text-white font-semibold'
                              : 'text-[#8A99AD] hover:bg-[#0B203E] hover:text-white'
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-[#8A99AD]')} />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge ? (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500 text-white">
                              {item.badge}
                            </span>
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer / Sign Out */}
            <div className="p-3 border-t border-[#0B203E] bg-[#010C1A]">
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-rose-500/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of ATS Call Center</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
