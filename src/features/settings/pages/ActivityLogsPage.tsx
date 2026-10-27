import React, { useState } from 'react';
import {
  Activity,
  Search,
  Filter,
  Download,
  Shield,
  User,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Code2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  Lock,
  Globe,
  X,
  Copy,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
  action: string;
  category: 'Auth' | 'Leads' | 'Telephony' | 'Admin' | 'Billing';
  target: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Blocked';
}

const INITIAL_LOGS: AuditLog[] = [
  {
    id: 'evt-901',
    timestamp: '27 Oct 2026, 03:22 PM',
    actor: {
      name: 'Indrajeet Sharma',
      email: 'indrajeet@atscallcenter.in',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    },
    action: 'Modified Outbound Trunk Dialing Routing',
    category: 'Telephony',
    target: 'Trunk #SIP-DEL-PRI-01',
    ipAddress: '103.24.188.12 (Delhi, IN)',
    status: 'Success',
  },
  {
    id: 'evt-902',
    timestamp: '27 Oct 2026, 02:45 PM',
    actor: {
      name: 'Rohan Mehra',
      email: 'rohan.m@atscallcenter.in',
      role: 'Team Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    },
    action: 'Exported 250 Lead Records to CSV',
    category: 'Leads',
    target: 'Pipeline: Inbound Real Estate High-Intent',
    ipAddress: '122.161.49.201 (Gurugram, IN)',
    status: 'Success',
  },
  {
    id: 'evt-903',
    timestamp: '27 Oct 2026, 01:10 PM',
    actor: {
      name: 'System Bot',
      email: 'security-daemon@atscallcenter.in',
      role: 'Security Engine',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80',
    },
    action: 'Blocked 5 Consecutive Invalid 2FA Attempts',
    category: 'Auth',
    target: 'User: sneha.k@atscallcenter.in',
    ipAddress: '49.207.132.88 (Bengaluru, IN)',
    status: 'Blocked',
  },
  {
    id: 'evt-904',
    timestamp: '27 Oct 2026, 11:30 AM',
    actor: {
      name: 'Priya Sharma',
      email: 'priya.s@atscallcenter.in',
      role: 'Accountant',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    },
    action: 'Updated Corporate Primary Payment Card',
    category: 'Billing',
    target: 'HDFC Corporate Visa •••• 4921',
    ipAddress: '103.24.188.12 (Delhi, IN)',
    status: 'Success',
  },
  {
    id: 'evt-905',
    timestamp: '27 Oct 2026, 09:15 AM',
    actor: {
      name: 'Indrajeet Sharma',
      email: 'indrajeet@atscallcenter.in',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    },
    action: 'Created New Agent Profile (Karan Verma)',
    category: 'Admin',
    target: 'Agent #AG-1092',
    ipAddress: '103.24.188.12 (Delhi, IN)',
    status: 'Success',
  },
  {
    id: 'evt-906',
    timestamp: '26 Oct 2026, 07:40 PM',
    actor: {
      name: 'Aakash Patel',
      email: 'aakash.p@atscallcenter.in',
      role: 'Agent',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    },
    action: 'Downloaded Call Audio Recording (18 Mins)',
    category: 'Telephony',
    target: 'Call #REC-2026-99120',
    ipAddress: '115.110.144.18 (Mumbai, IN)',
    status: 'Success',
  },
];

export const ActivityLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>(INITIAL_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [inspectLog, setInspectLog] = useState<AuditLog | null>(null);

  const filtered = logs.filter((l) => {
    const matchesSearch =
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.ipAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || l.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Activity Logs & Audit Trail</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Activity Logs & Audit Trail</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable SOC-2 & ISO 27001 compliant audit log of user authentications, data exports, role modifications and telephony actions.
          </p>
        </div>

        <button
          onClick={() => toast.success('Audit Log Exported', 'Downloaded encrypted audit_trail_20261027.csv (SHA-256 signed)')}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-[#E5EBF2] rounded-lg hover:bg-slate-50 shadow-sm self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Audit Trail (CSV)</span>
        </button>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">24h Audit Events</span>
            <div className="text-xl font-bold text-slate-900 mt-1">1,842 Events</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% Ingested</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Admin & Config Edits</span>
            <div className="text-xl font-bold text-slate-900 mt-1">38 Changes</div>
            <div className="text-[11px] text-[#0362FA] font-semibold mt-1">By 3 Administrators</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Security Anomalies</span>
            <div className="text-xl font-bold text-rose-600 mt-1">1 Blocked</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Brute-force auto-lock</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Retention Window</span>
            <div className="text-xl font-bold text-slate-900 mt-1">365 Days</div>
            <div className="text-[11px] text-purple-600 font-semibold mt-1">WORM Compliant</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-3.5 border-b border-[#E5EBF2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#FAFCFF]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search user, IP or action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
              />
            </div>

            <div className="flex items-center gap-1 bg-white border border-[#E5EBF2] rounded-lg p-0.5 text-xs">
              {['All', 'Auth', 'Leads', 'Telephony', 'Admin', 'Billing'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-[#0362FA] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filtered.length}</span> audit logs
          </div>
        </div>

        {/* Anti-Shrink Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[950px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5EBF2] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3.5">Timestamp</th>
                <th className="py-3 px-3.5">Actor / User</th>
                <th className="py-3 px-3.5">Action Performed</th>
                <th className="py-3 px-3.5">Category</th>
                <th className="py-3 px-3.5">Target Resource</th>
                <th className="py-3 px-3.5">IP Address & Location</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBF2]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#F0F7FF] transition-colors">
                  <td className="py-3 px-3.5 text-slate-500 font-mono text-[11px]">{log.timestamp}</td>
                  <td className="py-3 px-3.5">
                    <div className="flex items-center gap-2">
                      <img src={log.actor.avatar} alt={log.actor.name} className="w-6 h-6 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-slate-900 leading-tight">{log.actor.name}</div>
                        <div className="text-[10px] text-slate-400">{log.actor.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3.5 font-medium text-slate-800">{log.action}</td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-slate-600 max-w-[200px] truncate">{log.target}</td>
                  <td className="py-3 px-3.5 font-mono text-slate-600 text-[11px]">{log.ipAddress}</td>
                  <td className="py-3 px-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        log.status === 'Success'
                          ? 'bg-[#E9F9EE] text-[#13AB4A] border-emerald-200'
                          : log.status === 'Blocked'
                          ? 'bg-rose-50 text-rose-600 border-rose-200'
                          : 'bg-amber-50 text-amber-600 border-amber-200'
                      }`}
                    >
                      {log.status === 'Success' ? (
                        <CheckCircle2 className="w-3 h-3 text-[#13AB4A]" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                      )}
                      <span>{log.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setInspectLog(log)}
                        className="px-2 py-1 text-[11px] font-semibold text-[#0362FA] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                      >
                        Inspect
                      </button>
                      <ActionMenu
                        align="right"
                        items={[
                          {
                            label: 'Inspect Event Metadata',
                            icon: <Eye className="w-3.5 h-3.5" />,
                            onClick: () => setInspectLog(log),
                          },
                          {
                            label: `Filter by ${log.actor.name}`,
                            icon: <User className="w-3.5 h-3.5" />,
                            onClick: () => setSearchTerm(log.actor.name),
                          },
                          {
                            label: 'Copy Event ID',
                            icon: <Copy className="w-3.5 h-3.5" />,
                            onClick: () => {
                              navigator.clipboard.writeText(log.id);
                              toast.success(`Copied ${log.id}`);
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

        {/* Table Footer */}
        <div className="p-3 bg-[#F8FAFC] border-t border-[#E5EBF2] flex items-center justify-between text-xs text-slate-600">
          <span>Showing 1 to {filtered.length} of {logs.length} events</span>
          <div className="flex items-center gap-1">
            <button className="p-1 border border-[#E5EBF2] rounded bg-white text-slate-400">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-2.5 py-0.5 bg-[#0362FA] text-white font-bold rounded">1</button>
            <button className="p-1 border border-[#E5EBF2] rounded bg-white text-slate-400">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Inspect Event Modal */}
      {inspectLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#0362FA]" />
                <h3 className="font-bold text-slate-900 text-sm">Audit Event Inspector</h3>
              </div>
              <button
                onClick={() => setInspectLog(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{inspectLog.action}</div>
                  <div className="text-slate-400 font-mono text-[11px] mt-0.5">{inspectLog.id} • {inspectLog.timestamp}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F9EE] text-[#13AB4A]">
                  {inspectLog.status}
                </span>
              </div>

              {/* JSON Inspector */}
              <div className="space-y-1">
                <span className="font-bold text-slate-700 block">Event Payload (JSON):</span>
                <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
{JSON.stringify(
  {
    event_id: inspectLog.id,
    timestamp: inspectLog.timestamp,
    actor: inspectLog.actor,
    action: inspectLog.action,
    category: inspectLog.category,
    resource: inspectLog.target,
    client_ip: inspectLog.ipAddress,
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0',
    compliance_flags: ['SOC2_TYPE_II', 'GDPR_VERIFIED'],
  },
  null,
  2
)}
                </pre>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(inspectLog, null, 2));
                  toast.success('JSON copied to clipboard');
                }}
                className="px-3 py-1.5 font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy JSON</span>
              </button>
              <button
                onClick={() => setInspectLog(null)}
                className="px-4 py-1.5 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
