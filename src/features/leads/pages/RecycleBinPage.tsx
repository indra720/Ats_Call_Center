import React, { useState } from 'react';
import {
  Trash2,
  RotateCcw,
  AlertOctagon,
  Search,
  Filter,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { UserAvatar } from '@/components/common/UserAvatar';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

export const RecycleBinPage: React.FC = () => {
  const [deletedLeads, setDeletedLeads] = useState([
    {
      id: 'r1',
      name: 'Karan Mehra',
      phone: '+91 98111 22334',
      email: 'karan@mehraexports.in',
      company: 'Mehra Exports',
      deletedBy: 'Amit Kumar',
      deletedAt: '22 Oct 2026',
      daysRemaining: 26,
      reason: 'Wrong contact number / invalid lead',
    },
    {
      id: 'r2',
      name: 'Swati Deshmukh',
      phone: '+91 97222 33445',
      email: 'swati@deshmukh.co',
      company: 'Deshmukh & Sons',
      deletedBy: 'Sneha Verma',
      deletedAt: '20 Oct 2026',
      daysRemaining: 24,
      reason: 'Customer requested data removal',
    },
    {
      id: 'r3',
      name: 'Bhavesh Chawla',
      phone: '+91 99333 44556',
      email: 'bhavesh@chawla.com',
      company: 'Chawla Electricals',
      deletedBy: 'Rahul Mehta',
      deletedAt: '18 Oct 2026',
      daysRemaining: 22,
      reason: 'Duplicate entry after merge',
    },
    {
      id: 'r4',
      name: 'Nisha Aggarwal',
      phone: '+91 96444 55667',
      email: 'nisha@aggarwal.in',
      company: 'Aggarwal Pharma',
      deletedBy: 'Neha Singh',
      deletedAt: '15 Oct 2026',
      daysRemaining: 19,
      reason: 'Test lead submitted during QA testing',
    },
  ]);

  const handleRestore = (id: string, name: string) => {
    toast.success('Lead Restored', `Restored ${name} back to active pipeline.`);
    setDeletedLeads(deletedLeads.filter((l) => l.id !== id));
  };

  const handlePermanentDelete = (id: string) => {
    toast.warning('Record Purged', 'Permanently deleted lead record from database.');
    setDeletedLeads(deletedLeads.filter((l) => l.id !== id));
  };

  const handleEmptyBin = () => {
    if (deletedLeads.length === 0) {
      toast.info('Bin Already Empty', 'No archived records to purge.');
      return;
    }
    toast.error('Recycle Bin Emptied', `Permanently purged ${deletedLeads.length} leads.`);
    setDeletedLeads([]);
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Recycle Bin & Data Retention
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Screen 049: Archived and soft-deleted leads with 30-day automatic restoration window.
          </p>
        </div>

        {deletedLeads.length > 0 && (
          <button
            onClick={handleEmptyBin}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Empty Recycle Bin</span>
          </button>
        )}
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Items in Bin"
          value={deletedLeads.length.toString()}
          change="Soft-deleted"
          changeType="neutral"
          timeframe="30-day retention"
          icon={<Trash2 className="w-4 h-4" />}
          iconBgColor="bg-[#FDE8E8] text-[#E73647]"
          sparklineColor="bg-[#FCA5A5]"
        />
        <StatCard
          title="Restored Leads"
          value="38"
          change="This Month"
          changeType="positive"
          timeframe="recovered deals"
          icon={<RotateCcw className="w-4 h-4" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Retention Policy"
          value="30 Days"
          change="Compliant"
          changeType="positive"
          timeframe="auto-purge policy"
          icon={<Clock className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Audit Logging"
          value="Enabled"
          change="100% Tracked"
          changeType="positive"
          timeframe="all deletions logged"
          icon={<AlertOctagon className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
      </div>

      {/* 3. Deleted Leads Table */}
      <div className="bg-white rounded-[12px] border border-[#E5EBF2] shadow-card overflow-hidden">
        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-[#F8FAFD] text-[#64748B] uppercase text-[10px] font-bold border-b border-[#E5EBF2]">
              <tr>
                <th className="px-3 py-2.5">Lead Name</th>
                <th className="px-3 py-2.5">Contact Details</th>
                <th className="px-3 py-2.5">Company</th>
                <th className="px-3 py-2.5">Deleted By</th>
                <th className="px-3 py-2.5">Deleted On</th>
                <th className="px-3 py-2.5">Auto-Purge In</th>
                <th className="px-3 py-2.5">Reason</th>
                <th className="px-3 py-2.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {deletedLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-xs">
                    <Trash2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    Recycle bin is completely empty. No deleted leads pending restoration.
                  </td>
                </tr>
              ) : (
                deletedLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-[#F8FAFD] transition-colors">
                    <td className="px-3 py-2.5 font-bold text-[#0F172A]">{l.name}</td>
                    <td className="px-3 py-2.5 text-slate-600 font-mono text-[11px]">{l.phone}</td>
                    <td className="px-3 py-2.5 text-slate-800 font-medium">{l.company}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <UserAvatar name={l.deletedBy} size="xs" />
                        <span className="text-slate-700">{l.deletedBy}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-slate-500 text-[11px]">{l.deletedAt}</td>
                    <td className="px-3 py-2.5 font-bold text-amber-600">
                      {l.daysRemaining} days remaining
                    </td>
                    <td className="px-3 py-2.5 text-slate-500 text-[11px] truncate max-w-[180px]">
                      {l.reason}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleRestore(l.id, l.name)}
                          className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-[#0362FA] bg-[#EBF3FE] hover:bg-blue-100 rounded-md transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Restore</span>
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(l.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                          title="Permanently Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
