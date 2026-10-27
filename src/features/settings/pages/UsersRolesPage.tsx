import React, { useState } from "react";
import {
  Users,
  UserCheck,
  Clock,
  Shield,
  Plus,
  Search,
  ChevronDown,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Contact,
  Check,
  Calendar,
  RotateCcw,
  Key,
  Trash2,
  UserX,
  MoreHorizontal,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import { ActionMenu } from "@/components/common/ActionMenu";
import { toast } from "@/store/toastStore";
import { usePermissionStore } from "@/store/permissionStore";
import { Permission } from "@/lib/permissions";
import { AddUserModal } from "@/features/settings/components/AddUserModal";
import { AddRoleModal } from "@/features/settings/components/AddRoleModal";
import { UserDetailsModal } from "@/features/settings/components/UserDetailsModal";
import { EditUserModal } from "@/features/settings/components/EditUserModal";
import { RoleDetailsModal, RoleItem } from "@/features/settings/components/RoleDetailsModal";
import { EditRoleModal } from "@/features/settings/components/EditRoleModal";

interface UserRow {
  id: number;
  initials: string;
  initialsBg: string;
  name: string;
  email: string;
  role: string;
  roleBadgeColor: string;
  team: string;
  status: "Active" | "Inactive";
  lastLogin: string;
}

const USERS_DATA: UserRow[] = [
  {
    id: 1,
    initials: "KK",
    initialsBg: "bg-purple-600",
    name: "Kamlesh Kumar",
    email: "kamlesh@atscallcenter.com",
    role: "Admin",
    roleBadgeColor: "bg-blue-50 text-[#0362FA]",
    team: "Management",
    status: "Active",
    lastLogin: "20 Oct 2026 10:24 AM",
  },
  {
    id: 2,
    initials: "AK",
    initialsBg: "bg-pink-500",
    name: "Aakash Kumawat",
    email: "aakash@atscallcenter.com",
    role: "Team Leader",
    roleBadgeColor: "bg-purple-50 text-purple-700",
    team: "Backend",
    status: "Active",
    lastLogin: "20 Oct 2026 09:18 AM",
  },
  {
    id: 3,
    initials: "YK",
    initialsBg: "bg-sky-500",
    name: "Yashika Kanwar",
    email: "yashika@atscallcenter.com",
    role: "Agent",
    roleBadgeColor: "bg-emerald-50 text-[#13AB4A]",
    team: "Calling",
    status: "Active",
    lastLogin: "20 Oct 2026 09:05 AM",
  },
  {
    id: 4,
    initials: "RS",
    initialsBg: "bg-emerald-600",
    name: "Rohit Sharma",
    email: "rohit@atscallcenter.com",
    role: "Agent",
    roleBadgeColor: "bg-emerald-50 text-[#13AB4A]",
    team: "Calling",
    status: "Active",
    lastLogin: "19 Oct 2026 06:32 PM",
  },
  {
    id: 5,
    initials: "PM",
    initialsBg: "bg-rose-500",
    name: "Priya Meena",
    email: "priya@atscallcenter.com",
    role: "Agent",
    roleBadgeColor: "bg-emerald-50 text-[#13AB4A]",
    team: "Calling",
    status: "Active",
    lastLogin: "19 Oct 2026 05:21 PM",
  },
  {
    id: 6,
    initials: "SV",
    initialsBg: "bg-amber-500",
    name: "Sandeep Verma",
    email: "sandeep@atscallcenter.com",
    role: "Quality Analyst",
    roleBadgeColor: "bg-amber-50 text-[#EF9612]",
    team: "QA",
    status: "Active",
    lastLogin: "19 Oct 2026 04:10 PM",
  },
  {
    id: 7,
    initials: "NJ",
    initialsBg: "bg-violet-600",
    name: "Neha Jain",
    email: "neha@atscallcenter.com",
    role: "Agent",
    roleBadgeColor: "bg-emerald-50 text-[#13AB4A]",
    team: "Calling",
    status: "Inactive",
    lastLogin: "18 Oct 2026 12:45 PM",
  },
  {
    id: 8,
    initials: "AG",
    initialsBg: "bg-orange-500",
    name: "Amit Gupta",
    email: "amit@atscallcenter.com",
    role: "Supervisor",
    roleBadgeColor: "bg-rose-50 text-rose-600",
    team: "Calling",
    status: "Active",
    lastLogin: "18 Oct 2026 11:30 AM",
  },
  {
    id: 9,
    initials: "PS",
    initialsBg: "bg-blue-600",
    name: "Pooja Saini",
    email: "pooja@atscallcenter.com",
    role: "Agent",
    roleBadgeColor: "bg-emerald-50 text-[#13AB4A]",
    team: "Calling",
    status: "Active",
    lastLogin: "18 Oct 2026 10:20 AM",
  },
  {
    id: 10,
    initials: "VS",
    initialsBg: "bg-indigo-600",
    name: "Vikram Singh",
    email: "vikram@atscallcenter.com",
    role: "Data Analyst",
    roleBadgeColor: "bg-sky-50 text-sky-700",
    team: "Reports",
    status: "Active",
    lastLogin: "17 Oct 2026 06:50 PM",
  },
];

const INITIAL_ROLES: RoleItem[] = [
  { id: 1, name: "Admin", count: 2, desc: "Full system access" },
  { id: 2, name: "Team Leader", count: 5, desc: "Manage team performance" },
  { id: 3, name: "Agent", count: 14, desc: "Handle calls and leads" },
  { id: 4, name: "Supervisor", count: 2, desc: "Monitor team performance" },
  { id: 5, name: "Quality Analyst", count: 1, desc: "Call quality and monitoring" },
  { id: 6, name: "Data Analyst", count: 1, desc: "Access to reports and analytics" },
  { id: 7, name: "HR Manager", count: 0, desc: "Employee management" },
  { id: 8, name: "Viewer", count: 0, desc: "Read-only access" },
];

export const UsersRolesPage: React.FC = () => {
  const [users, setUsers] = useState<UserRow[]>(USERS_DATA);
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<UserRow | null>(null);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<UserRow | null>(null);
  const [roles, setRoles] = useState<RoleItem[]>(INITIAL_ROLES);
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<RoleItem | null>(null);
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState<RoleItem | null>(null);
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "inactive" | "roles" | "permissions"
  >("all");
  const [selectedRoleName, setSelectedRoleName] = useState<string>("Agent");
  const [permissionSearch, setPermissionSearch] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);

  const rolePermissions = usePermissionStore((state) => state.rolePermissions);
  const updateRolePermissions = usePermissionStore(
    (state) => state.updateRolePermissions,
  );

  const currentPermissions = rolePermissions[selectedRoleName] || [];

  const handleToggle = (perm: Permission) => {
    let next: Permission[];
    if (currentPermissions.includes(perm)) {
      next = currentPermissions.filter((p) => p !== perm);
    } else {
      next = [...currentPermissions, perm];
    }
    updateRolePermissions(selectedRoleName, next);
  };

  const filteredUsers = users.filter((u) => {
    if (activeTab === "active") return u.status === "Active";
    if (activeTab === "inactive") return u.status === "Inactive";
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">Users & Roles</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Users & Roles
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your team members, roles and permissions for the call center
            system.
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* 4 Modern Responsive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Card 1: Total Users */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" /> +3
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">24</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Total Users</div>
          </div>
        </div>

        {/* Card 2: Active Users */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-[#E9F9EE] text-[#13AB4A] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              83% Active
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">20</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Active Users</div>
          </div>
        </div>

        {/* Card 3: Inactive Users */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#EF9612] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#EF9612] border border-amber-100 flex items-center gap-0.5 whitespace-nowrap">
              17% Inactive
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">4</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Inactive Users</div>
          </div>
        </div>

        {/* Card 4: Total Roles */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#871CF4] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100 flex items-center gap-0.5 whitespace-nowrap">
              Permissions
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">8</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Total Roles</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-600 overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { key: "all", label: "All Users" },
          { key: "active", label: "Active" },
          { key: "inactive", label: "Inactive" },
          { key: "roles", label: "Roles" },
          { key: "permissions", label: "Permissions" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-2.5 transition-colors relative ${
              activeTab === tab.key
                ? "text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]"
                : "hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Users Table (~62%) + Right Roles & Permission Cards (~38%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Section: Filter Bar & Table */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-3">
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="relative flex-1 min-w-[180px] w-full sm:w-auto">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, email, role or department..."
                className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none"
              />
            </div>

            {/* Responsive Filter Selects: Flex with wrap to fit perfectly on mobile screens */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <select className="flex-1 sm:flex-none min-w-[80px] px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Agent</option>
              </select>
              <select className="flex-1 sm:flex-none min-w-[80px] px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs">
                <option>All Teams</option>
                <option>Management</option>
                <option>Calling</option>
              </select>
              <select className="flex-1 sm:flex-none min-w-[80px] px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <div className="flex items-center gap-1">
                <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600" title="Date Range">
                  <Calendar className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toast.info('Filters Reset', 'Showing all team members')}
                  className="text-[#0362FA] font-semibold hover:underline px-1 text-xs"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[850px] whitespace-nowrap">
                <thead>
                  <tr className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-[#E5EBF2]">
                    <th className="py-2.5 px-3 w-8">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-[#0362FA]"
                      />
                    </th>
                    <th className="py-2.5 px-2 w-6 text-slate-400">#</th>
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Team</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Last Login</th>
                    <th className="py-2.5 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      onClick={() => setSelectedUserForDetail(u)}
                      className="hover:bg-[#F0F7FF] transition-colors cursor-pointer group"
                    >
                      <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-[#0362FA]"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">
                        {u.id}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-full ${u.initialsBg} text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-xs`}
                          >
                            {u.initials}
                          </div>
                          <span className="font-semibold text-slate-900 truncate group-hover:text-[#0362FA]">
                            {u.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                        {u.email}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${u.roleBadgeColor}`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{u.team}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            u.status === "Active"
                              ? "bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200"
                              : "bg-rose-50 text-rose-600 border border-rose-200"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-500 whitespace-nowrap">
                        {u.lastLogin}
                      </td>
                      <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedUserForDetail(u)}
                            className="p-1 text-slate-400 hover:text-[#0362FA] hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedUserForEdit(u)}
                            className="p-1 text-slate-400 hover:text-[#0362FA] hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit User"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <ActionMenu
                            align="right"
                            items={[
                              {
                                label: "View Details",
                                icon: <Eye className="w-3.5 h-3.5" />,
                                onClick: () => setSelectedUserForDetail(u),
                              },
                              {
                                label: "Edit User",
                                icon: <Edit2 className="w-3.5 h-3.5" />,
                                onClick: () => setSelectedUserForEdit(u),
                              },
                              {
                                label: "Reset Password & 2FA",
                                icon: <Key className="w-3.5 h-3.5" />,
                                onClick: () =>
                                  toast.success(
                                    `Password reset token dispatched to ${u.email}`,
                                  ),
                              },
                              {
                                label:
                                  u.status === "Active"
                                    ? "Suspend User Access"
                                    : "Reactivate User",
                                icon: <UserX className="w-3.5 h-3.5" />,
                                onClick: () => {
                                  const nextStatus = u.status === "Active" ? "Inactive" : "Active";
                                  setUsers((prev) =>
                                    prev.map((item) => (item.id === u.id ? { ...item, status: nextStatus } : item))
                                  );
                                  toast.warning(`Updated status for ${u.name} to ${nextStatus}`);
                                },
                              },
                              {
                                label: "Delete User Account",
                                icon: <Trash2 className="w-3.5 h-3.5" />,
                                danger: true,
                                onClick: () => {
                                  setUsers((prev) => prev.filter((item) => item.id !== u.id));
                                  toast.error(
                                    `Removed user ${u.name} from team`,
                                  );
                                },
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#F8FAFC] border-t border-[#E5EBF2] flex items-center justify-between text-xs text-slate-600">
              <span>Showing 1 to 10 of 24 users</span>
              <div className="flex items-center gap-1">
                <button className="p-1 border rounded bg-white">
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button className="px-2.5 py-0.5 bg-[#0362FA] text-white font-bold rounded">
                  1
                </button>
                <button className="px-2.5 py-0.5 bg-white border rounded">
                  2
                </button>
                <button className="px-2.5 py-0.5 bg-white border rounded">
                  3
                </button>
                <button className="p-1 border rounded bg-white">
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Role Management & Role Permissions (~38%) */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-4">
          {/* Card 1: Role Management */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Role Management
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Create and manage roles with specific permissions.
                </p>
              </div>
              <button
                onClick={() => setIsAddRoleOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm active:scale-95 transition-all"
              >
                <Plus className="w-3 h-3" />
                <span>Add Role</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[480px] whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                    <th className="py-2 px-2 w-6">#</th>
                    <th className="py-2 px-3">Role Name</th>
                    <th className="py-2 px-3">Users</th>
                    <th className="py-2 px-3">Description</th>
                    <th className="py-2 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700">
                  {roles.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => {
                        setSelectedRoleName(r.name);
                        setSelectedRoleForDetail(r);
                      }}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        selectedRoleName === r.name ? "bg-blue-50/60 font-semibold" : ""
                      }`}
                    >
                      <td className="py-2 px-2 text-slate-400 font-mono text-[11px]">
                        {r.id}
                      </td>
                      <td className="py-2 px-3 font-semibold text-slate-900">
                        {r.name}
                      </td>
                      <td className="py-2 px-3 text-slate-500 font-mono">
                        {r.count}
                      </td>
                      <td className="py-2 px-3 text-slate-500 max-w-[200px] truncate">
                        {r.desc}
                      </td>
                      <td className="py-2 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1 text-slate-400">
                          <button
                            type="button"
                            onClick={() => setSelectedRoleForDetail(r)}
                            className="p-1 hover:text-[#0362FA] hover:bg-slate-100 rounded transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedRoleForEdit(r)}
                            className="p-1 hover:text-[#0362FA] hover:bg-slate-100 rounded transition-colors"
                            title="Edit Role"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <ActionMenu
                            align="right"
                            items={[
                              {
                                label: "View Details",
                                icon: <Eye className="w-3.5 h-3.5" />,
                                onClick: () => setSelectedRoleForDetail(r),
                              },
                              {
                                label: "Edit Role",
                                icon: <Edit2 className="w-3.5 h-3.5" />,
                                onClick: () => setSelectedRoleForEdit(r),
                              },
                              {
                                label: "Configure Permissions",
                                icon: <Shield className="w-3.5 h-3.5" />,
                                onClick: () => {
                                  setSelectedRoleName(r.name);
                                  toast.info(`Configuring permissions for ${r.name}`);
                                },
                              },
                              {
                                label: "Clone Role",
                                icon: <Plus className="w-3.5 h-3.5" />,
                                onClick: () => {
                                  const cloned: RoleItem = {
                                    id: roles.length + 1,
                                    name: `${r.name} (Copy)`,
                                    count: 0,
                                    desc: `Cloned from ${r.name}`,
                                  };
                                  setRoles((prev) => [...prev, cloned]);
                                  toast.success("Role Cloned", `Created template for ${cloned.name}`);
                                },
                              },
                              {
                                label: "Delete Role",
                                icon: <Trash2 className="w-3.5 h-3.5" />,
                                danger: true,
                                onClick: () => {
                                  if (r.name === "Admin") {
                                    toast.error("Restricted Action", "Default Admin role cannot be deleted.");
                                    return;
                                  }
                                  setRoles((prev) => prev.filter((item) => item.id !== r.id));
                                  toast.error("Role Removed", `Deleted ${r.name} from roles.`);
                                },
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Role Permissions */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Role Permissions
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Manage permissions for the selected role: <span className="font-bold text-[#0362FA]">{selectedRoleName}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="w-full sm:w-1/2">
                <label className="text-[10px] text-slate-400 block mb-0.5">
                  Select Role
                </label>
                <div className="relative">
                  <select
                    value={selectedRoleName}
                    onChange={(e) => setSelectedRoleName(e.target.value)}
                    className="w-full appearance-none px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                  >
                    <option>Admin</option>
                    <option>Team Leader</option>
                    <option>Agent</option>
                    <option>Supervisor</option>
                    <option>Quality Analyst</option>
                    <option>Data Analyst</option>
                    <option>HR Manager</option>
                    <option>Viewer</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label className="text-[10px] text-slate-400 block mb-0.5">
                  Filter Permissions
                </label>
                <div className="relative">
                  <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={permissionSearch}
                    onChange={(e) => setPermissionSearch(e.target.value)}
                    placeholder="Search permissions..."
                    className="w-full pl-7 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0362FA]"
                  />
                </div>
              </div>
            </div>

            {/* Permission Accordions */}
            <div className="space-y-2 pt-1 text-xs">
              {/* Call Center */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-[#F8FAFC] p-2 flex items-center justify-between font-semibold text-slate-800 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#0362FA]" />
                    <span>Call Center</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="p-2.5 space-y-2 bg-white">
                  {[
                    { key: "calls:make" as Permission, label: "Make Calls" },
                    {
                      key: "calls:view_history" as Permission,
                      label: "View Call History",
                    },
                    {
                      key: "calls:listen_recordings" as Permission,
                      label: "Listen to Recordings",
                    },
                    {
                      key: "scripts:use" as Permission,
                      label: "Use Call Scripts",
                    },
                  ].map((p) => {
                    const isChecked = currentPermissions.includes(p.key);
                    return (
                      <label
                        key={p.key}
                        className="flex items-center gap-2 cursor-pointer text-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggle(p.key)}
                          className="rounded border-slate-300 text-[#0362FA] focus:ring-0"
                        />
                        <span>{p.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Leads & Contacts */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-[#F8FAFC] p-2 flex items-center justify-between font-semibold text-slate-800 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#13AB4A]" />
                    <span>Leads & Contacts</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="p-2.5 space-y-2 bg-white">
                  {[
                    { key: "leads:view" as Permission, label: "View Leads" },
                    {
                      key: "leads:create" as Permission,
                      label: "Add / Edit Leads",
                    },
                    {
                      key: "leads:delete" as Permission,
                      label: "Delete Leads",
                    },
                    {
                      key: "leads:export" as Permission,
                      label: "Export Leads",
                    },
                  ].map((p) => {
                    const isChecked = currentPermissions.includes(p.key);
                    return (
                      <label
                        key={p.key}
                        className="flex items-center gap-2 cursor-pointer text-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggle(p.key)}
                          className="rounded border-slate-300 text-[#0362FA] focus:ring-0"
                        />
                        <span>{p.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onUserAdded={(newUser) => {
          toast.success("User Added Successfully", `${newUser.name} added to ${newUser.department} team.`);
        }}
      />

      <AddRoleModal
        isOpen={isAddRoleOpen}
        onClose={() => setIsAddRoleOpen(false)}
        onRoleAdded={(newRole) => {
          const created: RoleItem = {
            id: roles.length + 1,
            name: newRole.name,
            count: 0,
            desc: newRole.description,
          };
          setRoles((prev) => [...prev, created]);
          setSelectedRoleName(newRole.name);
        }}
      />

      {/* View User Details Modal */}
      <UserDetailsModal
        isOpen={!!selectedUserForDetail}
        user={selectedUserForDetail}
        onClose={() => setSelectedUserForDetail(null)}
        onEditUser={(u) => setSelectedUserForEdit(u)}
        onToggleStatus={(u) => {
          const nextStatus = u.status === "Active" ? "Inactive" : "Active";
          setUsers((prev) =>
            prev.map((item) => (item.id === u.id ? { ...item, status: nextStatus } : item))
          );
          setSelectedUserForDetail((prev) => (prev ? { ...prev, status: nextStatus } : null));
          toast.success("Status Updated", `${u.name} is now ${nextStatus}.`);
        }}
      />

      {/* Edit User Profile Modal */}
      <EditUserModal
        isOpen={!!selectedUserForEdit}
        user={selectedUserForEdit}
        onClose={() => setSelectedUserForEdit(null)}
        onUserUpdated={(updated) => {
          setUsers((prev) =>
            prev.map((item) => (item.id === updated.id ? { ...item, ...updated } : item))
          );
          if (selectedUserForDetail?.id === updated.id) {
            setSelectedUserForDetail((prev) => (prev ? { ...prev, ...updated } : null));
          }
        }}
      />

      {/* View Role Details Modal */}
      <RoleDetailsModal
        isOpen={!!selectedRoleForDetail}
        role={selectedRoleForDetail}
        onClose={() => setSelectedRoleForDetail(null)}
        onEditRole={(r) => setSelectedRoleForEdit(r)}
      />

      {/* Edit Role Modal */}
      <EditRoleModal
        isOpen={!!selectedRoleForEdit}
        role={selectedRoleForEdit}
        onClose={() => setSelectedRoleForEdit(null)}
        onRoleUpdated={(updated) => {
          setRoles((prev) =>
            prev.map((item) => (item.id === updated.id ? updated : item))
          );
          if (selectedRoleName === selectedRoleForEdit?.name) {
            setSelectedRoleName(updated.name);
          }
          if (selectedRoleForDetail?.id === updated.id) {
            setSelectedRoleForDetail(updated);
          }
        }}
      />
    </div>
  );
};
