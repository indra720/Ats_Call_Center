import React, { useState } from 'react';
import {
  Copy,
  GitMerge,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Search,
  Filter,
  Phone,
  Mail,
  Building2,
  ArrowRight,
  Loader2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';
import { cn } from '@/lib/utils';

export const DuplicateLeadsPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [duplicateItems, setDuplicateItems] = useState([
    {
      id: 'd1',
      matchType: 'Exact Phone Match',
      confidence: '99%',
      leadA: {
        id: '1',
        name: 'Rohit Sharma',
        phone: '+91 98765 43210',
        email: 'rohit@techsolutions.com',
        company: 'Tech Solutions Pvt Ltd',
        created: '19 Oct 2026',
        source: 'Website',
      },
      leadB: {
        id: '101',
        name: 'R. Sharma',
        phone: '+91 98765 43210',
        email: 'rohit.s@gmail.com',
        company: 'Tech Solutions',
        created: '21 Oct 2026',
        source: 'Inbound Call',
      },
    },
    {
      id: 'd2',
      matchType: 'Exact Email Match',
      confidence: '95%',
      leadA: {
        id: '2',
        name: 'Priya Khanna',
        phone: '+91 91234 56789',
        email: 'priya@globex.in',
        company: 'Globex Corp',
        created: '15 Oct 2026',
        source: 'Google Ads',
      },
      leadB: {
        id: '102',
        name: 'Priya K',
        phone: '+91 98987 11223',
        email: 'priya@globex.in',
        company: 'Globex Inc',
        created: '20 Oct 2026',
        source: 'WhatsApp',
      },
    },
    {
      id: 'd3',
      matchType: 'Fuzzy Name + Company Match',
      confidence: '88%',
      leadA: {
        id: '3',
        name: 'Amit Jain',
        phone: '+91 99887 66554',
        email: 'amit@jaintraders.com',
        company: 'Jain Traders',
        created: '12 Oct 2026',
        source: 'Referral',
      },
      leadB: {
        id: '103',
        name: 'Amit Kumar Jain',
        phone: '+91 99887 00000',
        email: 'info@jaintraders.com',
        company: 'Jain Traders Pvt Ltd',
        created: '18 Oct 2026',
        source: 'Exhibition',
      },
    },
  ]);

  const handleRunScan = () => {
    setIsScanning(true);
    toast.info('Scan Started', 'Scanning 12,480 leads using exact phone, email and phonetic fuzzy matching...');

    setTimeout(() => {
      setIsScanning(false);
      toast.success(
        'Scan Finished',
        `Analyzed 12,480 database records. Identified ${duplicateItems.length} candidate duplicate groups.`
      );
    }, 1400);
  };

  const handleMerge = (item: typeof duplicateItems[0]) => {
    setDuplicateItems((prev) => prev.filter((d) => d.id !== item.id));
    toast.success(
      'Records Merged Successfully!',
      `Merged ${item.leadB.name} into primary account ${item.leadA.name} with unified call history.`
    );
  };

  const handleDismiss = (item: typeof duplicateItems[0]) => {
    setDuplicateItems((prev) => prev.filter((d) => d.id !== item.id));
    toast.info(
      'Marked as Unique',
      `Excluded ${item.leadA.name} and ${item.leadB.name} from future duplicate notifications.`
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Duplicate Leads & Merge Center
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Screen 017: AI detection of matching phone numbers, emails and cross-channel contact records.
          </p>
        </div>

        <button
          onClick={handleRunScan}
          disabled={isScanning}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-2 bg-[#0362FA] hover:bg-[#0252D4] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer',
            isScanning && 'opacity-80 cursor-wait'
          )}
        >
          {isScanning ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning 12,480 Leads...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run AI Deduplication Scan</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Potential Duplicates"
          value={duplicateItems.length.toString()}
          change={duplicateItems.length > 0 ? 'Needs Review' : 'All Clear'}
          changeType={duplicateItems.length > 0 ? 'negative' : 'positive'}
          timeframe="detected records"
          icon={<AlertTriangle className="w-4 h-4" />}
          iconBgColor="bg-[#FEF3E6] text-[#EF9612]"
          sparklineColor="bg-[#FDE68A]"
        />
        <StatCard
          title="Auto-Merged"
          value="142"
          change="99.4%"
          changeType="positive"
          timeframe="high confidence"
          icon={<CheckCircle2 className="w-4 h-4" />}
          iconBgColor="bg-[#E6F7EC] text-[#10B981]"
          sparklineColor="bg-[#A7F3D0]"
        />
        <StatCard
          title="Data Hygiene Score"
          value="98.2%"
          change="+1.4%"
          changeType="positive"
          timeframe="clean database"
          icon={<GitMerge className="w-4 h-4" />}
          iconBgColor="bg-[#EBF3FE] text-[#0362FA]"
          sparklineColor="bg-[#B0D2FB]"
        />
        <StatCard
          title="Rules Active"
          value="4 Rules"
          change="Phone/Email"
          changeType="neutral"
          timeframe="matching criteria"
          icon={<Copy className="w-4 h-4" />}
          iconBgColor="bg-[#F3E8FF] text-[#871CF4]"
          sparklineColor="bg-[#DDD6FE]"
        />
      </div>

      {/* Scanning status banner */}
      {isScanning && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between text-xs text-blue-900 animate-pulse">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-[#0362FA] animate-spin" />
            <span className="font-semibold">
              Deep indexing database records across 12,480 contact rows...
            </span>
          </div>
          <span className="text-[11px] font-mono text-blue-700">Matching algorithm v2.4</span>
        </div>
      )}

      {/* 3. Duplicates List / Cards */}
      <div className="space-y-3">
        {duplicateItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5EBF2] p-8 text-center space-y-3 shadow-card">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No Pending Duplicates</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              All duplicate candidates have been resolved or confirmed unique. Run another scan any time.
            </p>
            <button
              onClick={handleRunScan}
              className="px-3.5 py-1.5 bg-[#0362FA] text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Scan Again
            </button>
          </div>
        ) : (
          duplicateItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E5EBF2] p-4 shadow-card space-y-3 transition-all hover:border-slate-300"
            >
              {/* Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    {item.matchType}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    Confidence: <span className="text-[#0362FA]">{item.confidence}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDismiss(item)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Keep Separate
                  </button>
                  <button
                    onClick={() => handleMerge(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#0362FA] hover:bg-[#0252D4] rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <GitMerge className="w-3.5 h-3.5" />
                    <span>Merge into Primary</span>
                  </button>
                </div>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Lead A */}
                <div className="bg-[#F8FAFD] rounded-xl p-3 border border-blue-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#0362FA] uppercase tracking-wider bg-blue-100/60 px-2 py-0.5 rounded">
                      Primary Record (Older)
                    </span>
                    <span className="text-[11px] text-slate-400">Created: {item.leadA.created}</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900">{item.leadA.name}</h4>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-mono text-[11px] font-semibold text-slate-800 whitespace-nowrap">
                        {item.leadA.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-mono text-[11px] truncate">{item.leadA.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.leadA.company}</span>
                    </div>
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Source:</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0362FA] whitespace-nowrap">
                      {item.leadA.source}
                    </span>
                  </div>
                </div>

                {/* Lead B */}
                <div className="bg-white rounded-xl p-3 border border-amber-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Duplicate Candidate (Newer)
                    </span>
                    <span className="text-[11px] text-slate-400">Created: {item.leadB.created}</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900">{item.leadB.name}</h4>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-mono text-[11px] font-semibold text-slate-800 whitespace-nowrap">
                        {item.leadB.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-mono text-[11px] truncate">{item.leadB.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{item.leadB.company}</span>
                    </div>
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Source:</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 whitespace-nowrap">
                      {item.leadB.source}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
