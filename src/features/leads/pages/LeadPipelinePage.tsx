import React, { useState } from 'react';
import {
  GitFork,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Phone,
  MessageSquare,
  IndianRupee,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useUIStore } from '@/store/uiStore';
import { AddLeadModal } from '@/features/leads/components/AddLeadModal';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

interface PipelineCard {
  id: string;
  name: string;
  company: string;
  phone: string;
  value: string;
  agent: string;
  daysInStage: number;
  priority: 'high' | 'medium' | 'low';
}

export const LeadPipelinePage: React.FC = () => {
  const startCall = useUIStore((state) => state.startCall);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState('All Campaigns');

  const columns: { id: string; title: string; count: number; value: string; color: string; cards: PipelineCard[] }[] = [
    {
      id: 'new',
      title: 'New Leads',
      count: 4,
      value: '₹3,40,000',
      color: 'border-t-[#0362FA]',
      cards: [
        { id: 'c1', name: 'Rohit Sharma', company: 'Tech Solutions', phone: '+91 98765 43210', value: '₹85,000', agent: 'Amit Kumar', daysInStage: 1, priority: 'high' },
        { id: 'c2', name: 'Manish Tyagi', company: 'Tyagi Logistics', phone: '+91 98234 11223', value: '₹1,20,000', agent: 'Sneha Verma', daysInStage: 2, priority: 'medium' },
        { id: 'c3', name: 'Ravi Teja', company: 'Teja Infotech', phone: '+91 97112 33445', value: '₹60,000', agent: 'Rahul Mehta', daysInStage: 1, priority: 'low' },
        { id: 'c4', name: 'Kavita Iyer', company: 'Iyer & Co', phone: '+91 99201 44556', value: '₹75,000', agent: 'Neha Singh', daysInStage: 3, priority: 'medium' },
      ],
    },
    {
      id: 'contacted',
      title: 'Contacted',
      count: 3,
      value: '₹4,10,000',
      color: 'border-t-[#06B6D4]',
      cards: [
        { id: 'c5', name: 'Priya Khanna', company: 'Globex Corp', phone: '+91 91234 56789', value: '₹2,50,000', agent: 'Sneha Verma', daysInStage: 2, priority: 'high' },
        { id: 'c6', name: 'Arjun Das', company: 'Das Capital', phone: '+91 98450 12345', value: '₹90,000', agent: 'Amit Kumar', daysInStage: 4, priority: 'medium' },
        { id: 'c7', name: 'Meena Rao', company: 'Rao Biotech', phone: '+91 97312 99887', value: '₹70,000', agent: 'Rahul Mehta', daysInStage: 1, priority: 'low' },
      ],
    },
    {
      id: 'qualified',
      title: 'Qualified',
      count: 3,
      value: '₹6,80,000',
      color: 'border-t-[#871CF4]',
      cards: [
        { id: 'c8', name: 'Amit Jain', company: 'Jain Traders', phone: '+91 99887 66554', value: '₹3,00,000', agent: 'Rahul Mehta', daysInStage: 3, priority: 'high' },
        { id: 'c9', name: 'Sanjay Dutt', company: 'Apex Builders', phone: '+91 98111 22334', value: '₹2,40,000', agent: 'Neha Singh', daysInStage: 5, priority: 'high' },
        { id: 'c10', name: 'Deepa Roy', company: 'Royals Media', phone: '+91 98300 44556', value: '₹1,40,000', agent: 'Sneha Verma', daysInStage: 2, priority: 'medium' },
      ],
    },
    {
      id: 'proposal',
      title: 'Proposal Sent',
      count: 2,
      value: '₹5,20,000',
      color: 'border-t-[#EF9612]',
      cards: [
        { id: 'c11', name: 'Sunita Patel', company: 'Patel Industries', phone: '+91 88776 55443', value: '₹3,50,000', agent: 'Neha Singh', daysInStage: 4, priority: 'high' },
        { id: 'c12', name: 'Gaurav Gill', company: 'Gill Motors', phone: '+91 98722 66778', value: '₹1,70,000', agent: 'Amit Kumar', daysInStage: 6, priority: 'medium' },
      ],
    },
    {
      id: 'negotiation',
      title: 'Negotiation',
      count: 2,
      value: '₹4,90,000',
      color: 'border-t-[#E73647]',
      cards: [
        { id: 'c13', name: 'Vikram Malhotra', company: 'AutoHaus India', phone: '+91 97654 32109', value: '₹2,90,000', agent: 'Amit Kumar', daysInStage: 3, priority: 'high' },
        { id: 'c14', name: 'Rakesh Bansal', company: 'Bansal Wire', phone: '+91 98140 33221', value: '₹2,00,000', agent: 'Rahul Mehta', daysInStage: 7, priority: 'high' },
      ],
    },
    {
      id: 'won',
      title: 'Won Deals',
      count: 2,
      value: '₹8,50,000',
      color: 'border-t-[#10B981]',
      cards: [
        { id: 'c15', name: 'Kiran Bedi', company: 'Secure India', phone: '+91 98100 55443', value: '₹4,50,000', agent: 'Sneha Verma', daysInStage: 1, priority: 'high' },
        { id: 'c16', name: 'Yash Vardhan', company: 'Vardhan Tech', phone: '+91 99100 88776', value: '₹4,00,000', agent: 'Neha Singh', daysInStage: 2, priority: 'high' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Lead Pipeline & Kanban
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Screen 036 visual pipeline: drag and drop deals across conversion stages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="text-xs bg-white border border-[#E5EBF2] rounded-lg px-3 py-1.5 text-slate-700 font-semibold focus:outline-none"
          >
            <option>All Campaigns</option>
            <option>Product Demo Q4</option>
            <option>Enterprise Inbound</option>
            <option>WhatsApp Direct</option>
          </select>

          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Deal</span>
          </button>
        </div>
      </div>

      {/* 2. Pipeline Summary Bar */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] p-3 shadow-card flex items-center justify-between overflow-x-auto no-scrollbar scrollbar-none gap-6">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Total Pipeline Value</span>
          <span className="text-lg font-extrabold text-slate-900">₹32,90,000</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Active Deals</span>
          <span className="text-lg font-extrabold text-[#0362FA]">16 Deals</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Avg Deal Size</span>
          <span className="text-lg font-extrabold text-slate-900">₹2,05,625</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Win Rate</span>
          <span className="text-lg font-extrabold text-[#10B981]">28.4%</span>
        </div>
      </div>

      {/* 3. Kanban Columns Container (Horizontal scroll with min-width columns, NO SQUISHING) */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar scrollbar-none pb-4 items-start">
        {columns.map((col) => (
          <div
            key={col.id}
            className={cn(
              'w-[270px] shrink-0 bg-[#F8FAFD] rounded-2xl border border-[#E5EBF2] border-t-4 flex flex-col max-h-[calc(100vh-250px)]',
              col.color
            )}
          >
            {/* Column Header */}
            <div className="p-3 border-b border-[#E5EBF2] flex items-center justify-between bg-white rounded-t-xl">
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{col.title}</span>
                  <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded-full text-[10px]">
                    {col.count}
                  </span>
                </h4>
                <span className="text-[10px] font-semibold text-slate-500">{col.value}</span>
              </div>
              <button className="text-slate-400 hover:text-slate-700">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Cards List with hidden scrollbar */}
            <div className="p-2 space-y-2 overflow-y-auto no-scrollbar scrollbar-none flex-1">
              {col.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white p-3 rounded-xl border border-[#E5EBF2] shadow-2xs hover:shadow-card hover:border-[#CBD5E1] transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 leading-tight">{card.name}</h5>
                      <span className="text-[11px] text-slate-500">{card.company}</span>
                    </div>
                    <span
                      className={cn(
                        'text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase',
                        card.priority === 'high' && 'bg-rose-50 text-rose-600 border border-rose-200',
                        card.priority === 'medium' && 'bg-amber-50 text-amber-600 border border-amber-200',
                        card.priority === 'low' && 'bg-slate-100 text-slate-600'
                      )}
                    >
                      {card.priority}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-extrabold text-[#0362FA]">
                    <span>{card.value}</span>
                    <span className="text-[10px] text-slate-400 font-normal flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {card.daysInStage}d
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <UserAvatar name={card.agent} size="xs" />
                      <span className="text-[10px] text-slate-600 font-medium">{card.agent}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          startCall({
                            contactName: card.name,
                            phoneNumber: card.phone,
                            companyName: card.company,
                          })
                        }
                        className="p-1 text-[#0362FA] hover:bg-[#EBF3FE] rounded-md transition-colors"
                        title="Call"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          toast.info('WhatsApp Opened', `Starting conversation with ${card.name}`)
                        }
                        className="p-1 text-[#10B981] hover:bg-[#E6F7EC] rounded-md transition-colors cursor-pointer"
                        title="WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AddLeadModal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
      />
    </div>
  );
};
