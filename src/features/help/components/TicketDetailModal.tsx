import React, { useState } from 'react';
import {
  X,
  Ticket,
  User,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  MessageSquare,
  Paperclip,
  ShieldAlert,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export interface TicketThreadItem {
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

interface TicketDetailModalProps {
  isOpen: boolean;
  ticket: TicketThreadItem | null;
  onClose: () => void;
  onStatusChange?: (ticketId: string, newStatus: TicketThreadItem['status']) => void;
}

interface MessageBubble {
  id: number;
  sender: 'customer' | 'agent' | 'system';
  name: string;
  time: string;
  text: string;
  avatar?: string;
}

export const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  isOpen,
  ticket,
  onClose,
  onStatusChange,
}) => {
  if (!isOpen || !ticket) return null;

  const [currentStatus, setCurrentStatus] = useState<TicketThreadItem['status']>(ticket.status);
  const [currentAssignee, setCurrentAssignee] = useState(ticket.assignedTo);
  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);

  const [messages, setMessages] = useState<MessageBubble[]>([
    {
      id: 1,
      sender: 'customer',
      name: ticket.customer,
      time: '2 hours ago',
      text: `Hello Support Team, we are having an urgent issue: "${ticket.subject}". Our calling queue appears to be timing out when agents pick up incoming calls from dialer trunks. Could you please investigate ASAP?`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop',
    },
    {
      id: 2,
      sender: 'system',
      name: 'System Automation',
      time: '1 hour 45 mins ago',
      text: `Ticket assigned automatically to ${ticket.assignedTo} under ${ticket.category} queue. Priority set to ${ticket.priority}.`,
    },
    {
      id: 3,
      sender: 'agent',
      name: ticket.assignedTo,
      time: '45 mins ago',
      text: `Hi ${ticket.customer}, thank you for reaching out. I have initiated SIP trunk diagnostics and reviewed the call signaling logs for your ATS account. I see two failed handshakes around 10:15 AM due to codec negotiation. We are restarting the relay listener now.`,
      avatar: ticket.assignedAvatar,
    },
  ]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: MessageBubble = {
      id: Date.now(),
      sender: isInternalNote ? 'system' : 'agent',
      name: isInternalNote ? `Internal Note by ${currentAssignee}` : currentAssignee,
      time: 'Just now',
      text: replyText.trim(),
      avatar: ticket.assignedAvatar,
    };

    setMessages([...messages, newMsg]);
    setReplyText('');
    toast.success(
      isInternalNote ? 'Internal Note Added' : 'Reply Sent to Customer',
      isInternalNote
        ? 'Visible to support team members only.'
        : `Email notification sent to ${ticket.customer}.`
    );
  };

  const handleStatusUpdate = (newSt: TicketThreadItem['status']) => {
    setCurrentStatus(newSt);
    if (onStatusChange) onStatusChange(ticket.ticketId, newSt);
    toast.success('Status Updated', `Ticket ${ticket.ticketId} marked as ${newSt}.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-[#0362FA]">{ticket.ticketId}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    ticket.priority === 'High'
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : ticket.priority === 'Medium'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  }`}
                >
                  {ticket.priority} Priority
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    currentStatus === 'Open'
                      ? 'bg-blue-50 text-[#0362FA]'
                      : currentStatus === 'In Progress'
                      ? 'bg-purple-50 text-purple-700'
                      : 'bg-[#E9F9EE] text-[#13AB4A]'
                  }`}
                >
                  {currentStatus}
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-900 mt-0.5 truncate max-w-md">{ticket.subject}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Metadata Strip */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <div>
              <span className="text-[10px] text-slate-400 block">Customer</span>
              <span className="font-semibold text-slate-800">{ticket.customer}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Category</span>
              <span className="font-semibold text-slate-700">{ticket.category}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Created On</span>
              <span className="text-slate-600 font-mono text-[11px]">{ticket.createdOn}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={currentStatus}
              onChange={(e) => handleStatusUpdate(e.target.value as any)}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
            >
              <option value="Open">Status: Open</option>
              <option value="In Progress">Status: In Progress</option>
              <option value="Resolved">Status: Resolved</option>
              <option value="Closed">Status: Closed</option>
            </select>

            <select
              value={currentAssignee}
              onChange={(e) => {
                setCurrentAssignee(e.target.value);
                toast.success('Agent Reassigned', `Ticket transferred to ${e.target.value}`);
              }}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
            >
              <option>Akash Sharma</option>
              <option>Yashika Kanwar</option>
              <option>Sandeep Verma</option>
              <option>Rohit Sharma</option>
            </select>
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white text-xs">
          {messages.map((m) => {
            if (m.sender === 'system') {
              return (
                <div key={m.id} className="flex items-center justify-center my-2">
                  <div className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#0362FA]" />
                    <span>{m.text}</span>
                    <span className="text-slate-400 font-mono text-[10px]">({m.time})</span>
                  </div>
                </div>
              );
            }

            const isAgent = m.sender === 'agent';
            return (
              <div
                key={m.id}
                className={`flex gap-3 items-start ${isAgent ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <img
                  src={m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop'}
                  alt={m.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                />
                <div className={`max-w-[80%] space-y-1 ${isAgent ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="font-bold text-slate-900">{m.name}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{m.time}</span>
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isAgent
                        ? 'bg-[#0362FA] text-white rounded-tr-xs text-left'
                        : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Composer */}
        <form onSubmit={handleSendReply} className="p-4 bg-[#F8FAFC] border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsInternalNote(false)}
                className={`px-2.5 py-1 rounded-md font-semibold text-[11px] transition-all ${
                  !isInternalNote ? 'bg-[#0362FA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Public Reply
              </button>
              <button
                type="button"
                onClick={() => setIsInternalNote(true)}
                className={`px-2.5 py-1 rounded-md font-semibold text-[11px] transition-all ${
                  isInternalNote ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Internal Note
              </button>
            </div>
            <span className="text-[11px] text-slate-400">
              {isInternalNote ? 'Only visible to staff' : `Customer will be notified via email & SMS`}
            </span>
          </div>

          <div className="relative">
            <textarea
              rows={3}
              placeholder={
                isInternalNote
                  ? 'Add internal notes, diagnostic steps, or handover instructions...'
                  : `Type your reply to ${ticket.customer}...`
              }
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full p-2.5 pr-12 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#0362FA] text-slate-800 bg-white"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="absolute right-2.5 bottom-3 p-2 rounded-lg bg-[#0362FA] hover:bg-blue-600 disabled:opacity-40 text-white transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
