import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Mail,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { ResponsiveModal } from '@/components/common/ResponsiveModal';

interface ScheduleReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduled?: (schedule: any) => void;
}

export const ScheduleReportModal: React.FC<ScheduleReportModalProps> = ({
  isOpen,
  onClose,
  onScheduled,
}) => {
  const [formData, setFormData] = useState({
    reportType: 'Call Performance Report',
    frequency: 'Weekly',
    dayOfWeek: 'Monday',
    time: '09:00 AM',
    emailRecipients: 'management@atscallcenter.com',
    format: 'PDF',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onScheduled) {
      onScheduled(formData);
    }
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Automated Report"
      description="Set up recurring email delivery of operational reports"
      size="md"
    >
      {isSuccess ? (
        <div className="py-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
          <h4 className="text-base font-bold text-slate-900">Report Schedule Activated!</h4>
          <p className="text-xs text-slate-500">
            {formData.reportType} will be sent {formData.frequency.toLowerCase()} to {formData.emailRecipients}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 no-scrollbar scrollbar-none">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Select Report Template
            </label>
            <select
              value={formData.reportType}
              onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            >
              <option>Call Performance Report</option>
              <option>Sales & Conversion Summary</option>
              <option>Agent Activity & Leaderboard</option>
              <option>Campaign Reach & Auto-Dialer Stats</option>
              <option>Customer Retention & Support SLA</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Dispatch Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly (1st day)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Delivery Time (IST)
              </label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Recipient Email(s)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.emailRecipients}
                onChange={(e) => setFormData({ ...formData, emailRecipients: e.target.value })}
                placeholder="Separate multiple emails with commas"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Export File Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['PDF', 'Excel (XLSX)', 'CSV'].map((fmt) => (
                <button
                  type="button"
                  key={fmt}
                  onClick={() => setFormData({ ...formData, format: fmt })}
                  className={`py-2 text-xs font-bold rounded-xl border transition-colors ${
                    formData.format === fmt
                      ? 'border-[#0362FA] bg-blue-50 text-[#0362FA]'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#0362FA] hover:bg-[#0252D4] rounded-xl shadow-sm"
            >
              Schedule Delivery
            </button>
          </div>
        </form>
      )}
    </ResponsiveModal>
  );
};
