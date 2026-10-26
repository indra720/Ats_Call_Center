import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Coffee,
  Users,
  Search,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { UserAvatar } from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';

export const AttendanceShiftsPage: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 'att1',
      name: 'Amit Kumar',
      shift: 'Morning (08:00 AM - 05:00 PM)',
      checkIn: '07:55 AM',
      checkOut: '—',
      status: 'Present',
      breakTime: '45 mins',
      totalActiveHours: '7h 15m',
    },
    {
      id: 'att2',
      name: 'Sneha Verma',
      shift: 'General (09:30 AM - 06:30 PM)',
      checkIn: '09:25 AM',
      checkOut: '—',
      status: 'Present',
      breakTime: '30 mins',
      totalActiveHours: '6h 40m',
    },
    {
      id: 'att3',
      name: 'Rahul Mehta',
      shift: 'General (09:30 AM - 06:30 PM)',
      checkIn: '09:48 AM',
      checkOut: '—',
      status: 'Late',
      breakTime: '50 mins',
      totalActiveHours: '6h 15m',
    },
    {
      id: 'att4',
      name: 'Neha Singh',
      shift: 'General (09:30 AM - 06:30 PM)',
      checkIn: '—',
      checkOut: '—',
      status: 'On Leave',
      breakTime: '—',
      totalActiveHours: '0h 0m',
    },
    {
      id: 'att5',
      name: 'Vikram Malhotra',
      shift: 'Evening (02:00 PM - 11:00 PM)',
      checkIn: '01:50 PM',
      checkOut: '—',
      status: 'Present',
      breakTime: '20 mins',
      totalActiveHours: '3h 10m',
    },
  ]);

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Attendance & Shifts Management
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Agent biometric/app check-ins, shift rotations, break tracking and timesheets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#0362FA] bg-[#EBF3FE] px-3 py-1.5 rounded-lg border border-[#B0D2FB]">
            Today: Mon, 19 Oct 2026
          </span>
        </div>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Present Today"
          value="22 / 24"
          change="91.6%"
          changeType="positive"
          timeframe="attendance rate"
          icon={<CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="On Break Currently"
          value="3 Agents"
          change="Tea / Lunch"
          changeType="neutral"
          timeframe="scheduled break"
          icon={<Coffee className="w-4 h-4 text-[#EF9612]" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
        <StatCard
          title="Late Check-ins"
          value="2 Today"
          change="Grace <15m"
          changeType="negative"
          timeframe="punctuality flag"
          icon={<AlertTriangle className="w-4 h-4 text-[#E73647]" />}
          iconBgColor="bg-[#FDE8E8] text-[#E73647]"
          sparklineColor="bg-[#FCA5A5]"
        />
        <StatCard
          title="Approved Leaves"
          value="2 Planned"
          change="Sick/Casual"
          changeType="neutral"
          timeframe="roster adjusted"
          icon={<Calendar className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* 3. Attendance Table */}
      <div className="bg-white rounded-2xl border border-[#E5EBF2] shadow-card overflow-hidden">
        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-[#F8FAFD] text-[#64748B] uppercase text-[10px] font-bold border-b border-[#E5EBF2]">
              <tr>
                <th className="px-3 py-2.5">Agent Name</th>
                <th className="px-3 py-2.5">Shift Schedule</th>
                <th className="px-3 py-2.5">Check In</th>
                <th className="px-3 py-2.5">Check Out</th>
                <th className="px-3 py-2.5">Break Logged</th>
                <th className="px-3 py-2.5">Active Telephony Hours</th>
                <th className="px-3 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {attendanceRecords.map((att) => (
                <tr key={att.id} className="hover:bg-[#F8FAFD] transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={att.name} size="sm" />
                      <span className="font-bold text-[#0F172A]">{att.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-slate-700">{att.shift}</td>
                  <td className="px-3 py-2.5 font-mono text-[11px] text-slate-800">{att.checkIn}</td>
                  <td className="px-3 py-2.5 font-mono text-[11px] text-slate-500">{att.checkOut}</td>
                  <td className="px-3 py-2.5 text-slate-600">{att.breakTime}</td>
                  <td className="px-3 py-2.5 font-bold text-[#0362FA]">{att.totalActiveHours}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-bold',
                        att.status === 'Present' && 'bg-emerald-50 text-emerald-600 border border-emerald-200',
                        att.status === 'Late' && 'bg-amber-50 text-amber-600 border border-amber-200',
                        att.status === 'On Leave' && 'bg-rose-50 text-rose-600 border border-rose-200'
                      )}
                    >
                      {att.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
