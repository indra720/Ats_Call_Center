import React, { useState } from 'react';
import { X, BookOpen, Sparkles, Image as ImageIcon, Tag, Check, AlertCircle } from 'lucide-react';
import { toast } from '@/store/toastStore';

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArticleCreated: (article: any) => void;
}

export const CreateArticleModal: React.FC<CreateArticleModalProps> = ({
  isOpen,
  onClose,
  onArticleCreated,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Getting Started');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');
  const [shortDesc, setShortDesc] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['guide', 'setup']);
  const [author] = useState('Kamlesh Kumar');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=300&fit=crop'
  );

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim().toLowerCase()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Getting Started':
        return 'bg-blue-50 text-[#0362FA]';
      case 'Calling & Telephony':
        return 'bg-emerald-50 text-[#13AB4A]';
      case 'Campaigns':
        return 'bg-amber-50 text-[#EF9612]';
      case 'Users & Roles':
        return 'bg-purple-50 text-purple-700';
      case 'Integrations':
        return 'bg-indigo-50 text-indigo-700';
      case 'Billing & Subscription':
        return 'bg-teal-50 text-teal-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Validation Error', 'Article title is required');
      return;
    }

    const newArticle = {
      id: Math.floor(Math.random() * 9000) + 100,
      title: title.trim(),
      category,
      categoryColor: getCategoryColor(category),
      status,
      views: '0',
      lastUpdated: 'Just now',
      author,
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&fit=crop',
      shortDesc: shortDesc.trim() || 'Knowledge base guide for users.',
      tags,
    };

    onArticleCreated(newArticle);
    toast.success('Article Created', `"${title}" has been saved as ${status}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Create Knowledge Base Article</h2>
              <p className="text-[11px] text-slate-500">Publish guides, documentation, or FAQs for agents & clients</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4 text-xs flex-1">
          {/* Article Title */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">
              Article Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. How to set up an IVR call flow?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0362FA] text-slate-800"
            />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0362FA] text-slate-800 bg-white"
              >
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
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">Publish Status</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('Published')}
                  className={`py-2 px-3 rounded-lg border text-center font-semibold transition-all ${
                    status === 'Published'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('Draft')}
                  className={`py-2 px-3 rounded-lg border text-center font-semibold transition-all ${
                    status === 'Draft'
                      ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-700">Summary / Excerpt</label>
              <span className="text-[10px] text-slate-400">{shortDesc.length}/200</span>
            </div>
            <textarea
              rows={2}
              maxLength={200}
              placeholder="Brief summary displayed on article preview cards..."
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#0362FA] text-slate-800"
            />
          </div>

          {/* Full Content */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-700">Article Content (Markdown supported)</label>
              <button
                type="button"
                onClick={() =>
                  setContent(
                    `### Overview\nStep-by-step instructions for completing this setup.\n\n1. Navigate to Settings.\n2. Click Configure.\n3. Save changes.`
                  )
                }
                className="text-[10px] text-[#0362FA] hover:underline flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3 h-3" /> Insert Template
              </button>
            </div>
            <textarea
              rows={5}
              placeholder="Write the full help article, walkthrough, or troubleshooting guide here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2.5 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:border-[#0362FA] text-slate-800 leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Tags (Press Enter to add)
            </label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 border border-slate-200 rounded-lg bg-slate-50/50">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-[#0362FA] border border-blue-200 flex items-center gap-1"
                >
                  <span>{t}</span>
                  <button type="button" onClick={() => removeTag(t)} className="text-blue-400 hover:text-blue-700">
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add tag and press Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="bg-transparent text-xs text-slate-700 focus:outline-none flex-1 min-w-[120px]"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-end gap-2.5 bg-[#F8FAFC]">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Create Article</span>
          </button>
        </div>
      </div>
    </div>
  );
};
