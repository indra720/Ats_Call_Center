import React, { useState } from 'react';
import {
  Ticket,
  Clock,
  CheckCircle2,
  Star,
  Plus,
  BookOpen,
  Search,
  ChevronDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Headphones,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  MessageSquare,
  Zap,
  CreditCard,
  AlertTriangle,
  Edit2,
  Trash2,
  UserCheck,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';
import { CreateTicketModal } from '../components/CreateTicketModal';
import { TicketDetailModal } from '../components/TicketDetailModal';
import { useNavigate } from 'react-router-dom';

interface TicketItem {
  id: number;
  ticketId: string;
  subject: string;
  customer: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo: string;
  assignedAvatar: string;
  createdOn: string;
}

const TICKETS_DATA: TicketItem[] = [
  { id: 1, ticketId: '#TKT-1001', subject: 'Login issue in admin panel', customer: 'Rohan Mehta', category: 'Account Access', priority: 'High', status: 'Open', assignedTo: 'Akash Sharma', assignedAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop', createdOn: '20 Oct 2026 10:24 AM' },
  { id: 2, ticketId: '#TKT-1002', subject: 'Call recording not working', customer: 'Priya Singh', category: 'Call Records', priority: 'Medium', status: 'In Progress', assignedTo: 'Yashika Kanwar', assignedAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop', createdOn: '20 Oct 2026 09:45 AM' },
  { id: 3, ticketId: '#TKT-1003', subject: 'WhatsApp integration setup', customer: 'Dev Tech Pvt Ltd', category: 'Integrations', priority: 'High', status: 'Open', assignedTo: 'Sandeep Verma', assignedAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop', createdOn: '20 Oct 2026 09:12 AM' },
  { id: 4, ticketId: '#TKT-1004', subject: 'Add new agent', customer: 'Manish Kumar', category: 'User Management', priority: 'Low', status: 'Resolved', assignedTo: 'Akash Sharma', assignedAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop', createdOn: '19 Oct 2026 06:30 PM' },
  { id: 5, ticketId: '#TKT-1005', subject: 'Billing and payment issue', customer: 'Neha Jain', category: 'Billing & Subscription', priority: 'High', status: 'In Progress', assignedTo: 'Rohit Sharma', assignedAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop', createdOn: '19 Oct 2026 04:18 PM' },
  { id: 6, ticketId: '#TKT-1006', subject: 'API key not working', customer: 'Amit Verma', category: 'API & Webhooks', priority: 'Medium', status: 'Open', assignedTo: 'Yashika Kanwar', assignedAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop', createdOn: '19 Oct 2026 02:45 PM' },
  { id: 7, ticketId: '#TKT-1007', subject: 'Campaign not sending', customer: 'Karan Malhotra', category: 'Campaigns', priority: 'Medium', status: 'In Progress', assignedTo: 'Akash Sharma', assignedAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop', createdOn: '19 Oct 2026 12:20 PM' },
  { id: 8, ticketId: '#TKT-1008', subject: 'How to create template?', customer: 'Sneha Patil', category: 'Templates', priority: 'Low', status: 'Resolved', assignedTo: 'Sandeep Verma', assignedAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop', createdOn: '18 Oct 2026 05:10 PM' },
  { id: 9, ticketId: '#TKT-1009', subject: 'IVR configuration help', customer: 'Bharat Solutions', category: 'IVR & Numbers', priority: 'High', status: 'Open', assignedTo: 'Rohit Sharma', assignedAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop', createdOn: '18 Oct 2026 11:35 AM' },
  { id: 10, ticketId: '#TKT-1010', subject: 'Export report issue', customer: 'Pooja Sharma', category: 'Reports & Analytics', priority: 'Medium', status: 'In Progress', assignedTo: 'Yashika Kanwar', assignedAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop', createdOn: '18 Oct 2026 10:18 AM' },
];

export const SupportTicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketItem[]>(TICKETS_DATA);
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'inprogress' | 'resolved' | 'closed'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTicketForDetail, setSelectedTicketForDetail] = useState<TicketItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredTickets = tickets.filter((t) => {
    // Tab filter
    if (activeTab === 'open' && t.status !== 'Open') return false;
    if (activeTab === 'inprogress' && t.status !== 'In Progress') return false;
    if (activeTab === 'resolved' && t.status !== 'Resolved') return false;
    if (activeTab === 'closed' && t.status !== 'Closed') return false;

    // Search filter
    const matchesSearch =
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    // Department filter
    if (departmentFilter !== 'All Departments' && t.category !== departmentFilter) return false;

    // Priority filter
    if (priorityFilter !== 'All Priority' && t.priority !== priorityFilter) return false;

    // Status filter
    if (statusFilter !== 'All Status' && t.status !== statusFilter) return false;

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTicketCreated={(newTicket) => {
          setTickets([newTicket, ...tickets]);
        }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">Help Center & Support Tickets</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Help Center & Support Tickets</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage customer support tickets, help resources and track support performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/knowledge-base')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>View Knowledge Base</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Ticket</span>
          </button>
        </div>
      </div>

      {/* 6 Modern Responsive KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Card 1: Total */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Ticket className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" /> 12%
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">128</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Total Tickets</div>
          </div>
        </div>

        {/* Card 2: Open */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#EF9612] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-[#E73647] border border-rose-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowDownRight className="w-3 h-3" /> 5%
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">24</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Open Tickets</div>
          </div>
        </div>

        {/* Card 3: In Progress */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" /> 18%
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">36</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">In Progress</div>
          </div>
        </div>

        {/* Card 4: Resolved */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-[#E9F9EE] text-[#13AB4A] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" /> 24%
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">62</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Resolved Tickets</div>
          </div>
        </div>

        {/* Card 5: Response Time */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" /> 28%
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">2h 18m</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Average Response</div>
          </div>
        </div>

        {/* Card 6: Satisfaction */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#EF9612] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              92% pos
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">4.8 / 5</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Satisfaction Score</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-600 overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { key: 'all', label: 'All Tickets', count: 128 },
          { key: 'open', label: 'Open', count: 24 },
          { key: 'inprogress', label: 'In Progress', count: 36 },
          { key: 'resolved', label: 'Resolved', count: 62 },
          { key: 'closed', label: 'Closed', count: 6 },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-2.5 transition-colors relative flex items-center gap-1.5 ${
              activeTab === tab.key
                ? 'text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]'
                : 'hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] text-slate-600 font-mono">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Main Grid: Left Section (~65%) | Right Filter & Analytics (~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Section */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search tickets by subject, ticket ID, customer or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
              >
                <option>All Departments</option>
                <option>Account Access</option>
                <option>Call Records</option>
                <option>Integrations</option>
                <option>User Management</option>
                <option>Billing & Subscription</option>
                <option>API & Webhooks</option>
                <option>Campaigns</option>
                <option>Templates</option>
                <option>IVR & Numbers</option>
                <option>Reports & Analytics</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
              >
                <option>All Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
              >
                <option>All Status</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setDepartmentFilter('All Departments');
                  setPriorityFilter('All Priority');
                  setStatusFilter('All Status');
                  toast.info('Filters Reset', 'Displaying all support tickets');
                }}
                className="text-[#0362FA] font-semibold hover:underline px-1.5"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table (Anti-Shrink) */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[850px] whitespace-nowrap">
                <thead>
                  <tr className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-[#E5EBF2]">
                    <th className="py-2.5 px-2.5 w-6 text-slate-400">#</th>
                    <th className="py-2.5 px-3">Ticket ID</th>
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Assigned To</th>
                    <th className="py-2.5 px-3">Created On</th>
                    <th className="py-2.5 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTickets.map((t) => (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedTicketForDetail(t)}
                      className="hover:bg-[#F0F7FF] transition-colors cursor-pointer group"
                    >
                      <td className="py-2.5 px-2.5 text-slate-400 font-mono text-[11px]">{t.id}</td>
                      <td className="py-2.5 px-3 font-semibold text-[#0362FA] font-mono group-hover:underline">
                        {t.ticketId}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 max-w-[180px] truncate">
                        {t.subject}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">{t.customer}</td>
                      <td className="py-2.5 px-3 text-slate-600">{t.category}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            t.priority === 'High'
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : t.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-600 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          }`}
                        >
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            t.status === 'Open'
                              ? 'bg-blue-50 text-[#0362FA]'
                              : t.status === 'In Progress'
                              ? 'bg-purple-50 text-purple-700'
                              : 'bg-[#E9F9EE] text-[#13AB4A]'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <img src={t.assignedAvatar} alt={t.assignedTo} className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-slate-800 truncate">{t.assignedTo}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px] whitespace-nowrap">{t.createdOn}</td>
                      <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center">
                          <ActionMenu
                            align="right"
                            items={[
                              {
                                label: 'View Ticket Thread',
                                icon: <MessageSquare className="w-3.5 h-3.5" />,
                                onClick: () => setSelectedTicketForDetail(t),
                              },
                              {
                                label: 'Reassign Agent',
                                icon: <UserCheck className="w-3.5 h-3.5" />,
                                onClick: () => setSelectedTicketForDetail(t),
                              },
                              {
                                label: 'Mark as Resolved',
                                icon: <CheckCircle2 className="w-3.5 h-3.5" />,
                                onClick: () => {
                                  setTickets((prev) =>
                                    prev.map((item) => (item.id === t.id ? { ...item, status: 'Resolved' } : item))
                                  );
                                  toast.success('Ticket Resolved', `${t.ticketId} marked as resolved successfully.`);
                                },
                              },
                              {
                                label: 'Close Ticket',
                                icon: <Trash2 className="w-3.5 h-3.5" />,
                                danger: true,
                                onClick: () => {
                                  setTickets((prev) =>
                                    prev.map((item) => (item.id === t.id ? { ...item, status: 'Closed' } : item))
                                  );
                                  toast.warning('Ticket Closed', `${t.ticketId} has been archived & closed.`);
                                },
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#F8FAFC] border-t border-[#E5EBF2] flex items-center justify-between text-xs text-slate-600">
              <span>Showing 1 to 10 of 128 tickets</span>
              <div className="flex items-center gap-1">
                <button className="p-1 border rounded bg-white"><ChevronLeft className="w-3 h-3" /></button>
                <button className="px-2.5 py-0.5 bg-[#0362FA] text-white font-bold rounded">1</button>
                <button className="px-2.5 py-0.5 bg-white border rounded">2</button>
                <button className="px-2.5 py-0.5 bg-white border rounded">3</button>
                <button className="px-2.5 py-0.5 bg-white border rounded">4</button>
                <button className="px-2.5 py-0.5 bg-white border rounded">5</button>
                <span className="px-1 text-slate-400">...</span>
                <button className="px-2.5 py-0.5 bg-white border rounded">13</button>
                <button className="p-1 border rounded bg-white"><ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
          </div>

          {/* Bottom Knowledge Base Cards */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#0362FA]" />
                  <span>Knowledge Base</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Find answers to common questions and learn how to use ATS Call Center.</p>
              </div>
              <a href="#/knowledge-base" className="text-xs font-semibold text-[#0362FA] hover:underline">
                View All Articles →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1 text-xs">
              {[
                { title: 'Getting Started', count: '12 articles', desc: 'Learn the basics and set up your account.' },
                { title: 'Calling & Telephony', count: '18 articles', desc: 'Setup numbers, IVR, call flow and more.' },
                { title: 'WhatsApp Integration', count: '14 articles', desc: 'Connect and configure WhatsApp API.' },
                { title: 'Campaigns & Automation', count: '16 articles', desc: 'Create campaigns and automate calls.' },
                { title: 'Billing & Subscription', count: '10 articles', desc: 'Manage your plan, payments and invoices.' },
                { title: 'Troubleshooting', count: '20 articles', desc: 'Common issues and their solutions.' },
              ].map((card, i) => (
                <div key={i} className="p-2.5 border border-slate-200 rounded-xl space-y-1.5 flex flex-col justify-between hover:border-[#0362FA] transition-colors">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">{card.title}</div>
                    <div className="text-[10px] text-[#0362FA] font-medium">{card.count}</div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-snug">{card.desc}</p>
                  </div>
                  <button className="w-full py-1 text-[10px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 mt-1">
                    View Articles
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Quick Actions + Ticket Filters + Analytics */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl flex flex-col items-center gap-1 text-slate-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium">Create Ticket</span>
              </button>
              <button
                onClick={() => navigate('/knowledge-base')}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl flex flex-col items-center gap-1 text-slate-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#13AB4A] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium">Knowledge Base</span>
              </button>
              <button
                onClick={() => toast.info('FAQ Explorer', 'Browse top 40 frequently asked questions')}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl flex flex-col items-center gap-1 text-slate-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#EF9612] flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium">View FAQs</span>
              </button>
              <button
                onClick={() => toast.success('Agent Hotline', 'Connecting to 24/7 priority enterprise support line...')}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl flex flex-col items-center gap-1 text-slate-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#871CF4] flex items-center justify-center">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium">Contact Support</span>
              </button>
            </div>
          </div>

          {/* Ticket Filters Form */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Ticket Filters</h3>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Department</label>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-slate-700"
                  >
                    <option>All Departments</option>
                    <option>Account Access</option>
                    <option>Call Records</option>
                    <option>Integrations</option>
                    <option>User Management</option>
                    <option>Billing & Subscription</option>
                    <option>API & Webhooks</option>
                    <option>Campaigns</option>
                    <option>Templates</option>
                    <option>IVR & Numbers</option>
                    <option>Reports & Analytics</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Priority</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-slate-700"
                  >
                    <option>All Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-slate-700"
                >
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Date Range</label>
                <div className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 text-xs bg-slate-50">
                  20 Oct 2026 - 20 Oct 2026
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => toast.success('Filters Applied', `Showing ${filteredTickets.length} matching tickets.`)}
                  className="flex-1 py-1.5 bg-[#0362FA] hover:bg-blue-600 text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setDepartmentFilter('All Departments');
                    setPriorityFilter('All Priority');
                    setStatusFilter('All Status');
                    toast.info('Filters Reset', 'Reset all ticket criteria');
                  }}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Support Analytics Chart */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Support Analytics</h3>
              <select className="px-2 py-0.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                <option>This Month</option>
              </select>
            </div>

            <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { label: 'Open', count: 24, h: 35, color: 'bg-[#E73647]' },
                { label: 'In Progress', count: 36, h: 55, color: 'bg-[#0362FA]' },
                { label: 'Resolved', count: 62, h: 95, color: 'bg-[#13AB4A]' },
                { label: 'Closed', count: 6, h: 10, color: 'bg-slate-400' },
              ].map((col, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-bold text-slate-700">{col.count}</span>
                  <div className={`w-full ${col.color} rounded-t-md transition-all`} style={{ height: `${col.h}%` }} />
                  <span className="text-[9px] text-slate-500 whitespace-nowrap mt-1">{col.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#E73647]" /> Open</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0362FA]" /> In Progress</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#13AB4A]" /> Resolved</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" /> Closed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Detail & Thread Modal */}
      <TicketDetailModal
        isOpen={!!selectedTicketForDetail}
        ticket={selectedTicketForDetail}
        onClose={() => setSelectedTicketForDetail(null)}
        onStatusChange={(newStatus) => {
          if (selectedTicketForDetail) {
            setTickets((prev) =>
              prev.map((item) =>
                item.id === selectedTicketForDetail.id ? { ...item, status: newStatus as any } : item
              )
            );
            setSelectedTicketForDetail((prev) => (prev ? { ...prev, status: newStatus as any } : null));
          }
        }}
      />
    </div>
  );
};
