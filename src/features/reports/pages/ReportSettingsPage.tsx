import React, { useState } from 'react';
import {
  Settings,
  Filter,
  FileText,
  Mail,
  Clock,
  Shield,
  Save,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Palette,
  HardDrive,
  Bell,
  Upload,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const ReportSettingsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [timeZone, setTimeZone] = useState('(GMT+05:30) Asia/Kolkata');
  const [exportFormat, setExportFormat] = useState('PDF (Recommended)');
  const [retentionDays, setRetentionDays] = useState('90 Days');
  const [headerTitle, setHeaderTitle] = useState('ATS Call Center');
  const [footerText, setFooterText] = useState('www.atscallcenter.in');

  // Toggle states
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    showLogo: true,
    includeFooter: true,
    enableCaching: true,
    includeCharts: true,
    includeSummary: true,
    includeRawData: true,
    compressFile: false,
    showPageNumbers: true,
    enableScheduling: true,
    sendOnFailure: true,
    retryDeliveries: true,
    autoDelete: true,
    notifyCompleted: true,
    notifyFailed: true,
    notifyScheduled: true,
  });

  const toggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings Saved', 'Analytics & report preferences updated successfully.');
  };

  const handleReset = () => {
    toast.info('Settings Reset', 'Configuration restored to initial defaults.');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Settings</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Analytics Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure report preferences, filters, formats, email settings, automation, and access control.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] rounded-lg text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset to Default</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0362FA] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-blue-600 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* 6 Metric Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Global Config</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">12</div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-[#0362FA] truncate">Active profiles</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Settings className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Default Filters</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">8</div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-[#13AB4A] truncate">System presets</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A] shrink-0">
            <Filter className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Formats</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">5</div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-[#871CF4] truncate">PDF, XLSX, CSV</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#871CF4] shrink-0">
            <FileText className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Email Drips</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">6</div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-[#EF9612] truncate">Templates loaded</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#EF9612] shrink-0">
            <Mail className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Automations</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">4</div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-[#E73647] truncate">Active triggers</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEECEE] flex items-center justify-center text-[#E73647] shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-xs hover:border-slate-300 transition-all flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">Access Roles</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">3</div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-[#0362FA] truncate">Tiered permissions</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#0362FA] shrink-0">
            <Shield className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 9 Section Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. General Settings */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">1</span>
            <h3 className="text-xs font-bold text-slate-900">General Settings</h3>
          </div>
          <div className="space-y-2.5 text-xs">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Default Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700"
              >
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>This Quarter</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Default Time Zone</label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700"
              >
                <option>(GMT+05:30) Asia/Kolkata</option>
                <option>(GMT+00:00) UTC</option>
                <option>(GMT-05:00) Eastern Time</option>
              </select>
            </div>
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <label className="flex items-center justify-between text-slate-700 cursor-pointer">
                <span>Show Company Logo in Reports</span>
                <input type="checkbox" checked={toggles.showLogo} onChange={() => toggle('showLogo')} className="rounded text-[#0362FA]" />
              </label>
              <label className="flex items-center justify-between text-slate-700 cursor-pointer">
                <span>Include Footer in Reports</span>
                <input type="checkbox" checked={toggles.includeFooter} onChange={() => toggle('includeFooter')} className="rounded text-[#0362FA]" />
              </label>
              <label className="flex items-center justify-between text-slate-700 cursor-pointer">
                <span>Enable Report Caching</span>
                <input type="checkbox" checked={toggles.enableCaching} onChange={() => toggle('enableCaching')} className="rounded text-[#0362FA]" />
              </label>
            </div>
          </div>
        </div>

        {/* 2. Default Filters & Preferences */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">2</span>
            <h3 className="text-xs font-bold text-slate-900">Default Filters & Preferences</h3>
          </div>
          <div className="space-y-2.5 text-xs">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Default Lead Source</label>
              <select className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700">
                <option>All Sources</option>
                <option>Website Inbound</option>
                <option>Paid Ads</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Default Lead Status</label>
              <select className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700">
                <option>All Status</option>
                <option>Active</option>
                <option>Converted</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Default Campaign</label>
              <select className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700">
                <option>All Campaigns</option>
                <option>New Customer Outreach</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Report Format & Export Settings */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">3</span>
            <h3 className="text-xs font-bold text-slate-900">Report Format & Export</h3>
          </div>
          <div className="space-y-2.5 text-xs">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Default Format</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700"
              >
                <option>PDF (Recommended)</option>
                <option>Excel (.xlsx)</option>
                <option>CSV Raw Data</option>
              </select>
            </div>
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <label className="flex items-center justify-between text-slate-700 cursor-pointer">
                <span>Include Charts & Graphs</span>
                <input type="checkbox" checked={toggles.includeCharts} onChange={() => toggle('includeCharts')} className="rounded text-[#0362FA]" />
              </label>
              <label className="flex items-center justify-between text-slate-700 cursor-pointer">
                <span>Include Summary Section</span>
                <input type="checkbox" checked={toggles.includeSummary} onChange={() => toggle('includeSummary')} className="rounded text-[#0362FA]" />
              </label>
              <label className="flex items-center justify-between text-slate-700 cursor-pointer">
                <span>Show Page Numbers</span>
                <input type="checkbox" checked={toggles.showPageNumbers} onChange={() => toggle('showPageNumbers')} className="rounded text-[#0362FA]" />
              </label>
            </div>
          </div>
        </div>

        {/* 4. Email Settings */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">4</span>
            <h3 className="text-xs font-bold text-slate-900">Email Settings</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Sender Name</label>
              <input type="text" defaultValue="ATS Call Center Reports" className="w-full text-xs border border-slate-200 rounded-lg p-1.5 font-medium text-slate-900" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Sender Email</label>
              <input type="email" defaultValue="reports@atscallcenter.in" className="w-full text-xs border border-slate-200 rounded-lg p-1.5 font-medium text-slate-900" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Default Subject Template</label>
              <input type="text" defaultValue="{report_name} - {date}" className="w-full text-xs border border-slate-200 rounded-lg p-1.5 font-mono text-slate-700" />
            </div>
          </div>
        </div>

        {/* 5. Automation & Scheduling */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">5</span>
            <h3 className="text-xs font-bold text-slate-900">Automation & Scheduling</h3>
          </div>
          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between text-slate-700 cursor-pointer">
              <span>Enable Scheduled Reports</span>
              <input type="checkbox" checked={toggles.enableScheduling} onChange={() => toggle('enableScheduling')} className="rounded text-[#0362FA]" />
            </label>
            <label className="flex items-center justify-between text-slate-700 cursor-pointer">
              <span>Retry Failed Deliveries</span>
              <input type="checkbox" checked={toggles.retryDeliveries} onChange={() => toggle('retryDeliveries')} className="rounded text-[#0362FA]" />
            </label>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Max Retry Attempts</label>
              <select className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700">
                <option>3 Attempts</option>
                <option>5 Attempts</option>
              </select>
            </div>
          </div>
        </div>

        {/* 6. Data Retention & Cleanup */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">6</span>
            <h3 className="text-xs font-bold text-slate-900">Data Retention & Cleanup</h3>
          </div>
          <div className="space-y-2.5 text-xs">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Keep Exported Reports For</label>
              <select
                value={retentionDays}
                onChange={(e) => setRetentionDays(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700"
              >
                <option>90 Days</option>
                <option>180 Days</option>
                <option>365 Days</option>
              </select>
            </div>
            <label className="flex items-center justify-between text-slate-700 cursor-pointer pt-2">
              <span>Auto Delete Old Reports</span>
              <input type="checkbox" checked={toggles.autoDelete} onChange={() => toggle('autoDelete')} className="rounded text-[#0362FA]" />
            </label>
          </div>
        </div>

        {/* 7. Access & Permissions */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">7</span>
            <h3 className="text-xs font-bold text-slate-900">Access & Permissions</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-700 font-medium">Create Reports</span>
              <span className="text-slate-500 text-[11px]">Admin, Manager</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-700 font-medium">View Reports</span>
              <span className="text-slate-500 text-[11px]">Admin, Manager, Agent</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-700 font-medium">Export Reports</span>
              <span className="text-slate-500 text-[11px]">Admin, Manager</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-700 font-medium">Schedule Reports</span>
              <span className="text-slate-500 text-[11px]">Admin, Manager</span>
            </div>
          </div>
        </div>

        {/* 8. Notification Settings */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">8</span>
            <h3 className="text-xs font-bold text-slate-900">Notification Settings</h3>
          </div>
          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between text-slate-700 cursor-pointer">
              <span>Report Generation Completed</span>
              <input type="checkbox" checked={toggles.notifyCompleted} onChange={() => toggle('notifyCompleted')} className="rounded text-[#0362FA]" />
            </label>
            <label className="flex items-center justify-between text-slate-700 cursor-pointer">
              <span>Report Generation Failed</span>
              <input type="checkbox" checked={toggles.notifyFailed} onChange={() => toggle('notifyFailed')} className="rounded text-[#0362FA]" />
            </label>
            <label className="flex items-center justify-between text-slate-700 cursor-pointer">
              <span>Scheduled Report Sent</span>
              <input type="checkbox" checked={toggles.notifyScheduled} onChange={() => toggle('notifyScheduled')} className="rounded text-[#0362FA]" />
            </label>
          </div>
        </div>

        {/* 9. Company Branding */}
        <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#0362FA] text-white text-[11px] font-bold flex items-center justify-center">9</span>
            <h3 className="text-xs font-bold text-slate-900">Company Branding</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Report Header Title</label>
              <input
                type="text"
                value={headerTitle}
                onChange={(e) => setHeaderTitle(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-1.5 font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Report Footer Text</label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-1.5 font-medium text-slate-900"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-700 font-medium">Primary Accent Color</span>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#0362FA] border border-slate-200" />
                <span className="font-mono text-slate-600 text-[11px]">#0362FA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
