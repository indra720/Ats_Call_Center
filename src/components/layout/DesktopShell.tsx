import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Phone,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  Shield,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Upload,
  X,
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { APP_NAVIGATION } from '@/app/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { usePermission } from '@/hooks/usePermission';
import { AddLeadModal } from '@/features/leads/components/AddLeadModal';
import { ImportLeadsModal } from '@/features/leads/components/ImportLeadsModal';
import { cn } from '@/lib/utils';

export const DesktopShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isImportLeadsModalOpen, setIsImportLeadsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setCommandPaletteOpen = useUIStore((state) => state.setCommandPaletteOpen);
  const startCall = useUIStore((state) => state.startCall);
  const { can } = usePermission();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (path: string, isImport?: boolean, isAddLead?: boolean) => {
    if (isImport) {
      setIsImportLeadsModalOpen(true);
    } else if (isAddLead) {
      setIsAddLeadModalOpen(true);
    } else {
      navigate(path);
    }
    // Close off-canvas drawer on mobile/tablet screens
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#F6FAFD] text-slate-800 font-sans relative">
      {/* Off-canvas Dark Backdrop for Tablet / MD screens (< 1024px) */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-[#02142B]/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* 1. Deep Navy Sidebar:
          - On Tablet/MD (<1024px): Off-canvas slide-out drawer controlled by toggle button
          - On Desktop (>=1024px): Fixed sidebar with collapse toggle
      */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-250 ease-in-out',
          'bg-[#02142B] text-[#8A99AD] select-none border-r border-[#0B203E]',
          // Mobile & Tablet (<1024px)
          'max-lg:w-[260px] max-lg:shadow-2xl',
          isDrawerOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full',
          // Desktop (>=1024px)
          'lg:translate-x-0',
          isCollapsed ? 'lg:w-16' : 'lg:w-[230px]'
        )}
      >
        {/* Brand Header */}
        <div className="h-[60px] flex items-center justify-between px-3.5 border-b border-[#0B203E] shrink-0">
          <NavLink
            to="/dashboard"
            onClick={() => setIsDrawerOpen(false)}
            className="flex items-center gap-2 overflow-hidden"
          >
            <BrandLogo
              variant={isCollapsed ? 'icon' : 'full'}
              theme="dark"
              size="sm"
            />
          </NavLink>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex text-[#8A99AD] hover:text-white p-1 rounded-md hover:bg-[#0B203E] transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          {/* Tablet/Mobile Drawer Close Button */}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="lg:hidden text-[#8A99AD] hover:text-white p-1 rounded-md hover:bg-[#0B203E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Groups with hidden scrollbar */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 no-scrollbar scrollbar-none">
          {APP_NAVIGATION.map((group) => {
            const allowedItems = group.items.filter((item) => !item.permission || can(item.permission));
            if (allowedItems.length === 0) return null;

            return (
              <div key={group.id} className="space-y-0.5">
                {(!isCollapsed || isDrawerOpen) && group.title && (
                  <div className="flex items-center justify-between px-2 pt-2 pb-1 text-[10px] font-bold tracking-wider text-[#4E6178] uppercase">
                    <span>{group.title}</span>
                    {group.hasChevron && <ChevronRight className="w-3 h-3 text-[#4E6178]" />}
                  </div>
                )}

                {allowedItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.path === '/dashboard'
                      ? location.pathname === '/dashboard'
                      : location.pathname === item.path ||
                        (item.path !== '/' &&
                          item.path !== '/leads' &&
                          location.pathname.startsWith(item.path));

                  const isImportTrigger = item.id === 'leads-import';
                  const isAddLeadTrigger = item.id === 'leads-new';

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.path, isImportTrigger, isAddLeadTrigger)}
                      className={cn(
                        'w-full flex items-center gap-2.5 px-2.5 h-[34px] rounded-[10px] text-[12px] font-medium transition-all group relative text-left',
                        isActive
                          ? 'bg-[#0362FA] text-white font-semibold shadow-sm'
                          : 'text-[#8A99AD] hover:bg-[#0B203E] hover:text-white'
                      )}
                      title={isCollapsed && !isDrawerOpen ? item.label : undefined}
                    >
                      <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-[#8A99AD] group-hover:text-white')} />

                      {(!isCollapsed || isDrawerOpen) && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}

                      {(!isCollapsed || isDrawerOpen) && item.badge && (
                        <span className={cn('text-[9px] font-bold px-1.5 py-0.2 rounded-full leading-tight', item.badgeColor)}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </aside>

      {/* 2. Main Page Layout
          - On Tablet/MD (<1024px): pl-0 (Zero padding! Full-width breathing room!)
          - On Desktop (>=1024px): Offset by 230px (or 64px if collapsed)
      */}
      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-200 min-h-screen w-full overflow-x-hidden',
          'pl-0', // Default full width on mobile and tablet
          isCollapsed ? 'lg:pl-16' : 'lg:pl-[230px]'
        )}
      >
        {/* Top Header (60px high, White, border-b #EBF0F6) */}
        <header className="h-[60px] bg-white border-b border-[#EBF0F6] sticky top-0 z-20 px-4 sm:px-5 flex items-center justify-between gap-3 shadow-2xs">
          {/* Left: Hamburger & Search Box */}
          <div className="flex items-center gap-3">
            {/* Hamburger button:
                - On Tablet/Mobile (<1024px): Opens side drawer overlay
                - On Desktop (>=1024px): Toggles sidebar collapse
            */}
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsDrawerOpen(!isDrawerOpen);
                } else {
                  setIsCollapsed(!isCollapsed);
                }
              }}
              className="text-slate-600 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              title="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Exact Search Bar from Screen 032 */}
            <div
              onClick={() => setCommandPaletteOpen(true)}
              className="w-[200px] sm:w-[320px] md:w-[360px] h-[38px] bg-[#F4F7FB] border border-[#E5EBF2] rounded-lg px-3 flex items-center justify-between text-xs text-slate-400 cursor-pointer hover:bg-slate-100/70 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Search className="w-3.5 h-3.5 text-[#8A99AD] shrink-0" />
                <span className="text-[#8A99AD] truncate">Search leads, calls, campaigns...</span>
              </div>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-[#8A99AD] bg-white border border-[#D9E2EC] rounded shrink-0">
                Ctrl K
              </span>
            </div>
          </div>

          {/* Right Controls matching Screen 032 */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Add Lead Button */}
            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Lead</span>
            </button>

            {/* Live Indicator Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E6F7EC] text-[#10B981] rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="hidden sm:inline">Live</span>
            </div>

            {/* Blue Circular Call Icon with Red Badge '5' */}
            <button
              onClick={() =>
                startCall({
                  contactName: 'Rohit Sharma',
                  phoneNumber: '+91 98765 43210',
                  companyName: 'Tech Solutions Pvt Ltd',
                })
              }
              className="relative w-8 h-8 rounded-full bg-[#EBF3FE] text-[#0362FA] flex items-center justify-center hover:bg-blue-100 transition-colors"
              title="Recent Inbound Calls"
            >
              <Phone className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E73647] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                5
              </span>
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => navigate('/settings/activity-logs')}
              className="w-8 h-8 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors relative"
              title="Activity Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E73647] rounded-full" />
            </button>

            {/* Help Icon */}
            <button
              onClick={() => navigate('/help/tickets')}
              className="w-8 h-8 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors"
              title="Help & Support Tickets"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* User Chip */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#0F172A] leading-tight">
                    {user?.name || 'Yashika Kanwar'}
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    {user?.role || 'Super Admin'}
                  </span>
                </div>
              </button>

              {isUserMenuOpen && (
                <div
                  onClick={() => setIsUserMenuOpen(false)}
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-[#E5EBF2] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF3FE] text-[#0362FA]">
                      {user?.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <NavLink
                      to="/settings/profile"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Profile & Account
                    </NavLink>
                    <NavLink
                      to="/settings/users-roles"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <Shield className="w-3.5 h-3.5 text-slate-400" />
                      Users & Roles
                    </NavLink>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 3. Main Outlet Container (Spacious layout, no squishing on MD or LG) */}
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 w-full max-w-[1600px] overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
      />
      <ImportLeadsModal
        isOpen={isImportLeadsModalOpen}
        onClose={() => setIsImportLeadsModalOpen(false)}
      />
    </div>
  );
};
