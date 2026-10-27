import React, { useState } from 'react';
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneCall,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Edit2,
  MoreVertical,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Clock,
  Globe,
  Radio,
  X,
  Settings,
  Users,
  Headphones,
  Receipt,
  User,
  AlertCircle,
  Volume2,
  ArrowUpRight,
  ListFilter,
  FileText,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

interface PhoneNumberRecord {
  id: number;
  number: string;
  label: string;
  type: 'Inbound' | 'Outbound';
  location: string;
  countryCode: string;
  status: 'Active' | 'Inactive';
  incomingCalls: number;
  outgoingCalls: number;
  totalCalls: number;
  ivrEnabled: boolean;
  recordingEnabled: boolean;
  voicemailEnabled: boolean;
  createdOn: string;
  assignedIvr: string;
  businessHours: string;
  timezone: string;
  callTimeout: string;
  maxQueueWait: string;
}

interface RecentCallItem {
  id: string;
  number: string;
  callerName: string;
  timeAgo: string;
  status: 'Answered' | 'Missed';
  duration: string;
  type: 'inbound' | 'outbound' | 'missed';
}

const INITIAL_NUMBERS: PhoneNumberRecord[] = [
  {
    id: 1,
    number: '+91 98765 43210',
    label: 'Main Business Line',
    type: 'Inbound',
    location: 'India (IN)',
    countryCode: 'IN',
    status: 'Active',
    incomingCalls: 1245,
    outgoingCalls: 320,
    totalCalls: 1565,
    ivrEnabled: true,
    recordingEnabled: true,
    voicemailEnabled: false,
    createdOn: '01 Sep 2026',
    assignedIvr: 'Main IVR',
    businessHours: 'Mon - Sat, 9:00 AM - 6:00 PM',
    timezone: 'Asia/Kolkata (IST)',
    callTimeout: '30 seconds',
    maxQueueWait: '2 minutes',
  },
  {
    id: 2,
    number: '+91 91234 56789',
    label: 'Sales Support',
    type: 'Inbound',
    location: 'India (IN)',
    countryCode: 'IN',
    status: 'Active',
    incomingCalls: 856,
    outgoingCalls: 210,
    totalCalls: 1066,
    ivrEnabled: true,
    recordingEnabled: true,
    voicemailEnabled: false,
    createdOn: '05 Sep 2026',
    assignedIvr: 'Sales IVR',
    businessHours: 'Mon - Sat, 9:00 AM - 8:00 PM',
    timezone: 'Asia/Kolkata (IST)',
    callTimeout: '25 seconds',
    maxQueueWait: '3 minutes',
  },
  {
    id: 3,
    number: '+91 99887 66554',
    label: 'Customer Care',
    type: 'Inbound',
    location: 'India (IN)',
    countryCode: 'IN',
    status: 'Active',
    incomingCalls: 624,
    outgoingCalls: 132,
    totalCalls: 756,
    ivrEnabled: true,
    recordingEnabled: true,
    voicemailEnabled: true,
    createdOn: '10 Sep 2026',
    assignedIvr: 'Support IVR',
    businessHours: '24/7 Priority Support',
    timezone: 'Asia/Kolkata (IST)',
    callTimeout: '40 seconds',
    maxQueueWait: '5 minutes',
  },
  {
    id: 4,
    number: '+91 88776 55443',
    label: 'Technical Support',
    type: 'Inbound',
    location: 'India (IN)',
    countryCode: 'IN',
    status: 'Active',
    incomingCalls: 412,
    outgoingCalls: 98,
    totalCalls: 510,
    ivrEnabled: true,
    recordingEnabled: true,
    voicemailEnabled: false,
    createdOn: '15 Sep 2026',
    assignedIvr: 'Support IVR',
    businessHours: 'Mon - Fri, 10:00 AM - 7:00 PM',
    timezone: 'Asia/Kolkata (IST)',
    callTimeout: '30 seconds',
    maxQueueWait: '2 minutes',
  },
  {
    id: 5,
    number: '+91 77665 44332',
    label: 'Outbound Calling',
    type: 'Outbound',
    location: 'India (IN)',
    countryCode: 'IN',
    status: 'Active',
    incomingCalls: 0,
    outgoingCalls: 1321,
    totalCalls: 1321,
    ivrEnabled: false,
    recordingEnabled: true,
    voicemailEnabled: false,
    createdOn: '18 Sep 2026',
    assignedIvr: 'None (Direct Dialer)',
    businessHours: 'Mon - Sat, 9:00 AM - 6:00 PM',
    timezone: 'Asia/Kolkata (IST)',
    callTimeout: '45 seconds',
    maxQueueWait: '1 minute',
  },
  {
    id: 6,
    number: '+91 98712 34567',
    label: 'Marketing Campaign',
    type: 'Outbound',
    location: 'India (IN)',
    countryCode: 'IN',
    status: 'Active',
    incomingCalls: 0,
    outgoingCalls: 856,
    totalCalls: 856,
    ivrEnabled: false,
    recordingEnabled: true,
    voicemailEnabled: false,
    createdOn: '20 Sep 2026',
    assignedIvr: 'None (Direct Dialer)',
    businessHours: 'Mon - Fri, 9:30 AM - 6:30 PM',
    timezone: 'Asia/Kolkata (IST)',
    callTimeout: '30 seconds',
    maxQueueWait: '1 minute',
  },
  {
    id: 7,
    number: '+91 91789 65432',
    label: 'Backup Number',
    type: 'Inbound',
    location: 'India (IN)',
    countryCode: 'IN',
    status: 'Inactive',
    incomingCalls: 120,
    outgoingCalls: 45,
    totalCalls: 165,
    ivrEnabled: false,
    recordingEnabled: false,
    voicemailEnabled: false,
    createdOn: '22 Sep 2026',
    assignedIvr: 'After Hours IVR',
    businessHours: 'Standby Route',
    timezone: 'Asia/Kolkata (IST)',
    callTimeout: '20 seconds',
    maxQueueWait: '2 minutes',
  },
  {
    id: 8,
    number: '+91 87654 32109',
    label: 'Old Support Line',
    type: 'Inbound',
    location: 'India (IN)',
    countryCode: 'IN',
    status: 'Inactive',
    incomingCalls: 64,
    outgoingCalls: 28,
    totalCalls: 92,
    ivrEnabled: false,
    recordingEnabled: false,
    voicemailEnabled: true,
    createdOn: '25 Sep 2026',
    assignedIvr: 'After Hours IVR',
    businessHours: 'Forwarded to Main Line',
    timezone: 'Asia/Kolkata (IST)',
    callTimeout: '20 seconds',
    maxQueueWait: '1 minute',
  },
];

const RECENT_CALLS: RecentCallItem[] = [
  { id: 'rc1', number: '+91 98712 34567', callerName: 'Rohit Sharma', timeAgo: '2 mins ago', status: 'Answered', duration: '04:32', type: 'inbound' },
  { id: 'rc2', number: '+91 91234 56789', callerName: 'Priya Khanna', timeAgo: '5 mins ago', status: 'Missed', duration: '00:00', type: 'missed' },
  { id: 'rc3', number: '+91 99887 66554', callerName: 'Amit Jain', timeAgo: '12 mins ago', status: 'Answered', duration: '02:18', type: 'inbound' },
  { id: 'rc4', number: '+91 77665 44332', callerName: 'Sunita Patel', timeAgo: '18 mins ago', status: 'Answered', duration: '05:21', type: 'inbound' },
  { id: 'rc5', number: '+91 98765 43210', callerName: 'Vikram Singh', timeAgo: '25 mins ago', status: 'Missed', duration: '00:00', type: 'missed' },
];

export const IvrNumbersPage: React.FC = () => {
  const [numbers, setNumbers] = useState<PhoneNumberRecord[]>(INITIAL_NUMBERS);
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumberRecord>(INITIAL_NUMBERS[0]);
  const [activeMainTab, setActiveMainTab] = useState<'numbers' | 'ivr' | 'routing' | 'hours' | 'greetings'>('numbers');
  const [drawerSubTab, setDrawerSubTab] = useState<'overview' | 'routing' | 'settings' | 'usage'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  
  // Modals & Panels
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isAddNumberModalOpen, setIsAddNumberModalOpen] = useState(false);
  const [isEditNumberModalOpen, setIsEditNumberModalOpen] = useState(false);
  const [isTestIvrModalOpen, setIsTestIvrModalOpen] = useState(false);
  const [testedDigit, setTestedDigit] = useState<string | null>(null);
  const [activeIvrMenu, setActiveIvrMenu] = useState<'main' | 'sales' | 'support' | 'afterhours'>('main');

  // New Number Form
  const [newNumberPhone, setNewNumberPhone] = useState('+91 9');
  const [newNumberLabel, setNewNumberLabel] = useState('');
  const [newNumberType, setNewNumberType] = useState<'Inbound' | 'Outbound'>('Inbound');
  const [newNumberIvr, setNewNumberIvr] = useState('Main IVR');

  // Filtering numbers
  const filteredNumbers = numbers.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.number.includes(searchQuery) ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesLocation = selectedLocation === 'All' || item.location.includes(selectedLocation);
    return matchesSearch && matchesType && matchesStatus && matchesLocation;
  });

  const handleSelectNumber = (num: PhoneNumberRecord) => {
    setSelectedNumber(num);
    setIsDrawerOpen(true);
  };

  const handleToggleSetting = (field: 'ivrEnabled' | 'recordingEnabled' | 'voicemailEnabled') => {
    const updated = { ...selectedNumber, [field]: !selectedNumber[field] };
    setSelectedNumber(updated);
    setNumbers((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    toast.success('Configuration Saved', `${field} updated for ${selectedNumber.number}`);
  };

  const handleSaveAddNumber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNumberPhone || !newNumberLabel) {
      toast.error('Validation Error', 'Please enter a valid phone number and label');
      return;
    }
    const created: PhoneNumberRecord = {
      id: numbers.length + 1,
      number: newNumberPhone,
      label: newNumberLabel,
      type: newNumberType,
      location: 'India (IN)',
      countryCode: 'IN',
      status: 'Active',
      incomingCalls: 0,
      outgoingCalls: 0,
      totalCalls: 0,
      ivrEnabled: true,
      recordingEnabled: true,
      voicemailEnabled: false,
      createdOn: 'Just now',
      assignedIvr: newNumberIvr,
      businessHours: 'Mon - Sat, 9:00 AM - 6:00 PM',
      timezone: 'Asia/Kolkata (IST)',
      callTimeout: '30 seconds',
      maxQueueWait: '2 minutes',
    };
    setNumbers([created, ...numbers]);
    setSelectedNumber(created);
    setIsAddNumberModalOpen(false);
    setNewNumberLabel('');
    toast.success('DID Number Activated', `${created.number} assigned to ${created.label}`);
  };

  return (
    <div className="space-y-5">
      {/* 1. Breadcrumb & Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Calling & Call Center</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">IVR & Numbers</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">IVR & Numbers</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your phone numbers, configure IVR menus, and set up call routing for your business.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => toast.info('Call Logs', 'Opening telecom telemetry logs...')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Call Logs</span>
          </button>
          <button
            onClick={() => setIsAddNumberModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Number</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Card 1: Total Numbers */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Total Numbers</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{numbers.length}</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>14.3%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[35, 55, 45, 70, 60, 90].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#0362FA] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 2: Active Numbers */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A]">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Active Numbers</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {numbers.filter((n) => n.status === 'Active').length}
            </div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>20.0%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[40, 60, 50, 75, 70, 95].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#13AB4A] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 3: Incoming Calls */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FEECEE] flex items-center justify-center text-[#E73647]">
                <PhoneIncoming className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Incoming Calls</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">2,845</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>18.6%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[45, 65, 55, 80, 70, 100].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#E73647] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 4: Outgoing Calls */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
                <PhoneOutgoing className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Outgoing Calls</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">1,321</div>
            <div className="flex items-center text-[11px] font-semibold text-[#13AB4A]">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              <span>12.4%</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-9 self-end">
            {[30, 45, 50, 65, 75, 85].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#0362FA] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-600 overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { id: 'numbers', label: `Phone Numbers (${numbers.length})` },
          { id: 'ivr', label: 'IVR Menus (4)' },
          { id: 'routing', label: 'Call Routing' },
          { id: 'hours', label: 'Business Hours' },
          { id: 'greetings', label: 'Greetings & Messages' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMainTab(tab.id as any)}
            className={`pb-2.5 transition-colors relative ${
              activeMainTab === tab.id
                ? 'text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]'
                : 'hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Left / Center Content + Right Drawer Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main Left/Center Content Area (8 or 12 Cols depending on drawer) */}
        <div className={`space-y-6 ${isDrawerOpen ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          {/* A. Phone Numbers Workstation */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Phone Numbers</h3>
                <p className="text-xs text-slate-500">Manage your inbound and outbound phone numbers.</p>
              </div>
              <button
                onClick={() => setIsAddNumberModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Number</span>
              </button>
            </div>

            {/* Filter Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <div className="flex items-center flex-1 min-w-[240px] max-w-sm relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by number, label or location..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA] focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Type Filter */}
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer"
                  >
                    <option value="All">Type: All</option>
                    <option value="Inbound">Type: Inbound</option>
                    <option value="Outbound">Type: Outbound</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer"
                  >
                    <option value="All">Status: All</option>
                    <option value="Active">Status: Active</option>
                    <option value="Inactive">Status: Inactive</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
                </div>

                {/* Location Filter */}
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="appearance-none pl-2.5 pr-7 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none cursor-pointer"
                  >
                    <option value="All">Location: All</option>
                    <option value="India">Location: India (IN)</option>
                    <option value="US">Location: United States (US)</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Non-Shrinking Responsive Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg" role="region" aria-label="Phone Numbers Directory" tabIndex={0}>
              <table className="w-full min-w-[850px] text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-[#E5EBF2] whitespace-nowrap">
                    <th className="py-2.5 px-3 w-8">
                      <input type="checkbox" className="rounded border-slate-300 text-[#0362FA] focus:ring-0" />
                    </th>
                    <th className="py-2.5 px-2 w-7 text-slate-400">#</th>
                    <th className="py-2.5 px-3.5">Phone Number</th>
                    <th className="py-2.5 px-3.5">Label / Name</th>
                    <th className="py-2.5 px-3.5">Type</th>
                    <th className="py-2.5 px-3.5">Location</th>
                    <th className="py-2.5 px-3.5">Status</th>
                    <th className="py-2.5 px-3.5">Incoming</th>
                    <th className="py-2.5 px-3.5">Outgoing</th>
                    <th className="py-2.5 px-3.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredNumbers.map((item) => {
                    const isSelected = selectedNumber.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => handleSelectNumber(item)}
                        className={`hover:bg-[#F0F7FF] transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-slate-300 text-[#0362FA] focus:ring-0" />
                        </td>
                        <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px] whitespace-nowrap">{item.id}</td>
                        <td className="py-2.5 px-3.5 whitespace-nowrap">
                          <span className="font-mono text-[#0362FA] font-semibold hover:underline text-xs tracking-tight">
                            {item.number}
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-medium text-slate-800 whitespace-nowrap">
                          {item.label}
                        </td>
                        <td className="py-2.5 px-3.5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              item.type === 'Inbound'
                                ? 'bg-blue-50 text-[#0362FA] border border-blue-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">
                          {item.location}
                        </td>
                        <td className="py-2.5 px-3.5 whitespace-nowrap">
                          {item.status === 'Active' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEECEE] text-[#E73647] border border-rose-200">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-slate-700 whitespace-nowrap">
                          {item.incomingCalls.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-slate-700 whitespace-nowrap">
                          {item.outgoingCalls.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3.5 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedNumber(item);
                                setIsEditNumberModalOpen(true);
                              }}
                              className="p-1 text-slate-400 hover:text-[#0362FA] hover:bg-blue-50 rounded transition-colors"
                              title="Edit Number"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleSelectNumber(item)}
                              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                              title="More Details"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. IVR Menu Builder Section (Screen 054 Exact Layout) */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">IVR Menu Builder</h3>
                <p className="text-xs text-slate-500">Create and manage interactive voice response (IVR) menus.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTestIvrModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-[#0362FA] fill-current" />
                  <span>Test IVR</span>
                </button>
                <button
                  onClick={() => toast.success('IVR Menu Saved', 'Flow tree schema compiled and synced with telephony gateway.')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <span>Save IVR</span>
                </button>
              </div>
            </div>

            {/* 2-Columns: Left Menu Selection + Right Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              {/* Left Column: IVR Menus List */}
              <div className="md:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">IVR Menus</span>
                  <button
                    onClick={() => toast.info('New IVR Menu', 'Opening menu creation wizard...')}
                    className="flex items-center gap-1 text-xs font-bold text-[#0362FA] hover:underline"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Create IVR</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'main', num: 1, name: 'Main IVR', desc: 'Main Business Line', active: true },
                    { id: 'sales', num: 2, name: 'Sales IVR', desc: 'Sales Department', active: false },
                    { id: 'support', num: 3, name: 'Support IVR', desc: 'Customer Support', active: false },
                    { id: 'afterhours', num: 4, name: 'After Hours IVR', desc: 'Outside Business Hours', active: false },
                  ].map((m) => {
                    const isSelected = activeIvrMenu === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setActiveIvrMenu(m.id as any)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/60 border-[#B0D2FB] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold text-slate-400">{m.num}</span>
                          <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-[#0362FA] flex items-center justify-center font-bold">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{m.name}</div>
                            <div className="text-[11px] text-slate-400">{m.desc}</div>
                          </div>
                        </div>

                        {m.active ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                            Active
                          </span>
                        ) : (
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Visual IVR Flow Diagram */}
              <div className="md:col-span-8 bg-[#F8FAFD] rounded-xl border border-[#E5EBF2] p-4 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-xs font-bold text-slate-900">
                      IVR Flow - {activeIvrMenu === 'main' ? 'Main IVR' : activeIvrMenu === 'sales' ? 'Sales IVR' : activeIvrMenu === 'support' ? 'Support IVR' : 'After Hours IVR'}
                    </span>
                  </div>

                  {/* Flow Controls (+, -, 100%, Reset) */}
                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 text-xs text-slate-600 shadow-xs">
                    <button className="px-2 py-0.5 hover:bg-slate-100 rounded font-bold">+</button>
                    <button className="px-2 py-0.5 hover:bg-slate-100 rounded font-bold">-</button>
                    <span className="px-1.5 text-[10px] text-slate-400 font-semibold">100%</span>
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-500">
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Tree Diagram Visual Canvas */}
                <div className="flex flex-col items-center space-y-4 py-2">
                  {/* Top Node: Welcome Message */}
                  <div className="w-full max-w-md bg-white rounded-xl border-2 border-blue-400 p-3.5 shadow-sm text-center relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#0362FA]">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Welcome Message</span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
                      "Thank you for calling DOVIX AI. Please choose an option."
                    </p>
                    <button
                      onClick={() => toast.info('Playing Audio Preview', 'Streaming synthetic voice TTS prompt...')}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0362FA] hover:underline"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Preview Prompt</span>
                    </button>
                  </div>

                  {/* Connecting Line Downward */}
                  <div className="w-0.5 h-6 bg-slate-300" />

                  {/* 4 IVR Branches Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                    {/* Key 1: Sales */}
                    <div className="bg-white rounded-xl border border-emerald-300 p-3 shadow-xs hover:border-emerald-500 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          Press 1
                        </span>
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="font-bold text-xs text-slate-900 mt-1">Sales</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Route to Sales Team</div>
                    </div>

                    {/* Key 2: Support */}
                    <div className="bg-white rounded-xl border border-blue-300 p-3 shadow-xs hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                          Press 2
                        </span>
                        <Headphones className="w-3.5 h-3.5 text-[#0362FA]" />
                      </div>
                      <div className="font-bold text-xs text-slate-900 mt-1">Support</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Route to Support Team</div>
                    </div>

                    {/* Key 3: Accounts */}
                    <div className="bg-white rounded-xl border border-purple-300 p-3 shadow-xs hover:border-purple-500 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                          Press 3
                        </span>
                        <Receipt className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <div className="font-bold text-xs text-slate-900 mt-1">Accounts</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Route to Accounts Team</div>
                    </div>

                    {/* Key 0: Operator */}
                    <div className="bg-white rounded-xl border border-amber-300 p-3 shadow-xs hover:border-amber-500 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                          Press 0
                        </span>
                        <User className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      <div className="font-bold text-xs text-slate-900 mt-1">Operator</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Route to Reception</div>
                    </div>
                  </div>

                  {/* Fallback Branch: Invalid Input */}
                  <div className="w-0.5 h-4 bg-slate-300" />
                  <div className="w-full max-w-sm bg-rose-50/70 rounded-xl border border-rose-200 p-2.5 flex items-center gap-2.5 text-xs text-rose-800">
                    <AlertCircle className="w-4 h-4 text-[#E73647] shrink-0" />
                    <div>
                      <span className="font-bold">Invalid Input: </span>
                      <span>"Sorry, that was an invalid option. Please try again."</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Drawer: Number Details Panel (Exact Screen 054 Right Side) */}
        {isDrawerOpen && (
          <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-4">
            {/* Header with Close */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 font-mono">{selectedNumber.number}</div>
                  <div className="text-[11px] text-slate-500">{selectedNumber.label}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                  {selectedNumber.status}
                </span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub Tabs: Overview, IVR & Routing, Call Settings, Usage */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 border-b border-slate-100 pb-2">
              <button
                onClick={() => setDrawerSubTab('overview')}
                className={`transition-colors ${drawerSubTab === 'overview' ? 'text-[#0362FA] font-bold' : 'hover:text-slate-800'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setDrawerSubTab('routing')}
                className={`transition-colors ${drawerSubTab === 'routing' ? 'text-[#0362FA] font-bold' : 'hover:text-slate-800'}`}
              >
                IVR & Routing
              </button>
              <button
                onClick={() => setDrawerSubTab('settings')}
                className={`transition-colors ${drawerSubTab === 'settings' ? 'text-[#0362FA] font-bold' : 'hover:text-slate-800'}`}
              >
                Call Settings
              </button>
              <button
                onClick={() => setDrawerSubTab('usage')}
                className={`transition-colors ${drawerSubTab === 'usage' ? 'text-[#0362FA] font-bold' : 'hover:text-slate-800'}`}
              >
                Usage
              </button>
            </div>

            {/* Tab 1: Overview Metadata Grid */}
            {drawerSubTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block">Type</span>
                    <span className="font-bold text-slate-800">{selectedNumber.type}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block">Location</span>
                    <span className="font-bold text-slate-800">{selectedNumber.location}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block">Incoming</span>
                    <span className="font-bold text-slate-800 font-mono">{selectedNumber.incomingCalls.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block">Outgoing</span>
                    <span className="font-bold text-slate-800 font-mono">{selectedNumber.outgoingCalls.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block">Total Calls</span>
                    <span className="font-bold text-slate-800 font-mono">{selectedNumber.totalCalls.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block">Created On</span>
                    <span className="font-bold text-slate-800">{selectedNumber.createdOn}</span>
                  </div>
                </div>

                {/* Edit & Logs Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsEditNumberModalOpen(true)}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 shadow-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit Number</span>
                  </button>
                  <button
                    onClick={() => toast.info('Telecom Logs', `Filtering logs for ${selectedNumber.number}`)}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-[#0362FA] shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#0362FA]" />
                    <span>View Call Logs</span>
                  </button>
                </div>

                {/* Quick Settings Section with Toggles */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Quick Settings</span>

                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-slate-700">Enable IVR</span>
                    <input
                      type="checkbox"
                      checked={selectedNumber.ivrEnabled}
                      onChange={() => handleToggleSetting('ivrEnabled')}
                      className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-slate-700">Call Recording</span>
                    <input
                      type="checkbox"
                      checked={selectedNumber.recordingEnabled}
                      onChange={() => handleToggleSetting('recordingEnabled')}
                      className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-slate-700">Voicemail</span>
                    <input
                      type="checkbox"
                      checked={selectedNumber.voicemailEnabled}
                      onChange={() => handleToggleSetting('voicemailEnabled')}
                      className="rounded text-[#0362FA] focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-slate-700">Business Hours</span>
                    <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[150px]">
                      {selectedNumber.businessHours}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-slate-700">Timezone</span>
                    <span className="font-semibold text-slate-800 text-[11px]">
                      {selectedNumber.timezone}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-slate-700">Call Timeout</span>
                    <span className="font-semibold text-slate-800 text-[11px]">
                      {selectedNumber.callTimeout}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-slate-700">Max Queue Wait</span>
                    <span className="font-semibold text-slate-800 text-[11px]">
                      {selectedNumber.maxQueueWait}
                    </span>
                  </div>
                </div>

                {/* Recent Calls on this Number */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Recent Calls on this Number
                    </span>
                    <a href="/calls/history" className="text-xs font-bold text-[#0362FA] hover:underline">
                      View All
                    </a>
                  </div>

                  <div className="space-y-2">
                    {RECENT_CALLS.map((rc) => (
                      <div
                        key={rc.id}
                        className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs hover:bg-slate-100/80 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                              rc.status === 'Answered' ? 'bg-[#10B981]' : 'bg-[#E73647]'
                            }`}
                          >
                            {rc.status === 'Answered' ? <PhoneIncoming className="w-3 h-3" /> : <PhoneOutgoing className="w-3 h-3" />}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{rc.callerName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{rc.number}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full block ${
                              rc.status === 'Answered' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {rc.status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{rc.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {drawerSubTab !== 'overview' && (
              <div className="py-6 text-center text-slate-500 text-xs">
                <p className="font-medium">Active Configuration for {drawerSubTab.toUpperCase()}</p>
                <p className="text-[11px] text-slate-400 mt-1">Telephony switch and IVR engine configured for {selectedNumber.number}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Add Number Modal */}
      {isAddNumberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Add New Phone Number</h3>
                  <p className="text-xs text-slate-500">Assign a DID number or port SIP trunk line</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddNumberModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAddNumber} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Phone Number (with Country Code)</label>
                <input
                  type="text"
                  value={newNumberPhone}
                  onChange={(e) => setNewNumberPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-[#0362FA] focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Label / Department Name</label>
                <input
                  type="text"
                  value={newNumberLabel}
                  onChange={(e) => setNewNumberLabel(e.target.value)}
                  placeholder="e.g. Inbound Enterprise Support"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#0362FA] focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Line Type</label>
                  <select
                    value={newNumberType}
                    onChange={(e) => setNewNumberType(e.target.value as any)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  >
                    <option value="Inbound">Inbound</option>
                    <option value="Outbound">Outbound</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assigned IVR Menu</label>
                  <select
                    value={newNumberIvr}
                    onChange={(e) => setNewNumberIvr(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  >
                    <option value="Main IVR">Main IVR</option>
                    <option value="Sales IVR">Sales IVR</option>
                    <option value="Support IVR">Support IVR</option>
                    <option value="After Hours IVR">After Hours IVR</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddNumberModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Activate Number
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Edit Number Modal */}
      {isEditNumberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Edit Number: {selectedNumber.number}</h3>
              <button
                onClick={() => setIsEditNumberModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Department Label</label>
                <input
                  type="text"
                  value={selectedNumber.label}
                  onChange={(e) => setSelectedNumber({ ...selectedNumber, label: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Call Timeout Duration</label>
                <select
                  value={selectedNumber.callTimeout}
                  onChange={(e) => setSelectedNumber({ ...selectedNumber, callTimeout: e.target.value })}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="15 seconds">15 seconds</option>
                  <option value="20 seconds">20 seconds</option>
                  <option value="30 seconds">30 seconds</option>
                  <option value="45 seconds">45 seconds</option>
                  <option value="60 seconds">60 seconds</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Max Queue Wait SLA</label>
                <select
                  value={selectedNumber.maxQueueWait}
                  onChange={(e) => setSelectedNumber({ ...selectedNumber, maxQueueWait: e.target.value })}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <option value="1 minute">1 minute</option>
                  <option value="2 minutes">2 minutes</option>
                  <option value="3 minutes">3 minutes</option>
                  <option value="5 minutes">5 minutes</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditNumberModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNumbers((prev) => prev.map((n) => (n.id === selectedNumber.id ? selectedNumber : n)));
                    setIsEditNumberModalOpen(false);
                    toast.success('Updated', 'Number settings successfully saved');
                  }}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Test IVR Interactive Simulator Modal */}
      {isTestIvrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[#0A1629] text-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-700 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-slate-300">Live IVR Simulator</span>
              </div>
              <button onClick={() => setIsTestIvrModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-3">
              <div className="text-xs text-slate-400">Calling Simulation</div>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">{selectedNumber.number}</div>
              <div className="text-[11px] text-slate-300 mt-2 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                {testedDigit === '1' && '📞 "Routing your call to Sales Team. Please hold..."'}
                {testedDigit === '2' && '🎧 "Connecting to Support Queue. Position in line: 1."'}
                {testedDigit === '3' && '🧾 "Transferring to Accounts & Invoicing department."'}
                {testedDigit === '0' && '👤 "Connecting to Receptionist Desk..."'}
                {!testedDigit && '🔊 "Welcome to DOVIX AI. Press 1 for Sales, 2 for Support, 3 for Accounts, 0 for Operator."'}
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { digit: '1', sub: 'SALES' },
                { digit: '2', sub: 'SUPPORT' },
                { digit: '3', sub: 'ACCOUNTS' },
                { digit: '4', sub: 'GHI' },
                { digit: '5', sub: 'JKL' },
                { digit: '6', sub: 'MNO' },
                { digit: '7', sub: 'PQRS' },
                { digit: '8', sub: 'TUV' },
                { digit: '9', sub: 'WXYZ' },
                { digit: '*', sub: '' },
                { digit: '0', sub: 'OPERATOR' },
                { digit: '#', sub: '' },
              ].map((k) => (
                <button
                  key={k.digit}
                  onClick={() => setTestedDigit(k.digit)}
                  className="h-12 rounded-2xl bg-slate-800/90 hover:bg-blue-600 active:scale-95 transition-all flex flex-col items-center justify-center border border-slate-700"
                >
                  <span className="text-sm font-bold text-white">{k.digit}</span>
                  {k.sub && <span className="text-[8px] font-semibold text-slate-400">{k.sub}</span>}
                </button>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setTestedDigit(null);
                  setIsTestIvrModalOpen(false);
                }}
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
