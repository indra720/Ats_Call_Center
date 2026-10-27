import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Archive,
  Eye,
  Plus,
  Search,
  ChevronDown,
  Filter,
  Edit2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { CreateArticleModal } from '../components/CreateArticleModal';
import { ArticlePreviewModal } from '../components/ArticlePreviewModal';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface ArticleItem {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  status: 'Published' | 'Draft' | 'Archived';
  views: string;
  lastUpdated: string;
  author: string;
  authorAvatar: string;
}

const ARTICLES_DATA: ArticleItem[] = [
  { id: 1, title: 'How to make a call in ATS Call Center?', category: 'Getting Started', categoryColor: 'bg-blue-50 text-[#0362FA]', status: 'Published', views: '1,248', lastUpdated: '20 Oct 2026', author: 'Kamlesh Kumar', authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
  { id: 2, title: 'Call recording and playback guide', category: 'Calling & Telephony', categoryColor: 'bg-emerald-50 text-[#13AB4A]', status: 'Published', views: '980', lastUpdated: '19 Oct 2026', author: 'Yashika Kanwar', authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
  { id: 3, title: 'How to create a campaign?', category: 'Campaigns', categoryColor: 'bg-amber-50 text-[#EF9612]', status: 'Draft', views: '756', lastUpdated: '18 Oct 2026', author: 'Aakash Sharma', authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
  { id: 4, title: 'How to add and manage agents?', category: 'Users & Roles', categoryColor: 'bg-purple-50 text-purple-700', status: 'Published', views: '642', lastUpdated: '18 Oct 2026', author: 'Sandeep Verma', authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop' },
  { id: 5, title: 'IVR and numbers setup guide', category: 'IVR & Numbers', categoryColor: 'bg-rose-50 text-rose-600', status: 'Published', views: '580', lastUpdated: '17 Oct 2026', author: 'Rohit Sharma', authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop' },
  { id: 6, title: 'WhatsApp integration setup', category: 'Integrations', categoryColor: 'bg-indigo-50 text-indigo-700', status: 'Published', views: '512', lastUpdated: '17 Oct 2026', author: 'Kamlesh Kumar', authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop' },
  { id: 7, title: 'Billing and subscription guide', category: 'Billing & Subscription', categoryColor: 'bg-teal-50 text-teal-700', status: 'Draft', views: '432', lastUpdated: '16 Oct 2026', author: 'Yashika Kanwar', authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
  { id: 8, title: 'Troubleshooting call connection issues', category: 'Troubleshooting', categoryColor: 'bg-amber-50 text-amber-700', status: 'Published', views: '398', lastUpdated: '16 Oct 2026', author: 'Aakash Sharma', authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
  { id: 9, title: 'How to view call analytics reports?', category: 'Reports & Analytics', categoryColor: 'bg-sky-50 text-sky-700', status: 'Published', views: '356', lastUpdated: '15 Oct 2026', author: 'Sandeep Verma', authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop' },
  { id: 10, title: 'Agent performance and monitoring', category: 'Performance', categoryColor: 'bg-rose-50 text-rose-700', status: 'Archived', views: '324', lastUpdated: '14 Oct 2026', author: 'Rohit Sharma', authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop' },
];

export const KnowledgeBasePage: React.FC = () => {
  const [articles, setArticles] = useState<ArticleItem[]>(ARTICLES_DATA);
  const [activeTab, setActiveTab] = useState<'all' | 'categories' | 'tags' | 'authors' | 'settings'>('all');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem>(ARTICLES_DATA[0]);
  const [selectedArticleForPreview, setSelectedArticleForPreview] = useState<ArticleItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedAuthor, setSelectedAuthor] = useState('All Authors');

  const filteredArticles = articles.filter((art) => {
    const matchSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'All Categories' || art.category === selectedCategory;
    const matchStatus = selectedStatus === 'All Status' || art.status === selectedStatus;
    const matchAuthor = selectedAuthor === 'All Authors' || art.author === selectedAuthor;
    return matchSearch && matchCat && matchStatus && matchAuthor;
  });

  return (
    <div className="space-y-4">
      {/* Create Article Modal */}
      <CreateArticleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onArticleCreated={(newArt) => {
          setArticles([newArt, ...articles]);
          setSelectedArticle(newArt);
        }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">Knowledge Base</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Knowledge Base</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create and manage help articles, guides and documentation for your team and customers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => toast.info('Public Help Center', 'Opening customer portal preview...')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>View Public Help Center</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Article</span>
          </button>
        </div>
      </div>

      {/* 5 Modern Responsive KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
        {/* Card 1: Total */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" /> 18%
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">248</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Total Articles</div>
          </div>
        </div>

        {/* Card 2: Published */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-[#E9F9EE] text-[#13AB4A] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" /> 22%
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">186</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Published Articles</div>
          </div>
        </div>

        {/* Card 3: Drafts */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#EF9612] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" /> 5%
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">32</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Draft Articles</div>
          </div>
        </div>

        {/* Card 4: Archived */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between min-w-0 group">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#871CF4] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Archive className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowDownRight className="w-3 h-3" /> 8%
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">30</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Archived Guides</div>
          </div>
        </div>

        {/* Card 5: Views */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between min-w-0 group col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between gap-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-0.5 whitespace-nowrap">
              <ArrowUpRight className="w-3 h-3" /> 35%
            </span>
          </div>
          <div className="mt-2.5 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">18,320</div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">Total Readers</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-600 overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { key: 'all', label: 'All Articles' },
          { key: 'categories', label: 'Categories' },
          { key: 'tags', label: 'Tags' },
          { key: 'authors', label: 'Authors' },
          { key: 'settings', label: 'Settings' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-2.5 transition-colors relative ${
              activeTab === tab.key
                ? 'text-[#0362FA] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0362FA]'
                : 'hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Section (~65%) | Right Article Details Panel (~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Section */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search articles by title, content or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#0362FA]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
              >
                <option>All Categories</option>
                <option>Getting Started</option>
                <option>Calling & Telephony</option>
                <option>Campaigns</option>
                <option>Users & Roles</option>
                <option>IVR & Numbers</option>
                <option>Integrations</option>
                <option>Billing & Subscription</option>
                <option>Troubleshooting</option>
                <option>Reports & Analytics</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
              >
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
              >
                <option>All Authors</option>
                <option>Kamlesh Kumar</option>
                <option>Yashika Kanwar</option>
                <option>Aakash Sharma</option>
                <option>Sandeep Verma</option>
                <option>Rohit Sharma</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedStatus('All Status');
                  setSelectedAuthor('All Authors');
                  toast.info('Filters Reset', 'Showing all knowledge base articles');
                }}
                className="text-[#0362FA] font-semibold hover:underline px-2"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table (Anti-Shrink) */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[850px] whitespace-nowrap">
                <thead>
                  <tr className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-[#E5EBF2]">
                    <th className="py-2.5 px-3 w-8"><input type="checkbox" className="rounded border-slate-300 text-[#0362FA]" /></th>
                    <th className="py-2.5 px-2 w-6 text-slate-400">#</th>
                    <th className="py-2.5 px-3">Title</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Views</th>
                    <th className="py-2.5 px-3">Last Updated</th>
                    <th className="py-2.5 px-3">Author</th>
                    <th className="py-2.5 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredArticles.map((art) => {
                    const isSelected = selectedArticle.id === art.id;
                    return (
                      <tr
                        key={art.id}
                        onClick={() => {
                          setSelectedArticle(art);
                          setSelectedArticleForPreview(art);
                        }}
                        className={`hover:bg-[#F0F7FF] transition-colors cursor-pointer group ${
                          isSelected ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-slate-300 text-[#0362FA]" />
                        </td>
                        <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">{art.id}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900 max-w-[220px] truncate group-hover:text-[#0362FA]">
                          {art.title}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${art.categoryColor}`}>
                            {art.category}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              art.status === 'Published'
                                ? 'bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200'
                                : art.status === 'Draft'
                                ? 'bg-amber-50 text-[#EF9612] border border-amber-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {art.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-slate-800 font-mono">{art.views}</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">{art.lastUpdated}</td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <img src={art.authorAvatar} alt={art.author} className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-slate-800 truncate">{art.author}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedArticle(art);
                                toast.info('Edit Article', `Loaded "${art.title}" into editor panel.`);
                              }}
                              title="Edit Article"
                              className="p-1 text-slate-400 hover:text-[#0362FA] rounded hover:bg-slate-100"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setSelectedArticleForPreview(art)}
                              title="View Article Reader"
                              className="p-1 text-slate-400 hover:text-[#0362FA] rounded hover:bg-slate-100"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <ActionMenu
                              align="right"
                              items={[
                                {
                                  label: 'Read Full Article',
                                  icon: <Eye className="w-3.5 h-3.5" />,
                                  onClick: () => setSelectedArticleForPreview(art),
                                },
                                {
                                  label: 'Edit in Panel',
                                  icon: <Edit2 className="w-3.5 h-3.5" />,
                                  onClick: () => {
                                    setSelectedArticle(art);
                                    toast.info('Editing Article', `"${art.title}" loaded in editor.`);
                                  },
                                },
                                {
                                  label: 'Copy Public Link',
                                  icon: <ExternalLink className="w-3.5 h-3.5" />,
                                  onClick: () => {
                                    navigator.clipboard?.writeText(`https://help.atscallcenter.in/articles/${art.id}`);
                                    toast.success('Link Copied', 'Public article URL copied to clipboard.');
                                  },
                                },
                                {
                                  label: art.status === 'Published' ? 'Change to Draft' : 'Publish Article',
                                  icon: <CheckCircle2 className="w-3.5 h-3.5" />,
                                  onClick: () => {
                                    const nextStatus = art.status === 'Published' ? 'Draft' : 'Published';
                                    setArticles((prev) =>
                                      prev.map((a) => (a.id === art.id ? { ...a, status: nextStatus } : a))
                                    );
                                    toast.success('Status Updated', `Article marked as ${nextStatus}.`);
                                  },
                                },
                                {
                                  label: 'Delete Article',
                                  icon: <X className="w-3.5 h-3.5" />,
                                  danger: true,
                                  onClick: () => {
                                    setArticles((prev) => prev.filter((a) => a.id !== art.id));
                                    toast.warning('Article Deleted', `"${art.title}" removed.`);
                                  },
                                },
                              ]}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#F8FAFC] border-t border-[#E5EBF2] flex items-center justify-between text-xs text-slate-600">
              <span>Showing 1 to 10 of 248 articles</span>
              <div className="flex items-center gap-1">
                <button className="p-1 border rounded bg-white"><ChevronLeft className="w-3 h-3" /></button>
                <button className="px-2.5 py-0.5 bg-[#0362FA] text-white font-bold rounded">1</button>
                <button className="px-2.5 py-0.5 bg-white border rounded">2</button>
                <button className="px-2.5 py-0.5 bg-white border rounded">3</button>
                <button className="px-2.5 py-0.5 bg-white border rounded">4</button>
                <button className="px-2.5 py-0.5 bg-white border rounded">5</button>
                <span className="px-1 text-slate-400">...</span>
                <button className="px-2.5 py-0.5 bg-white border rounded">25</button>
                <button className="p-1 border rounded bg-white"><ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
          </div>

          {/* Bottom 3 Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Top Categories */}
            <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Top Categories</h4>
                <a href="#/categories" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
              </div>
              <div className="space-y-1.5 text-xs">
                {[
                  { name: 'Getting Started', count: 52, views: '4,320' },
                  { name: 'Calling & Telephony', count: 48, views: '3,860' },
                  { name: 'Campaigns', count: 36, views: '2,940' },
                  { name: 'Integrations', count: 28, views: '1,680' },
                  { name: 'Users & Roles', count: 24, views: '1,240' },
                ].map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-slate-700">
                    <span className="truncate">{c.name}</span>
                    <span className="font-semibold text-slate-900 text-[11px] font-mono">{c.count} ({c.views})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Popular Articles</h4>
                <a href="#/popular" className="text-[11px] font-semibold text-[#0362FA] hover:underline">View All</a>
              </div>
              <div className="space-y-1.5 text-xs">
                {[
                  { title: 'How to make a call in ATS Call Center?', views: '1,248' },
                  { title: 'Call recording and playback guide', views: '980' },
                  { title: 'WhatsApp integration setup', views: '842' },
                  { title: 'How to create a campaign?', views: '756' },
                  { title: 'How to add and manage agents?', views: '642' },
                ].map((a, i) => (
                  <div key={i} className="flex justify-between items-center text-slate-700">
                    <span className="truncate max-w-[150px]">{a.title}</span>
                    <span className="font-bold text-[#0362FA] text-[11px] font-mono">{a.views}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-3.5 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Links</h4>
              <div className="space-y-1.5 text-xs">
                {[
                  { title: 'Create New Article', desc: 'Add a new help article', action: () => setIsCreateModalOpen(true) },
                  { title: 'Manage Categories', desc: 'Organize your content', action: () => toast.info('Categories', 'Category manager opened') },
                  { title: 'Manage Tags', desc: 'Create and edit tags', action: () => toast.info('Tags', 'Tag taxonomy manager opened') },
                  { title: 'Article Settings', desc: 'Configure article settings', action: () => toast.info('Settings', 'Knowledge base settings opened') },
                ].map((q, i) => (
                  <div
                    key={i}
                    onClick={q.action}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 text-[11px]">{q.title}</div>
                      <div className="text-[10px] text-slate-400">{q.desc}</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Article Details Slide Panel */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Article Details</h3>
            <button className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 block">Title</label>
            <input
              type="text"
              defaultValue={selectedArticle.title}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#0362FA]"
            />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Category</label>
              <select className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700">
                <option>{selectedArticle.category}</option>
                <option>Getting Started</option>
                <option>Calling & Telephony</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Status</label>
              <select className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700">
                <option>{selectedArticle.status}</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-700 block">Featured Image</label>
            <div className="relative rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=300&fit=crop"
                alt="Featured"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <button className="px-2 py-1 bg-white text-slate-700 rounded text-[10px] font-semibold shadow-xs">
                  Change Image
                </button>
                <button className="px-2 py-1 bg-rose-500 text-white rounded text-[10px] font-semibold shadow-xs">
                  Remove
                </button>
              </div>
            </div>
            <div className="text-[10px] text-slate-400">Recommended size: 1200 × 630 px</div>
          </div>

          {/* Short Description */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 block">Short Description</label>
            <textarea
              rows={3}
              defaultValue="Step by step guide to make a call using the ATS Call Center dashboard."
              className="w-full p-2 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed"
            />
            <div className="text-right text-[10px] text-slate-400">78/200</div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-700 block">Tags</label>
            <div className="flex flex-wrap items-center gap-1.5">
              {['call', 'outbound', 'basic'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 flex items-center gap-1">
                  <span>{t}</span>
                  <button className="text-slate-400 hover:text-slate-600">×</button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add tag..."
                className="px-2 py-0.5 text-[11px] border border-slate-200 rounded-full w-20 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={() => {
              toast.success('Article Updated', `Changes to "${selectedArticle.title}" saved successfully.`);
            }}
            className="w-full py-2 bg-[#0362FA] hover:bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
          >
            Update Article
          </button>
        </div>
      </div>

      {/* Article Full Preview Modal */}
      <ArticlePreviewModal
        isOpen={!!selectedArticleForPreview}
        article={selectedArticleForPreview}
        onClose={() => setSelectedArticleForPreview(null)}
        onEditArticle={(art) => {
          setSelectedArticle(art);
          setSelectedArticleForPreview(null);
          toast.info('Editing Article', `Loaded "${art.title}" in editor panel.`);
        }}
      />
    </div>
  );
};
