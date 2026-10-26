import React from 'react';
import { Outlet } from 'react-router-dom';
import { DesktopShell } from '@/components/layout/DesktopShell';
import { MobileShell } from '@/components/layout/MobileShell';
import { LiveCallWidget } from '@/components/call/LiveCallWidget';
import { DevRoleSwitcher } from '@/components/common/DevRoleSwitcher';
import { CommandPalette } from '@/components/common/CommandPalette';
import { ToastContainer } from '@/components/common/ToastContainer';
import { useIsMobile } from '@/hooks/useMediaQuery';

export const AppLayout: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <ToastContainer />
      {isMobile ? (
        <MobileShell>
          <Outlet />
        </MobileShell>
      ) : (
        <DesktopShell>
          <Outlet />
        </DesktopShell>
      )}

      {/* Global Call Mini-player / Assistant */}
      <LiveCallWidget />

      {/* Dev Role Switcher for Instant Testing */}
      <DevRoleSwitcher />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette />
    </>
  );
};
