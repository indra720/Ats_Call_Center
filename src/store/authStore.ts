import { create } from 'zustand';
import { Permission } from '@/lib/permissions';
import { UserRole } from '@/lib/roles';
import { usePermissionStore } from './permissionStore';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  avatar: string;
  teamId?: string;
  teamName?: string;
  phone: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  department: string;
}

export const DEMO_USERS: Record<string, AuthUser> = {
  admin: {
    id: 'usr-001',
    name: 'Kamlesh Kumar',
    email: 'admin@ats.com',
    role: 'Admin',
    permissions: [], // Dynamically populated from permissionStore
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98234 56789',
    status: 'online',
    department: 'Management',
  },
  team_leader: {
    id: 'usr-002',
    name: 'Yashika Kanwar',
    email: 'leader@ats.com',
    role: 'Team Leader',
    permissions: [],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    teamId: 'team-north',
    teamName: 'North Zone Sales',
    phone: '+91 98112 23344',
    status: 'online',
    department: 'Sales & Inbound',
  },
  agent: {
    id: 'usr-003',
    name: 'Aakash Sharma',
    email: 'agent@ats.com',
    role: 'Agent',
    permissions: [],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    teamId: 'team-north',
    teamName: 'North Zone Sales',
    phone: '+91 98765 43210',
    status: 'busy',
    department: 'Outbound Telesales',
  },
  supervisor: {
    id: 'usr-004',
    name: 'Priya Singh',
    email: 'supervisor@ats.com',
    role: 'Supervisor',
    permissions: [],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98450 12345',
    status: 'online',
    department: 'Operations',
  },
  qa: {
    id: 'usr-005',
    name: 'Rohan Mehta',
    email: 'qa@ats.com',
    role: 'Quality Analyst',
    permissions: [],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98221 44556',
    status: 'online',
    department: 'Quality Assurance',
  },
  data_analyst: {
    id: 'usr-006',
    name: 'Arjun Rao',
    email: 'data@ats.com',
    role: 'Data Analyst',
    permissions: [],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98990 77889',
    status: 'online',
    department: 'Business Intelligence',
  },
  hr: {
    id: 'usr-007',
    name: 'Neha Sharma',
    email: 'hr@ats.com',
    role: 'HR Manager',
    permissions: [],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98330 99887',
    status: 'online',
    department: 'Human Resources',
  },
  viewer: {
    id: 'usr-008',
    name: 'Rajesh Kumar',
    email: 'viewer@ats.com',
    role: 'Viewer',
    permissions: [],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98770 11223',
    status: 'online',
    department: 'Audit / Stakeholder',
  },
};

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setRole: (roleName: UserRole) => void;
  setUserStatus: (status: AuthUser['status']) => void;
  switchDemoUser: (key: keyof typeof DEMO_USERS) => void;
  getUserPermissions: () => Permission[];
}

const STORAGE_AUTH_USER = 'ats_auth_session_user_v1';

function resolvePermissionsForUser(role: string): Permission[] {
  return usePermissionStore.getState().getPermissionsForRole(role);
}

function getInitialUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_AUTH_USER);
    if (raw) {
      const parsed: AuthUser = JSON.parse(raw);
      parsed.permissions = resolvePermissionsForUser(parsed.role);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load user session', e);
  }
  // Default logged in user for demo convenience: Kamlesh Kumar (Admin)
  const defaultUser = { ...DEMO_USERS.admin };
  defaultUser.permissions = resolvePermissionsForUser(defaultUser.role);
  return defaultUser;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getInitialUser(),
  isAuthenticated: !!getInitialUser(),

  getUserPermissions: () => {
    const current = get().user;
    if (!current) return [];
    return resolvePermissionsForUser(current.role);
  },

  login: async (email: string, _password?: string) => {
    // Find matching demo user or fallback to standard Admin
    const foundEntry = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    const targetUser: AuthUser = foundEntry
      ? { ...foundEntry }
      : {
          id: `usr-${Date.now()}`,
          name: email.split('@')[0].toUpperCase(),
          email,
          role: 'Admin',
          permissions: [],
          avatar: DEMO_USERS.admin.avatar,
          phone: '+91 99999 88888',
          status: 'online',
          department: 'Executive',
        };

    targetUser.permissions = resolvePermissionsForUser(targetUser.role);

    try {
      localStorage.setItem(STORAGE_AUTH_USER, JSON.stringify(targetUser));
    } catch (e) {
      console.error(e);
    }

    set({ user: targetUser, isAuthenticated: true });
    return { success: true };
  },

  logout: () => {
    try {
      localStorage.removeItem(STORAGE_AUTH_USER);
    } catch (e) {
      console.error(e);
    }
    set({ user: null, isAuthenticated: false });
  },

  setRole: (roleName: UserRole) => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser: AuthUser = {
        ...state.user,
        role: roleName,
        permissions: resolvePermissionsForUser(roleName),
      };
      try {
        localStorage.setItem(STORAGE_AUTH_USER, JSON.stringify(updatedUser));
      } catch (e) {
        console.error(e);
      }
      return { user: updatedUser };
    });
  },

  setUserStatus: (status: AuthUser['status']) => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, status };
      try {
        localStorage.setItem(STORAGE_AUTH_USER, JSON.stringify(updatedUser));
      } catch (e) {
        console.error(e);
      }
      return { user: updatedUser };
    });
  },

  switchDemoUser: (key: keyof typeof DEMO_USERS) => {
    const template = DEMO_USERS[key];
    if (!template) return;
    const switched: AuthUser = {
      ...template,
      permissions: resolvePermissionsForUser(template.role),
    };
    try {
      localStorage.setItem(STORAGE_AUTH_USER, JSON.stringify(switched));
    } catch (e) {
      console.error(e);
    }
    set({ user: switched, isAuthenticated: true });
  },
}));
