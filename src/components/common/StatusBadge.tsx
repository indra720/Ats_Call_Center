import React from 'react';
import { cn } from '@/lib/utils';

export type StatusVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'purple'
  | 'teal'
  | 'orange';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  dot?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant,
  dot = true,
  size = 'md',
  className,
}) => {
  // Auto infer variant from common status strings if not explicitly provided
  const inferVariant = (val: string): StatusVariant => {
    const s = val.toLowerCase();
    if (['converted', 'completed', 'active', 'online', 'approved', 'paid', 'success', 'high'].includes(s)) {
      return 'success';
    }
    if (['in progress', 'qualified', 'proposal', 'pending', 'busy', 'medium', 'open'].includes(s)) {
      return 'warning';
    }
    if (['lost', 'failed', 'missed', 'inactive', 'offline', 'danger', 'rejected', 'overdue'].includes(s)) {
      return 'danger';
    }
    if (['new', 'contacted', 'negotiation', 'info', 'running'].includes(s)) {
      return 'info';
    }
    if (['voicemail', 'scheduled', 'assigned'].includes(s)) {
      return 'purple';
    }
    if (['away', 'draft', 'paused'].includes(s)) {
      return 'neutral';
    }
    return 'neutral';
  };

  const finalVariant = variant || inferVariant(status);

  const variantStyles: Record<StatusVariant, { bg: string; text: string; dot: string; border: string }> = {
    success: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      border: 'border-emerald-200',
    },
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      dot: 'bg-amber-500',
      border: 'border-amber-200',
    },
    danger: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      dot: 'bg-rose-500',
      border: 'border-rose-200',
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      dot: 'bg-blue-500',
      border: 'border-blue-200',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      dot: 'bg-purple-500',
      border: 'border-purple-200',
    },
    teal: {
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      dot: 'bg-teal-500',
      border: 'border-teal-200',
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      dot: 'bg-orange-500',
      border: 'border-orange-200',
    },
    neutral: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      dot: 'bg-slate-400',
      border: 'border-slate-200',
    },
  };

  const styles = variantStyles[finalVariant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold rounded-full border tracking-wide uppercase',
        styles.bg,
        styles.text,
        styles.border,
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', styles.dot)} />}
      <span className="truncate">{status}</span>
    </span>
  );
};
