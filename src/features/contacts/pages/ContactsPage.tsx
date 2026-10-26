import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Download,
  Phone,
  Mail,
  Building2,
  MoreVertical,
  Check,
  Star,
  MessageSquare,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { UserAvatar } from '@/components/common/UserAvatar';
import { ActionMenu } from '@/components/common/ActionMenu';
import { useUIStore } from '@/store/uiStore';
import { AddLeadModal } from '@/features/leads/components/AddLeadModal';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

export const ContactsPage: React.FC = () => {
  const startCall = useUIStore((state) => state.startCall);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);

  const contactsList = [
    {
      id: '1',
      name: 'Rohit Sharma',
      phone: '+91 98765 43210',
      email: 'rohit@techsolutions.com',
      company: 'Tech Solutions Pvt Ltd',
      jobTitle: 'VP Technology',
      tags: ['Enterprise', 'VIP'],
      lastContacted: 'Today, 10:15 AM',
      city: 'Mumbai, Maharashtra',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Priya Khanna',
      phone: '+91 91234 56789',
      email: 'priya@globex.in',
      company: 'Globex Corp',
      jobTitle: 'Marketing Director',
      tags: ['Inbound', 'Q4 Deal'],
      lastContacted: 'Today, 09:45 AM',
      city: 'Delhi NCR',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Amit Jain',
      phone: '+91 99887 66554',
      email: 'amit@jaintraders.com',
      company: 'Jain Traders',
      jobTitle: 'Managing Director',
      tags: ['Retail', 'SMB'],
      lastContacted: 'Yesterday, 04:30 PM',
      city: 'Ahmedabad, Gujarat',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Sunita Patel',
      phone: '+91 88776 55443',
      email: 'sunita@patelind.com',
      company: 'Patel Industries',
      jobTitle: 'Chief Procurement Officer',
      tags: ['Industrial', 'High Value'],
      lastContacted: 'Today, 11:20 AM',
      city: 'Surat, Gujarat',
      status: 'Active',
    },
    {
      id: '5',
      name: 'Vikram Malhotra',
      phone: '+91 97654 32109',
      email: 'vikram@autohaus.in',
      company: 'AutoHaus India',
      jobTitle: 'General Manager',
      tags: ['Automotive', 'Fleet'],
      lastContacted: '2 days ago',
      city: 'Pune, Maharashtra',
      status: 'Active',
    },
    {
      id: '6',
      name: 'Anjali Gupta',
      phone: '+91 94567 89012',
      email: 'anjali@zenithenterprises.com',
      company: 'Zenith Enterprises',
      jobTitle: 'Operations Lead',
      tags: ['Operations'],
      lastContacted: '3 days ago',
      city: 'Bengaluru, Karnataka',
      status: 'Inactive',
    },
  ];

  const filteredContacts = contactsList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Contacts Directory
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Verified business contacts, decision makers and client profiles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              toast.info(
                'Exporting Contacts',
                'Compiling verified contact records to CSV...'
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] text-[#475569] text-xs font-semibold rounded-lg shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddContactOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Total Contacts"
          value="8,420"
          change="14.2%"
          changeType="positive"
          timeframe="vs last month"
          icon={<Users className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Decision Makers"
          value="2,140"
          change="8.5%"
          changeType="positive"
          timeframe="CXO / VP Level"
          icon={<Star className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
        <StatCard
          title="Active Engaged"
          value="5,890"
          change="69.9%"
          changeType="positive"
          timeframe="contacted in 30d"
          icon={<Phone className="w-4 h-4" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Enterprise Accounts"
          value="640"
          change="+18"
          changeType="positive"
          timeframe="corporate accounts"
          icon={<Building2 className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* 3. Filter Bar & Search */}
      <div className="bg-white rounded-[12px] border border-[#E5EBF2] p-3 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by contact name, company or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <select className="text-xs bg-white border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-slate-700 font-medium">
            <option>All Companies</option>
            <option>Tech Solutions</option>
            <option>Globex Corp</option>
            <option>Jain Traders</option>
          </select>
          <select className="text-xs bg-white border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-slate-700 font-medium">
            <option>All Cities</option>
            <option>Mumbai</option>
            <option>Delhi NCR</option>
            <option>Ahmedabad</option>
          </select>
        </div>
      </div>

      {/* 4. Contacts Table (De-shrunk, min-width with smooth scroll) */}
      <div className="bg-white rounded-[12px] border border-[#E5EBF2] shadow-card overflow-hidden">
        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left text-xs min-w-[960px]">
            <thead className="bg-[#F8FAFD] text-[#64748B] uppercase text-[10px] font-bold border-b border-[#E5EBF2]">
              <tr>
                <th className="w-8 px-3.5 py-3 text-center">
                  <input type="checkbox" className="rounded text-[#0362FA] cursor-pointer" />
                </th>
                <th className="px-3.5 py-3 whitespace-nowrap">Contact Name</th>
                <th className="px-3.5 py-3 whitespace-nowrap">Phone Number</th>
                <th className="px-3.5 py-3 whitespace-nowrap">Email</th>
                <th className="px-3.5 py-3 whitespace-nowrap">Company & Role</th>
                <th className="px-3.5 py-3 whitespace-nowrap">Location</th>
                <th className="px-3.5 py-3 whitespace-nowrap">Tags</th>
                <th className="px-3.5 py-3 whitespace-nowrap">Last Contacted</th>
                <th className="px-3.5 py-3 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredContacts.map((c) => (
                <tr key={c.id} className="hover:bg-[#F8FAFD] transition-colors">
                  <td className="px-3.5 py-3 text-center">
                    <input type="checkbox" className="rounded text-[#0362FA] cursor-pointer" />
                  </td>
                  <td className="px-3.5 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <UserAvatar name={c.name} size="sm" />
                      <div>
                        <span className="font-bold text-[#0F172A] block whitespace-nowrap">{c.name}</span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{c.jobTitle}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3.5 py-3 font-mono text-[11px] font-semibold text-slate-800 whitespace-nowrap">
                    {c.phone}
                  </td>
                  <td className="px-3.5 py-3 text-slate-600 whitespace-nowrap">{c.email}</td>
                  <td className="px-3.5 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-900 whitespace-nowrap">{c.company}</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-3 text-slate-600 whitespace-nowrap">{c.city}</td>
                  <td className="px-3.5 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1 flex-wrap">
                      {c.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#EBF3FE] text-[#0362FA] whitespace-nowrap"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3.5 py-3 text-[11px] text-[#64748B] whitespace-nowrap">
                    {c.lastContacted}
                  </td>
                  <td className="px-3.5 py-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() =>
                          startCall({
                            contactName: c.name,
                            phoneNumber: c.phone,
                            companyName: c.company,
                          })
                        }
                        className="p-1 text-[#0362FA] hover:bg-[#EBF3FE] rounded-md transition-colors cursor-pointer"
                        title="Call Contact"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toast.info('WhatsApp Opened', `Initiating chat with ${c.name}`)}
                        className="p-1 text-[#10B981] hover:bg-[#E6F7EC] rounded-md transition-colors cursor-pointer"
                        title="WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toast.info('Email Composer', `Drafting email to ${c.email}`)}
                        className="p-1 text-[#0362FA] hover:bg-[#EBF3FE] rounded-md transition-colors cursor-pointer"
                        title="Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      <ActionMenu
                        align="right"
                        items={[
                          {
                            label: 'View Contact Details',
                            icon: Users,
                            onClick: () => toast.info(`Contact: ${c.name}`, `${c.jobTitle} at ${c.company}`),
                          },
                          {
                            label: 'Log Call Note',
                            icon: Phone,
                            onClick: () => toast.success('Call Note Saved', `Saved notes for ${c.name}`),
                          },
                          {
                            label: 'Add to VIP List',
                            icon: Star,
                            onClick: () => toast.success('VIP List', `Added ${c.name} to VIP decision makers.`),
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
      </div>

      <AddLeadModal
        isOpen={isAddContactOpen}
        onClose={() => setIsAddContactOpen(false)}
      />
    </div>
  );
};
