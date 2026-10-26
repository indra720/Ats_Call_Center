import { create } from 'zustand';
import { Permission, ALL_PERMISSIONS } from '@/lib/permissions';
import { DEFAULT_ROLE_PERMISSIONS, INITIAL_ROLES, RoleDefinition } from '@/lib/roles';

interface PermissionState {
  roles: RoleDefinition[];
  rolePermissions: Record<string, Permission[]>;
  updateRolePermissions: (roleName: string, permissions: Permission[]) => void;
  createRole: (role: Omit<RoleDefinition, 'id' | 'updatedAt' | 'userCount'>) => void;
  deleteRole: (roleId: string) => void;
  getPermissionsForRole: (roleName: string) => Permission[];
  resetToDefaults: () => void;
}

const STORAGE_KEY_ROLES = 'ats_roles_definitions_v1';
const STORAGE_KEY_PERMS = 'ats_roles_permissions_v1';

function loadStoredRoles(): RoleDefinition[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ROLES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse roles from localStorage', e);
  }
  return INITIAL_ROLES;
}

function loadStoredPermissions(): Record<string, Permission[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PERMS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse permissions from localStorage', e);
  }
  return DEFAULT_ROLE_PERMISSIONS;
}

export const usePermissionStore = create<PermissionState>((set, get) => ({
  roles: loadStoredRoles(),
  rolePermissions: loadStoredPermissions(),

  updateRolePermissions: (roleName: string, permissions: Permission[]) => {
    set((state) => {
      const nextPerms = { ...state.rolePermissions, [roleName]: permissions };
      const nextRoles = state.roles.map((r) =>
        r.name === roleName
          ? { ...r, permissions, updatedAt: new Date().toISOString().split('T')[0] }
          : r
      );
      try {
        localStorage.setItem(STORAGE_KEY_PERMS, JSON.stringify(nextPerms));
        localStorage.setItem(STORAGE_KEY_ROLES, JSON.stringify(nextRoles));
      } catch (e) {
        console.error(e);
      }
      return { rolePermissions: nextPerms, roles: nextRoles };
    });
  },

  createRole: (newRoleData) => {
    set((state) => {
      const id = newRoleData.name.toLowerCase().replace(/\s+/g, '-');
      const newRole: RoleDefinition = {
        ...newRoleData,
        id,
        userCount: 0,
        updatedAt: new Date().toISOString().split('T')[0],
      };
      const nextRoles = [...state.roles, newRole];
      const nextPerms = {
        ...state.rolePermissions,
        [newRole.name]: newRoleData.permissions,
      };
      try {
        localStorage.setItem(STORAGE_KEY_ROLES, JSON.stringify(nextRoles));
        localStorage.setItem(STORAGE_KEY_PERMS, JSON.stringify(nextPerms));
      } catch (e) {
        console.error(e);
      }
      return { roles: nextRoles, rolePermissions: nextPerms };
    });
  },

  deleteRole: (roleId: string) => {
    set((state) => {
      const roleToDelete = state.roles.find((r) => r.id === roleId);
      if (!roleToDelete || roleToDelete.isSystem) return state;
      const nextRoles = state.roles.filter((r) => r.id !== roleId);
      const nextPerms = { ...state.rolePermissions };
      delete nextPerms[roleToDelete.name];
      try {
        localStorage.setItem(STORAGE_KEY_ROLES, JSON.stringify(nextRoles));
        localStorage.setItem(STORAGE_KEY_PERMS, JSON.stringify(nextPerms));
      } catch (e) {
        console.error(e);
      }
      return { roles: nextRoles, rolePermissions: nextPerms };
    });
  },

  getPermissionsForRole: (roleName: string): Permission[] => {
    const map = get().rolePermissions;
    if (map[roleName]) {
      return map[roleName];
    }
    // Fallback if not found
    return DEFAULT_ROLE_PERMISSIONS[roleName] || [];
  },

  resetToDefaults: () => {
    try {
      localStorage.removeItem(STORAGE_KEY_ROLES);
      localStorage.removeItem(STORAGE_KEY_PERMS);
    } catch (e) {
      console.error(e);
    }
    set({
      roles: INITIAL_ROLES,
      rolePermissions: DEFAULT_ROLE_PERMISSIONS,
    });
  },
}));
