import React, { useState } from 'react';
import {
  Server,
  Cpu,
  HardDrive,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Trash2,
  Zap,
  Play,
  RotateCcw,
  ShieldAlert,
  Clock,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Database,
  Radio,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface ServiceHealth {
  id: string;
  name: string;
  type: string;
  latency: string;
  uptime: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  version: string;
}

const SERVICES: ServiceHealth[] = [
  {
    id: 'srv-1',
    name: 'SIP Telephony PBX Core (FreeSWITCH / Asterisk)',
    type: 'Voice Engine',
    latency: '12 ms',
    uptime: '48d 14h',
    status: 'Operational',
    version: 'v1.10.9-release',
  },
  {
    id: 'srv-2',
    name: 'PostgreSQL Distributed DB Cluster',
    type: 'Primary Storage',
    latency: '4 ms',
    uptime: '180d 02h',
    status: 'Operational',
    version: 'PostgreSQL 16.4',
  },
  {
    id: 'srv-3',
    name: 'Redis In-Memory Queue & Agent State Manager',
    type: 'Call Queue',
    latency: '< 1 ms',
    uptime: '48d 14h',
    status: 'Operational',
    version: 'Redis 7.2 Enterprise',
  },
  {
    id: 'srv-4',
    name: 'Whisper AI Speech-to-Text Transcriber',
    type: 'AI Inference',
    latency: '180 ms',
    uptime: '12d 08h',
    status: 'Operational',
    version: 'v3-turbo-large',
  },
  {
    id: 'srv-5',
    name: 'Outbound Webhook Delivery Microservice',
    type: 'Event Dispatcher',
    latency: '24 ms',
    uptime: '48d 14h',
    status: 'Operational',
    version: 'Go 1.22 daemon',
  },
  {
    id: 'srv-6',
    name: 'DLT SMS & WhatsApp Gateway Relay',
    type: 'Messaging SMS',
    latency: '85 ms',
    uptime: '99.9%',
    status: 'Operational',
    version: 'v2.4 SMPP',
  },
];

export const SystemMaintenancePage: React.FC = () => {
  const [services, setServices] = useState<ServiceHealth[]>(SERVICES);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);

  const triggerCacheClear = () => {
    toast.info('Purging Cache', 'Clearing temp waveform buffers and transient voice sessions...');
    setTimeout(() => {
      toast.success('Cache Purged', 'Freed 1.4 GB of temporary disk space.');
    }, 700);
  };

  const runDiagnostics = () => {
    setIsDiagnosticRunning(true);
    toast.info('Diagnostic In Progress', 'Running ping tests across SIP gateways, DB replication, and AI endpoints...');
    setTimeout(() => {
      setIsDiagnosticRunning(false);
      toast.success('All Systems Healthy', 'Zero packet loss detected. Telephony jitter < 2ms.');
    }, 1200);
  };

  const restartService = (name: string) => {
    toast.warning('Worker Restart Queued', `Gracefully recycling worker process for ${name}`);
    setTimeout(() => {
      toast.success('Worker Recycled', `${name} is operational.`);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">System Maintenance & Health</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Maintenance & Health</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time server vitals, SIP trunks uptime, cache purges and diagnostic logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerCacheClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-[#E5EBF2] rounded-lg hover:bg-slate-50 shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Purge Voice Cache</span>
          </button>
          <button
            onClick={runDiagnostics}
            disabled={isDiagnosticRunning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isDiagnosticRunning ? 'animate-spin' : ''}`} />
            <span>Run Health Self-Test</span>
          </button>
        </div>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">System Availability SLA</span>
            <div className="text-xl font-bold text-slate-900 mt-1">99.98%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Operational 48 Days</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">CPU Load Average</span>
            <div className="text-xl font-bold text-slate-900 mt-1">22.4%</div>
            <div className="text-[11px] text-[#0362FA] font-semibold mt-1">16 vCPU Cluster</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Memory Allocation</span>
            <div className="text-xl font-bold text-slate-900 mt-1">8.4 / 32 GB</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">26% Utilization</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Active SIP Channels</span>
            <div className="text-xl font-bold text-slate-900 mt-1">18 / 100 Live</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">82 Available Channels</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Services Health Table */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E5EBF2] flex items-center justify-between bg-[#FAFCFF]">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Infrastructure Service Health</h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time status of daemon processes, database connections, and AI speech engines</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All 6 Services Normal</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[850px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5EBF2] text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-3.5">Daemon / Service Name</th>
                <th className="py-3 px-3.5">Subsystem Scope</th>
                <th className="py-3 px-3.5">Latency</th>
                <th className="py-3 px-3.5">Engine Build</th>
                <th className="py-3 px-3.5">Uptime</th>
                <th className="py-3 px-3.5">Health Status</th>
                <th className="py-3 px-3.5 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBF2]">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-[#F0F7FF] transition-colors">
                  <td className="py-3 px-3.5">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-slate-400" />
                      <span>{srv.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {srv.type}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 font-mono font-bold text-slate-700">{srv.latency}</td>
                  <td className="py-3 px-3.5 font-mono text-[11px] text-slate-400">{srv.version}</td>
                  <td className="py-3 px-3.5 text-slate-600 font-mono text-[11px]">{srv.uptime}</td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#13AB4A]" />
                      <span>{srv.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => restartService(srv.name)}
                        className="px-2 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                      >
                        Recycle
                      </button>
                      <ActionMenu
                        align="right"
                        items={[
                          {
                            label: 'Recycle Service Worker',
                            icon: <RotateCcw className="w-3.5 h-3.5" />,
                            onClick: () => restartService(srv.name),
                          },
                          {
                            label: 'Ping Health Check',
                            icon: <Zap className="w-3.5 h-3.5" />,
                            onClick: () => toast.success('Pong: 200 OK (8ms)'),
                          },
                          {
                            label: 'View stdout / stderr Log',
                            icon: <Terminal className="w-3.5 h-3.5" />,
                            onClick: () => toast.info(`Tailing last 50 lines of ${srv.name}`),
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
    </div>
  );
};
