import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Eye,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Edit2,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

export interface ArticlePreviewData {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  status: 'Published' | 'Draft' | 'Archived';
  views: string;
  lastUpdated: string;
  author: string;
  authorAvatar: string;
  shortDesc?: string;
  tags?: string[];
}

interface ArticlePreviewModalProps {
  isOpen: boolean;
  article: ArticlePreviewData | null;
  onClose: () => void;
  onEditArticle?: (article: ArticlePreviewData) => void;
}

export const ArticlePreviewModal: React.FC<ArticlePreviewModalProps> = ({
  isOpen,
  article,
  onClose,
  onEditArticle,
}) => {
  if (!isOpen || !article) return null;

  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  const handleFeedback = (type: 'yes' | 'no') => {
    setFeedbackGiven(type);
    toast.success('Feedback Recorded', 'Thank you for helping us improve our documentation!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${article.categoryColor}`}>
              {article.category}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                article.status === 'Published'
                  ? 'bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200'
                  : 'bg-amber-50 text-[#EF9612] border border-amber-200'
              }`}
            >
              {article.status}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (onEditArticle) onEditArticle(article);
                onClose();
              }}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Article</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success('Link Copied', 'Article URL copied to clipboard');
              }}
              className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
              title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-slate-800">
          {/* Article Title */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
              <div className="flex items-center gap-1.5">
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-semibold text-slate-700">{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Updated {article.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.views} views</span>
              </div>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="relative rounded-2xl overflow-hidden h-44 sm:h-56 bg-slate-900 border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&h=450&fit=crop"
              alt="Banner"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-semibold backdrop-blur-md bg-white/20 px-3 py-1 rounded-full">
                ATS Call Center Knowledge Base • Official Guide
              </span>
            </div>
          </div>

          {/* Article Excerpt */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-slate-700 leading-relaxed">
            <strong className="text-[#0362FA] block mb-1">Quick Overview:</strong>
            {article.shortDesc ||
              'This guide walks you step-by-step through configuring your telephony workstation, managing live agents, troubleshooting SIP endpoints, and generating analytical call reports in ATS Call Center.'}
          </div>

          {/* Formatted Guide Content */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 border-b border-slate-100 pb-1">
              1. Prerequisites & Access Privileges
            </h3>
            <p>
              Before proceeding, verify that your account has been granted the required role privileges
              (<code className="bg-slate-100 text-[#0362FA] px-1 py-0.5 rounded font-mono text-xs">calls:make</code> or{' '}
              <code className="bg-slate-100 text-[#0362FA] px-1 py-0.5 rounded font-mono text-xs">settings:manage</code>).
              Enterprise supervisors can grant these permissions via the Users & Roles panel.
            </p>

            <h3 className="text-sm sm:text-base font-bold text-slate-900 border-b border-slate-100 pb-1 pt-2">
              2. Step-by-Step Configuration Flow
            </h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Access Dashboard:</strong> Click the main navigation sidebar and select{' '}
                <em>Calling & Telephony &gt; Dialer</em>.
              </li>
              <li>
                <strong>Verify Active Trunk:</strong> Check that your WebRTC or SIP trunk status badge displays a green{' '}
                <span className="text-emerald-600 font-bold">Connected</span> pill.
              </li>
              <li>
                <strong>Assign Queue Routing:</strong> Direct inbound calls to your designated team skill group using
                the automated IVR rule builder.
              </li>
              <li>
                <strong>Save Changes:</strong> Click <em>Apply Configuration</em> to deploy updates instantly without downtime.
              </li>
            </ol>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Pro Tip:</strong> You can enable live AI call transcription and sentiment scoring under{' '}
                <em>AI & Automation &gt; AI Assistant</em> for automated compliance monitoring.
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-1">Tags:</span>
            {['telephony', 'getting-started', 'call-flow', 'webrtc', 'dlt-sms'].map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Feedback Section */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-slate-800">Was this article helpful to you?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleFeedback('yes')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                  feedbackGiven === 'yes'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Yes, thanks!</span>
              </button>
              <button
                onClick={() => handleFeedback('no')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                  feedbackGiven === 'no'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>Needs improvement</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
