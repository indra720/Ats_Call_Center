import React, { useState } from 'react';
import {
  X,
  GitFork,
  Globe,
  Share2,
  MessageSquare,
  PhoneCall,
  Link2,
  DollarSign,
  Users,
  ShieldCheck,
  Check,
  Copy,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

interface AddLeadSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSourceCreated?: (source: any) => void;
}

export const AddLeadSourceModal: React.FC<AddLeadSourceModalProps> = ({
  isOpen,
  onClose,
  onSourceCreated,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Paid Search');
  const [integrationType, setIntegrationType] = useState('Webhook API');
  const [trackingTag, setTrackingTag] = useState('');
  const [targetCpl, setTargetCpl] = useState('₹180');
  const [routingQueue, setRoutingQueue] = useState('Inbound SDR Team');
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  if (!isOpen) return null;

  const generatedWebhook = `https://api.atscallcenter.in/v1/leads/ingest?source_id=${
    name ? name.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'custom_channel'
  }&token=ats_live_sec_99x1`;

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(generatedWebhook);
    setCopiedWebhook(true);
    toast.info('Webhook URL Copied', 'Endpoint copied to clipboard for CRM ingestion payload.');
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Source Name Required', 'Please provide a unique channel or campaign name.');
      return;
    }

    const newSource = {
      id: Date.now().toString(),
      name,
      category,
      leadsCount: '0',
      conversionRate: '0.0%',
      costPerLead: targetCpl || '₹0',
      roi: '0%',
      iconName: category.toLowerCase().includes('web')
        ? 'Globe'
        : category.toLowerCase().includes('message') || category.toLowerCase().includes('whatsapp')
        ? 'MessageSquare'
        : 'Share2',
      bg: 'bg-blue-50',
      status: 'Active',
      trackingTag: trackingTag || name.toLowerCase().replace(/\s+/g, '_'),
    };

    if (onSourceCreated) {
      onSourceCreated(newSource);
    }

    toast.success(
      'Lead Source Connected!',
      `Channel "${name}" (${category}) is now listening for inbound leads.`
    );

    // Reset
    setName('');
    setTrackingTag('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#02142B]/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E5EBF2] w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E5EBF2] flex items-center justify-between bg-gradient-to-r from-[#F8FAFD] to-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0362FA] flex items-center justify-center shadow-xs">
              <GitFork className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A] leading-tight">
                Connect New Lead Source
              </h3>
              <p className="text-xs text-[#64748B]">
                Configure inbound integration endpoint, UTM tracking & automated lead routing.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body with hidden scrollbar */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {/* Source Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Channel / Source Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Google Ads Search - High Intent Q4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F8FAFD] border border-[#CBD5E1] rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-[#0362FA]"
            />
          </div>

          {/* Grid Category & Integration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Channel Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFD] border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-[#0362FA]"
              >
                <option value="Paid Search">Paid Search (Google, Bing)</option>
                <option value="Paid Social">Paid Social (Meta, LinkedIn)</option>
                <option value="Inbound Web">Inbound Web / Landing Page</option>
                <option value="Messaging Automation">Messaging (WhatsApp, SMS)</option>
                <option value="Telephony">Telephony / IVR Direct Dial</option>
                <option value="Partner Channel">Partner & Referral</option>
                <option value="Offline Exhibition">Offline Events & Expos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Integration Protocol
              </label>
              <select
                value={integrationType}
                onChange={(e) => setIntegrationType(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFD] border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-[#0362FA]"
              >
                <option value="Webhook API">REST Webhook JSON Payload</option>
                <option value="Meta Graph">Meta Instant Forms Direct</option>
                <option value="Google Lead Form">Google Lead Form Extensions</option>
                <option value="Twilio IVR">Telephony SIP / WebRTC Trunk</option>
                <option value="Zapier">Zapier / Make.com Connector</option>
              </select>
            </div>
          </div>

          {/* UTM Tracking & Target CPL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                UTM Source / Tracking Tag
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">
                  utm_source=
                </span>
                <input
                  type="text"
                  placeholder="google_ads_search"
                  value={trackingTag}
                  onChange={(e) => setTrackingTag(e.target.value)}
                  className="w-full pl-[95px] pr-3 py-2 text-xs bg-[#F8FAFD] border border-[#CBD5E1] rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-[#0362FA] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Cost Per Lead (CPL)
              </label>
              <input
                type="text"
                placeholder="₹250"
                value={targetCpl}
                onChange={(e) => setTargetCpl(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F8FAFD] border border-[#CBD5E1] rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-[#0362FA]"
              />
            </div>
          </div>

          {/* Lead Routing Queue */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Automated Lead Routing Queue
            </label>
            <select
              value={routingQueue}
              onChange={(e) => setRoutingQueue(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F8FAFD] border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:bg-white focus:border-[#0362FA]"
            >
              <option value="Inbound SDR Team">Inbound SDR Team (Round Robin)</option>
              <option value="Enterprise Sales Team">Enterprise Key Accounts Team</option>
              <option value="High Priority AI Call Queue">High Priority AI Autodial Queue</option>
              <option value="Unassigned Backlog">Unassigned Review Pool</option>
            </select>
          </div>

          {/* Webhook Endpoint Box */}
          <div className="bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-[#0362FA]" />
                Webhook Ingestion Endpoint
              </span>
              <button
                type="button"
                onClick={handleCopyWebhook}
                className="flex items-center gap-1 text-[11px] font-bold text-[#0362FA] hover:text-[#0252D4]"
              >
                {copiedWebhook ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedWebhook ? 'Copied!' : 'Copy Endpoint'}</span>
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-600 bg-white border border-slate-200 rounded-lg p-2 break-all select-all">
              {generatedWebhook}
            </div>
            <p className="text-[10px] text-slate-500">
              Send POST JSON payloads with <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">name</code>, <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">phone</code>, and <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">email</code> to ingest leads in real-time.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-[#E5EBF2] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-[#0362FA] hover:bg-[#0252D4] rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Connect Channel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
