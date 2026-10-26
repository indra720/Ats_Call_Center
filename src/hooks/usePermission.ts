import { useAuthStore } from '@/store/authStore';
import { usePermissionStore } from '@/store/permissionStore';
import { Permission } from '@/lib/permissions';

export function usePermission() {
  const user = useAuthStore((state) => state.user);
  const rolePermissions = usePermissionStore((state) => state.rolePermissions);

  const currentRole = user?.role || 'Viewer';
  // Get latest permissions for user's role from reactive store
  const permissions = rolePermissions[currentRole] || user?.permissions || [];

  const isSuperAdminOrAdmin = currentRole === 'Super Admin' || currentRole === 'Admin';

  const can = (permission: Permission): boolean => {
    if (!user) return false;
    if (isSuperAdminOrAdmin) return true;
    return permissions.includes(permission);
  };

  const canAny = (perms: Permission[]): boolean => {
    if (!user) return false;
    if (isSuperAdminOrAdmin) return true;
    return perms.some((p) => permissions.includes(p));
  };

  const canAll = (perms: Permission[]): boolean => {
    if (!user) return false;
    if (isSuperAdminOrAdmin) return true;
    return perms.every((p) => permissions.includes(p));
  };

  return {
    can,
    canAny,
    canAll,
    role: currentRole,
    user,
    permissions,
    isAdmin: isSuperAdminOrAdmin,
  };
}
