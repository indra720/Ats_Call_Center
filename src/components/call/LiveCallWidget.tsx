import React, { useEffect } from 'react';
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Pause,
  Play,
  Disc,
  Maximize2,
  Minimize2,
  Sparkles,
  Bot,
  FileText,
  MessageSquare,
  Volume2,
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { usePermission } from '@/hooks/usePermission';
import { cn } from '@/lib/utils';

export const LiveCallWidget: React.FC = () => {
  const activeCall = useUIStore((state) => state.activeCall);
  const endCall = useUIStore((state) => state.endCall);
  const toggleMute = useUIStore((state) => state.toggleMute);
  const toggleHold = useUIStore((state) => state.toggleHold);
  const toggleRecording = useUIStore((state) => state.toggleRecording);
  const toggleCallExpanded = useUIStore((state) => state.toggleCallExpanded);
  const tickCallDuration = useUIStore((state) => state.tickCallDuration);
  const { can } = usePermission();

  // Tick call timer every second
  useEffect(() => {
    if (!activeCall.isActive) return;
    const interval = setInterval(() => {
      tickCallDuration();
    }, 1000);
    return () => clearInterval(interval);
  }, [activeCall.isActive, tickCallDuration]);

  if (!activeCall.isActive || !can('calls:make')) return null;

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <>
      {/* 1. Minimized Floating Banner (Above Bottom Bar on Mobile, Bottom Right on Desktop) */}
      {!activeCall.isExpanded && (
        <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-auto md:right-36 z-40 max-w-md animate-in slide-in-from-bottom duration-200">
          <div
            onClick={toggleCallExpanded}
            className="cursor-pointer bg-gradient-to-r from-navy-900 via-navy-800 to-navy-950 text-white p-3 rounded-2xl shadow-float border border-emerald-500/40 flex items-center justify-between gap-3 backdrop-blur-lg"
          >
            {/* Live Indicator + Contact */}
            <div className="flex items-center gap-2.5 truncate">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <PhoneCall className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-white truncate">
                    {activeCall.contactName || 'Rohit Sharma'}
                  </span>
                  <span className="font-mono text-[11px] text-emerald-300 font-semibold">
                    {formatDuration(activeCall.durationSeconds)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-300 truncate block">
                  {activeCall.companyName || 'Tech Solutions Pvt Ltd'}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={toggleMute}
                className={cn(
                  'p-2 rounded-xl text-xs transition-colors',
                  activeCall.isMuted
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-white/10 text-white hover:bg-white/20'
                )}
                title={activeCall.isMuted ? 'Unmute' : 'Mute'}
              >
                {activeCall.isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={toggleHold}
                className={cn(
                  'p-2 rounded-xl text-xs transition-colors',
                  activeCall.isOnHold
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-white/10 text-white hover:bg-white/20'
                )}
                title={activeCall.isOnHold ? 'Resume' : 'Hold'}
              >
                {activeCall.isOnHold ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={endCall}
                className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow transition-colors ml-1"
                title="End Call"
              >
                <PhoneOff className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleCallExpanded}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                title="Expand AI Assistant"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Full-Screen / Modal Expanded Live Call with AI Copilot Panel */}
      {activeCall.isExpanded && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200">
            {/* Left Column: Live Call Stage */}
            <div className="w-full md:w-5/12 bg-navy-950 text-white p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Top Controls */}
              <div className="flex items-center justify-between z-10">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Call
                </span>

                <button
                  onClick={toggleCallExpanded}
                  className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Contact Profile in Call */}
              <div className="my-auto text-center py-6 z-10">
                <div className="relative inline-block mx-auto mb-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl shadow-float">
                    {activeCall.contactName.charAt(0) || 'R'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-2 bg-emerald-500 text-white rounded-full shadow-md">
                    <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {activeCall.contactName || 'Rohit Sharma'}
                </h2>
                <p className="text-xs text-brand-300 font-medium mt-0.5">
                  {activeCall.companyName || 'Tech Solutions Pvt Ltd'}
                </p>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  {activeCall.phoneNumber || '+91 98765 43210'}
                </p>

                <div className="mt-4 font-mono text-3xl font-extrabold text-emerald-400 tracking-wider">
                  {formatDuration(activeCall.durationSeconds)}
                </div>
              </div>

              {/* Call Control Strip */}
              <div className="space-y-4 z-10">
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={toggleMute}
                    className={cn(
                      'p-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-semibold transition-all',
                      activeCall.isMuted
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    )}
                  >
                    {activeCall.isMuted ? <MicOff className="w-5 h-5 text-rose-400" /> : <Mic className="w-5 h-5" />}
                    <span>{activeCall.isMuted ? 'Muted' : 'Mute'}</span>
                  </button>

                  <button
                    onClick={toggleHold}
                    className={cn(
                      'p-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-semibold transition-all',
                      activeCall.isOnHold
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    )}
                  >
                    {activeCall.isOnHold ? <Play className="w-5 h-5 text-amber-400" /> : <Pause className="w-5 h-5" />}
                    <span>{activeCall.isOnHold ? 'Resume' : 'Hold'}</span>
                  </button>

                  <button
                    onClick={toggleRecording}
                    className={cn(
                      'p-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-semibold transition-all',
                      activeCall.isRecording
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    )}
                  >
                    <Disc className={cn('w-5 h-5', activeCall.isRecording && 'animate-spin text-emerald-400')} />
                    <span>{activeCall.isRecording ? 'Rec On' : 'Record'}</span>
                  </button>
                </div>

                <button
                  onClick={endCall}
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all text-sm"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Live Call</span>
                </button>
              </div>
            </div>

            {/* Right Column: AI Copilot & Live Transcript Panel */}
            <div className="w-full md:w-7/12 bg-white flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-brand-100 text-brand-700 rounded-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">ATS AI Assistant & Copilot</h4>
                    <p className="text-[11px] text-slate-500">Real-time coaching & dynamic suggestions</p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  AI Active
                </span>
              </div>

              {/* Content Panels */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* AI Coaching Prompt */}
                <div className="bg-gradient-to-br from-brand-50 to-indigo-50/60 p-3.5 rounded-2xl border border-brand-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-800">
                    <Bot className="w-3.5 h-3.5 text-brand-600" />
                    <span>Suggested Next Responses</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeCall.aiSuggestions.map((sugg, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-white rounded-xl text-xs text-slate-700 font-medium border border-brand-200/50 shadow-2xs hover:border-brand-400 cursor-pointer transition-colors"
                      >
                        💡 {sugg}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Transcript Stream */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                      Live Audio Transcript
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Whisper AI v3</span>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {activeCall.liveTranscript.map((t, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'p-2.5 rounded-xl text-xs space-y-1',
                          t.speaker === 'Agent'
                            ? 'bg-blue-50/70 border border-blue-100 ml-4'
                            : 'bg-slate-50 border border-slate-100 mr-4'
                        )}
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className={t.speaker === 'Agent' ? 'text-brand-700' : 'text-slate-700'}>
                            {t.speaker}
                          </span>
                          <span className="text-slate-400 font-mono">{t.time}</span>
                        </div>
                        <p className="text-slate-800">{t.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call Notes */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Disposition / In-Call Notes</span>
                  </div>
                  <textarea
                    value={activeCall.callNotes}
                    onChange={(e) => useUIStore.getState().setCallNotes(e.target.value)}
                    rows={3}
                    placeholder="Type key takeaway notes during the call..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 text-slate-800 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
