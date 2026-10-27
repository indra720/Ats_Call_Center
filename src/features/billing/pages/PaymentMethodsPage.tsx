import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Smartphone,
  Building,
  Trash2,
  Edit2,
  Star,
  RefreshCw,
  Lock,
  ChevronRight,
  X,
  Check,
} from 'lucide-react';
import { ActionMenu } from '@/components/common/ActionMenu';
import { toast } from '@/store/toastStore';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking';
  title: string;
  subtitle: string;
  expiryOrVpa: string;
  holderName: string;
  isPrimary: boolean;
  brand: string;
  lastUsed: string;
}

const INITIAL_METHODS: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'card',
    title: 'HDFC Corporate Visa Platinum',
    subtitle: 'Ending in 4921',
    expiryOrVpa: '09/29',
    holderName: 'ATS TELEPHONY CORP',
    isPrimary: true,
    brand: 'Visa',
    lastUsed: '01 Oct 2026',
  },
  {
    id: 'pm-2',
    type: 'upi',
    title: 'ICICI Bank UPI Auto-Debit Mandate',
    subtitle: 'e-Mandate #ICICI-883920',
    expiryOrVpa: 'atscallcenter@icici',
    holderName: 'ATS TELEPHONY SERVICES',
    isPrimary: false,
    brand: 'UPI',
    lastUsed: '01 Aug 2026',
  },
  {
    id: 'pm-3',
    type: 'card',
    title: 'Axis Bank Master Business Card',
    subtitle: 'Ending in 8104',
    expiryOrVpa: '04/28',
    holderName: 'RAJESH SHARMA (DIR)',
    isPrimary: false,
    brand: 'Mastercard',
    lastUsed: '15 May 2026',
  },
  {
    id: 'pm-4',
    type: 'netbanking',
    title: 'State Bank of India Corporate NetBanking',
    subtitle: 'Account •••• 9214',
    expiryOrVpa: 'IFSC: SBIN0004120',
    holderName: 'ATS ENTERPRISE A/C',
    isPrimary: false,
    brand: 'SBI',
    lastUsed: '01 Jun 2026',
  },
];

export const PaymentMethodsPage: React.FC = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>(INITIAL_METHODS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newMethodType, setNewMethodType] = useState<'card' | 'upi'>('card');

  const setAsPrimary = (id: string, name: string) => {
    setMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isPrimary: m.id === id,
      }))
    );
    toast.success(`Primary Method Updated`, `${name} is now your default auto-debit method`);
  };

  const removeMethod = (id: string, name: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
    toast.error(`Payment Method Removed`, `${name} was unlinked from billing profile`);
  };

  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardHolder.trim()) {
      toast.warning('Validation Error', 'Please enter account or cardholder name');
      return;
    }

    const newMethod: PaymentMethod = {
      id: `pm-${Date.now()}`,
      type: newMethodType,
      title: newMethodType === 'card' ? 'New Business Card' : 'New UPI ID',
      subtitle: newMethodType === 'card' ? `Ending in ${newCardNumber.slice(-4) || '9999'}` : newCardNumber,
      expiryOrVpa: newMethodType === 'card' ? (newCardExpiry || '12/28') : newCardNumber,
      holderName: newCardHolder.toUpperCase(),
      isPrimary: false,
      brand: newMethodType === 'card' ? 'Visa' : 'UPI',
      lastUsed: 'Never',
    };

    setMethods((prev) => [newMethod, ...prev]);
    setShowAddModal(false);
    setNewCardNumber('');
    setNewCardHolder('');
    setNewCardExpiry('');
    toast.success('Payment Method Added', 'Card verified with ₹1 reversible authorization.');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Billing & Plan</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Payment Methods & UPI</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Methods & UPI</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage authorized corporate credit cards, NPCI auto-debit UPI e-mandates, and NetBanking gateways.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Payment Method</span>
        </button>
      </div>

      {/* Balanced 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Auto-Debit Status</span>
            <div className="text-lg font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Active & Verified</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Next bill on 05 Nov 2026</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Saved Gateways</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{methods.length} Methods</div>
            <div className="text-[11px] text-[#0362FA] font-medium mt-1">2 Cards, 1 UPI, 1 NetBank</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">RBI e-Mandate Limit</span>
            <div className="text-xl font-bold text-slate-900 mt-1">₹1,00,000</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Per billing transaction</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF2] p-4 shadow-sm flex items-start justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs font-semibold text-slate-500 block truncate">Billing Currency</span>
            <div className="text-xl font-bold text-slate-900 mt-1">INR (₹)</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Indian Rupee / GST Input</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Visual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {methods.map((pm) => (
          <div
            key={pm.id}
            className={`rounded-2xl p-5 border transition-all relative overflow-hidden flex flex-col justify-between ${
              pm.isPrimary
                ? 'bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white border-slate-700 shadow-md ring-2 ring-[#0362FA]/40'
                : 'bg-white text-slate-800 border-[#E5EBF2] shadow-sm hover:border-slate-300'
            }`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    pm.isPrimary ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {pm.type === 'card' && <CreditCard className="w-5 h-5" />}
                  {pm.type === 'upi' && <Smartphone className="w-5 h-5" />}
                  {pm.type === 'netbanking' && <Building className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-bold text-sm leading-tight">{pm.title}</div>
                  <div className={`text-[11px] mt-0.5 ${pm.isPrimary ? 'text-slate-300' : 'text-slate-400'}`}>
                    {pm.subtitle}
                  </div>
                </div>
              </div>

              {pm.isPrimary ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0362FA] text-white border border-blue-400/30 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Primary</span>
                </span>
              ) : (
                <button
                  onClick={() => setAsPrimary(pm.id, pm.title)}
                  className="text-[11px] font-semibold text-[#0362FA] hover:underline"
                >
                  Make Primary
                </button>
              )}
            </div>

            {/* Middle: Details */}
            <div className="my-5 space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {pm.type === 'card' ? 'Expiry Date' : 'Mandate ID / IFSC'}
              </div>
              <div className="font-mono text-sm font-semibold">{pm.expiryOrVpa}</div>
              <div className="text-[11px] font-medium pt-1 opacity-80">{pm.holderName}</div>
            </div>

            {/* Bottom Row */}
            <div
              className={`pt-3 border-t flex items-center justify-between text-[11px] ${
                pm.isPrimary ? 'border-white/10 text-slate-300' : 'border-slate-100 text-slate-500'
              }`}
            >
              <span>Last used: {pm.lastUsed}</span>
              <div className="flex items-center gap-1">
                <ActionMenu
                  align="right"
                  items={[
                    {
                      label: pm.isPrimary ? 'Default Mandate' : 'Set as Primary Method',
                      icon: <Star className="w-3.5 h-3.5" />,
                      onClick: () => setAsPrimary(pm.id, pm.title),
                    },
                    {
                      label: 'Send Test Authorization (₹1)',
                      icon: <RefreshCw className="w-3.5 h-3.5" />,
                      onClick: () => toast.success(`Verification ping sent to ${pm.title}`),
                    },
                    {
                      label: 'Remove Method',
                      icon: <Trash2 className="w-3.5 h-3.5" />,
                      danger: true,
                      onClick: () => removeMethod(pm.id, pm.title),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mandate & Payment Security Guarantee */}
      <div className="bg-[#FAFCFF] border border-[#E5EBF2] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0362FA] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">PCI-DSS Level 1 & RBI Tokenization Compliant</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Card numbers are never stored in plain text. Tokenized with 256-bit AES encryption through Razorpay/Stripe Indian payment gateways.
            </p>
          </div>
        </div>
        <button
          onClick={() => toast.info('Security Audit', 'PCI-DSS Attestation of Compliance valid until 2027')}
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-[#E5EBF2] rounded-lg hover:bg-slate-50 shrink-0"
        >
          View Security Cert
        </button>
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#0362FA]" />
                <h3 className="font-bold text-slate-900 text-sm">Add New Payment Method</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMethod} className="p-5 space-y-4 text-xs">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setNewMethodType('card')}
                  className={`py-1.5 rounded-md font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    newMethodType === 'card' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Credit/Debit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNewMethodType('upi')}
                  className={`py-1.5 rounded-md font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    newMethodType === 'upi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>UPI e-Mandate</span>
                </button>
              </div>

              {newMethodType === 'card' ? (
                <>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4921"
                      value={newCardNumber}
                      onChange={(e) => setNewCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Cardholder Name (as on card)</label>
                    <input
                      type="text"
                      placeholder="e.g. ATS TELEPHONY PVT LTD"
                      value={newCardHolder}
                      onChange={(e) => setNewCardHolder(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-xs"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={newCardExpiry}
                        onChange={(e) => setNewCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-xs"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">UPI ID / Virtual Payment Address</label>
                    <input
                      type="text"
                      placeholder="business@hdfcbank"
                      value={newCardNumber}
                      onChange={(e) => setNewCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] font-mono text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Account Holder Name</label>
                    <input
                      type="text"
                      placeholder="e.g. ATS ENTERPRISE"
                      value={newCardHolder}
                      onChange={(e) => setNewCardHolder(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0362FA] text-xs"
                      required
                    />
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-700 text-[11px]">
                    An approval notification will be sent to your UPI app (GPay / PhonePe / BHIM) to authorize the recurring mandate.
                  </div>
                </>
              )}

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Verify & Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
