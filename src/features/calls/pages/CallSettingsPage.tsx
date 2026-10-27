import React, { useState } from 'react';
import {
  Settings,
  Phone,
  PhoneCall,
  Volume2,
  Clock,
  Calendar,
  Sliders,
  CheckCircle2,
  Trash2,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  PhoneIncoming,
  PhoneOff,
  Users,
  Shield,
  Layers,
  ListFilter,
  Check,
  ChevronDown,
  X,
} from 'lucide-react';
import { toast } from '@/store/toastStore';
import { useNavigate } from 'react-router-dom';

interface HolidayItem {
  id: number;
  date: string;
  name: string;
}

const INITIAL_HOLIDAYS: HolidayItem[] = [
  { id: 1, date: '1 Jan 2026', name: "New Year's Day" },
  { id: 2, date: '26 Jan 2026', name: 'Republic Day' },
  { id: 3, date: '14 Mar 2026', name: 'Holi' },
  { id: 4, date: '18 Apr 2026', name: 'Good Friday' },
  { id: 5, date: '1 May 2026', name: 'Labour Day' },
  { id: 6, date: '15 Aug 2026', name: 'Independence Day' },
  { id: 7, date: '2 Oct 2026', name: 'Gandhi Jayanti' },
];

export const CallSettingsPage: React.FC = () => {
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState<
    'general' | 'flow' | 'agents' | 'disposition' | 'hours' | 'notifications' | 'advanced'
  >('general');

  // System Settings State
  const [callerId, setCallerId] = useState('Main Business Line (+91 98765 43210)');
  const [defaultCallTimeout, setDefaultCallTimeout] = useState('30 seconds');
  const [maxQueueWait, setMaxQueueWait] = useState('2 minutes');
  const [defaultCallRecording, setDefaultCallRecording] = useState('Enabled (All Calls)');
  const [playBeepRecording, setPlayBeepRecording] = useState(true);
  const [enableCallTransfer, setEnableCallTransfer] = useState(true);
  const [enable3WayConference, setEnable3WayConference] = useState(true);
  const [allowInternationalCalls, setAllowInternationalCalls] = useState(false);
  const [maskAgentNumber, setMaskAgentNumber] = useState(true);

  // Audio & Quality State
  const [audioCodec, setAudioCodec] = useState('Auto (Best Quality)');
  const [ringtone, setRingtone] = useState('Default Ringtone');
  const [incomingVolume, setIncomingVolume] = useState(70);
  const [outgoingVolume, setOutgoingVolume] = useState(70);
  const [ringtoneVolume, setRingtoneVolume] = useState(80);
  const [noiseCancellation, setNoiseCancellation] = useState(true);
  const [echoReduction, setEchoReduction] = useState(true);
  const [autoAdjustVolume, setAutoAdjustVolume] = useState(true);
  const [hdVoice, setHdVoice] = useState(false);

  // Working Hours State
  const [workingHoursEnabled, setWorkingHoursEnabled] = useState(true);
  const [workingDays, setWorkingDays] = useState([
    { day: 'Monday', checked: true, from: '9:00 AM', to: '6:00 PM' },
    { day: 'Tuesday', checked: true, from: '9:00 AM', to: '6:00 PM' },
    { day: 'Wednesday', checked: true, from: '9:00 AM', to: '6:00 PM' },
    { day: 'Thursday', checked: true, from: '9:00 AM', to: '6:00 PM' },
    { day: 'Friday', checked: true, from: '9:00 AM', to: '6:00 PM' },
    { day: 'Saturday', checked: true, from: '9:00 AM', to: '2:00 PM' },
    { day: 'Sunday', checked: false, from: 'Closed', to: 'Closed' },
  ]);

  // Holidays
  const [holidays, setHolidays] = useState<HolidayItem[]>(INITIAL_HOLIDAYS);
  const [isAddHolidayModalOpen, setIsAddHolidayModalOpen] = useState(false);
  const [newHolidayName, setNewHolidayName] = useState('');
  const [newHolidayDate, setNewHolidayDate] = useState('');

  // Test Call
  const [testPhoneNumber, setTestPhoneNumber] = useState('98765 43210');
  const [isTestCalling, setIsTestCalling] = useState(false);
  const [testCallStatus, setTestCallStatus] = useState<'idle' | 'ringing' | 'connected'>('idle');

  const handleMakeTestCall = () => {
    setIsTestCalling(true);
    setTestCallStatus('ringing');
    toast.info('Test Call Initiated', `Dialing +91 ${testPhoneNumber}...`);
    setTimeout(() => {
      setTestCallStatus('connected');
      toast.success('Test Call Connected', 'Telephony WebRTC session active. Codec: Opus HD.');
    }, 2000);
  };

  const handleEndTestCall = () => {
    setIsTestCalling(false);
    setTestCallStatus('idle');
    toast.info('Test Call Finished', 'Call terminated cleanly. SLA 100%.');
  };

  const handleDeleteHoliday = (id: number) => {
    setHolidays(holidays.filter((h) => h.id !== id));
    toast.info('Holiday Removed', 'Business calendar exception deleted.');
  };

  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHolidayName || !newHolidayDate) return;
    const added: HolidayItem = {
      id: Date.now(),
      date: newHolidayDate,
      name: newHolidayName,
    };
    setHolidays([...holidays, added]);
    setIsAddHolidayModalOpen(false);
    setNewHolidayName('');
    setNewHolidayDate('');
    toast.success('Holiday Added', `${added.name} marked on call center calendar.`);
  };

  const handleSaveAllSettings = () => {
    toast.success('Settings Saved', 'All call center configurations have been synchronized.');
  };

  return (
    <div className="space-y-5">
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Calling & Call Center</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">Call Settings</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Call Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure your call center preferences, agent settings, call flow, and advanced options.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveAllSettings}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save All Settings</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs (Screen 037 exact) */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-600 overflow-x-auto">
        {[
          { id: 'general', label: 'General' },
          { id: 'flow', label: 'Call Flow' },
          { id: 'agents', label: 'Agent Settings' },
          { id: 'disposition', label: 'Call Disposition' },
          { id: 'hours', label: 'Working Hours' },
          { id: 'notifications', label: 'Notifications' },
          { id: 'advanced', label: 'Advanced' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-2.5 transition-colors whitespace-nowrap relative ${
              activeTab === tab.id
                ? 'text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]'
                : 'hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Main Layout: 8 Cols Config Cards + 4 Cols Helper/Preview Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (8 Cols): Configuration Cards */}
        <div className="lg:col-span-8 space-y-5">
          {/* Section 1: System Settings */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">System Settings</h3>
                <p className="text-[11px] text-slate-400">Basic call center configuration and preferences.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Caller ID */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Caller ID (Default)</label>
                <select
                  value={callerId}
                  onChange={(e) => setCallerId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                >
                  <option>Main Business Line (+91 98765 43210)</option>
                  <option>Sales Support (+91 91234 56789)</option>
                  <option>Customer Care (+91 99887 66554)</option>
                </select>
              </div>

              {/* Default Call Timeout */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Default Call Timeout</label>
                <select
                  value={defaultCallTimeout}
                  onChange={(e) => setDefaultCallTimeout(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                >
                  <option>20 seconds</option>
                  <option>30 seconds</option>
                  <option>45 seconds</option>
                  <option>60 seconds</option>
                </select>
              </div>

              {/* Max Queue Wait Time */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Max Queue Wait Time</label>
                <select
                  value={maxQueueWait}
                  onChange={(e) => setMaxQueueWait(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                >
                  <option>1 minute</option>
                  <option>2 minutes</option>
                  <option>3 minutes</option>
                  <option>5 minutes</option>
                </select>
              </div>

              {/* Default Call Recording */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Default Call Recording</label>
                <select
                  value={defaultCallRecording}
                  onChange={(e) => setDefaultCallRecording(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                >
                  <option>Enabled (All Calls)</option>
                  <option>Inbound Calls Only</option>
                  <option>Outbound Calls Only</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-slate-800 block">Play Beep for Call Recording</span>
                  <span className="text-[11px] text-slate-400">Play an audible tone indicating call recording compliance.</span>
                </div>
                <input
                  type="checkbox"
                  checked={playBeepRecording}
                  onChange={(e) => setPlayBeepRecording(e.target.checked)}
                  className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-slate-800 block">Enable Call Transfer</span>
                  <span className="text-[11px] text-slate-400">Allow agents to warm or blind transfer active callers.</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableCallTransfer}
                  onChange={(e) => setEnableCallTransfer(e.target.checked)}
                  className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-slate-800 block">Enable 3-way Conference</span>
                  <span className="text-[11px] text-slate-400">Permit supervisors and secondary agents to join live calls.</span>
                </div>
                <input
                  type="checkbox"
                  checked={enable3WayConference}
                  onChange={(e) => setEnable3WayConference(e.target.checked)}
                  className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-slate-800 block">Allow International Calls</span>
                  <span className="text-[11px] text-slate-400">Permit agents to dial foreign telephone country codes.</span>
                </div>
                <input
                  type="checkbox"
                  checked={allowInternationalCalls}
                  onChange={(e) => setAllowInternationalCalls(e.target.checked)}
                  className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-slate-800 block">Mask Agent Number (Show Company Number)</span>
                  <span className="text-[11px] text-slate-400">Protect agent privacy by transmitting business DID as caller ID.</span>
                </div>
                <input
                  type="checkbox"
                  checked={maskAgentNumber}
                  onChange={(e) => setMaskAgentNumber(e.target.checked)}
                  className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Call Quality & Audio Settings */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Quality & Audio Settings</h3>
                <p className="text-[11px] text-slate-400">Manage audio quality and call experience.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Audio Codec</label>
                <select
                  value={audioCodec}
                  onChange={(e) => setAudioCodec(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                >
                  <option>Auto (Best Quality)</option>
                  <option>Opus HD (Adaptive 48kHz)</option>
                  <option>G.711u (PCMU Legacy)</option>
                  <option>G.722 (Wideband 16kHz)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ringtone for Incoming Calls</label>
                <select
                  value={ringtone}
                  onChange={(e) => setRingtone(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
                >
                  <option>Default Ringtone</option>
                  <option>Chime Harmonic</option>
                  <option>Modern Pulse</option>
                  <option>Classic Bell</option>
                </select>
              </div>
            </div>

            {/* Volume Sliders */}
            <div className="space-y-3 pt-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Incoming Call Volume</span>
                  <span className="font-mono text-[#0362FA]">{incomingVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={incomingVolume}
                  onChange={(e) => setIncomingVolume(Number(e.target.value))}
                  className="w-full accent-[#0362FA] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Outgoing Call Volume</span>
                  <span className="font-mono text-[#0362FA]">{outgoingVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={outgoingVolume}
                  onChange={(e) => setOutgoingVolume(Number(e.target.value))}
                  className="w-full accent-[#0362FA] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Ringtone Volume</span>
                  <span className="font-mono text-[#0362FA]">{ringtoneVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ringtoneVolume}
                  onChange={(e) => setRingtoneVolume(Number(e.target.value))}
                  className="w-full accent-[#0362FA] cursor-pointer"
                />
              </div>
            </div>

            {/* Audio Toggles */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-slate-800 block">Enable Noise Cancellation (AI)</span>
                  <span className="text-[11px] text-slate-400">Deep neural net filters keyboard clicks and background office noise.</span>
                </div>
                <input
                  type="checkbox"
                  checked={noiseCancellation}
                  onChange={(e) => setNoiseCancellation(e.target.checked)}
                  className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-slate-800 block">Enable Echo Reduction</span>
                  <span className="text-[11px] text-slate-400">Acoustic echo cancellation for speakerphones.</span>
                </div>
                <input
                  type="checkbox"
                  checked={echoReduction}
                  onChange={(e) => setEchoReduction(e.target.checked)}
                  className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-slate-800 block">Auto Adjust Volume</span>
                  <span className="text-[11px] text-slate-400">Automatic Gain Control (AGC) stabilizes caller volume levels.</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoAdjustVolume}
                  onChange={(e) => setAutoAdjustVolume(e.target.checked)}
                  className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-slate-800 block">Enable HD Voice (Wideband)</span>
                  <span className="text-[11px] text-slate-400">Requires high bandwidth network connection.</span>
                </div>
                <input
                  type="checkbox"
                  checked={hdVoice}
                  onChange={(e) => setHdVoice(e.target.checked)}
                  className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Working Hours & Schedule */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-[#EF9612] flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Working Hours</h3>
                  <p className="text-[11px] text-slate-400">Set your call center working hours and holidays.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={workingHoursEnabled}
                onChange={(e) => setWorkingHoursEnabled(e.target.checked)}
                className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="space-y-2 text-xs">
              {workingDays.map((wd, index) => (
                <div
                  key={wd.day}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={wd.checked}
                      onChange={(e) => {
                        const updated = [...workingDays];
                        updated[index].checked = e.target.checked;
                        setWorkingDays(updated);
                      }}
                      className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                    <span className="font-semibold text-slate-800 w-24">{wd.day}</span>
                  </div>

                  {wd.checked ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={wd.from}
                        onChange={(e) => {
                          const updated = [...workingDays];
                          updated[index].from = e.target.value;
                          setWorkingDays(updated);
                        }}
                        className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700 text-xs"
                      >
                        <option>8:00 AM</option>
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                      </select>
                      <span className="text-slate-400">-</span>
                      <select
                        value={wd.to}
                        onChange={(e) => {
                          const updated = [...workingDays];
                          updated[index].to = e.target.value;
                          setWorkingDays(updated);
                        }}
                        className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700 text-xs"
                      >
                        <option>2:00 PM</option>
                        <option>5:00 PM</option>
                        <option>6:00 PM</option>
                        <option>8:00 PM</option>
                      </select>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs italic pr-2">Closed</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Holidays & Exceptions */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#871CF4] flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Holidays & Exceptions</h3>
                  <p className="text-[11px] text-slate-400">Add holidays when calls should not be routed.</p>
                </div>
              </div>

              <button
                onClick={() => setIsAddHolidayModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#0362FA] hover:bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Holiday</span>
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              {holidays.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-500 font-bold w-24">{h.date}</span>
                    <span className="font-semibold text-slate-800">{h.name}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteHoliday(h.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete Holiday"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Test Call, Preview, Summary & Quick Actions */}
        <div className="lg:col-span-4 space-y-5">
          {/* 1. Test Call Settings Card */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Test Call Settings</h3>
                <p className="text-[11px] text-slate-400">Make a test call to verify your configuration.</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <span>🇮🇳 +91</span>
                </div>
                <input
                  type="text"
                  value={testPhoneNumber}
                  onChange={(e) => setTestPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-none focus:border-[#0362FA]"
                />
              </div>

              {!isTestCalling ? (
                <button
                  onClick={handleMakeTestCall}
                  className="w-full py-2 bg-[#0362FA] hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Make Test Call</span>
                </button>
              ) : (
                <button
                  onClick={handleEndTestCall}
                  className="w-full py-2 bg-[#E73647] hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <PhoneOff className="w-3.5 h-3.5" />
                  <span>End Test Call ({testCallStatus})</span>
                </button>
              )}
            </div>
          </div>

          {/* 2. Call Settings Preview (Screen 037 Exact Component) */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Call Settings Preview</h3>
              <p className="text-[11px] text-slate-400">Preview how your call settings work.</p>
            </div>

            {/* Dark Simulated Call Card */}
            <div className="bg-[#0A1629] text-white rounded-2xl p-4 shadow-lg text-center space-y-3 border border-slate-800">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-600/80 text-white text-base font-bold flex items-center justify-center border-2 border-blue-400 shadow-md">
                  RS
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block tracking-wider uppercase font-semibold">
                  Incoming Call...
                </span>
                <div className="text-sm font-bold text-white font-mono mt-0.5">+91 98765 43210</div>
                <div className="text-[11px] text-slate-300">Tech Solutions Pvt. Ltd.</div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => toast.info('Decline Simulation', 'Call rejected per disposition rules.')}
                  className="py-1.5 px-3 bg-[#E73647] hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneOff className="w-3 h-3" />
                  <span>Decline</span>
                </button>
                <button
                  onClick={() => toast.success('Answer Simulation', 'Call accepted. Softphone channel opened.')}
                  className="py-1.5 px-3 bg-[#10B981] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Answer</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Current Configuration Summary Card */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Current Configuration Summary</h3>
                <p className="text-[11px] text-slate-400">View your active call center settings.</p>
              </div>
              <button
                onClick={() => toast.info('Configuration Editor', 'Config fields ready for inline update.')}
                className="text-xs font-bold text-[#0362FA] hover:underline"
              >
                Edit Settings
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Caller ID</span>
                <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">
                  {callerId}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Call Recording</span>
                <span className="font-semibold text-slate-800">{defaultCallRecording}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Call Timeout</span>
                <span className="font-semibold text-slate-800">{defaultCallTimeout}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Queue Wait Time</span>
                <span className="font-semibold text-slate-800">{maxQueueWait}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Working Hours</span>
                <span className="font-semibold text-slate-800">Mon - Sat, 9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Timezone</span>
                <span className="font-semibold text-slate-800">Asia/Kolkata (IST)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">International Calls</span>
                <span className="font-semibold text-slate-800">
                  {allowInternationalCalls ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Quick Actions */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Actions</h3>
            <p className="text-[11px] text-slate-400">Common call center configuration shortcuts.</p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => navigate('/calls/ivr-numbers')}
                className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold text-left transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Manage IVR</span>
              </button>

              <button
                onClick={() => navigate('/calls/ivr-numbers')}
                className="p-2.5 rounded-lg bg-blue-50 text-[#0362FA] hover:bg-blue-100 font-semibold text-left transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#0362FA] shrink-0" />
                <span>Manage Numbers</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('disposition');
                  toast.info('Dispositions', 'Switched to Call Disposition codes.');
                }}
                className="p-2.5 rounded-lg bg-purple-50 text-purple-800 hover:bg-purple-100 font-semibold text-left transition-colors flex items-center gap-1.5"
              >
                <ListFilter className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Call Dispositions</span>
              </button>

              <button
                onClick={() => navigate('/team/agents')}
                className="p-2.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 font-semibold text-left transition-colors flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Agent Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Holiday Modal */}
      {isAddHolidayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Add Holiday Exception</h3>
              <button onClick={() => setIsAddHolidayModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddHoliday} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Holiday Name</label>
                <input
                  type="text"
                  value={newHolidayName}
                  onChange={(e) => setNewHolidayName(e.target.value)}
                  placeholder="e.g. Diwali Festival"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#0362FA]"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Date</label>
                <input
                  type="text"
                  value={newHolidayDate}
                  onChange={(e) => setNewHolidayDate(e.target.value)}
                  placeholder="e.g. 12 Nov 2026"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#0362FA]"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddHolidayModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Save Holiday
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
