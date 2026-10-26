import React, { useState } from 'react';
import {
  Building2,
  Users,
  Search,
  Filter,
  Plus,
  Download,
  IndianRupee,
  ExternalLink,
  Phone,
  Mail,
  ShieldCheck,
  Eye,
  Edit,
  Trash2,
  FileSpreadsheet,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { UserAvatar } from '@/components/common/UserAvatar';
import { ActionMenu } from '@/components/common/ActionMenu';
import { AddCompanyModal } from '@/features/leads/components/AddCompanyModal';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

export const CompaniesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [companiesList, setCompaniesList] = useState([
    {
      id: '1',
      name: 'Tech Solutions Pvt Ltd',
      industry: 'IT & Software',
      contactsCount: 14,
      openDeals: 3,
      dealValue: '₹8,50,000',
      accountManager: 'Amit Kumar',
      city: 'Jaipur, Rajasthan',
      gstin: '08AABCT1332P1ZX',
      tier: 'Enterprise',
    },
    {
      id: '2',
      name: 'Globex Corporation',
      industry: 'Digital Marketing',
      contactsCount: 8,
      openDeals: 2,
      dealValue: '₹4,20,000',
      accountManager: 'Sneha Verma',
      city: 'Mumbai, Maharashtra',
      gstin: '27AABCG4567M1Z2',
      tier: 'Mid-Market',
    },
    {
      id: '3',
      name: 'Jain Traders & Exports',
      industry: 'Retail & Wholesale',
      contactsCount: 5,
      openDeals: 1,
      dealValue: '₹2,80,000',
      accountManager: 'Rahul Mehta',
      city: 'Ahmedabad, Gujarat',
      gstin: '24AABCJ8901K1Z5',
      tier: 'Growth',
    },
    {
      id: '4',
      name: 'Patel Industries Ltd',
      industry: 'Heavy Manufacturing',
      contactsCount: 22,
      openDeals: 4,
      dealValue: '₹14,00,000',
      accountManager: 'Neha Singh',
      city: 'Surat, Gujarat',
      gstin: '24AABCP5678Q1Z9',
      tier: 'Enterprise',
    },
    {
      id: '5',
      name: 'AutoHaus India Motors',
      industry: 'Automotive & Logistics',
      contactsCount: 11,
      openDeals: 2,
      dealValue: '₹6,40,000',
      accountManager: 'Amit Kumar',
      city: 'Pune, Maharashtra',
      gstin: '27AABCA3322L1ZX',
      tier: 'Enterprise',
    },
    {
      id: '6',
      name: 'Zenith Health Systems',
      industry: 'Healthcare & Pharma',
      contactsCount: 6,
      openDeals: 1,
      dealValue: '₹3,50,000',
      accountManager: 'Sneha Verma',
      city: 'Bengaluru, Karnataka',
      gstin: '29AABCZ9988H1Z1',
      tier: 'Growth',
    },
  ]);

  const filteredCompanies = companiesList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.gstin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      selectedIndustry === 'All' || c.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

    const matchesTier = selectedTier === 'All' || c.tier === selectedTier;

    return matchesSearch && matchesIndustry && matchesTier;
  });

  const handleExport = () => {
    toast.info(
      'Exporting Accounts Directory',
      'Exporting 1,248 verified accounts with GST credentials to Excel...'
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Companies & Accounts
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Screen 055 corporate account directory, verified GSTIN records and account hierarchies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EBF2] text-[#475569] text-xs font-semibold rounded-lg shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Accounts</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Total Companies"
          value="1,248"
          change="+24"
          changeType="positive"
          timeframe="vs last month"
          icon={<Building2 className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Enterprise Accounts"
          value="182"
          change="14.6%"
          changeType="positive"
          timeframe="tier 1 enterprise"
          icon={<ShieldCheck className="w-4 h-4" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Pipeline Volume"
          value="₹39.4L"
          change="8.2%"
          changeType="positive"
          timeframe="open deals"
          icon={<IndianRupee className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
        <StatCard
          title="Avg Key Contacts"
          value="8.4"
          change="+1.2"
          changeType="positive"
          timeframe="per organization"
          icon={<Users className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* 3. Search and Filters */}
      <div className="bg-white rounded-[12px] border border-[#E5EBF2] p-3 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search company, industry, GSTIN or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="text-xs bg-white border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Industries</option>
            <option value="IT">IT & Software</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail & Wholesale</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Automotive">Automotive</option>
          </select>

          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="text-xs bg-white border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
          >
            <option value="All">All Account Tiers</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Mid-Market">Mid-Market</option>
            <option value="Growth">Growth</option>
          </select>
        </div>
      </div>

      {/* 4. Companies Table (Min-width 960px, spacious, no squishing) */}
      <div className="bg-white rounded-[12px] border border-[#E5EBF2] shadow-card overflow-hidden">
        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left text-xs min-w-[960px]">
            <thead className="bg-[#F8FAFD] text-[#64748B] uppercase text-[10px] font-bold border-b border-[#E5EBF2]">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">Company Name</th>
                <th className="px-4 py-3 whitespace-nowrap">Industry</th>
                <th className="px-4 py-3 whitespace-nowrap">Tier</th>
                <th className="px-4 py-3 whitespace-nowrap">GSTIN</th>
                <th className="px-4 py-3 whitespace-nowrap">Contacts</th>
                <th className="px-4 py-3 whitespace-nowrap">Open Deals</th>
                <th className="px-4 py-3 whitespace-nowrap">Deal Volume</th>
                <th className="px-4 py-3 whitespace-nowrap">Location</th>
                <th className="px-4 py-3 whitespace-nowrap">Account Manager</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-400 text-xs">
                    No matching companies found for "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F8FAFD] transition-colors">
                    <td className="px-4 py-3 font-bold text-[#0F172A] whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100">
                          {c.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{c.industry}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={cn(
                          'px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block',
                          c.tier === 'Enterprise' && 'bg-blue-50 text-[#0362FA] border border-blue-200',
                          c.tier === 'Mid-Market' && 'bg-emerald-50 text-emerald-600 border border-emerald-200',
                          c.tier === 'Growth' && 'bg-amber-50 text-amber-600 border border-amber-200'
                        )}
                      >
                        {c.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {c.gstin}
                    </td>
                    <td className="px-4 py-3 text-[#0F172A] font-semibold whitespace-nowrap">
                      {c.contactsCount} Contacts
                    </td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{c.openDeals} Deals</td>
                    <td className="px-4 py-3 font-extrabold text-[#0362FA] whitespace-nowrap">
                      {c.dealValue}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{c.city}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <UserAvatar name={c.accountManager} size="xs" />
                        <span className="text-slate-800 text-[11px] font-medium">{c.accountManager}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <ActionMenu
                        items={[
                          {
                            label: 'View Account Details',
                            icon: Eye,
                            onClick: () => toast.info(`Account: ${c.name}`, `Location: ${c.city} · GSTIN: ${c.gstin}`),
                          },
                          {
                            label: 'Call Primary Contact',
                            icon: Phone,
                            onClick: () => toast.success('Dialing Key Contact', `Calling ${c.accountManager} for ${c.name}`),
                          },
                          {
                            label: 'Edit Company Record',
                            icon: Edit,
                            onClick: () => toast.info('Edit Company', `Opening editor for ${c.name}`),
                          },
                          {
                            label: 'Download GST Dossier',
                            icon: FileSpreadsheet,
                            onClick: () => toast.info('GST Dossier', `Downloading verified GSTIN data for ${c.name}`),
                          },
                          {
                            label: 'Archive Company',
                            icon: Trash2,
                            onClick: () => {
                              setCompaniesList((prev) => prev.filter((item) => item.id !== c.id));
                              toast.warning('Account Archived', `${c.name} has been moved to Recycle Bin.`);
                            },
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Company Modal Form */}
      <AddCompanyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCompanyCreated={(newCompany) => {
          setCompaniesList([
            {
              id: Date.now().toString(),
              name: newCompany.name,
              industry: newCompany.industry,
              contactsCount: 1,
              openDeals: 1,
              dealValue: newCompany.annualRevenue || '₹5,00,000',
              accountManager: 'Amit Kumar',
              city: newCompany.city || 'India',
              gstin: newCompany.gstin || '27AAAAA0000A1Z5',
              tier: newCompany.tier || 'Enterprise',
            },
            ...companiesList,
          ]);
        }}
      />
    </div>
  );
};
