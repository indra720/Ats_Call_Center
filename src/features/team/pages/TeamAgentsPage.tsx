import React, { useState } from 'react';
import {
  Users,
  Shield,
  Plus,
  Phone,
  Mail,
  Award,
  MoreVertical,
  Search,
  Filter,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { UserAvatar } from '@/components/common/UserAvatar';
import { AddUserModal } from '@/features/settings/components/AddUserModal';
import { cn } from '@/lib/utils';

export const TeamAgentsPage: React.FC = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [agents, setAgents] = useState([
    {
      id: 'ag1',
      name: 'Amit Kumar',
      email: 'amit.k@atscallcenter.com',
      phone: '+91 98765 11223',
      role: 'Senior Telecalling Specialist',
      team: 'Inbound Sales',
      callsToday: 68,
      connectedCalls: 48,
      conversionRate: '28.5%',
      talkTime: '4h 12m',
      status: 'On Call',
    },
    {
      id: 'ag2',
      name: 'Sneha Verma',
      email: 'sneha.v@atscallcenter.com',
      phone: '+91 91234 22334',
      role: 'Enterprise Account Executive',
      team: 'Enterprise Leads',
      callsToday: 54,
      connectedCalls: 38,
      conversionRate: '24.3%',
      talkTime: '3h 45m',
      status: 'Available',
    },
    {
      id: 'ag3',
      name: 'Rahul Mehta',
      email: 'rahul.m@atscallcenter.com',
      phone: '+91 99887 33445',
      role: 'Senior Outbound Rep',
      team: 'Outbound Campaigns',
      callsToday: 82,
      connectedCalls: 52,
      conversionRate: '22.8%',
      talkTime: '5h 10m',
      status: 'On Call',
    },
    {
      id: 'ag4',
      name: 'Neha Singh',
      email: 'neha.s@atscallcenter.com',
      phone: '+91 88776 44556',
      role: 'Customer Support Lead',
      team: 'Support & Escalation',
      callsToday: 45,
      connectedCalls: 40,
      conversionRate: '34.0%',
      talkTime: '4h 30m',
      status: 'Available',
    },
    {
      id: 'ag5',
      name: 'Vikram Malhotra',
      email: 'vikram.m@atscallcenter.com',
      phone: '+91 97654 55667',
      role: 'Telecaller & Qualifier',
      team: 'Inbound Sales',
      callsToday: 60,
      connectedCalls: 39,
      conversionRate: '20.5%',
      talkTime: '3h 25m',
      status: 'Wrap Up',
    },
  ]);

  const handleAddAgent = (newAgent: any) => {
    setAgents([
      ...agents,
      {
        id: newAgent.id,
        name: newAgent.name,
        email: newAgent.email,
        phone: newAgent.phone || '+91 99000 00000',
        role: newAgent.role,
        team: newAgent.department || 'Inbound Sales',
        callsToday: 0,
        connectedCalls: 0,
        conversionRate: '0%',
        talkTime: '0h 0m',
        status: 'Available',
      },
    ]);
  };

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Agents & Teams Directory
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Agent roster, live telecaller statuses, department assignments and productivity.
          </p>
        </div>

        <button
          onClick={() => setIsAddUserOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Agent</span>
        </button>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Total Agents"
          value={agents.length.toString()}
          change="Full Roster"
          changeType="positive"
          timeframe="all departments"
          icon={<Users className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Active on Call"
          value="2 Agents"
          change="Busy"
          changeType="neutral"
          timeframe="live talk time"
          icon={<Phone className="w-4 h-4" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Team Conversion"
          value="26.0%"
          change="+3.4%"
          changeType="positive"
          timeframe="average conversion"
          icon={<Award className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
        <StatCard
          title="Avg Daily Talk Time"
          value="4h 12m"
          change="Optimal"
          changeType="positive"
          timeframe="per active agent"
          icon={<Clock className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* 3. Search Bar */}
      <div className="bg-white rounded-[12px] border border-[#E5EBF2] p-3 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search agents by name, role or team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <select className="text-xs bg-white border border-[#E5EBF2] rounded-lg px-2.5 py-1.5 text-slate-700 font-medium">
            <option>All Teams</option>
            <option>Inbound Sales</option>
            <option>Enterprise Leads</option>
            <option>Outbound Campaigns</option>
            <option>Support & Escalation</option>
          </select>
        </div>
      </div>

      {/* 4. Agents Table */}
      <div className="bg-white rounded-[12px] border border-[#E5EBF2] shadow-card overflow-hidden">
        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-[#F8FAFD] text-[#64748B] uppercase text-[10px] font-bold border-b border-[#E5EBF2]">
              <tr>
                <th className="px-3 py-2.5">Agent Name</th>
                <th className="px-3 py-2.5">Department / Team</th>
                <th className="px-3 py-2.5">Designation</th>
                <th className="px-3 py-2.5">Calls Today</th>
                <th className="px-3 py-2.5">Connected</th>
                <th className="px-3 py-2.5">Conversion</th>
                <th className="px-3 py-2.5">Total Talk Time</th>
                <th className="px-3 py-2.5">Current Status</th>
                <th className="px-3 py-2.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredAgents.map((ag) => (
                <tr key={ag.id} className="hover:bg-[#F8FAFD] transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <UserAvatar name={ag.name} size="sm" />
                      <div>
                        <span className="font-bold text-[#0F172A] block">{ag.name}</span>
                        <span className="text-[10px] text-slate-400">{ag.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-slate-800">{ag.team}</td>
                  <td className="px-3 py-2.5 text-slate-600">{ag.role}</td>
                  <td className="px-3 py-2.5 font-bold text-slate-900">{ag.callsToday}</td>
                  <td className="px-3 py-2.5 text-[#0362FA] font-bold">{ag.connectedCalls}</td>
                  <td className="px-3 py-2.5 text-[#10B981] font-extrabold">{ag.conversionRate}</td>
                  <td className="px-3 py-2.5 font-mono text-[11px] text-slate-700">{ag.talkTime}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-max',
                        ag.status === 'On Call' && 'bg-rose-50 text-rose-600 border border-rose-200',
                        ag.status === 'Available' && 'bg-emerald-50 text-emerald-600 border border-emerald-200',
                        ag.status === 'Wrap Up' && 'bg-amber-50 text-amber-600 border border-amber-200'
                      )}
                    >
                      <span
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          ag.status === 'On Call' && 'bg-rose-500 animate-pulse',
                          ag.status === 'Available' && 'bg-emerald-500',
                          ag.status === 'Wrap Up' && 'bg-amber-500'
                        )}
                      />
                      {ag.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <button className="p-1 text-slate-400 hover:text-slate-700 rounded-md">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onUserAdded={handleAddAgent}
      />
    </div>
  );
};
