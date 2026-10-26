import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  MessageSquare,
  Zap,
  CheckCircle2,
  Sliders,
  Send,
  Volume2,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { cn } from '@/lib/utils';

export const AIAssistantPage: React.FC = () => {
  const [promptInput, setPromptInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    {
      role: 'ai',
      text: 'Hello! I am your ATS AI Call Center Copilot. I analyze live calls, generate real-time objection handlers, recommend next follow-up dates, and draft WhatsApp summaries automatically.',
    },
    {
      role: 'user',
      text: 'Give me a summary of today\'s call performance and which leads should be prioritized for follow-up.',
    },
    {
      role: 'ai',
      text: 'Based on 892 connected calls today: \n1. Rohit Sharma (Tech Solutions) requested commercial proposal for 25 agent seats (Priority: High, Estimated: ₹85,000).\n2. Priya Khanna (Globex Corp) requested demo reschedule to tomorrow 3 PM.\n3. Sunita Patel (Patel Industries) had 85% positive sentiment score on enterprise pricing.\n\nRecommendation: Send WhatsApp brochure to Rohit Sharma before 3 PM today.',
    },
  ]);

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    const userText = promptInput.trim();
    setMessages([
      ...messages,
      { role: 'user', text: userText },
      {
        role: 'ai',
        text: `Analysis complete for: "${userText}". All related call recordings, CRM transcripts and agent notes have been indexed.`,
      },
    ]);
    setPromptInput('');
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
            <span>ATS AI Call Assistant & Copilot</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#871CF4] text-white">
              AI V3.8
            </span>
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time speech-to-text intelligence, dynamic objection suggestions and automated call transcription.
          </p>
        </div>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="AI Transcribed Calls"
          value="1,284"
          change="100% Rate"
          changeType="positive"
          timeframe="real-time Whisper V3"
          icon={<Brain className="w-4 h-4 text-[#871CF4]" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
        <StatCard
          title="Objection Hints Used"
          value="482 Times"
          change="88% Help"
          changeType="positive"
          timeframe="accepted by agents"
          icon={<Sparkles className="w-4 h-4 text-[#0362FA]" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Sentiment Accuracy"
          value="94.6%"
          change="+1.8%"
          changeType="positive"
          timeframe="positive / negative"
          icon={<CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Avg Latency"
          value="240 ms"
          change="Ultra-fast"
          changeType="positive"
          timeframe="streaming transcription"
          icon={<Zap className="w-4 h-4 text-[#EF9612]" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
      </div>

      {/* 3. Interactive AI Console */}
      <div className="bg-white rounded-2xl border border-[#E5EBF2] shadow-card overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-3.5 border-b border-[#E5EBF2] bg-[#F8FAFD] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#871CF4]" />
            <h3 className="text-xs font-bold text-slate-900">AI Intelligence Chat & Query Terminal</h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Model Online (Gemini 2.5 Flash Telephony)
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 no-scrollbar scrollbar-none bg-[#FDFEFE]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={cn(
                'flex gap-3 max-w-[85%]',
                m.role === 'user' ? 'ml-auto flex-row-reverse' : ''
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs',
                  m.role === 'ai' ? 'bg-[#871CF4]' : 'bg-[#0362FA]'
                )}
              >
                {m.role === 'ai' ? <Sparkles className="w-4 h-4" /> : 'You'}
              </div>

              <div
                className={cn(
                  'p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs whitespace-pre-line',
                  m.role === 'ai'
                    ? 'bg-white text-slate-800 border border-[#E5EBF2]'
                    : 'bg-[#0362FA] text-white'
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleSendPrompt} className="p-3.5 bg-white border-t border-[#E5EBF2] flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask AI Assistant anything about calls, lead scores, or agent coaching tips..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs bg-[#F8FAFD] border border-[#E5EBF2] rounded-xl text-slate-800 focus:outline-none focus:bg-white"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#871CF4] hover:bg-[#7215D1] text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Generate</span>
          </button>
        </form>
      </div>
    </div>
  );
};
