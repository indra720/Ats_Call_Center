import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Permission } from '@/lib/permissions';
import { useAuthStore } from '@/store/authStore';
import { usePermission } from '@/hooks/usePermission';

interface ProtectedRouteProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  permission,
  permissions,
  requireAll = false,
  children,
}) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { can, canAny, canAll } = usePermission();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (permission && !can(permission)) {
    return <Navigate to="/403" state={{ deniedPermission: permission }} replace />;
  }

  if (permissions && permissions.length > 0) {
    const granted = requireAll ? canAll(permissions) : canAny(permissions);
    if (!granted) {
      return <Navigate to="/403" state={{ deniedPermissions: permissions }} replace />;
    }
  }

  return <>{children}</>;
};
