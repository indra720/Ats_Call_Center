import React, { useState } from "react";
import {
  Phone,
  PhoneCall,
  Clock,
  Calendar,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Mail,
  MoreVertical,
  ChevronRight,
  X,
  Search,
  Filter,
  Check,
  User,
  Star,
  Users,
  Building2,
  MapPin,
  ListPlus,
  FileText,
  Layers,
  Grid,
  Briefcase,
} from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { usePermission } from "@/hooks/usePermission";
import { toast } from "@/store/toastStore";
import { cn } from "@/lib/utils";

export const DialerPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("+91 98765 43210");
  const [autoDial, setAutoDial] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState<
    "Leads" | "Contacts" | "Recent" | "Favorites"
  >("Leads");
  const [activeLeadNotesTab, setActiveLeadNotesTab] = useState<
    "Notes" | "Call History" | "Tasks" | "Deals" | "Documents"
  >("Notes");
  const [leadNoteText, setLeadNoteText] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState("1");

  const startCall = useUIStore((state) => state.startCall);
  const { can } = usePermission();

  const handleKeyPress = (val: string) => {
    setPhoneNumber((prev) => prev + val);
  };

  const handleTriggerCall = () => {
    if (!phoneNumber) return;
    startCall({
      contactName: activeLead.name,
      phoneNumber,
      companyName: activeLead.company,
    });
  };

  // Exact prospect list from Screen 033
  const prospectList = [
    {
      id: "1",
      initials: "RS",
      color: "bg-[#E73647]",
      name: "Rohit Sharma",
      company: "Tech Solutions Pvt. Ltd.",
      phone: "+91 98765 43210",
      tag: "Hot Lead",
      tagClass: "bg-[#E6F7EC] text-[#13AB4A]",
    },
    {
      id: "2",
      initials: "PK",
      color: "bg-[#0362FA]",
      name: "Priya Khanna",
      company: "Globex Corp",
      phone: "+91 91234 56789",
      tag: "Qualified",
      tagClass: "bg-[#EBF3FE] text-[#0362FA]",
    },
    {
      id: "3",
      initials: "AJ",
      color: "bg-[#10B981]",
      name: "Amit Jain",
      company: "Jain Traders",
      phone: "+91 99887 66554",
      tag: "New Lead",
      tagClass: "bg-[#EBF3FE] text-[#0362FA]",
    },
    {
      id: "4",
      initials: "SP",
      color: "bg-[#871CF4]",
      name: "Sunita Patel",
      company: "Patel Industries",
      phone: "+91 88776 55443",
      tag: "Follow-up",
      tagClass: "bg-[#FEF3E6] text-[#EF9612]",
    },
    {
      id: "5",
      initials: "VS",
      color: "bg-[#10B981]",
      name: "Vikram Singh",
      company: "AutoHaus",
      phone: "+91 77665 44332",
      tag: "Interested",
      tagClass: "bg-[#E6F7EC] text-[#13AB4A]",
    },
    {
      id: "6",
      initials: "NT",
      color: "bg-[#EF9612]",
      name: "Neha Tiwari",
      company: "NextGen Tech",
      phone: "+91 98712 34567",
      tag: "Proposal",
      tagClass: "bg-[#FDE8E8] text-[#E73647]",
    },
    {
      id: "7",
      initials: "DS",
      color: "bg-[#E73647]",
      name: "Deepak Soni",
      company: "Soni Enterprises",
      phone: "+91 91789 65432",
      tag: "Cold Lead",
      tagClass: "bg-[#EBF3FE] text-[#0362FA]",
    },
    {
      id: "8",
      initials: "KM",
      color: "bg-[#E73647]",
      name: "Karan Mehta",
      company: "Alpha Systems",
      phone: "+91 98745 67890",
      tag: "Follow-up",
      tagClass: "bg-[#FEF3E6] text-[#EF9612]",
    },
    {
      id: "9",
      initials: "SK",
      color: "bg-[#0362FA]",
      name: "Simran Kaur",
      company: "Bright Retail",
      phone: "+91 98712 34567",
      tag: "Qualified",
      tagClass: "bg-[#EBF3FE] text-[#0362FA]",
    },
    {
      id: "10",
      initials: "LY",
      color: "bg-[#E73647]",
      name: "Lokesh Yadav",
      company: "Shree Infra",
      phone: "+91 99876 54321",
      tag: "New Lead",
      tagClass: "bg-[#EBF3FE] text-[#0362FA]",
    },
  ];

  const activeLead =
    prospectList.find((p) => p.id === selectedLeadId) || prospectList[0];

  const keypadKeys = [
    { num: "1", sub: "" },
    { num: "2", sub: "ABC" },
    { num: "3", sub: "DEF" },
    { num: "4", sub: "GHI" },
    { num: "5", sub: "JKL" },
    { num: "6", sub: "MNO" },
    { num: "7", sub: "PQRS" },
    { num: "8", sub: "TUV" },
    { num: "9", sub: "WXYZ" },
    { num: "*", sub: "" },
    { num: "0", sub: "+" },
    { num: "#", sub: "" },
  ];

  // Exact Recent Calls table from Screen 033
  const recentCallsList = [
    {
      id: "1",
      initials: "RS",
      color: "bg-[#E73647]",
      name: "Rohit Sharma",
      phone: "+91 98765 43210",
      type: "Outbound",
      dur: "04:32",
      status: "Answered",
      statusColor: "bg-[#E6F7EC] text-[#13AB4A]",
      time: "Today, 11:20 AM",
    },
    {
      id: "2",
      initials: "PK",
      color: "bg-[#0362FA]",
      name: "Priya Khanna",
      phone: "+91 91234 56789",
      type: "Inbound",
      dur: "02:18",
      status: "Missed",
      statusColor: "bg-[#FDE8E8] text-[#E73647]",
      time: "Today, 10:45 AM",
    },
    {
      id: "3",
      initials: "AJ",
      color: "bg-[#10B981]",
      name: "Amit Jain",
      phone: "+91 99887 66554",
      type: "Outbound",
      dur: "06:12",
      status: "Answered",
      statusColor: "bg-[#E6F7EC] text-[#13AB4A]",
      time: "Today, 09:30 AM",
    },
    {
      id: "4",
      initials: "VS",
      color: "bg-[#10B981]",
      name: "Vikram Singh",
      phone: "+91 77665 44332",
      type: "Inbound",
      dur: "00:45",
      status: "Answered",
      statusColor: "bg-[#E6F7EC] text-[#13AB4A]",
      time: "Today, 09:10 AM",
    },
    {
      id: "5",
      initials: "NT",
      color: "bg-[#EF9612]",
      name: "Neha Tiwari",
      phone: "+91 98712 34567",
      type: "Outbound",
      dur: "03:22",
      status: "No Answer",
      statusColor: "bg-[#FDE8E8] text-[#E73647]",
      time: "Yesterday, 04:30 PM",
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Header (Screen 033 exact) */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
          <span>← Calling & Call Center</span>
          <span>&gt;</span>
          <span className="text-[#0362FA] font-medium">Make a Call</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
              Make a Call - Smart Dialer
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Search a contact, enter a number or select from your leads to
              start a call.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] text-white text-xs font-bold rounded-lg shadow-sm">
              <Grid className="w-3.5 h-3.5" />
              <span>Keypad</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] text-[#475569] text-xs font-semibold rounded-lg hover:bg-slate-50">
              <Users className="w-3.5 h-3.5" />
              <span>Contacts</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] text-[#475569] text-xs font-semibold rounded-lg hover:bg-slate-50">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Leads</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] text-[#475569] text-xs font-semibold rounded-lg hover:bg-slate-50">
              <Clock className="w-3.5 h-3.5" />
              <span>Queue</span>
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-[#E5EBF2] rounded-lg">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. 3-Column Layout (Screen 033 exact) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (280px, Span 3): Leads/Contacts Selector */}
        <div className="lg:col-span-3 bg-white rounded-[12px] p-3.5 border border-[#E5EBF2] shadow-card space-y-3">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
            {(["Leads", "Contacts", "Recent", "Favorites"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveLeftTab(tab)}
                  className={cn(
                    "font-medium transition-colors",
                    activeLeftTab === tab
                      ? "text-[#0362FA] font-bold border-b-2 border-[#0362FA] pb-1"
                      : "text-[#64748B]",
                  )}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads by name, phone or company..."
              className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <select className="bg-[#F8FAFD] border border-[#E5EBF2] rounded px-1.5 py-1 text-[#475569]">
              <option>All Status</option>
            </select>
            <select className="bg-[#F8FAFD] border border-[#E5EBF2] rounded px-1.5 py-1 text-[#475569]">
              <option>All Sources</option>
            </select>
            <select className="bg-[#F8FAFD] border border-[#E5EBF2] rounded px-1.5 py-1 text-[#475569]">
              <option>All Agents</option>
            </select>
          </div>

          {/* Scrollable Prospect List */}
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {prospectList.map((prospect) => (
              <div
                key={prospect.id}
                onClick={() => {
                  setSelectedLeadId(prospect.id);
                  setPhoneNumber(prospect.phone);
                }}
                className={cn(
                  "flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-[#E5EBF2] hover:bg-[#F8FAFD] transition-colors cursor-pointer",
                  selectedLeadId === prospect.id &&
                    "bg-[#F0F7FF] border-[#B0D2FB]",
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={cn(
                      "w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0",
                      prospect.color,
                    )}
                  >
                    {prospect.initials}
                  </span>
                  <div className="truncate">
                    <div className="font-bold text-xs text-[#0F172A] truncate">
                      {prospect.name}
                    </div>
                    <div className="text-[10px] text-[#64748B] truncate">
                      {prospect.company}
                    </div>
                    <div className="text-[10px] text-[#8A99AD] font-mono">
                      {prospect.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={cn(
                      "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                      prospect.tagClass,
                    )}
                  >
                    {prospect.tag}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startCall({
                        contactName: prospect.name,
                        phoneNumber: prospect.phone,
                        companyName: prospect.company,
                      });
                    }}
                    className="p-1 text-[#0362FA] hover:bg-[#EBF3FE] rounded"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-xs text-[#64748B]">
            <button className="px-1.5 py-0.5 hover:bg-slate-100 rounded">
              &lt;
            </button>
            <button className="w-5 h-5 bg-[#0362FA] text-white rounded font-semibold flex items-center justify-center text-[11px]">
              1
            </button>
            <button className="w-5 h-5 hover:bg-slate-100 rounded flex items-center justify-center text-[11px]">
              2
            </button>
            <button className="w-5 h-5 hover:bg-slate-100 rounded flex items-center justify-center text-[11px]">
              3
            </button>
            <button className="w-5 h-5 hover:bg-slate-100 rounded flex items-center justify-center text-[11px]">
              4
            </button>
            <button className="w-5 h-5 hover:bg-slate-100 rounded flex items-center justify-center text-[11px]">
              5
            </button>
            <button className="px-1.5 py-0.5 hover:bg-slate-100 rounded">
              &gt;
            </button>
          </div>
        </div>

        {/* Center Column (Span 5): Keypad & Recent Calls */}
        <div className="lg:col-span-5 space-y-4">
          {/* Dialpad Card (Screen 033 exact) */}
          <div className="bg-white rounded-[12px] p-5 border border-[#E5EBF2] shadow-card flex flex-col items-center">
            {/* Top Auto-dial Banner */}
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <div>
                  <div className="font-bold text-[#0F172A]">Ready to Call</div>
                  <div className="text-[10px] text-[#64748B]">
                    Enter a number or select a contact to start calling
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-[#64748B]">
                  Auto Dial
                </span>
                <input
                  type="checkbox"
                  checked={autoDial}
                  onChange={(e) => setAutoDial(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0362FA]"
                />
              </div>
            </div>

            {/* Input with Indian Flag & Call Button */}
            <div className="w-full flex items-center gap-2 mb-4">
              <div className="flex-1 flex items-center bg-[#F8FAFD] border border-[#E5EBF2] rounded-xl px-3 py-2 text-sm">
                <span className="text-base mr-2">🇮🇳</span>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 Phone number"
                  className="bg-transparent font-mono font-bold text-[#0F172A] w-full focus:outline-none"
                />
                {phoneNumber && (
                  <button
                    onClick={() => setPhoneNumber("")}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={handleTriggerCall}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-xl shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Now</span>
              </button>
            </div>

            {/* Circular Keypad Grid (3x4) */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
              {keypadKeys.map((k) => (
                <button
                  key={k.num}
                  onClick={() => handleKeyPress(k.num)}
                  className="h-13 py-2 rounded-2xl bg-[#F8FAFD] hover:bg-slate-100 active:scale-95 border border-[#E5EBF2] flex flex-col items-center justify-center transition-all shadow-2xs"
                >
                  <span className="text-lg font-bold text-[#0F172A] leading-none">
                    {k.num}
                  </span>
                  {k.sub && (
                    <span className="text-[9px] font-semibold text-[#8A99AD] uppercase tracking-widest mt-0.5">
                      {k.sub}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Action Bar Below Keypad */}
            <div className="grid grid-cols-4 gap-2 w-full pt-4 mt-4 border-t border-slate-100 text-center text-xs">
              <button className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 text-[#64748B]">
                <ListPlus className="w-4 h-4 mb-1 text-[#0362FA]" />
                <span className="text-[10px]">Add to Queue</span>
              </button>
              <button className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 text-[#64748B]">
                <Calendar className="w-4 h-4 mb-1 text-[#0362FA]" />
                <span className="text-[10px]">Schedule Call</span>
              </button>
              <button className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 text-[#64748B]">
                <FileText className="w-4 h-4 mb-1 text-[#0362FA]" />
                <span className="text-[10px]">Add Note</span>
              </button>
              <button className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 text-[#64748B]">
                <MoreVertical className="w-4 h-4 mb-1 text-[#0362FA]" />
                <span className="text-[10px]">More</span>
              </button>
            </div>
          </div>

          {/* Recent Calls Table (Screen 033 exact) */}
          <div className="bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-[#0F172A]">
                Recent Calls
              </h3>
              <a
                href="/calls/history"
                className="text-xs text-[#0362FA] font-bold"
              >
                View All
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFD] text-[#64748B] text-[10px] font-bold uppercase border-b border-[#E5EBF2]">
                  <tr>
                    <th className="w-6 px-2 py-2 text-center">#</th>
                    <th className="px-2 py-2">Contact Name</th>
                    <th className="px-2 py-2">Phone Number</th>
                    <th className="px-2 py-2">Type</th>
                    <th className="px-2 py-2">Duration</th>
                    <th className="px-2 py-2">Status</th>
                    <th className="px-2 py-2">Call Time</th>
                    <th className="px-2 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {recentCallsList.map((c, i) => (
                    <tr key={c.id} className="hover:bg-[#F8FAFD]">
                      <td className="px-2 py-2 text-center text-[#8A99AD]">
                        {i + 1}
                      </td>
                      <td className="px-2 py-2 font-bold text-[#0F172A]">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              "w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center",
                              c.color,
                            )}
                          >
                            {c.initials}
                          </span>
                          <span>{c.name}</span>
                        </div>
                      </td>
                      <td className="px-2 py-2 text-[#475569] font-mono text-[11px]">
                        {c.phone}
                      </td>
                      <td className="px-2 py-2 text-[#64748B]">{c.type}</td>
                      <td className="px-2 py-2 font-mono text-[11px]">
                        {c.dur}
                      </td>
                      <td className="px-2 py-2">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold",
                            c.statusColor,
                          )}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-[#8A99AD] text-[10px]">
                        {c.time}
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1 text-[#0362FA] hover:bg-blue-50 rounded">
                            <Play className="w-3 h-3 fill-current" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                            <MoreVertical className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (340px, Span 4): Current Lead & After Call Actions */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. Current Lead Profile Card (Screen 033 exact) */}
          <div className="bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-[#0F172A] text-sm">Current Lead</h3>
              <button className="text-xs font-bold text-[#0362FA] hover:underline">
                Edit
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "w-12 h-12 rounded-full text-white text-base font-extrabold flex items-center justify-center shrink-0 shadow-sm",
                  activeLead.color,
                )}
              >
                {activeLead.initials}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#0F172A]">
                    {activeLead.name}
                  </span>
                  <span className="text-[10px] font-bold text-[#10B981] bg-[#E6F7EC] px-2 py-0.5 rounded-full">
                    {activeLead.tag}
                  </span>
                </div>
                <div className="text-xs text-[#64748B] font-medium">
                  {activeLead.company}
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <div className="flex items-center gap-2 font-mono text-[#475569]">
                  <Phone className="w-3.5 h-3.5 text-[#0362FA]" />
                  <span>{activeLead.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleTriggerCall}
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
                  <span className="truncate">rohit@techsolutions.com</span>
                </div>
                <button className="p-1 bg-[#EBF3FE] text-[#0362FA] rounded shrink-0">
                  <Mail className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-2 py-1 border-b border-slate-50 text-[#475569]">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeLead.company}</span>
              </div>

              <div className="flex items-center gap-2 py-1 border-b border-slate-50 text-[#475569]">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Jaipur, Rajasthan</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EBF3FE] text-[#0362FA]">
                Website
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F3E8FF] text-[#871CF4]">
                IT Services
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FEF3E6] text-[#EF9612]">
                Enterprise
              </span>
            </div>

            {/* Badges: Lead Score, Status, Assigned To */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-1.5 rounded-lg bg-[#F8FAFD] border border-[#E5EBF2]">
                <div className="text-[10px] text-[#8A99AD] font-medium">
                  Lead Score
                </div>
                <div className="text-xs font-extrabold text-[#EF9612] flex items-center justify-center gap-0.5 mt-0.5">
                  <Star className="w-3 h-3 fill-current" />
                  <span>85/100</span>
                </div>
              </div>

              <div className="p-1.5 rounded-lg bg-[#F8FAFD] border border-[#E5EBF2]">
                <div className="text-[10px] text-[#8A99AD] font-medium">
                  Status
                </div>
                <div className="text-xs font-extrabold text-[#10B981] mt-0.5">
                  Qualified
                </div>
              </div>

              <div className="p-1.5 rounded-lg bg-[#F8FAFD] border border-[#E5EBF2]">
                <div className="text-[10px] text-[#8A99AD] font-medium">
                  Assigned To
                </div>
                <div className="text-xs font-bold text-[#0F172A] mt-0.5 truncate">
                  Amit Kumar
                </div>
              </div>
            </div>

            {/* Tabs & Note Area */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] border-b border-slate-100 pb-1.5">
                {(
                  [
                    "Notes",
                    "Call History",
                    "Tasks",
                    "Deals",
                    "Documents",
                  ] as const
                ).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveLeadNotesTab(t)}
                    className={cn(
                      "font-medium transition-colors",
                      activeLeadNotesTab === t
                        ? "text-[#0362FA] font-bold border-b-2 border-[#0362FA] pb-1"
                        : "text-[#64748B]",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="pt-2 space-y-2">
                <textarea
                  rows={3}
                  value={leadNoteText}
                  onChange={(e) => setLeadNoteText(e.target.value)}
                  placeholder="Add a note about this lead..."
                  className="w-full text-xs p-2.5 bg-[#F8FAFD] border border-[#E5EBF2] rounded-xl text-slate-800 focus:outline-none resize-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      if (!leadNoteText.trim()) return;
                      toast.success("Note Saved", "Lead interaction note appended to CRM timeline.");
                      setLeadNoteText("");
                    }}
                    className="px-4 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. After Call Actions Form (Screen 033 exact) */}
          <div className="bg-white rounded-[12px] p-4 border border-[#E5EBF2] shadow-card space-y-3">
            <h3 className="font-bold text-[#0F172A] text-sm pb-1 border-b border-slate-100">
              After Call Actions
            </h3>

            <div className="space-y-2 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569]">
                  Call Outcome *
                </label>
                <select className="w-full bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] font-medium">
                  <option>Select outcome</option>
                  <option>Interested - Send Proposal</option>
                  <option>Connected - Demo Scheduled</option>
                  <option>Follow-up Required</option>
                  <option>No Answer / Busy</option>
                  <option>Not Interested</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569]">
                  Next Follow-up Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select date & time"
                    className="w-full bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A]"
                  />
                  <Calendar className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569]">
                  Add Follow-up Note
                </label>
                <textarea
                  rows={2}
                  placeholder="Add follow-up note..."
                  className="w-full bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg p-2 text-xs text-[#0F172A] resize-none"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-[#0362FA]"
                />
                <span className="text-[11px] text-[#475569] font-medium">
                  Create Task for Follow-up
                </span>
              </label>

              <div className="flex items-center gap-2 pt-2">
                <button className="flex-1 py-2 bg-white border border-[#E5EBF2] text-[#475569] text-xs font-bold rounded-xl hover:bg-slate-50">
                  Cancel
                </button>
                <button
                  onClick={() =>
                    toast.success(
                      "Disposition Recorded",
                      "Call outcome and scheduled follow-up task committed to database."
                    )
                  }
                  className="flex-1 py-2 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
