import React, { useState } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
} from 'lucide-react';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';
import { toast } from '@/store/toastStore';

interface ImportLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete?: (count: number) => void;
}

export const ImportLeadsModal: React.FC<ImportLeadsModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [duplicateMode, setDuplicateMode] = useState<'skip' | 'update' | 'create'>('skip');
  const [defaultSource, setDefaultSource] = useState('Website Ingestion');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleStartImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      if (onImportComplete) {
        onImportComplete(150);
      }
      setTimeout(() => {
        setIsDone(false);
        setFile(null);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Leads (CSV / Excel)"
      description="Bulk upload leads, contacts and phone numbers into ATS Call Center"
      size="lg"
    >
      {isDone ? (
        <div className="py-10 text-center space-y-3">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
          <h4 className="text-lg font-bold text-slate-900">Bulk Import Completed!</h4>
          <p className="text-xs text-slate-500">
            Successfully imported and parsed 150 lead records into your pipeline.
          </p>
        </div>
      ) : (
        <div className="space-y-4 no-scrollbar scrollbar-none">
          {/* Drag & Drop File Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-[#CBD5E1] hover:border-[#0362FA] rounded-2xl p-6 text-center bg-[#F8FAFD] transition-colors cursor-pointer"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.csv, .xlsx, .xls';
              input.onchange = (e: any) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              };
              input.click();
            }}
          >
            <UploadCloud className="w-10 h-10 text-[#0362FA] mx-auto mb-2" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">
              {file ? file.name : 'Click to upload or drag & drop CSV file'}
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports CSV, XLSX up to 25MB (Max 50,000 rows per file)
            </p>

            {file && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200">
                <FileSpreadsheet className="w-4 h-4" />
                <span>{(file.size / 1024).toFixed(1)} KB</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="p-0.5 hover:text-rose-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Sample template link */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-slate-700">Need the correct column format?</span>
            </div>
            <button
              type="button"
              onClick={() =>
                toast.success('Download Started', 'sample_leads_template.csv downloaded.')
              }
              className="flex items-center gap-1 text-xs font-bold text-[#0362FA] hover:underline cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Sample CSV</span>
            </button>
          </div>

          {/* Import Settings */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-[#4E6178] uppercase tracking-wider block">
              Duplicate Detection & Mapping
            </span>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                How should duplicate phone numbers or emails be handled?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'skip', label: 'Skip duplicates', desc: 'Recommended: Ignore rows matching existing numbers' },
                  { id: 'update', label: 'Update existing', desc: 'Overwrite data for matching phone numbers' },
                  { id: 'create', label: 'Import all', desc: 'Create new lead even if duplicate exists' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-colors block ${
                      duplicateMode === opt.id
                        ? 'border-[#0362FA] bg-blue-50/60 ring-1 ring-[#0362FA]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="duplicateMode"
                      value={opt.id}
                      checked={duplicateMode === opt.id}
                      onChange={() => setDuplicateMode(opt.id as any)}
                      className="sr-only"
                    />
                    <div className="text-xs font-bold text-slate-800">{opt.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{opt.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Default Lead Source Tag
              </label>
              <select
                value={defaultSource}
                onChange={(e) => setDefaultSource(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              >
                <option>Website Ingestion</option>
                <option>CSV Bulk Upload</option>
                <option>Google Ads Export</option>
                <option>Facebook Leads Center</option>
                <option>Exhibition / Event List</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleStartImport}
              className="px-5 py-2 text-xs font-bold text-white bg-[#0362FA] hover:bg-[#0252D4] rounded-xl shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{isProcessing ? 'Processing File...' : 'Upload & Start Import'}</span>
            </button>
          </div>
        </div>
      )}
    </ResponsiveModal>
  );
};
