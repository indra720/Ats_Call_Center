import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Play,
  Check,
  ChevronDown,
  Sparkles,
  Phone,
  Users,
  Target,
  BarChart3,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { toast } from '@/store/toastStore';

interface TemplateItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  type: string;
  format: string;
  useCase: string;
  icon: any;
  color: string;
}

export const ReportTemplatesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('call-performance');
  const [format, setFormat] = useState('PDF');
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const templates: TemplateItem[] = [
    {
      id: 'call-performance',
      title: 'Call Center Performance Report',
      desc: 'Complete overview of call center performance including call volume, agent metrics, and conversions.',
      category: 'Call Reports',
      type: 'Comprehensive',
      format: 'PDF, Excel',
      useCase: 'Management Review, Performance Monitoring',
      icon: Phone,
      color: 'bg-blue-50 text-[#0362FA]',
    },
    {
      id: 'agent-performance',
      title: 'Agent Performance Report',
      desc: 'Individual and team performance metrics with detailed agent analytics.',
      category: 'Agent Reports',
      type: 'Operational',
      format: 'PDF, Excel, CSV',
      useCase: 'Team Reviews, Incentive Calculation',
      icon: Users,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'campaign-analysis',
      title: 'Campaign Analysis Report',
      desc: 'Campaign-wise performance, conversion rates and ROI analysis.',
      category: 'Campaign Reports',
      type: 'Analytical',
      format: 'PDF, Excel',
      useCase: 'Campaign Optimization, Budget Allocation',
      icon: Target,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'call-volume',
      title: 'Call Volume Trend Report',
      desc: 'Detailed call volume analysis with trends and hourly peak patterns.',
      category: 'Call Reports',
      type: 'Trend Analysis',
      format: 'PDF, CSV',
      useCase: 'Staffing Forecast, Capacity Planning',
      icon: BarChart3,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'lead-conversion',
      title: 'Lead Conversion Report',
      desc: 'Lead to customer conversion analysis and drop-off funnel performance.',
      category: 'Performance Reports',
      type: 'Funnel Analysis',
      format: 'PDF, Excel',
      useCase: 'Pipeline Audit, Stage Optimization',
      icon: Sparkles,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      id: 'ivr-performance',
      title: 'IVR Performance Report',
      desc: 'IVR call flow analysis with drop-off rates and completion metrics.',
      category: 'Call Reports',
      type: 'Technical Audit',
      format: 'PDF, Excel',
      useCase: 'Telephony Tuning, Menu Optimization',
      icon: Phone,
      color: 'bg-teal-50 text-teal-600',
    },
    {
      id: 'missed-calls',
      title: 'Missed Calls Report',
      desc: 'Analysis of missed calls with reasons and follow-up callback status.',
      category: 'Call Reports',
      type: 'Exceptions Log',
      format: 'PDF, Excel, CSV',
      useCase: 'SLA Tracking, Customer Recovery',
      icon: Clock,
      color: 'bg-red-50 text-red-600',
    },
    {
      id: 'call-duration',
      title: 'Call Duration Analysis',
      desc: 'Call duration distribution and talk time analysis across agents.',
      category: 'Performance Reports',
      type: 'Productivity',
      format: 'PDF, Excel',
      useCase: 'AHT Optimization, Coaching Needs',
      icon: Clock,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      id: 'customer-feedback',
      title: 'Customer Feedback Report',
      desc: 'Customer satisfaction scores (CSAT), NPS and sentiment feedback analysis.',
      category: 'Customer Reports',
      type: 'Quality & CSAT',
      format: 'PDF, Excel',
      useCase: 'Customer Success, Service Improvement',
      icon: MessageSquare,
      color: 'bg-sky-50 text-sky-600',
    },
  ];

  const filteredTemplates = templates.filter((t) => {
    if (selectedCategory !== 'All Templates' && t.category !== selectedCategory) return false;
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  const handleUseTemplate = (t: TemplateItem) => {
    setSelectedTemplateId(t.id);
    toast.success('Template Selected', `Configuring generator for "${t.title}".`);
  };

  const handleGenerate = () => {
    toast.success('Report Generated', `Generated "${selectedTemplate.title}" in ${format} format.`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">🏠</span>
            <span>Reports & Analytics</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Report Templates</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Report Templates</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Use pre-built templates to quickly generate reports for your call center operations.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-60 focus:outline-hidden focus:border-[#0362FA]"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5EBF2] pb-1 overflow-x-auto whitespace-nowrap">
        {[
          'All Templates',
          'Call Reports',
          'Agent Reports',
          'Campaign Reports',
          'Customer Reports',
          'Performance Reports',
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              selectedCategory === cat ? 'bg-[#EBF3FE] text-[#0362FA]' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid & Customize Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Templates Grid (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>⭐</span> Popular Templates ({filteredTemplates.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredTemplates.map((t) => {
              const isSelected = selectedTemplateId === t.id;
              const Icon = t.icon;
              return (
                <div
                  key={t.id}
                  onClick={() => handleUseTemplate(t)}
                  className={`bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 relative ${
                    isSelected ? 'border-[#0362FA] ring-2 ring-blue-100' : 'border-[#E5EBF2] hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-lg ${t.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                        {t.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{t.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{t.desc}</p>
                  </div>

                  {/* Thumbnail Mock Chart */}
                  <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex items-end justify-between h-14 px-2">
                    {[40, 65, 50, 85, 70, 95].map((h, idx) => (
                      <div key={idx} className="w-2 bg-[#B0D2FB] rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseTemplate(t);
                    }}
                    className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-[#0362FA] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Use Template'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Template Preview & Customizer (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Template Preview</h3>
            <p className="text-[11px] text-slate-400">Selected template configuration and parameters.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg ${selectedTemplate.color} flex items-center justify-center`}>
                <selectedTemplate.icon className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">{selectedTemplate.title}</h4>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">{selectedTemplate.desc}</p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">Category</span>
                <span className="font-semibold text-slate-800">{selectedTemplate.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Report Type</span>
                <span className="font-semibold text-slate-800">{selectedTemplate.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Default Format</span>
                <span className="font-semibold text-slate-800">{selectedTemplate.format}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Typical Use</span>
                <span className="font-semibold text-slate-800">{selectedTemplate.useCase.split(',')[0]}</span>
              </div>
            </div>
          </div>

          {/* Customize Template Form */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customize Template</h4>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Report Name</label>
              <input
                type="text"
                defaultValue={selectedTemplate.title}
                className="w-full text-xs border border-slate-200 rounded-lg p-2 font-medium text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700"
                >
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Last Quarter">Last Quarter</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium text-slate-700"
                >
                  <option value="PDF">PDF</option>
                  <option value="Excel">Excel (.xlsx)</option>
                  <option value="CSV">CSV</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">Include Sections</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  'Executive Summary',
                  'Call Volume & Trends',
                  'Agent Performance',
                  'Campaign Performance',
                  'Call Type Distribution',
                  'Call Duration Analysis',
                  'Conversion Metrics',
                  'Detailed Data Tables',
                ].map((sec, i) => (
                  <label key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#0362FA]" />
                    <span className="truncate">{sec}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => toast.info('Preview Opened', `Rendering test export of ${selectedTemplate.title}`)}
                className="flex-1 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 py-2 bg-[#0362FA] text-white rounded-lg text-xs font-semibold hover:bg-blue-600 shadow-sm flex items-center justify-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
