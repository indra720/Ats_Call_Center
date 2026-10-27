import React, { useState } from 'react';
import {
  Building2,
  Clock,
  Phone,
  Globe,
  Save,
  RotateCcw,
  CheckCircle2,
  Shield,
  HelpCircle,
  Sliders,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const SystemSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'hours' | 'telephony' | 'regional'>('general');

  // Form State
  const [orgName, setOrgName] = useState('ATS Call Center Services Pvt Ltd');
  const [legalName, setLegalName] = useState('ATS Telephony Cloud Solutions India Pvt Ltd');
  const [gstin, setGstin] = useState('07AABCA1234F1Z8');
  const [supportEmail, setSupportEmail] = useState('support@atscallcenter.in');
  const [billingEmail, setBillingEmail] = useState('accounts@atscallcenter.in');
  const [primaryPhone, setPrimaryPhone] = useState('+91 11 4050 6700');
  const [address, setAddress] = useState('Tower B, DLF Cyber City, Phase III, Gurugram, Haryana 122002');

  // Business Hours
  const [startTime, setStartTime] = useState('09:30');
  const [endTime, setEndTime] = useState('18:30');
  const [workDays, setWorkDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const [outOfHoursAction, setOutOfHoursAction] = useState('voicemail');

  // Telephony Defaults
  const [ringTimeout, setRingTimeout] = useState('30');
  const [wrapUpTimer, setWrapUpTimer] = useState('45');
  const [autoRecord, setAutoRecord] = useState(true);
  const [consentDisclaimer, setConsentDisclaimer] = useState(
    'This call is recorded for quality assurance and training purposes.'
  );

  // Regional
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST +05:30)');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [currency, setCurrency] = useState('INR (₹)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings Saved', 'System & organization configuration updated successfully.');
  };

  const toggleDay = (day: string) => {
    setWorkDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">System & Organization Settings</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System & Organization Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure legal business entity details, telephony timeouts, operational business hours and localization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toast.info('Default Values Loaded', 'Standard Indian call center settings restored')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-[#E5EBF2] rounded-lg hover:bg-slate-50 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Legal Entity</span>
            <div className="text-sm font-bold text-slate-900 mt-1 truncate">ATS Telephony Cloud</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">GSTIN Verified</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Operational Shift</span>
            <div className="text-base font-bold text-slate-900 mt-1">09:30 - 18:30 IST</div>
            <div className="text-[11px] text-[#0362FA] font-medium mt-1">Mon - Sat (6 Days)</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Telephony Timeout</span>
            <div className="text-xl font-bold text-slate-900 mt-1">30 Secs</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Wrap-up: 45s max</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Regional Locale</span>
            <div className="text-base font-bold text-slate-900 mt-1 truncate">Asia/Kolkata (IST)</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Currency: INR (₹)</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs and Form Card */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5EBF2] bg-[#FAFCFF] px-3 overflow-x-auto">
          {[
            { id: 'general', label: 'Organization & Legal', icon: Building2 },
            { id: 'hours', label: 'Business Hours & Shifts', icon: Clock },
            { id: 'telephony', label: 'Telephony & Voice Defaults', icon: Phone },
            { id: 'regional', label: 'Regional & Localization', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-[#0362FA] text-[#0362FA] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <form onSubmit={handleSave} className="p-6 text-xs space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-sm font-bold text-slate-900">Legal Company Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Brand / Display Name</label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Registered Legal Entity Name</label>
                  <input
                    type="text"
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Company GSTIN (15 Digits)</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-slate-800 text-xs uppercase"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Primary Support Hotline</label>
                  <input
                    type="text"
                    value={primaryPhone}
                    onChange={(e) => setPrimaryPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Support Email Address</label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Finance & Billing Email</label>
                  <input
                    type="email"
                    value={billingEmail}
                    onChange={(e) => setBillingEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Corporate Registered Address</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                />
              </div>
            </div>
          )}

          {activeTab === 'hours' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-sm font-bold text-slate-900">Shift Hours & Schedule</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Shift Start Time (IST)</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Shift End Time (IST)</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-2">Active Working Days</label>
                <div className="flex flex-wrap gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                    const selected = workDays.includes(day);
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          selected
                            ? 'bg-[#0362FA] text-white border-[#0362FA]'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">After-Hours Inbound Call Routing</label>
                <select
                  value={outOfHoursAction}
                  onChange={(e) => setOutOfHoursAction(e.target.value)}
                  className="w-full sm:w-80 px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                >
                  <option value="voicemail">Send directly to Voicemail Inbox</option>
                  <option value="ivr">Play "Office Closed" IVR Announcement & Hang up</option>
                  <option value="forward">Forward to On-Call Manager Mobile</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'telephony' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-sm font-bold text-slate-900">Telephony Routing & Timers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Max Agent Ring Timeout (seconds)</label>
                  <input
                    type="number"
                    value={ringTimeout}
                    onChange={(e) => setRingTimeout(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Time before routing to next available agent</span>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Max Disposition Wrap-Up Time (seconds)</label>
                  <input
                    type="number"
                    value={wrapUpTimer}
                    onChange={(e) => setWrapUpTimer(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Cooldown window for lead note logging</span>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRecord}
                    onChange={(e) => setAutoRecord(e.target.checked)}
                    className="rounded border-slate-300 text-[#0362FA] focus:ring-[#0362FA]"
                  />
                  <span className="font-bold text-slate-800 text-xs">Automatically record all inbound and outbound calls</span>
                </label>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Legal Two-Party Recording Consent Audio Prompt</label>
                <textarea
                  rows={2}
                  value={consentDisclaimer}
                  onChange={(e) => setConsentDisclaimer(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                />
              </div>
            </div>
          )}

          {activeTab === 'regional' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-sm font-bold text-slate-900">Regional & Locale Preferences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">System Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                  >
                    <option value="Asia/Kolkata (IST +05:30)">Asia/Kolkata (IST +05:30)</option>
                    <option value="Asia/Dubai (GST +04:00)">Asia/Dubai (GST +04:00)</option>
                    <option value="Asia/Singapore (SGT +08:00)">Asia/Singapore (SGT +08:00)</option>
                    <option value="Europe/London (GMT +00:00)">Europe/London (GMT +00:00)</option>
                    <option value="America/New_York (EST -05:00)">America/New_York (EST -05:00)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Date Format</label>
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 27/10/2026)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Billing & Display Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800 text-xs"
                  >
                    <option value="INR (₹)">INR (₹ - Indian Rupee)</option>
                    <option value="USD ($)">USD ($ - US Dollar)</option>
                    <option value="AED (د.إ)">AED (AED - UAE Dirham)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
