import React from 'react';
import { Permission } from '@/lib/permissions';
import { usePermission } from '@/hooks/usePermission';

interface CanProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  mode?: 'hide' | 'disable';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const Can: React.FC<CanProps> = ({
  permission,
  permissions,
  requireAll = false,
  mode = 'hide',
  fallback = null,
  children,
}) => {
  const { can, canAny, canAll } = usePermission();

  let hasAccess = false;

  if (permission) {
    hasAccess = can(permission);
  } else if (permissions && permissions.length > 0) {
    hasAccess = requireAll ? canAll(permissions) : canAny(permissions);
  } else {
    // If no permission specified, allow
    hasAccess = true;
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  if (mode === 'disable') {
    return (
      <div
        className="opacity-50 cursor-not-allowed pointer-events-none select-none relative inline-block"
        title="You do not have permission for this action"
      >
        {children}
      </div>
    );
  }

  return <>{fallback}</>;
};
