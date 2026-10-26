import React, { useState } from "react";
import {
  Users,
  UserPlus,
  RotateCcw,
  Star,
  CheckCircle,
  Download,
  Upload,
  Filter,
  Plus,
  Phone,
  MessageSquare,
  Mail,
  MoreVertical,
  X,
  Calendar,
  Clock,
  Briefcase,
  MapPin,
  Tag,
  Check,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  FileText,
  UserCheck,
  Search,
} from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { LeadPipelineStrip } from "@/components/common/LeadPipelineStrip";
import { UserAvatar } from "@/components/common/UserAvatar";
import { ActionMenu } from "@/components/common/ActionMenu";
import { AddLeadModal } from "@/features/leads/components/AddLeadModal";
import { ImportLeadsModal } from "@/features/leads/components/ImportLeadsModal";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { usePermission } from "@/hooks/usePermission";
import { toast } from "@/store/toastStore";
import { cn } from "@/lib/utils";

export const LeadsPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const startCall = useUIStore((state) => state.startCall);
  const { can } = usePermission();

  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Activity" | "Notes" | "Files"
  >("Overview");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Exact 10 Rows from Screen 012
  const leadsData = [
    {
      id: "1",
      initials: "RS",
      initialsBg: "bg-[#E73647]",
      name: "Rohit Sharma",
      phone: "+91 98765 43210",
      email: "rohit@techsolutions.com",
      company: "Tech Solutions Pvt. Ltd.",
      source: "Website",
      status: "New",
      statusClass: "bg-[#E6F7EC] text-[#13AB4A]",
      statusDot: "bg-[#13AB4A]",
      lastContact: "Today, 10:15 AM Inbound Call",
      nextFollowUp: "Today, 03:00 PM",
      assignedTo: "Amit Kumar",
      agentAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      city: "Jaipur, Rajasthan",
      campaign: "Product Demo",
      score: "85/100",
    },
    {
      id: "2",
      initials: "PK",
      initialsBg: "bg-[#0362FA]",
      name: "Priya Khanna",
      phone: "+91 91234 56789",
      email: "priya@globex.in",
      company: "Globex Corp",
      source: "Google Ads",
      status: "Contacted",
      statusClass: "bg-[#EBF3FE] text-[#0362FA]",
      statusDot: "bg-[#0362FA]",
      lastContact: "Today, 09:45 AM WhatsApp",
      nextFollowUp: "Today, 12:30 PM",
      assignedTo: "Sneha Verma",
      agentAvatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      city: "Mumbai, Maharashtra",
      campaign: "Inbound Q4",
      score: "78/100",
    },
    {
      id: "3",
      initials: "AJ",
      initialsBg: "bg-[#10B981]",
      name: "Amit Jain",
      phone: "+91 99887 66554",
      email: "amit@jaintraders.com",
      company: "Jain Traders",
      source: "Referral",
      status: "Qualified",
      statusClass: "bg-[#F3E8FF] text-[#871CF4]",
      statusDot: "bg-[#871CF4]",
      lastContact: "Yesterday, 04:30 PM Outgoing Call",
      nextFollowUp: "Today, 11:00 AM",
      assignedTo: "Rahul Mehta",
      agentAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      city: "Ahmedabad, Gujarat",
      campaign: "Enterprise Plan",
      score: "92/100",
    },
    {
      id: "4",
      initials: "SP",
      initialsBg: "bg-[#871CF4]",
      name: "Sunita Patel",
      phone: "+91 88776 55443",
      email: "sunita@patelind.com",
      company: "Patel Industries",
      source: "LinkedIn",
      status: "Proposal",
      statusClass: "bg-[#FEF3E6] text-[#EF9612]",
      statusDot: "bg-[#EF9612]",
      lastContact: "Today, 11:20 AM Email",
      nextFollowUp: "Today, 05:00 PM",
      assignedTo: "Neha Singh",
      agentAvatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      city: "Surat, Gujarat",
      campaign: "Product Demo",
      score: "88/100",
    },
    {
      id: "5",
      initials: "VK",
      initialsBg: "bg-[#0362FA]",
      name: "Vikram Singh",
      phone: "+91 77665 44332",
      email: "vikram@autohaus.in",
      company: "AutoHaus",
      source: "Cold Call",
      status: "Negotiation",
      statusClass: "bg-[#FDE8E8] text-[#E73647]",
      statusDot: "bg-[#E73647]",
      lastContact: "Today, 09:10 AM Inbound Call",
      nextFollowUp: "Tomorrow, 10:00 AM",
      assignedTo: "Arjun Rao",
      agentAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      city: "New Delhi",
      campaign: "Outbound Telesales",
      score: "74/100",
    },
    {
      id: "6",
      initials: "MD",
      initialsBg: "bg-[#10B981]",
      name: "Meera Das",
      phone: "+91 98712 34567",
      email: "meera@dasgroup.in",
      company: "Das Group",
      source: "Website",
      status: "Converted",
      statusClass: "bg-[#E6F7EC] text-[#13AB4A]",
      statusDot: "bg-[#13AB4A]",
      lastContact: "Today, 08:45 AM Meeting",
      nextFollowUp: "-",
      assignedTo: "Pooja Sharma",
      agentAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      city: "Kolkata, WB",
      campaign: "Web Inbound",
      score: "96/100",
    },
    {
      id: "7",
      initials: "RK",
      initialsBg: "bg-[#EF9612]",
      name: "Rahul Kapoor",
      phone: "+91 95544 33221",
      email: "rahul@kapoorretail.com",
      company: "Kapoor Retail",
      source: "Email Campaign",
      status: "New",
      statusClass: "bg-[#EBF3FE] text-[#0362FA]",
      statusDot: "bg-[#0362FA]",
      lastContact: "Yesterday, 03:10 PM Email",
      nextFollowUp: "Today, 04:00 PM",
      assignedTo: "Karan Yadav",
      agentAvatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
      city: "Chandigarh",
      campaign: "Email Drip",
      score: "65/100",
    },
    {
      id: "8",
      initials: "NT",
      initialsBg: "bg-[#10B981]",
      name: "Neha Tiwari",
      phone: "+91 93123 45678",
      email: "neha@nextgentech.in",
      company: "NextGen Tech",
      source: "Social Media",
      status: "Contacted",
      statusClass: "bg-[#EBF3FE] text-[#0362FA]",
      statusDot: "bg-[#0362FA]",
      lastContact: "Today, 11:30 AM WhatsApp",
      nextFollowUp: "Tomorrow, 10:00 AM",
      assignedTo: "Anjali Gupta",
      agentAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      city: "Bengaluru",
      campaign: "Social Ads",
      score: "70/100",
    },
    {
      id: "9",
      initials: "DS",
      initialsBg: "bg-[#871CF4]",
      name: "Deepak Soni",
      phone: "+91 91789 65432",
      email: "deepak@sonient.com",
      company: "Soni Enterprises",
      source: "Referral",
      status: "Qualified",
      statusClass: "bg-[#F3E8FF] text-[#871CF4]",
      statusDot: "bg-[#871CF4]",
      lastContact: "Yesterday, 05:20 PM Call",
      nextFollowUp: "Today, 06:00 PM",
      assignedTo: "Rohit Verma",
      agentAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      city: "Indore, MP",
      campaign: "Referrals",
      score: "84/100",
    },
    {
      id: "10",
      initials: "AL",
      initialsBg: "bg-[#0362FA]",
      name: "Ankit Lal",
      phone: "+91 90678 12345",
      email: "ankit@laltraders.in",
      company: "Lal Traders",
      source: "WhatsApp",
      status: "Proposal",
      statusClass: "bg-[#FEF3E6] text-[#EF9612]",
      statusDot: "bg-[#EF9612]",
      lastContact: "Today, 02:30 PM WhatsApp",
      nextFollowUp: "Tomorrow, 11:30 AM",
      assignedTo: "Simran Kaur",
      agentAvatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      city: "Patna, Bihar",
      campaign: "WhatsApp Bot",
      score: "79/100",
    },
  ];

  // Default active selected lead to Rohit Sharma as shown in Screen 012
  const activeLead = selectedLead || leadsData[0];

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(leadsData.map((l) => l.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) setSelectedIds([...selectedIds, id]);
    else setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  return (
    <div className="space-y-4">
      {/* 1. Header (Screen 012 exact) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Leads Management
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage, track and convert your leads into loyal customers.
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsImportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] text-[#475569] text-xs font-semibold rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Leads</span>
          </button>

          <button
            onClick={() =>
              toast.info(
                'Exporting All Leads',
                'Compiling 12,480 leads with custom fields into CSV...'
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] text-[#475569] text-xs font-semibold rounded-lg shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
            <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
          </button>

          <ActionMenu
            align="right"
            items={[
              {
                label: 'Import Leads via CSV',
                icon: Upload,
                onClick: () => setIsImportOpen(true),
              },
              {
                label: 'Download Sample Lead Template',
                icon: Download,
                onClick: () =>
                  toast.success('Download Started', 'sample_leads_template.csv downloaded.'),
              },
              {
                label: 'Bulk Reassign Leads',
                icon: UserCheck,
                onClick: () =>
                  toast.info('Bulk Assign', 'Select leads to distribute amongst active agents.'),
              },
              {
                label: 'Run Deduplication Scan',
                icon: RotateCcw,
                onClick: () => (window.location.href = '/duplicate-leads'),
              },
            ]}
          />
        </div>
      </div>

      {/* 2. Top 6 KPI Cards (Screen 012 exact) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          title="Total Leads"
          value="12,480"
          change="18.6%"
          changeType="positive"
          timeframe="vs last month"
          icon={<Users className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
          sparklineHeights={[30, 45, 60, 80, 55, 95]}
        />
        <StatCard
          title="New Leads"
          value="3,240"
          change="12.4%"
          changeType="positive"
          timeframe="this month"
          icon={<Phone className="w-4 h-4" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
          sparklineHeights={[40, 50, 75, 60, 85, 100]}
        />
        <StatCard
          title="Contacted"
          value="2,980"
          change="8.2%"
          changeType="positive"
          timeframe=""
          icon={<UserCheck className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
          sparklineHeights={[50, 35, 65, 80, 70, 90]}
        />
        <StatCard
          title="Qualified"
          value="2,160"
          change="17.6%"
          changeType="positive"
          timeframe=""
          icon={<Mail className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
          sparklineHeights={[30, 60, 40, 75, 90, 85]}
        />
        <StatCard
          title="Proposal"
          value="1,840"
          change="15.3%"
          changeType="positive"
          timeframe=""
          icon={<Star className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
          sparklineHeights={[40, 30, 65, 70, 85, 80]}
        />
        <StatCard
          title="Converted"
          value="890"
          change="22.8%"
          changeType="positive"
          timeframe=""
          icon={<CheckCircle className="w-4 h-4" />}
          iconBgColor="bg-[#E6F7EC] text-[#13AB4A]"
          sparklineColor="bg-[#A7F3D0]"
          sparklineHeights={[30, 50, 70, 60, 90, 100]}
        />
      </div>

      {/* 3. Lead Pipeline Strip (Screen 012 exact) */}
      <LeadPipelineStrip totalLeadsLabel="12,480 Leads" />

      {/* 4. Filter Toolbar & Search Bar (Screen 012 exact) */}
      <div className="bg-white rounded-[12px] p-3 border border-[#E5EBF2] shadow-card space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, phone, email..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* 5 Dropdown Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <select className="text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-[#475569] font-medium">
              <option>Status: All</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Proposal</option>
              <option>Converted</option>
            </select>

            <select className="text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-[#475569] font-medium">
              <option>Source: All</option>
              <option>Website</option>
              <option>Google Ads</option>
              <option>Referral</option>
              <option>LinkedIn</option>
            </select>

            <select className="text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-[#475569] font-medium">
              <option>Campaign: All</option>
              <option>Product Demo</option>
              <option>New Year Offer</option>
            </select>

            <select className="text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-[#475569] font-medium">
              <option>Assigned To: All</option>
              <option>Amit Kumar</option>
              <option>Sneha Verma</option>
              <option>Rahul Mehta</option>
            </select>

            <select className="text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-[#475569] font-medium">
              <option>Date Range: All</option>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>

            <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#475569] bg-white border border-[#E5EBF2] rounded-lg hover:bg-slate-50">
              <Filter className="w-3.5 h-3.5" />
              <span>More Filters</span>
            </button>

            <button className="px-4 py-1.5 text-xs font-bold text-white bg-[#0362FA] hover:bg-[#0252D4] rounded-lg shadow-sm">
              Apply
            </button>
          </div>
        </div>

        {/* Bulk Action Sub-bar */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() =>
                toast.success(
                  'Power Dialer Initialized',
                  `Loaded ${selectedIds.length || 'selected'} leads into sequential autodial queue.`
                )
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E5EBF2] text-[#475569] hover:bg-slate-50 cursor-pointer"
            >
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </button>
            <button
              onClick={() =>
                toast.info(
                  'Bulk WhatsApp Template',
                  `Ready to dispatch approved HSM message template to ${selectedIds.length || 'selected'} contacts.`
                )
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E5EBF2] text-[#475569] hover:bg-slate-50 cursor-pointer"
            >
              <MessageSquare className="w-3 h-3 text-[#10B981]" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() =>
                toast.info(
                  'Bulk Email Composer',
                  `Prepared product demo email for ${selectedIds.length || 'selected'} leads.`
                )
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E5EBF2] text-[#475569] hover:bg-slate-50 cursor-pointer"
            >
              <Mail className="w-3 h-3 text-[#0362FA]" />
              <span>Email</span>
            </button>
            <button
              onClick={() =>
                toast.success(
                  'Added to Campaign',
                  `Enrolled ${selectedIds.length || 'selected'} leads into Product Demo Q4.`
                )
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E5EBF2] text-[#475569] hover:bg-slate-50 cursor-pointer"
            >
              <span>Add to Campaign</span>
            </button>
            <button
              onClick={() =>
                toast.info('Bulk Assign Leads', 'Distributing leads evenly using round-robin.')
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E5EBF2] text-[#475569] hover:bg-slate-50 cursor-pointer"
            >
              <span>Assign</span>
            </button>
            <button
              onClick={() =>
                toast.success('Status Updated', 'Promoted selected leads to Qualified.')
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E5EBF2] text-[#475569] hover:bg-slate-50 cursor-pointer"
            >
              <span>Change Status</span>
            </button>
            <button
              onClick={() =>
                toast.warning('Moved to Recycle Bin', `${selectedIds.length || 1} leads archived.`)
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E5EBF2] text-[#E73647] hover:bg-rose-50 cursor-pointer"
            >
              <span>Delete</span>
            </button>
            <span className="text-[#8A99AD] pl-1 font-medium">
              {selectedIds.length} selected
            </span>
          </div>

          <button className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E5EBF2] text-[#475569] hover:bg-slate-50">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Columns</span>
          </button>
        </div>
      </div>

      {/* 5. Main Content: Table + Right Side Lead Details Panel (Screen 012 exact) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Table (Span 8 or full when no panel) */}
        <div
          className={cn(
            "space-y-4",
            selectedLead ? "lg:col-span-8" : "lg:col-span-8",
          )}
        >
          <div className="bg-white rounded-[12px] border border-[#E5EBF2] shadow-card overflow-hidden">
            <div className="overflow-x-auto no-scrollbar scrollbar-none">
              <table className="w-full text-left text-xs min-w-[980px]">
                <thead className="bg-[#F8FAFD] text-[#64748B] uppercase text-[10px] font-bold border-b border-[#E5EBF2]">
                  <tr>
                    <th className="w-8 px-3.5 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === leadsData.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded text-[#0362FA] cursor-pointer"
                      />
                    </th>
                    <th className="w-8 px-2 py-3 text-center whitespace-nowrap">#</th>
                    <th className="px-3.5 py-3 whitespace-nowrap">Name / Contact</th>
                    <th className="px-3.5 py-3 whitespace-nowrap">Company</th>
                    <th className="px-3.5 py-3 whitespace-nowrap">Source</th>
                    <th className="px-3.5 py-3 whitespace-nowrap">Status</th>
                    <th className="px-3.5 py-3 whitespace-nowrap">Last Contact</th>
                    <th className="px-3.5 py-3 whitespace-nowrap">Next Follow-up</th>
                    <th className="px-3.5 py-3 whitespace-nowrap">Assigned To</th>
                    <th className="px-3.5 py-3 text-center whitespace-nowrap">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#F1F5F9]">
                  {leadsData.map((row, idx) => {
                    const isSelected = selectedLead?.id === row.id;
                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedLead(row)}
                        className={cn(
                          "hover:bg-[#F8FAFD] transition-colors cursor-pointer",
                          isSelected && "bg-[#F0F7FF]",
                        )}
                      >
                        <td
                          className="px-3.5 py-3 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(row.id)}
                            onChange={(e) =>
                              handleSelectOne(row.id, e.target.checked)
                            }
                            className="rounded text-[#0362FA] cursor-pointer"
                          />
                        </td>
                        <td className="px-2 py-3 text-center text-[#8A99AD] font-medium whitespace-nowrap">
                          {idx + 1}
                        </td>
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0",
                                row.initialsBg,
                              )}
                            >
                              {row.initials}
                            </span>
                            <div>
                              <div className="font-bold text-[#0F172A] whitespace-nowrap">
                                {row.name}
                              </div>
                              <div className="text-[11px] text-[#334155] font-mono font-semibold whitespace-nowrap">
                                {row.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3.5 py-3 text-[#0F172A] font-medium whitespace-nowrap">
                          {row.company}
                        </td>
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EBF3FE] text-[#0362FA] whitespace-nowrap">
                            {row.source}
                          </span>
                        </td>
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 whitespace-nowrap",
                              row.statusClass,
                            )}
                          >
                            <span
                              className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                row.statusDot,
                              )}
                            />
                            {row.status}
                          </span>
                        </td>
                        <td className="px-3.5 py-3 text-[#64748B] text-[11px] whitespace-nowrap">
                          {row.lastContact}
                        </td>
                        <td className="px-3.5 py-3 text-[#EF9612] font-semibold text-[11px] whitespace-nowrap">
                          {row.nextFollowUp}
                        </td>
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <img
                              src={row.agentAvatar}
                              alt={row.assignedTo}
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <span className="text-[#0F172A] font-medium truncate">
                              {row.assignedTo}
                            </span>
                          </div>
                        </td>
                        <td
                          className="px-3.5 py-3 text-center whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() =>
                                startCall({
                                  contactName: row.name,
                                  phoneNumber: row.phone,
                                  companyName: row.company,
                                })
                              }
                              className="p-1 text-[#0362FA] hover:bg-[#EBF3FE] rounded transition-colors cursor-pointer"
                              title="Call"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toast.info('WhatsApp Opened', `Initiating chat with ${row.name}`)}
                              className="p-1 text-[#10B981] hover:bg-[#E6F7EC] rounded transition-colors cursor-pointer"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toast.info('Email Composer', `Drafting message to ${row.email}`)}
                              className="p-1 text-[#0362FA] hover:bg-[#EBF3FE] rounded transition-colors cursor-pointer"
                              title="Email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </button>
                            <ActionMenu
                              align="right"
                              items={[
                                {
                                  label: 'View Full Profile',
                                  icon: UserCheck,
                                  onClick: () => setSelectedLead(row),
                                },
                                {
                                  label: 'Edit Lead Record',
                                  icon: FileText,
                                  onClick: () =>
                                    toast.info('Edit Lead', `Opening lead editor for ${row.name}`),
                                },
                                {
                                  label: 'Schedule Follow-up Call',
                                  icon: Calendar,
                                  onClick: () =>
                                    toast.success(
                                      'Follow-up Scheduled',
                                      `Calendar invite dispatched to ${row.name}`
                                    ),
                                },
                                {
                                  label: 'Move to Recycle Bin',
                                  icon: X,
                                  onClick: () =>
                                    toast.warning('Lead Archived', `${row.name} moved to Recycle Bin`),
                                },
                              ]}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-2.5 border-t border-[#E5EBF2] bg-[#F8FAFD] flex items-center justify-between text-xs text-[#64748B]">
              <span>Showing 1 to 10 of 12,480 leads</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    className={cn(
                      "w-6 h-6 rounded-md text-xs font-semibold flex items-center justify-center",
                      p === 1
                        ? "bg-[#0362FA] text-white"
                        : "text-slate-700 hover:bg-slate-200",
                    )}
                  >
                    {p}
                  </button>
                ))}
                <span className="px-1 text-slate-400">...</span>
                <button className="px-2 h-6 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-200">
                  1,248
                </button>
                <button className="px-1.5 h-6 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-200">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 340px Lead Details Panel (Screen 012 exact) */}
        <div className="lg:col-span-4 bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-[#0F172A] text-sm">Lead Details</h3>
            <button
              onClick={() => setSelectedLead(null)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Contact Header */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "w-12 h-12 rounded-full text-white text-base font-extrabold flex items-center justify-center shrink-0 shadow-sm",
                activeLead.initialsBg,
              )}
            >
              {activeLead.initials}
            </span>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#0F172A] truncate">
                  {activeLead.name}
                </span>
                <span className="text-[10px] font-bold text-[#10B981] bg-[#E6F7EC] px-2 py-0.5 rounded-full">
                  Hot Lead
                </span>
              </div>
              <div className="text-xs text-[#64748B] font-medium truncate">
                {activeLead.company}
              </div>
              <div className="text-[10px] text-[#8A99AD] mt-0.5">
                Last seen: Today, 10:15 AM
              </div>
            </div>
          </div>

          {/* Details Tabs */}
          <div className="flex items-center gap-4 text-xs border-b border-slate-100 pb-2">
            {(["Overview", "Activity", "Notes", "Files (3)"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.split(" ")[0] as any)}
                  className={cn(
                    "font-semibold transition-colors",
                    activeTab === tab.split(" ")[0]
                      ? "text-[#0362FA] border-b-2 border-[#0362FA] pb-1 font-bold"
                      : "text-[#64748B] hover:text-[#0F172A]",
                  )}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          {/* Contact Info Items */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <div className="flex items-center gap-2 text-[#475569] font-mono">
                <Phone className="w-3.5 h-3.5 text-[#0362FA]" />
                <span>{activeLead.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    startCall({
                      contactName: activeLead.name,
                      phoneNumber: activeLead.phone,
                      companyName: activeLead.company,
                    })
                  }
                  className="p-1 bg-[#EBF3FE] text-[#0362FA] rounded"
                >
                  <Phone className="w-3 h-3" />
                </button>
                <button className="p-1 bg-[#E6F7EC] text-[#10B981] rounded">
                  <MessageSquare className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <div className="flex items-center gap-2 text-[#475569] truncate">
                <Mail className="w-3.5 h-3.5 text-[#0362FA]" />
                <span className="truncate">{activeLead.email}</span>
              </div>
              <button className="p-1 bg-[#EBF3FE] text-[#0362FA] rounded shrink-0">
                <Mail className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center gap-2 py-1 border-b border-slate-50 text-[#475569]">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{activeLead.city}</span>
            </div>

            <div className="flex items-center justify-between py-1 text-xs">
              <span className="text-[#8A99AD]">Source</span>
              <span className="text-[#0362FA] font-semibold">
                {activeLead.source}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 text-xs">
              <span className="text-[#8A99AD]">Campaign</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3FE] text-[#0362FA]">
                {activeLead.campaign}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 text-xs">
              <span className="text-[#8A99AD]">Assigned To</span>
              <div className="flex items-center gap-1.5 font-medium text-[#0F172A]">
                <img
                  src={activeLead.agentAvatar}
                  alt={activeLead.assignedTo}
                  className="w-4 h-4 rounded-full"
                />
                <span>{activeLead.assignedTo}</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-1 text-xs">
              <span className="text-[#8A99AD]">Status</span>
              <select className="bg-[#F8FAFD] border border-[#E5EBF2] rounded px-2 py-0.5 text-xs font-semibold text-[#0F172A]">
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-[#8A99AD] uppercase">
              Tags
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#E6F7EC] text-[#13AB4A] border border-emerald-200">
                + Interested
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#FDE8E8] text-[#E73647] border border-rose-200">
                + High Value
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#FEF3E6] text-[#EF9612] border border-amber-200">
                + Call Back
              </span>
              <button className="text-[10px] font-bold text-[#0362FA] hover:underline">
                + Add Tag
              </button>
            </div>
          </div>

          {/* Next Follow-up Box */}
          <div className="bg-[#F8FAFD] border border-[#E5EBF2] rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
              <Calendar className="w-3.5 h-3.5 text-[#0362FA]" />
              <span>Next Follow-up</span>
            </div>
            <div className="text-xs font-bold text-[#EF9612]">
              Today, 03:00 PM
            </div>
            <p className="text-[11px] text-[#64748B]">
              Discuss product demo and pricing
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button className="flex-1 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-2xs">
                Update
              </button>
              <button className="flex items-center justify-center gap-1 px-3 py-1.5 bg-white border border-[#E5EBF2] text-[#475569] text-xs font-semibold rounded-lg hover:bg-slate-50">
                <Clock className="w-3.5 h-3.5" />
                <span>Set Reminder</span>
              </button>
            </div>
          </div>

          {/* Quick Actions (2x4 Grid from Screen 012 exact) */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-[#8A99AD] uppercase">
              Quick Actions
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
              <button
                onClick={() =>
                  startCall({
                    contactName: activeLead.name,
                    phoneNumber: activeLead.phone,
                    companyName: activeLead.company,
                  })
                }
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#E6F7EC] text-[#13AB4A] hover:bg-emerald-100 transition-colors"
              >
                <Phone className="w-4 h-4 mb-1" />
                <span>Call</span>
              </button>

              <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#E6F7EC] text-[#10B981] hover:bg-emerald-100 transition-colors">
                <MessageSquare className="w-4 h-4 mb-1" />
                <span>WhatsApp</span>
              </button>

              <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#EBF3FE] text-[#0362FA] hover:bg-blue-100 transition-colors">
                <Mail className="w-4 h-4 mb-1" />
                <span>Email</span>
              </button>

              <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#FDE8E8] text-[#E73647] hover:bg-rose-100 transition-colors">
                <MessageSquare className="w-4 h-4 mb-1" />
                <span>SMS</span>
              </button>

              <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F8FAFD] border border-[#E5EBF2] text-[#475569] hover:bg-slate-100">
                <Check className="w-4 h-4 mb-1 text-[#0362FA]" />
                <span>Add Task</span>
              </button>

              <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F8FAFD] border border-[#E5EBF2] text-[#475569] hover:bg-slate-100">
                <FileText className="w-4 h-4 mb-1 text-[#871CF4]" />
                <span>Add Note</span>
              </button>

              <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F8FAFD] border border-[#E5EBF2] text-[#475569] hover:bg-slate-100">
                <Calendar className="w-4 h-4 mb-1 text-[#0362FA]" />
                <span>Schedule</span>
              </button>

              <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F8FAFD] border border-[#E5EBF2] text-[#475569] hover:bg-slate-100">
                <Briefcase className="w-4 h-4 mb-1 text-[#EF9612]" />
                <span>Add Deal</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddLeadModal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
      />

      <ImportLeadsModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />
    </div>
  );
};
