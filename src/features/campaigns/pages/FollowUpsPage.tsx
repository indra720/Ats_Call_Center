import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  MessageSquare,
  Mail,
  Plus,
  AlertCircle,
  Check,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useUIStore } from '@/store/uiStore';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

export const FollowUpsPage: React.FC = () => {
  const startCall = useUIStore((state) => state.startCall);

  const [tasks, setTasks] = useState([
    {
      id: 't1',
      title: 'Call Rohit Sharma - Budget Discussion',
      lead: 'Rohit Sharma',
      phone: '+91 98765 43210',
      company: 'Tech Solutions Pvt Ltd',
      time: 'Today, 11:00 AM',
      type: 'Phone Call',
      completed: false,
      priority: 'high',
      agent: 'Amit Kumar',
    },
    {
      id: 't2',
      title: 'Follow-up with Priya Khanna via WhatsApp',
      lead: 'Priya Khanna',
      phone: '+91 91234 56789',
      company: 'Globex Corp',
      time: 'Today, 12:30 PM',
      type: 'WhatsApp',
      completed: false,
      priority: 'medium',
      agent: 'Sneha Verma',
    },
    {
      id: 't3',
      title: 'Send Commercial Proposal to Amit Jain',
      lead: 'Amit Jain',
      phone: '+91 99887 66554',
      company: 'Jain Traders',
      time: 'Today, 02:00 PM',
      type: 'Email Proposal',
      completed: false,
      priority: 'high',
      agent: 'Rahul Mehta',
    },
    {
      id: 't4',
      title: 'Demo Call with Sunita Patel',
      lead: 'Sunita Patel',
      phone: '+91 88776 55443',
      company: 'Patel Industries',
      time: 'Today, 03:30 PM',
      type: 'Screen Share Demo',
      completed: false,
      priority: 'high',
      agent: 'Neha Singh',
    },
    {
      id: 't5',
      title: 'Follow-up with Vikram on Contract Terms',
      lead: 'Vikram Malhotra',
      phone: '+91 97654 32109',
      company: 'AutoHaus India',
      time: 'Today, 05:00 PM',
      type: 'Phone Call',
      completed: true,
      priority: 'low',
      agent: 'Amit Kumar',
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Follow-ups & Tasks Calendar
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Scheduled callbacks, reminder alerts, and customer touchpoints.
          </p>
        </div>

        <button
          onClick={() =>
            toast.info(
              'Schedule Follow-up',
              'Scheduled callbacks sync directly with agent calendar and dialer.'
            )
          }
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Follow-up</span>
        </button>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Due Today"
          value="86 Tasks"
          change="Urgent"
          changeType="negative"
          timeframe="pending actions"
          icon={<Clock className="w-4 h-4 text-[#EF9612]" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
        <StatCard
          title="Completed Today"
          value="42 Done"
          change="48.8%"
          changeType="positive"
          timeframe="on track"
          icon={<CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Upcoming Tomorrow"
          value="54 Tasks"
          change="Scheduled"
          changeType="neutral"
          timeframe="calendar pipeline"
          icon={<Calendar className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Task Adherence SLA"
          value="96.2%"
          change="+2.1%"
          changeType="positive"
          timeframe="on-time callbacks"
          icon={<AlertCircle className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* 3. Tasks List */}
      <div className="bg-white rounded-2xl border border-[#E5EBF2] shadow-card overflow-hidden">
        <div className="p-3.5 border-b border-[#E5EBF2] flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900">Today's Scheduled Actions</h3>
          <span className="text-xs text-slate-400">Showing {tasks.length} tasks</span>
        </div>

        <div className="divide-y divide-[#F1F5F9]">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                'p-4 flex items-center justify-between gap-4 transition-colors',
                task.completed ? 'bg-slate-50/70 opacity-60' : 'hover:bg-[#F8FAFD]'
              )}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    'w-5 h-5 rounded-md border flex items-center justify-center transition-colors',
                    task.completed
                      ? 'bg-[#10B981] border-[#10B981] text-white'
                      : 'border-slate-300 hover:border-[#0362FA]'
                  )}
                >
                  {task.completed && <Check className="w-3.5 h-3.5" />}
                </button>

                <div>
                  <h4 className={cn('text-xs font-bold text-slate-900', task.completed && 'line-through text-slate-400')}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                    <span>{task.company}</span>
                    <span>•</span>
                    <span className="font-mono">{task.phone}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">{task.agent}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#EF9612] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.time}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      startCall({
                        contactName: task.lead,
                        phoneNumber: task.phone,
                        companyName: task.company,
                      })
                    }
                    className="p-1.5 text-[#0362FA] hover:bg-[#EBF3FE] rounded-lg transition-colors"
                    title="Call Now"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      toast.info('WhatsApp Opened', `Starting follow-up chat with ${task.lead}`)
                    }
                    className="p-1.5 text-[#10B981] hover:bg-[#E6F7EC] rounded-lg transition-colors cursor-pointer"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
