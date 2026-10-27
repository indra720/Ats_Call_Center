import React, { useState } from 'react';
import {
  Palette,
  Upload,
  Globe,
  CheckCircle2,
  Image,
  Eye,
  Save,
  RotateCcw,
  Sparkles,
  Link,
  ShieldCheck,
  Smartphone,
  Layout,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const BrandingSettingsPage: React.FC = () => {
  const [brandName, setBrandName] = useState('ATS Call Center');
  const [tagline, setTagline] = useState('AI Calling & CRM Telephony');
  const [primaryColor, setPrimaryColor] = useState('#0362FA');
  const [accentColor, setAccentColor] = useState('#13AB4A');
  const [customDomain, setCustomDomain] = useState('crm.myenterprise.in');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [emailSenderName, setEmailSenderName] = useState('ATS Cloud Voice');
  const [whiteLabelActive, setWhiteLabelActive] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Branding Updated', 'Custom logos, theme colors and domain CNAME applied successfully.');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Branding & Appearance</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Branding & Appearance</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            White-label your call center portal, dialer header, custom domain, and company theme palette.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setPrimaryColor('#0362FA');
              setAccentColor('#13AB4A');
              toast.info('Default Theme Restored', 'Standard ATS blue & emerald colors applied');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-[#E5EBF2] rounded-lg hover:bg-slate-50 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Colors</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publish Branding</span>
          </button>
        </div>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">White-Label Mode</span>
            <div className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full White-Label</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">"Powered by" removed</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Custom CNAME Domain</span>
            <div className="text-sm font-bold text-slate-900 mt-1 truncate">{customDomain}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">SSL Certificate Active</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Theme Palette</span>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: primaryColor }} />
              <span className="font-mono text-xs font-bold text-slate-800">{primaryColor}</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Primary accent</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Palette className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Mobile Shell Branding</span>
            <div className="text-sm font-bold text-slate-900 mt-1">Icon-Only Topbar</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Mobile optimized</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Content Grid: Settings Form (Left) & Real-time Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-900">Custom Brand Identity</h3>

          {/* Logo Uploader */}
          <div className="space-y-3">
            <label className="font-semibold text-slate-700 text-xs block">Company Brand Logo (Light Theme)</label>
            <div className="border-2 border-dashed border-[#E5EBF2] hover:border-[#0362FA] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 transition-colors bg-[#FAFCFF]">
              <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0362FA] font-bold text-lg shrink-0">
                ATS
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="font-semibold text-slate-800 text-xs">Upload company logo (SVG, PNG, JPG)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Recommended size 512x512px. Transparent background.</div>
              </div>
              <button
                type="button"
                onClick={() => toast.info('File Picker', 'Simulated: Select your SVG/PNG brand file')}
                className="px-3 py-1.5 text-xs font-semibold text-[#0362FA] bg-white border border-[#E5EBF2] rounded-lg hover:bg-slate-50 shrink-0 shadow-xs"
              >
                Choose File
              </button>
            </div>
          </div>

          {/* Brand Name & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company Display Title</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Subtitle / Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
              />
            </div>
          </div>

          {/* Color Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primary Theme Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg font-mono text-xs uppercase"
                />
              </div>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Secondary / Success Accent</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg font-mono text-xs uppercase"
                />
              </div>
            </div>
          </div>

          {/* Custom CNAME Setup */}
          <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
            <h4 className="font-bold text-slate-900">Custom Domain & CNAME</h4>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Subdomain / Domain</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="crm.yourbrand.com"
                  className="flex-1 px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => toast.success('DNS Verified', `CNAME pointing to proxy.atscallcenter.in is verified`)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0362FA] rounded-lg hover:bg-blue-600 shrink-0"
                >
                  Verify DNS
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Point a DNS CNAME record of <span className="font-mono text-slate-700 font-semibold">{customDomain}</span> to <span className="font-mono text-[#0362FA] font-semibold">proxy.atscallcenter.in</span>.
              </p>
            </div>
          </div>

          {/* White-label Switch */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 text-xs">Remove "Powered by ATS Call Center"</div>
              <div className="text-[11px] text-slate-400">Available on Enterprise subscription</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={whiteLabelActive}
                onChange={(e) => setWhiteLabelActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0362FA]"></div>
            </label>
          </div>
        </div>

        {/* Right Preview: 5 cols */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#0362FA]" />
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Live White-Label Preview</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Interactive
              </span>
            </div>

            {/* Mock Navigation Bar with chosen colors & brand */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-slate-900 text-white p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {brandName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[11px] truncate leading-tight">{brandName}</div>
                    <div className="text-[9px] text-slate-400 truncate">{tagline}</div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-slate-700" />
              </div>

              {/* Mock App Body */}
              <div className="p-3 bg-slate-50 space-y-2.5">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="text-[10px] text-slate-400">Total Leads</div>
                    <div className="text-sm font-bold text-slate-800" style={{ color: primaryColor }}>
                      14,290
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="text-[10px] text-slate-400">Conversion</div>
                    <div className="text-sm font-bold text-slate-800" style={{ color: accentColor }}>
                      32.4%
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    className="px-3 py-1 rounded-md text-[11px] font-bold text-white shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Primary Action
                  </button>
                </div>
              </div>
            </div>

            {/* URL preview */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Browser Address Bar:</div>
              <div className="font-mono text-slate-800 flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-slate-400">https://</span>
                <span className="font-bold text-[#0362FA]">{customDomain}</span>
                <span className="text-slate-400">/dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
