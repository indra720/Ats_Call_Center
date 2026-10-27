import React, { useState } from "react";
import {
  Crown,
  Calendar,
  Users,
  Phone,
  MessageSquare,
  Check,
  X,
  CreditCard,
  Download,
  Plus,
  Eye,
  ArrowUpRight,
  ChevronDown,
  Edit2,
  Mail,
  Receipt,
  MoreHorizontal,
} from "lucide-react";
import { ActionMenu } from "@/components/common/ActionMenu";
import { toast } from "@/store/toastStore";

export const BillingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span className="text-slate-400">←</span>
            <span>Settings & Admin</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">
              Billing & Subscription
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Billing & Subscription
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your subscription plan, usage, invoices and payment methods.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>View Usage</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0362FA] hover:bg-blue-600 rounded-lg shadow-sm">
            <Plus className="w-3.5 h-3.5" />
            <span>Upgrade Plan</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* Current Plan */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-[#EF9612]">
              <Crown className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Current Plan
            </span>
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">Professional</div>
            <div className="text-[10px] text-slate-400">Billed Monthly</div>
          </div>
          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E9F9EE] text-[#13AB4A]">
            Active
          </span>
        </div>

        {/* Subscription Period */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Subscription Period
            </span>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">
              01 Oct 2026 - 31 Oct 2026
            </div>
            <div className="text-[10px] text-slate-400">22 days remaining</div>
          </div>
          <div className="space-y-1">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0362FA] h-full rounded-full"
                style={{ width: "73%" }}
              />
            </div>
            <div className="text-[9px] text-right text-slate-400 font-mono">
              73%
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Active Users
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900">12 / 20</div>
          <div className="space-y-1">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0362FA] h-full rounded-full"
                style={{ width: "60%" }}
              />
            </div>
            <div className="text-[9px] text-right text-slate-400 font-mono">
              60%
            </div>
          </div>
        </div>

        {/* Monthly Call Credits */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E9F9EE] flex items-center justify-center text-[#13AB4A]">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Monthly Call Credits
            </span>
          </div>
          <div className="text-base font-bold text-slate-900">
            18,450 / 25,000
          </div>
          <div className="space-y-1">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#13AB4A] h-full rounded-full"
                style={{ width: "74%" }}
              />
            </div>
            <div className="text-[9px] text-right text-slate-400 font-mono">
              74%
            </div>
          </div>
        </div>

        {/* WhatsApp Messages */}
        <div className="bg-white rounded-xl p-3.5 border border-[#E5EBF2] shadow-sm space-y-2 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#871CF4]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              WhatsApp Messages
            </span>
          </div>
          <div className="text-base font-bold text-slate-900">
            8,920 / 15,000
          </div>
          <div className="space-y-1">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#871CF4] h-full rounded-full"
                style={{ width: "59%" }}
              />
            </div>
            <div className="text-[9px] text-right text-slate-400 font-mono">
              59%
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left (Plans + Invoices) ~65% | Right (Usage + Cards + Upcoming) ~35% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Section */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">
          {/* Subscription Plans */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Subscription Plans
                </h3>
                <p className="text-xs text-slate-500">
                  Choose the right plan for your business needs.
                </p>
              </div>

              {/* Monthly / Yearly Toggle */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    billingCycle === "monthly"
                      ? "bg-[#0362FA] text-white shadow-xs"
                      : "text-slate-600"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${
                    billingCycle === "yearly"
                      ? "bg-[#0362FA] text-white shadow-xs"
                      : "text-slate-600"
                  }`}
                >
                  <span>Yearly</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-1 rounded">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            {/* 4 Plans Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 text-xs">
              {/* Starter */}
              <div className="border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    Starter
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Perfect for small teams
                  </div>
                  <div className="pt-2">
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹2,999
                    </span>
                    <span className="text-slate-400 text-[11px]"> /month</span>
                  </div>
                </div>

                <button className="w-full py-1.5 text-xs font-semibold text-[#0362FA] bg-blue-50 hover:bg-blue-100 rounded-lg">
                  Upgrade
                </button>

                <ul className="space-y-1.5 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Up to 5
                    Users
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> 5,000
                    Calls/month
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> 5,000
                    WhatsApp messages
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Basic
                    Reports
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Email
                    Support
                  </li>
                  <li className="flex items-center gap-1.5 text-slate-400">
                    <X className="w-3.5 h-3.5" /> Advanced Analytics
                  </li>
                  <li className="flex items-center gap-1.5 text-slate-400">
                    <X className="w-3.5 h-3.5" /> API Access
                  </li>
                </ul>
              </div>

              {/* Professional (Current Plan Highlighted) */}
              <div className="border-2 border-[#0362FA] rounded-xl p-3.5 flex flex-col justify-between space-y-3 relative bg-blue-50/20">
                <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#0362FA] text-white">
                  Current Plan
                </span>

                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    Professional
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Best for growing businesses
                  </div>
                  <div className="pt-2">
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹7,999
                    </span>
                    <span className="text-slate-400 text-[11px]"> /month</span>
                  </div>
                </div>

                <button className="w-full py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg cursor-default">
                  Current Plan
                </button>

                <ul className="space-y-1.5 text-[11px] text-slate-600 pt-2 border-t border-blue-100">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Up to 20
                    Users
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> 25,000
                    Calls/month
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> 15,000
                    WhatsApp messages
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Advanced
                    Reports
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Priority
                    Support
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> API Access
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Custom
                    Integrations
                  </li>
                </ul>
              </div>

              {/* Business */}
              <div className="border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    Business
                  </div>
                  <div className="text-[11px] text-slate-400">
                    For established teams
                  </div>
                  <div className="pt-2">
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹14,999
                    </span>
                    <span className="text-slate-400 text-[11px]"> /month</span>
                  </div>
                </div>

                <button className="w-full py-1.5 text-xs font-semibold text-[#0362FA] bg-blue-50 hover:bg-blue-100 rounded-lg">
                  Upgrade
                </button>

                <ul className="space-y-1.5 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Up to 50
                    Users
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> 75,000
                    Calls/month
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> 50,000
                    WhatsApp messages
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Advanced
                    Analytics
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Dedicated
                    Support
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> API Access
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> SLA Support
                  </li>
                </ul>
              </div>

              {/* Enterprise */}
              <div className="border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    Enterprise
                  </div>
                  <div className="text-[11px] text-slate-400">
                    For large organizations
                  </div>
                  <div className="pt-2">
                    <span className="text-lg font-extrabold text-slate-900">
                      Custom Pricing
                    </span>
                  </div>
                </div>

                <button className="w-full py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg">
                  Contact Sales
                </button>

                <ul className="space-y-1.5 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Unlimited
                    Users
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Custom Call
                    Limits
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Custom
                    WhatsApp Limits
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Dedicated
                    Account Mgr
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> API &
                    Webhooks
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> Custom
                    Features
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#13AB4A]" /> SLA Support
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Invoice History */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Invoice History
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  View and download your past invoices.
                </p>
              </div>
              <button className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                View All Invoices
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-slate-500 font-semibold border-b border-[#E5EBF2]">
                    <th className="py-2 px-2.5 w-6">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-[#0362FA]"
                      />
                    </th>
                    <th className="py-2 px-1.5 w-5 text-slate-400">#</th>
                    <th className="py-2 px-3">Invoice Number</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Plan</th>
                    <th className="py-2 px-3">Amount</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    {
                      id: 1,
                      num: "INV-2026-1023",
                      date: "01 Oct 2026",
                      plan: "Professional",
                      amt: "₹7,999",
                    },
                    {
                      id: 2,
                      num: "INV-2026-0921",
                      date: "01 Sep 2026",
                      plan: "Professional",
                      amt: "₹7,999",
                    },
                    {
                      id: 3,
                      num: "INV-2026-0820",
                      date: "01 Aug 2026",
                      plan: "Professional",
                      amt: "₹7,999",
                    },
                    {
                      id: 4,
                      num: "INV-2026-0720",
                      date: "01 Jul 2026",
                      plan: "Professional",
                      amt: "₹7,999",
                    },
                    {
                      id: 5,
                      num: "INV-2026-0620",
                      date: "01 Jun 2026",
                      plan: "Professional",
                      amt: "₹7,999",
                    },
                  ].map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-[#F0F7FF] transition-colors"
                    >
                      <td className="py-2 px-2.5">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-[#0362FA]"
                        />
                      </td>
                      <td className="py-2 px-1.5 text-slate-400 font-mono text-[11px]">
                        {inv.id}
                      </td>
                      <td className="py-2 px-3 font-semibold text-[#0362FA] font-mono">
                        {inv.num}
                      </td>
                      <td className="py-2 px-3 text-slate-600">{inv.date}</td>
                      <td className="py-2 px-3 text-slate-700">{inv.plan}</td>
                      <td className="py-2 px-3 font-bold text-slate-900">
                        {inv.amt}
                      </td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E9F9EE] text-[#13AB4A]">
                          Paid
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <div className="flex items-center justify-center">
                          <ActionMenu
                            align="right"
                            items={[
                              {
                                label: "Download Invoice PDF",
                                icon: <Download className="w-3.5 h-3.5" />,
                                onClick: () =>
                                  toast.success(`Downloaded ${inv.num}.pdf`),
                              },
                              {
                                label: "Email Tax Invoice",
                                icon: <Mail className="w-3.5 h-3.5" />,
                                onClick: () =>
                                  toast.info(
                                    `Tax invoice ${inv.num} sent to billing contact`,
                                  ),
                              },
                              {
                                label: "View GST Receipt",
                                icon: <Receipt className="w-3.5 h-3.5" />,
                                onClick: () =>
                                  toast.info(
                                    `Opening GST breakdown for ${inv.num}`,
                                  ),
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
          </div>
        </div>

        {/* Right Section: Usage Overview + Payment Methods + Upcoming Invoice */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          {/* Usage Overview */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Usage Overview
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Current billing cycle: 01 Oct 2026 - 31 Oct 2026
                </p>
              </div>
              <button className="flex items-center gap-1 px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                <span>This Month</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              {[
                {
                  name: "Calls",
                  pct: 74,
                  used: "18,450",
                  total: "25,000",
                  color: "text-[#13AB4A]",
                  stroke: "#13AB4A",
                },
                {
                  name: "WhatsApp",
                  pct: 59,
                  used: "8,920",
                  total: "15,000",
                  color: "text-purple-600",
                  stroke: "#871CF4",
                },
                {
                  name: "SMS",
                  pct: 42,
                  used: "2,100",
                  total: "5,000",
                  color: "text-amber-500",
                  stroke: "#EF9612",
                },
                {
                  name: "Email",
                  pct: 35,
                  used: "1,750",
                  total: "5,000",
                  color: "text-blue-600",
                  stroke: "#0362FA",
                },
              ].map((g, i) => (
                <div key={i} className="flex flex-col items-center space-y-1">
                  <div className="text-[11px] font-semibold text-slate-700">
                    {g.name}
                  </div>
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        stroke="#f1f5f9"
                        strokeWidth="3.5"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        stroke={g.stroke}
                        strokeWidth="3.5"
                        strokeDasharray={`${g.pct}, 100`}
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-extrabold text-slate-900">
                      {g.pct}%
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono">
                    {g.used} / {g.total}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Payment Methods
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Manage your saved payment methods.
                </p>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-semibold text-[#0362FA] hover:underline">
                <Plus className="w-3 h-3" />
                <span>Add Payment Method</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {/* VISA */}
              <div className="p-3 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="px-2 py-1 bg-blue-900 text-white font-extrabold rounded text-[11px] tracking-wider">
                    VISA
                  </div>
                  <div>
                    <div className="font-mono text-slate-900 font-bold text-[11px]">
                      •••• •••• •••• 4242
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Expiry 12/28
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E9F9EE] text-[#13AB4A]">
                    Primary
                  </span>
                  <button className="p-1 text-slate-400 hover:text-slate-700">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 text-slate-400 hover:text-slate-700">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* MasterCard */}
              <div className="p-3 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="px-2 py-1 bg-amber-600 text-white font-extrabold rounded text-[11px] tracking-wider">
                    MC
                  </div>
                  <div>
                    <div className="font-mono text-slate-900 font-bold text-[11px]">
                      •••• •••• •••• 5678
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Expiry 11/27
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[11px] font-semibold text-slate-600 hover:text-[#0362FA]">
                    Set as Primary
                  </button>
                  <button className="p-1 text-slate-400 hover:text-slate-700">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 text-slate-400 hover:text-slate-700">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Invoice */}
          <div className="bg-white rounded-xl border border-[#E5EBF2] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Upcoming Invoice
                </h3>
              </div>
              <button className="text-[11px] font-semibold text-[#0362FA] hover:underline">
                View Details
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EBF2FE] flex items-center justify-center text-[#0362FA]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Next Invoice</div>
                  <div className="font-bold text-slate-900 text-xs">
                    01 Nov 2026
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400">
                  Professional Plan
                </div>
                <div className="text-base font-extrabold text-slate-900">
                  ₹7,999
                </div>
              </div>
            </div>

            {/* Estimated usage for next cycle */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="text-[11px] font-semibold text-slate-700">
                Estimated Usage for Next Cycle
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Calls (estimated)</span>
                  <span className="font-mono text-slate-900 font-semibold">
                    ~ 22,500 / 25,000 (90%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#13AB4A] h-full rounded-full"
                    style={{ width: "90%" }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-600">WhatsApp messages</span>
                  <span className="font-mono text-slate-900 font-semibold">
                    ~ 11,800 / 15,000 (79%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full"
                    style={{ width: "79%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
