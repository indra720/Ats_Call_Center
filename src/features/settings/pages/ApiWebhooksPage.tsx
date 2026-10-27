import React, { useState } from 'react';
import {
  Key,
  Webhook,
  Plus,
  Copy,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield,
  RefreshCw,
  Trash2,
  Eye,
  EyeOff,
  Code2,
  Send,
  Lock,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  scope: string;
  createdOn: string;
  lastUsed: string;
  status: 'Active' | 'Revoked';
}

interface WebhookItem {
  id: string;
  name: string;
  url: string;
  events: string[];
  successRate: string;
  lastTriggered: string;
  status: 'Active' | 'Failing';
}

const INITIAL_KEYS: ApiKey[] = [
  {
    id: 'key-1',
    name: 'Production Zoho CRM Integration',
    prefix: 'ats_live_79a2...98f1',
    scope: 'Read + Write (Calls & Leads)',
    createdOn: '12 Jan 2026',
    lastUsed: '2 mins ago',
    status: 'Active',
  },
  {
    id: 'key-2',
    name: 'Website Lead Ingestion Form Bot',
    prefix: 'ats_live_33b8...4421',
    scope: 'Write Only (Leads Ingest)',
    createdOn: '04 Mar 2026',
    lastUsed: '14 mins ago',
    status: 'Active',
  },
  {
    id: 'key-3',
    name: 'Staging & Developer Testing Key',
    prefix: 'ats_test_88f0...1120',
    scope: 'Full Admin Sandbox',
    createdOn: '15 Aug 2026',
    lastUsed: '3 days ago',
    status: 'Active',
  },
];

const INITIAL_WEBHOOKS: WebhookItem[] = [
  {
    id: 'wh-1',
    name: 'Post-Call Automation to ERP',
    url: 'https://api.myenterprise.in/v1/telephony/callbacks',
    events: ['call.completed', 'recording.transcribed'],
    successRate: '99.8%',
    lastTriggered: '5 mins ago',
    status: 'Active',
  },
  {
    id: 'wh-2',
    name: 'Slack Notification Dispatcher',
    url: 'https://hooks.slack.com/services/T00/B00/X00',
    events: ['lead.high_intent', 'missed.callback_requested'],
    successRate: '100%',
    lastTriggered: '22 mins ago',
    status: 'Active',
  },
  {
    id: 'wh-3',
    name: 'Custom BI Warehouse Ingest (BigQuery)',
    url: 'https://etl.datahub.internal/events/ats_cdr',
    events: ['call.cdr_generated', 'agent.disposition_logged'],
    successRate: '99.4%',
    lastTriggered: '1 hour ago',
    status: 'Active',
  },
];

export const ApiWebhooksPage: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>(INITIAL_KEYS);
  const [webhooks, setWebhooks] = useState<WebhookItem[]>(INITIAL_WEBHOOKS);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showWebhookModal, setShowWebhookModal] = useState(false);

  // New Key Form
  const [keyName, setKeyName] = useState('');
  const [keyScope, setKeyScope] = useState('Read + Write');

  // New Webhook Form
  const [whName, setWhName] = useState('');
  const [whUrl, setWhUrl] = useState('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to Clipboard', `${label} copied successfully.`);
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: keyName || 'New Service API Key',
      prefix: `ats_live_${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
      scope: keyScope,
      createdOn: 'Just now',
      lastUsed: 'Never',
      status: 'Active',
    };
    setKeys([newKey, ...keys]);
    setShowKeyModal(false);
    setKeyName('');
    toast.success('API Key Generated', 'Save the private secret key token now; it will not be displayed again.');
  };

  const handleCreateWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    const newWh: WebhookItem = {
      id: `wh-${Date.now()}`,
      name: whName || 'Custom Event Webhook',
      url: whUrl || 'https://api.myenterprise.in/webhook',
      events: ['call.completed', 'lead.created'],
      successRate: '100%',
      lastTriggered: 'Pending First Event',
      status: 'Active',
    };
    setWebhooks([newWh, ...webhooks]);
    setShowWebhookModal(false);
    setWhName('');
    setWhUrl('');
    toast.success('Webhook Registered', 'Outbound HMAC signature header will be included with all HTTP POST payloads.');
  };

  const sendTestPing = (wh: WebhookItem) => {
    toast.info('Sending Test Ping', `HTTP POST test payload sent to ${wh.url}`);
    setTimeout(() => {
      toast.success('Ping Successful', 'Endpoint responded with HTTP 200 OK (52ms)');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">API Keys & Webhooks</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">API Keys & Webhooks</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage developer REST API access tokens, HMAC signatures, and real-time webhook event subscriptions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKeyModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-[#E5EBF2] rounded-lg hover:bg-slate-50 shadow-sm"
          >
            <Key className="w-3.5 h-3.5 text-slate-500" />
            <span>New API Key</span>
          </button>
          <button
            onClick={() => setShowWebhookModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Webhook</span>
          </button>
        </div>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Active REST Tokens</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{keys.length} Keys</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">All Authenticated</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Key className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Outbound Webhooks</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{webhooks.length} Endpoints</div>
            <div className="text-[11px] text-[#0362FA] font-semibold mt-1">99.7% Delivery SLA</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Webhook className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Monthly API Volume</span>
            <div className="text-xl font-bold text-slate-900 mt-1">4.2M Calls</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Rate limit: 1,000 req/min</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Average Latency</span>
            <div className="text-xl font-bold text-slate-900 mt-1">38 ms</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Delhi/NCR Gateway</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Section 1: REST API Keys */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E5EBF2] flex items-center justify-between bg-[#FAFCFF]">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Developer API Keys</h3>
            <p className="text-xs text-slate-400 mt-0.5">Use these keys to authenticate server-to-server REST requests</p>
          </div>
          <a
            href="#api-docs"
            onClick={(e) => {
              e.preventDefault();
              toast.info('API Documentation', 'Opening OpenAPI v3.1 reference docs');
            }}
            className="text-xs font-semibold text-[#0362FA] hover:underline flex items-center gap-1"
          >
            <span>View API Docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[850px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5EBF2] text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-3.5">Key Name & Description</th>
                <th className="py-3 px-3.5">API Token Prefix</th>
                <th className="py-3 px-3.5">Granted Scopes</th>
                <th className="py-3 px-3.5">Created Date</th>
                <th className="py-3 px-3.5">Last Active</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBF2]">
              {keys.map((k) => (
                <tr key={k.id} className="hover:bg-[#F0F7FF] transition-colors">
                  <td className="py-3 px-3.5 font-bold text-slate-800">{k.name}</td>
                  <td className="py-3 px-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                        {k.prefix}
                      </span>
                      <button
                        onClick={() => copyToClipboard(k.prefix, 'Token Prefix')}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded"
                        title="Copy Key Prefix"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#0362FA]">
                      {k.scope}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-slate-600">{k.createdOn}</td>
                  <td className="py-3 px-3.5 text-slate-600">{k.lastUsed}</td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                      {k.status}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <div className="flex items-center justify-center">
                      <ActionMenu
                        align="right"
                        items={[
                          {
                            label: 'Copy Key Prefix',
                            icon: <Copy className="w-3.5 h-3.5" />,
                            onClick: () => copyToClipboard(k.prefix, 'Key Prefix'),
                          },
                          {
                            label: 'Regenerate Secret Key',
                            icon: <RefreshCw className="w-3.5 h-3.5" />,
                            onClick: () => toast.warning('Secret regenerated. Previous token invalid.'),
                          },
                          {
                            label: 'Revoke Key',
                            icon: <Trash2 className="w-3.5 h-3.5" />,
                            danger: true,
                            onClick: () => {
                              setKeys(keys.filter((item) => item.id !== k.id));
                              toast.error(`Revoked API key: ${k.name}`);
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

      {/* Section 2: Outbound Webhooks */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E5EBF2] flex items-center justify-between bg-[#FAFCFF]">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Outbound Event Webhooks</h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time HTTP POST notifications sent when telephony and CRM events occur</p>
          </div>
          <button
            onClick={() => setShowWebhookModal(true)}
            className="text-xs font-semibold text-[#0362FA] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Endpoint</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[850px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5EBF2] text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-3.5">Webhook Name</th>
                <th className="py-3 px-3.5">Endpoint URL</th>
                <th className="py-3 px-3.5">Subscribed Topics</th>
                <th className="py-3 px-3.5">Success Rate</th>
                <th className="py-3 px-3.5">Last Triggered</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBF2]">
              {webhooks.map((wh) => (
                <tr key={wh.id} className="hover:bg-[#F0F7FF] transition-colors">
                  <td className="py-3 px-3.5 font-bold text-slate-800">{wh.name}</td>
                  <td className="py-3 px-3.5 font-mono text-[11px] text-[#0362FA] max-w-[280px] truncate">
                    {wh.url}
                  </td>
                  <td className="py-3 px-3.5">
                    <div className="flex flex-wrap gap-1 max-w-[240px]">
                      {wh.events.map((ev, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-100 text-slate-700">
                          {ev}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3.5 font-bold text-emerald-600 font-mono">{wh.successRate}</td>
                  <td className="py-3 px-3.5 text-slate-600">{wh.lastTriggered}</td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                      {wh.status}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => sendTestPing(wh)}
                        className="px-2 py-1 text-[11px] font-semibold text-[#0362FA] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                      >
                        Ping
                      </button>
                      <ActionMenu
                        align="right"
                        items={[
                          {
                            label: 'Send Test Ping Event',
                            icon: <Send className="w-3.5 h-3.5" />,
                            onClick: () => sendTestPing(wh),
                          },
                          {
                            label: 'Copy Endpoint URL',
                            icon: <Copy className="w-3.5 h-3.5" />,
                            onClick: () => copyToClipboard(wh.url, 'Webhook URL'),
                          },
                          {
                            label: 'Delete Webhook',
                            icon: <Trash2 className="w-3.5 h-3.5" />,
                            danger: true,
                            onClick: () => {
                              setWebhooks(webhooks.filter((w) => w.id !== wh.id));
                              toast.error(`Removed webhook: ${wh.name}`);
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

      {/* Create Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-[#0362FA]" />
                <h3 className="font-bold text-slate-900 text-sm">Create API Access Key</h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateKey} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Key Description / Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Mobile App Backend Service"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Permission Scope</label>
                <select
                  value={keyScope}
                  onChange={(e) => setKeyScope(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                >
                  <option value="Read + Write">Full Access (Read + Write - Calls & CRM)</option>
                  <option value="Read Only">Read Only (CDR & Reports Reporting)</option>
                  <option value="Write Only">Write Only (Lead Web Ingestion Only)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-3 py-1.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Webhook Modal */}
      {showWebhookModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Webhook className="w-5 h-5 text-[#0362FA]" />
                <h3 className="font-bold text-slate-900 text-sm">Register Outbound Webhook</h3>
              </div>
              <button
                onClick={() => setShowWebhookModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateWebhook} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Webhook Name</label>
                <input
                  type="text"
                  placeholder="e.g. Salesforce Lead Syncer"
                  value={whName}
                  onChange={(e) => setWhName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Endpoint URL (HTTPS Only)</label>
                <input
                  type="url"
                  placeholder="https://api.yourdomain.com/webhooks"
                  value={whUrl}
                  onChange={(e) => setWhUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-xs"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Event Subscriptions</label>
                <div className="space-y-1.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {['call.completed', 'call.missed', 'lead.created', 'recording.transcribed', 'voicemail.received'].map(
                    (ev) => (
                      <label key={ev} className="flex items-center gap-2 font-mono text-[11px] text-slate-700 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#0362FA]" />
                        <span>{ev}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowWebhookModal(false)}
                  className="px-3 py-1.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Register Webhook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
