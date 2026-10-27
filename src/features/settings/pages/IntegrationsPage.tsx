import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  ExternalLink,
  Settings,
  RefreshCw,
  Zap,
  Phone,
  MessageSquare,
  Database,
  CreditCard,
  Radio,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Copy,
  Lock,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface IntegrationItem {
  id: string;
  name: string;
  category: 'Telephony' | 'CRM' | 'Messaging' | 'Payments' | 'Automation';
  icon: string;
  description: string;
  status: 'Connected' | 'Configured' | 'Disconnected';
  lastSync: string;
  metrics: string;
}

const INTEGRATIONS_DATA: IntegrationItem[] = [
  {
    id: 'int-1',
    name: 'WhatsApp Cloud API (Meta)',
    category: 'Messaging',
    icon: '💬',
    description: 'Official Meta Graph API v20.0 for automated two-way customer messaging.',
    status: 'Connected',
    lastSync: '1 min ago',
    metrics: '99.8% Delivery Rate',
  },
  {
    id: 'int-2',
    name: 'Twilio Voice Elastic SIP Trunk',
    category: 'Telephony',
    icon: '📞',
    description: 'Global cloud PSTN termination with dynamic caller ID and whisper audio coaching.',
    status: 'Connected',
    lastSync: 'Just now',
    metrics: '18 Active Channels',
  },
  {
    id: 'int-3',
    name: 'Exotel CTI Telephony',
    category: 'Telephony',
    icon: '📡',
    description: 'Indian virtual numbers (011/080/022) with automated IVR & call masking.',
    status: 'Connected',
    lastSync: '4 mins ago',
    metrics: '4 DID Numbers Active',
  },
  {
    id: 'int-4',
    name: 'Zoho CRM Two-Way Sync',
    category: 'CRM',
    icon: '📊',
    description: 'Real-time bi-directional lead ingestion, contact enrichment, and pipeline updates.',
    status: 'Connected',
    lastSync: '12 mins ago',
    metrics: '14,280 Contacts Synced',
  },
  {
    id: 'int-5',
    name: 'Salesforce Enterprise Cloud',
    category: 'CRM',
    icon: '☁️',
    description: 'Lead assignment rules, click-to-dial CTI widget, and disposition logging.',
    status: 'Configured',
    lastSync: '2 hours ago',
    metrics: 'OAuth 2.0 Linked',
  },
  {
    id: 'int-6',
    name: 'Zapier Webhook Automations',
    category: 'Automation',
    icon: '⚡',
    description: 'Connect ATS call events with 5,000+ business applications and Google Sheets.',
    status: 'Connected',
    lastSync: '15 mins ago',
    metrics: '12 Zaps Active',
  },
  {
    id: 'int-7',
    name: 'Razorpay Auto-Debit Subscriptions',
    category: 'Payments',
    icon: '💳',
    description: 'NPCI e-Mandate auto-debit payments and instant payment link generation via SMS.',
    status: 'Connected',
    lastSync: 'Yesterday',
    metrics: 'PCI-DSS Verified',
  },
  {
    id: 'int-8',
    name: 'Slack Alerts & Channels',
    category: 'Messaging',
    icon: '🔔',
    description: 'Push high-intent incoming leads and missed call alerts directly to team channels.',
    status: 'Connected',
    lastSync: '32 mins ago',
    metrics: '#sales-leads Connected',
  },
];

export const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(INTEGRATIONS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationItem | null>(null);

  // Modal State
  const [apiKey, setApiKey] = useState('ats_prod_sec_9941029384712039');
  const [webhookUrl, setWebhookUrl] = useState('https://api.atscallcenter.in/v1/integrations/callback');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    provider: 'Twilio Cloud PRI',
    category: 'Telephony' as IntegrationItem['category'],
    apiKey: '',
    apiSecret: '',
    webhookUrl: 'https://api.atscallcenter.in/v1/integrations/incoming',
    environment: 'Production',
    autoSync: true,
  });

  const handleCreateIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntegration.name.trim()) {
      toast.error('Validation Error', 'Please enter an integration name.');
      return;
    }
    const created: IntegrationItem = {
      id: `int-${Date.now()}`,
      name: newIntegration.name.trim(),
      category: newIntegration.category,
      icon:
        newIntegration.category === 'Telephony'
          ? '📞'
          : newIntegration.category === 'CRM'
          ? '🏢'
          : newIntegration.category === 'Messaging'
          ? '💬'
          : newIntegration.category === 'Payments'
          ? '💳'
          : '⚡',
      description: `${newIntegration.provider} connection configured for ${newIntegration.environment} environment.`,
      status: 'Connected',
      lastSync: 'Just now',
      metrics: 'Active Gateway',
    };
    setIntegrations([created, ...integrations]);
    setIsAddModalOpen(false);
    toast.success('Integration Added', `${newIntegration.name} successfully connected and verified.`);
    setNewIntegration({
      name: '',
      provider: 'Twilio Cloud PRI',
      category: 'Telephony',
      apiKey: '',
      apiSecret: '',
      webhookUrl: 'https://api.atscallcenter.in/v1/integrations/incoming',
      environment: 'Production',
      autoSync: true,
    });
  };

  const filtered = integrations.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const testConnection = (item: IntegrationItem) => {
    toast.info('Testing Connection', `Sending ping to ${item.name}...`);
    setTimeout(() => {
      toast.success('Connection Verified', `${item.name} responded with HTTP 200 OK (38ms latency).`);
    }, 700);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Configuration Saved', `${selectedIntegration?.name} settings and credentials updated.`);
    setSelectedIntegration(null);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">3rd-Party Integrations</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">3rd-Party Integrations</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Connect enterprise telephony trunks, CRMs, WhatsApp Business API, and automated billing gateways.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm self-start sm:self-auto active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Integration</span>
        </button>
      </div>

      {/* Balanced Modern KPI Cards (2 cols on mobile, 4 cols on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3" /> Healthy
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">7 of 8</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Active Connectors</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0362FA] border border-blue-100 flex items-center gap-0.5 whitespace-nowrap">
              99.94% SLA
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">1.28M</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Monthly Dispatches</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              PRI Trunk
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">28 ms</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Telephony Latency</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100 flex items-center gap-0.5 whitespace-nowrap">
              OAuth 2.0
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Tokens Valid</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Auto-refresh Active</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] p-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['All', 'Telephony', 'CRM', 'Messaging', 'Payments', 'Automation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#0362FA] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0362FA]"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-xl flex items-center justify-center shrink-0 shadow-xs">
                  {item.icon}
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${
                    item.status === 'Connected'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-blue-50 text-[#0362FA] border-blue-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.status === 'Connected' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                  />
                  <span>{item.status}</span>
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm mt-3">{item.name}</h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed min-h-[32px]">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-mono font-medium text-slate-400 truncate max-w-[120px]">
                {item.metrics}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => testConnection(item)}
                  className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  Test
                </button>
                <button
                  onClick={() => setSelectedIntegration(item)}
                  className="px-2.5 py-1 text-[11px] font-bold text-[#0362FA] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sync Events History Table (Anti-Shrink) */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        <div className="p-3.5 border-b border-[#E5EBF2] flex items-center justify-between bg-[#FAFCFF]">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Integration Webhook Logs & Sync Events
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Real-time trace of API requests and webhook callbacks</p>
          </div>
          <button
            onClick={() => toast.info('Refreshed', 'Latest 10 webhook events fetched')}
            className="flex items-center gap-1 text-xs text-[#0362FA] font-semibold hover:underline"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Refresh Stream</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[850px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5EBF2] text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-2.5 px-3.5">Platform Connector</th>
                <th className="py-2.5 px-3.5">Webhook Event</th>
                <th className="py-2.5 px-3.5">Timestamp</th>
                <th className="py-2.5 px-3.5">Latency</th>
                <th className="py-2.5 px-3.5">Payload Size</th>
                <th className="py-2.5 px-3.5">HTTP Code</th>
                <th className="py-2.5 px-3.5 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBF2] text-slate-700">
              {[
                { name: 'WhatsApp Cloud API', event: 'messages.delivered', time: '1 min ago', latency: '24ms', size: '1.2 KB', code: '200 OK' },
                { name: 'Twilio Voice Elastic', event: 'call.cdr_recorded', time: '3 mins ago', latency: '42ms', size: '4.8 KB', code: '200 OK' },
                { name: 'Zoho CRM Sync', event: 'lead.upsert_success', time: '8 mins ago', latency: '110ms', size: '2.1 KB', code: '200 OK' },
                { name: 'Razorpay Mandate', event: 'subscription.charged', time: '14 mins ago', latency: '88ms', size: '3.4 KB', code: '200 OK' },
                { name: 'Slack Dispatcher', event: 'notification.dispatched', time: '22 mins ago', latency: '19ms', size: '0.8 KB', code: '200 OK' },
              ].map((log, idx) => (
                <tr key={idx} className="hover:bg-[#F0F7FF] transition-colors">
                  <td className="py-2.5 px-3.5 font-bold text-slate-900">{log.name}</td>
                  <td className="py-2.5 px-3.5 font-mono text-[11px] text-[#0362FA]">{log.event}</td>
                  <td className="py-2.5 px-3.5 text-slate-500">{log.time}</td>
                  <td className="py-2.5 px-3.5 font-mono text-emerald-600 font-bold">{log.latency}</td>
                  <td className="py-2.5 px-3.5 font-mono text-slate-600">{log.size}</td>
                  <td className="py-2.5 px-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                      {log.code}
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 text-center">
                    <ActionMenu
                      align="right"
                      items={[
                        {
                          label: 'Inspect Event JSON',
                          icon: <Database className="w-3.5 h-3.5" />,
                          onClick: () => toast.info(`Viewing payload for ${log.event}`),
                        },
                        {
                          label: 'Re-trigger Event',
                          icon: <RefreshCw className="w-3.5 h-3.5" />,
                          onClick: () => toast.success(`Replayed webhook ${log.event}`),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configuration Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedIntegration.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{selectedIntegration.name} Configuration</h3>
                  <p className="text-[11px] text-slate-400">Manage credentials, webhook callbacks, and sync rules</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedIntegration(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">API Key / Secret Token</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(apiKey);
                      toast.success('Token copied to clipboard');
                    }}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Webhook Callback URL</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0362FA] text-[11px]">Two-Way Automated Sync</div>
                  <div className="text-[10px] text-slate-500">Pushes leads immediately upon call completion</div>
                </div>
                <button
                  type="button"
                  onClick={() => testConnection(selectedIntegration)}
                  className="px-3 py-1 font-bold text-xs bg-[#0362FA] text-white rounded-lg shadow-xs hover:bg-blue-600"
                >
                  Test Ping
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedIntegration(null)}
                  className="px-3 py-1.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Integration Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Add New 3rd-Party Integration</h3>
                  <p className="text-[11px] text-slate-500">Connect telephony trunks, CRM databases, or messaging APIs</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateIntegration} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Provider / Platform *</label>
                <select
                  value={newIntegration.provider}
                  onChange={(e) => {
                    const p = e.target.value;
                    let cat: IntegrationItem['category'] = 'Telephony';
                    if (p.includes('CRM') || p.includes('Salesforce') || p.includes('Zoho') || p.includes('LeadSquared')) cat = 'CRM';
                    if (p.includes('WhatsApp') || p.includes('Slack')) cat = 'Messaging';
                    if (p.includes('Stripe') || p.includes('Razorpay')) cat = 'Payments';
                    setNewIntegration((prev) => ({
                      ...prev,
                      provider: p,
                      name: p,
                      category: cat,
                    }));
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                >
                  <option value="Twilio Cloud PRI">Twilio Cloud Voice PRI (Telephony)</option>
                  <option value="Exotel Cloud PBX">Exotel Cloud PBX (Telephony)</option>
                  <option value="Salesforce Enterprise CRM">Salesforce Enterprise CRM (CRM)</option>
                  <option value="Zoho CRM Enterprise">Zoho CRM Enterprise (CRM)</option>
                  <option value="LeadSquared Telephony Sync">LeadSquared Telephony Sync (CRM)</option>
                  <option value="Meta WhatsApp Business API">Meta WhatsApp Business API (Messaging)</option>
                  <option value="Slack Alerts & Notification Bot">Slack Alerts & Notification Bot (Messaging)</option>
                  <option value="Stripe Billing & Invoicing Gateway">Stripe Billing & Invoicing Gateway (Payments)</option>
                  <option value="Razorpay Instant Payouts">Razorpay Instant Payouts (Payments)</option>
                  <option value="Custom REST API Webhook">Custom REST API Webhook (Automation)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Integration Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sales Dialing Trunk"
                    value={newIntegration.name}
                    onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newIntegration.category}
                    onChange={(e) => setNewIntegration({ ...newIntegration, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                  >
                    <option value="Telephony">Telephony & Trunks</option>
                    <option value="CRM">CRM & Customer Data</option>
                    <option value="Messaging">Messaging & Chat</option>
                    <option value="Payments">Payment Gateways</option>
                    <option value="Automation">Automation & Webhooks</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">API Key / Account SID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AC_live_9941029384"
                  value={newIntegration.apiKey}
                  onChange={(e) => setNewIntegration({ ...newIntegration, apiKey: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Auth Secret / Token</label>
                <input
                  type="password"
                  placeholder="e.g. sec_token_1902839184"
                  value={newIntegration.apiSecret}
                  onChange={(e) => setNewIntegration({ ...newIntegration, apiSecret: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Webhook Callback URL</label>
                <input
                  type="url"
                  value={newIntegration.webhookUrl}
                  onChange={(e) => setNewIntegration({ ...newIntegration, webhookUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">Two-Way Realtime Sync</span>
                  <span className="text-[10px] text-slate-500">Sync contact records, calls and dispositions instantly</span>
                </div>
                <input
                  type="checkbox"
                  checked={newIntegration.autoSync}
                  onChange={(e) => setNewIntegration({ ...newIntegration, autoSync: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0362FA] focus:ring-[#0362FA]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm active:scale-95 transition-all"
                >
                  Connect & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
