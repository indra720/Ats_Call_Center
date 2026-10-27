import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Receipt,
  Mail,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  CreditCard,
  Building2,
  X,
  Printer,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface Invoice {
  id: string;
  invoiceNo: string;
  issueDate: string;
  dueDate: string;
  description: string;
  plan: string;
  subtotal: number;
  gst: number;
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod: string;
}

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNo: 'INV-2026-1001',
    issueDate: '01 Oct 2026',
    dueDate: '15 Oct 2026',
    description: 'Enterprise AI Calling & CRM (40 Seats + 100k Mins)',
    plan: 'Enterprise',
    subtotal: 39999,
    gst: 7199.82,
    total: 47198.82,
    status: 'Paid',
    paymentMethod: 'HDFC Corp Credit Card (•••• 4921)',
  },
  {
    id: 'inv-2',
    invoiceNo: 'INV-2026-0901',
    issueDate: '01 Sep 2026',
    dueDate: '15 Sep 2026',
    description: 'Enterprise AI Calling & CRM (40 Seats + 100k Mins)',
    plan: 'Enterprise',
    subtotal: 39999,
    gst: 7199.82,
    total: 47198.82,
    status: 'Paid',
    paymentMethod: 'HDFC Corp Credit Card (•••• 4921)',
  },
  {
    id: 'inv-3',
    invoiceNo: 'INV-2026-0801',
    issueDate: '01 Aug 2026',
    dueDate: '15 Aug 2026',
    description: 'Professional AI Calling (20 Seats + 50k Mins)',
    plan: 'Professional',
    subtotal: 19999,
    gst: 3599.82,
    total: 23598.82,
    status: 'Paid',
    paymentMethod: 'Auto-Debit UPI (ats@icici)',
  },
  {
    id: 'inv-4',
    invoiceNo: 'INV-2026-0701',
    issueDate: '01 Jul 2026',
    dueDate: '15 Jul 2026',
    description: 'Professional AI Calling (20 Seats + 50k Mins)',
    plan: 'Professional',
    subtotal: 19999,
    gst: 3599.82,
    total: 23598.82,
    status: 'Paid',
    paymentMethod: 'Auto-Debit UPI (ats@icici)',
  },
  {
    id: 'inv-5',
    invoiceNo: 'INV-2026-0601',
    issueDate: '01 Jun 2026',
    dueDate: '15 Jun 2026',
    description: 'Starter AI Calling Pilot (10 Seats)',
    plan: 'Starter',
    subtotal: 7999,
    gst: 1439.82,
    total: 9438.82,
    status: 'Paid',
    paymentMethod: 'Razorpay NetBanking (SBI)',
  },
  {
    id: 'inv-6',
    invoiceNo: 'INV-2026-1101-DRAFT',
    issueDate: '27 Oct 2026',
    dueDate: '05 Nov 2026',
    description: 'Upcoming November Renewal + Add-on VoIP Trunks',
    plan: 'Enterprise',
    subtotal: 42499,
    gst: 7649.82,
    total: 50148.82,
    status: 'Pending',
    paymentMethod: 'Scheduled Auto-Debit (01 Nov 2026)',
  },
];

export const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Billing & Plan</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Invoices & Tax Receipts</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Invoices & Tax Receipts</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Download GST-compliant tax invoices, credit notes, and view breakdown of telephony usage charges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.info('Exporting Tax Summary', 'Downloading consolidated FY 2026-27 statement')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-[#E5EBF2] rounded-lg hover:bg-slate-50 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export FY Summary</span>
          </button>
          <button
            onClick={() => toast.success('GST Details Verified', 'GSTIN: 07AABCA1234F1Z8 is linked to all invoices')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Tax GSTIN: 07AABC...</span>
          </button>
        </div>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Total Paid (FY 26-27)</span>
            <div className="text-xl font-bold text-slate-900 mt-1">₹1,50,935</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span>↑ 5 Invoices Cleared</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Upcoming Renewal</span>
            <div className="text-xl font-bold text-slate-900 mt-1">₹50,148</div>
            <div className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
              <span>Due on 05 Nov 2026</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">GST ITC Available (18%)</span>
            <div className="text-xl font-bold text-slate-900 mt-1">₹23,039</div>
            <div className="text-[11px] text-[#0362FA] font-semibold mt-1 flex items-center gap-1">
              <span>Eligible for Tax Credit</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Primary Payment</span>
            <div className="text-base font-bold text-slate-900 mt-1.5 truncate">HDFC Corp •••• 4921</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span>Auto-Debit Active</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm overflow-hidden">
        {/* Table Filters & Search */}
        <div className="p-3.5 border-b border-[#E5EBF2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#FAFCFF]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoice number or plan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5EBF2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-slate-800"
              />
            </div>

            <div className="flex items-center gap-1 bg-white border border-[#E5EBF2] rounded-lg p-0.5 text-xs">
              {(['All', 'Paid', 'Pending', 'Overdue'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-[#0362FA] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filteredInvoices.length}</span> invoices
          </div>
        </div>

        {/* Anti-Shrink Horizontal Scroll Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[950px] whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5EBF2] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3.5 w-10 text-center">#</th>
                <th className="py-3 px-3.5">Invoice No</th>
                <th className="py-3 px-3.5">Billing Period / Plan</th>
                <th className="py-3 px-3.5">Issue Date</th>
                <th className="py-3 px-3.5">Due Date</th>
                <th className="py-3 px-3.5">Subtotal</th>
                <th className="py-3 px-3.5">GST (18%)</th>
                <th className="py-3 px-3.5">Total Amount</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBF2]">
              {filteredInvoices.map((inv, idx) => (
                <tr key={inv.id} className="hover:bg-[#F0F7FF] transition-colors">
                  <td className="py-3 px-3.5 text-center text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                  <td className="py-3 px-3.5">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="font-mono font-bold text-[#0362FA] hover:underline flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{inv.invoiceNo}</span>
                    </button>
                  </td>
                  <td className="py-3 px-3.5">
                    <div className="font-semibold text-slate-800">{inv.plan}</div>
                    <div className="text-[11px] text-slate-400 max-w-[240px] truncate">{inv.description}</div>
                  </td>
                  <td className="py-3 px-3.5 text-slate-600">{inv.issueDate}</td>
                  <td className="py-3 px-3.5 text-slate-600">{inv.dueDate}</td>
                  <td className="py-3 px-3.5 text-slate-700 font-mono font-medium">₹{inv.subtotal.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3.5 text-slate-600 font-mono">₹{inv.gst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                  <td className="py-3 px-3.5 text-slate-900 font-mono font-bold text-[13px]">
                    ₹{inv.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        inv.status === 'Paid'
                          ? 'bg-[#E9F9EE] text-[#13AB4A] border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {inv.status === 'Paid' ? (
                        <CheckCircle2 className="w-3 h-3 text-[#13AB4A]" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-600" />
                      )}
                      <span>{inv.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-2 py-1 text-[11px] font-semibold text-[#0362FA] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                      >
                        View
                      </button>
                      <ActionMenu
                        align="right"
                        items={[
                          {
                            label: 'Download Invoice PDF',
                            icon: <Download className="w-3.5 h-3.5" />,
                            onClick: () => toast.success(`Downloaded ${inv.invoiceNo}.pdf`),
                          },
                          {
                            label: 'Email Tax Invoice',
                            icon: <Mail className="w-3.5 h-3.5" />,
                            onClick: () => toast.info(`Tax invoice sent to accounts@atscompany.in`),
                          },
                          {
                            label: 'View GST Tax Breakdown',
                            icon: <Receipt className="w-3.5 h-3.5" />,
                            onClick: () => setSelectedInvoice(inv),
                          },
                          {
                            label: 'Print Hardcopy',
                            icon: <Printer className="w-3.5 h-3.5" />,
                            onClick: () => toast.info(`Printing layout generated for ${inv.invoiceNo}`),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-[#F8FAFC] border-t border-[#E5EBF2] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <span>Showing 1 to {filteredInvoices.length} of {invoices.length} invoices</span>
          <div className="flex items-center gap-1">
            <button className="p-1 border border-[#E5EBF2] rounded bg-white text-slate-400 hover:text-slate-700">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-2.5 py-0.5 bg-[#0362FA] text-white font-bold rounded">1</button>
            <button className="p-1 border border-[#E5EBF2] rounded bg-white text-slate-400 hover:text-slate-700">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#0362FA]" />
                <h3 className="font-bold text-slate-900 text-sm">Tax Invoice Details</h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                <div>
                  <div className="font-mono text-sm font-bold text-slate-900">{selectedInvoice.invoiceNo}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Issue Date: {selectedInvoice.issueDate}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F9EE] text-[#13AB4A] border border-emerald-200">
                  {selectedInvoice.status}
                </span>
              </div>

              {/* Company & Customer GST */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <div className="font-bold text-slate-700 text-[11px]">Billed By:</div>
                  <div className="text-slate-600 mt-0.5">ATS Telephony Cloud Pvt Ltd</div>
                  <div className="text-slate-400 text-[10px]">GSTIN: 07AABCA1234F1Z8</div>
                </div>
                <div>
                  <div className="font-bold text-slate-700 text-[11px]">Billed To:</div>
                  <div className="text-slate-600 mt-0.5">Customer Enterprise Ltd</div>
                  <div className="text-slate-400 text-[10px]">GSTIN: 27AABCC9876E1Z4</div>
                </div>
              </div>

              {/* Itemized calculation */}
              <div className="space-y-2">
                <div className="font-bold text-slate-800 text-[11px]">Line Item Description:</div>
                <div className="p-2.5 border border-slate-200 rounded-lg bg-white flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-800">{selectedInvoice.description}</div>
                    <div className="text-[10px] text-slate-400">Plan: {selectedInvoice.plan} Tier</div>
                  </div>
                  <div className="font-mono font-bold text-slate-900">
                    ₹{selectedInvoice.subtotal.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">₹{selectedInvoice.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>CGST (9%):</span>
                  <span className="font-mono">₹{(selectedInvoice.gst / 2).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SGST (9%):</span>
                  <span className="font-mono">₹{(selectedInvoice.gst / 2).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
                  <span>Total Amount Paid:</span>
                  <span className="font-mono text-[#0362FA]">
                    ₹{selectedInvoice.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast.success(`Downloaded ${selectedInvoice.invoiceNo}.pdf`);
                  setSelectedInvoice(null);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
