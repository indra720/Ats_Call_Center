import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Shield,
  Key,
  Bell,
  Headphones,
  Mic,
  Volume2,
  Save,
  CheckCircle2,
  Camera,
  Smartphone,
  Lock,
  RotateCcw,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'audio' | 'notifications'>('profile');

  // Profile Details
  const [name, setName] = useState('Indrajeet Sharma');
  const [title, setTitle] = useState('Lead Telephony Architect & Admin');
  const [email, setEmail] = useState('indrajeet@atscallcenter.in');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [extension, setExtension] = useState('1001');

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Audio Device Preferences
  const [micDevice, setMicDevice] = useState('Jabra Evolve2 65 Headset (USB)');
  const [speakerDevice, setSpeakerDevice] = useState('Jabra Evolve2 65 Audio (Stereo)');
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [micVolume, setMicVolume] = useState(85);

  // Notifications
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [browserPopups, setBrowserPopups] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile Updated', 'Personal preferences and audio settings saved successfully.');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.warning('Input Error', 'Please enter your current password');
      return;
    }
    toast.success('Password Changed', 'Your credentials have been securely updated.');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">User Profile & Preferences</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Profile & Preferences</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your personal profile, VoIP audio hardware headsets, password security and alert settings.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm self-start sm:self-auto"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">User Role</span>
            <div className="text-sm font-bold text-slate-900 mt-1 truncate">Super Admin</div>
            <div className="text-[11px] text-[#0362FA] font-semibold mt-1">Full Root Permissions</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Agent Extension</span>
            <div className="text-xl font-bold text-slate-900 mt-1 font-mono">Ext #{extension}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">SIP Trunk Online</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">2FA Authentication</span>
            <div className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Enforced & Active</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Google Authenticator</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Audio Quality</span>
            <div className="text-sm font-bold text-slate-900 mt-1 truncate">Jabra Evolve2</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">AI Noise Shield ON</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5EBF2] bg-[#FAFCFF] px-3 overflow-x-auto">
          {[
            { id: 'profile', label: 'Personal Information', icon: User },
            { id: 'security', label: 'Security & Password', icon: Key },
            { id: 'audio', label: 'Audio & Headset Setup', icon: Headphones },
            { id: 'notifications', label: 'Notifications', icon: Bell },
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
        <div className="p-6 text-xs">
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
              {/* Avatar Row */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#0362FA]"
                  />
                  <button
                    type="button"
                    onClick={() => toast.info('Photo upload', 'Select a new profile image')}
                    className="absolute -bottom-1 -right-1 p-1.5 bg-[#0362FA] text-white rounded-full shadow hover:bg-blue-600"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{name}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{title}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Designation / Role Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E5EBF2] rounded-lg text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mobile Contact</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Internal Dialing Extension</label>
                  <input
                    type="text"
                    value={extension}
                    onChange={(e) => setExtension(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Change Password</h3>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full sm:w-80 px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 8 characters with numbers & symbols"
                    className="w-full sm:w-80 px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Update Password
                </button>
              </form>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-slate-900">Two-Factor Authentication (2FA)</h4>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="font-bold text-emerald-950">2FA Authenticator App Enabled</div>
                      <div className="text-[11px] text-emerald-700">TOTP Authenticator code required for logins</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.info('2FA Settings', 'Opening authenticator QR code re-key modal')}
                    className="px-3 py-1.5 font-semibold text-xs text-emerald-800 bg-white border border-emerald-300 rounded-lg shadow-xs hover:bg-emerald-50"
                  >
                    Manage 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-sm font-bold text-slate-900">Call Center Headset & Microphone Calibration</h3>

              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Microphone Input Device</label>
                  <select
                    value={micDevice}
                    onChange={(e) => setMicDevice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
                  >
                    <option value="Jabra Evolve2 65 Headset (USB)">Jabra Evolve2 65 Headset (USB Noise-Cancelling)</option>
                    <option value="Realtek High Definition Audio (Default)">Realtek High Definition Audio (Default)</option>
                    <option value="Logitech H390 USB Headset">Logitech H390 USB Headset</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Audio Speaker Output Device</label>
                  <select
                    value={speakerDevice}
                    onChange={(e) => setSpeakerDevice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
                  >
                    <option value="Jabra Evolve2 65 Audio (Stereo)">Jabra Evolve2 65 Audio (Stereo)</option>
                    <option value="Default System Speakers">Default System Speakers</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>Input Volume Gain ({micVolume}%)</span>
                    <button
                      type="button"
                      onClick={() => toast.success('Mic Test Passed', 'Volume levels detected: 85% normal tone')}
                      className="text-[#0362FA] hover:underline text-[11px]"
                    >
                      Test Microphone Audio
                    </button>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={micVolume}
                    onChange={(e) => setMicVolume(Number(e.target.value))}
                    className="w-full accent-[#0362FA]"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">AI Background Noise Suppression</div>
                    <div className="text-[11px] text-slate-400">Eliminates office chatter and keyboard click sounds on call</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={noiseSuppression}
                      onChange={(e) => setNoiseSuppression(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0362FA]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4 max-w-2xl">
              <h3 className="text-sm font-bold text-slate-900">Notification Alerts</h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <div>
                    <div className="font-bold text-slate-900">Inbound Call Ringtone & Audio Chime</div>
                    <div className="text-[11px] text-slate-400">Plays standard softphone ring chime on incoming queue transfer</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundAlerts}
                    onChange={(e) => setSoundAlerts(e.target.checked)}
                    className="rounded border-slate-300 text-[#0362FA] focus:ring-[#0362FA]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <div>
                    <div className="font-bold text-slate-900">Browser Desktop Notifications</div>
                    <div className="text-[11px] text-slate-400">Pushes HTML5 desktop notifications when lead replies on WhatsApp</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={browserPopups}
                    onChange={(e) => setBrowserPopups(e.target.checked)}
                    className="rounded border-slate-300 text-[#0362FA] focus:ring-[#0362FA]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <div>
                    <div className="font-bold text-slate-900">Weekly Performance Summary Email</div>
                    <div className="text-[11px] text-slate-400">Receive personal talk-time and conversion rate digest on Mondays</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.checked)}
                    className="rounded border-slate-300 text-[#0362FA] focus:ring-[#0362FA]"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
