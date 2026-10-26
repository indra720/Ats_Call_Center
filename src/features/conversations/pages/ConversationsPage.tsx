import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Smartphone,
  Search,
  Send,
  Paperclip,
  CheckCheck,
  Phone,
  MoreVertical,
  Smile,
  Bot,
} from 'lucide-react';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

export const ConversationsPage: React.FC = () => {
  const startCall = useUIStore((state) => state.startCall);
  const [activeChannel, setActiveChannel] = useState<'all' | 'whatsapp' | 'email' | 'sms'>('all');
  const [selectedChatId, setSelectedChatId] = useState('1');
  const [messageInput, setMessageInput] = useState('');

  const chatList = [
    {
      id: '1',
      name: 'Rohit Sharma',
      phone: '+91 98765 43210',
      company: 'Tech Solutions Pvt Ltd',
      channel: 'whatsapp',
      lastMessage: 'Sure, please share the commercial proposal for 25 agent seats.',
      time: '10:45 AM',
      unread: 2,
    },
    {
      id: '2',
      name: 'Priya Khanna',
      phone: '+91 91234 56789',
      company: 'Globex Corp',
      channel: 'email',
      lastMessage: 'Regarding our demo call scheduled for tomorrow 3 PM IST.',
      time: '09:30 AM',
      unread: 0,
    },
    {
      id: '3',
      name: 'Amit Jain',
      phone: '+91 99887 66554',
      company: 'Jain Traders',
      channel: 'whatsapp',
      lastMessage: 'Can you confirm if call recording complies with Indian regulations?',
      time: 'Yesterday',
      unread: 0,
    },
    {
      id: '4',
      name: 'Sunita Patel',
      phone: '+91 88776 55443',
      company: 'Patel Industries',
      channel: 'sms',
      lastMessage: 'OTP for verification is 482910. Valid for 10 minutes.',
      time: '2 days ago',
      unread: 0,
    },
  ];

  const activeChat = chatList.find((c) => c.id === selectedChatId) || chatList[0];

  const [messages, setMessages] = useState<{ id: string; sender: 'agent' | 'customer'; text: string; time: string }[]>([
    { id: 'm1', sender: 'customer', text: 'Hello, we are interested in ATS Call Center for our inbound sales team.', time: '10:30 AM' },
    { id: 'm2', sender: 'agent', text: 'Hi Rohit! Delighted to connect. How many agents will be taking calls concurrently?', time: '10:35 AM' },
    { id: 'm3', sender: 'customer', text: 'We have 25 sales reps, and we need IVR routing and WhatsApp automation.', time: '10:42 AM' },
    { id: 'm4', sender: 'customer', text: 'Sure, please share the commercial proposal for 25 agent seats.', time: '10:45 AM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        sender: 'agent',
        text: messageInput.trim(),
        time: 'Just now',
      },
    ]);
    setMessageInput('');
  };

  const filteredChats = chatList.filter((c) => {
    if (activeChannel === 'all') return true;
    return c.channel === activeChannel;
  });

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Unified Conversations Inbox
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Omni-channel messaging across WhatsApp Business, Email and SMS.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E5EBF2] self-start sm:self-auto">
          {[
            { id: 'all', label: 'All Messages', icon: MessageSquare },
            { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'text-emerald-600' },
            { id: 'email', label: 'Email', icon: Mail, color: 'text-blue-600' },
            { id: 'sms', label: 'SMS', icon: Smartphone, color: 'text-indigo-600' },
          ].map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id as any)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors',
                activeChannel === ch.id
                  ? 'bg-[#0362FA] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              )}
            >
              <ch.icon className="w-3.5 h-3.5" />
              <span>{ch.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Chat Layout (Split screen 2 columns) */}
      <div className="bg-white rounded-2xl border border-[#E5EBF2] shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Column: Chats List */}
        <div className="md:col-span-4 border-r border-[#E5EBF2] flex flex-col">
          <div className="p-3 border-b border-[#E5EBF2]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-lg text-slate-800 focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 no-scrollbar scrollbar-none">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={cn(
                  'p-3.5 flex items-start gap-3 cursor-pointer transition-colors',
                  selectedChatId === chat.id ? 'bg-blue-50/60' : 'hover:bg-slate-50'
                )}
              >
                <div className="relative">
                  <UserAvatar name={chat.name} size="sm" />
                  <span
                    className={cn(
                      'absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] text-white ring-2 ring-white',
                      chat.channel === 'whatsapp' && 'bg-[#10B981]',
                      chat.channel === 'email' && 'bg-[#0362FA]',
                      chat.channel === 'sms' && 'bg-[#871CF4]'
                    )}
                  >
                    {chat.channel === 'whatsapp' ? 'W' : chat.channel === 'email' ? 'E' : 'S'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{chat.name}</h4>
                    <span className="text-[10px] text-slate-400">{chat.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{chat.lastMessage}</p>
                </div>

                {chat.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#0362FA] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Conversation */}
        <div className="md:col-span-8 flex flex-col justify-between bg-[#F8FAFD]/50">
          {/* Chat Header */}
          <div className="p-3.5 bg-white border-b border-[#E5EBF2] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserAvatar name={activeChat.name} size="md" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>{activeChat.name}</span>
                  <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    Online on WhatsApp
                  </span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  {activeChat.company} • {activeChat.phone}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  startCall({
                    contactName: activeChat.name,
                    phoneNumber: activeChat.phone,
                    companyName: activeChat.company,
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Contact</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 no-scrollbar scrollbar-none">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'flex flex-col max-w-[70%]',
                  m.sender === 'agent' ? 'ml-auto items-end' : 'mr-auto items-start'
                )}
              >
                <div
                  className={cn(
                    'p-3 rounded-2xl text-xs shadow-2xs leading-relaxed',
                    m.sender === 'agent'
                      ? 'bg-[#0362FA] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-[#E5EBF2] rounded-bl-none'
                  )}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  {m.time}
                  {m.sender === 'agent' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#E5EBF2] flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMessageInput((prev) => prev + ' Hi, please find our ATS Call Center brochure attached.')}
              className="p-2 text-slate-400 hover:text-[#0362FA] rounded-lg hover:bg-slate-50"
              title="Insert WhatsApp Template"
            >
              <Bot className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Type your message or insert a template..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-xl text-slate-800 focus:outline-none focus:bg-white"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#0362FA] hover:bg-[#0252D4] text-white rounded-xl shadow-sm transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
