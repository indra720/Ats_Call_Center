import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name?: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'w-5 h-5 text-[9px]',
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
  xl: 'w-12 h-12 text-base',
};

const bgColors = [
  'bg-blue-600',
  'bg-emerald-600',
  'bg-violet-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-cyan-600',
  'bg-indigo-600',
];

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name = 'User',
  src,
  size = 'md',
  className,
}) => {
  const [hasError, setHasError] = useState(false);

  // Get initials (up to 2 letters)
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  // Pick deterministic color based on name
  const charCode = (name.charCodeAt(0) || 0) + (name.charCodeAt(1) || 0);
  const bgColor = bgColors[charCode % bgColors.length];

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setHasError(true)}
        className={cn(
          'rounded-full object-cover shrink-0 ring-1 ring-slate-200/60',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full text-white font-bold flex items-center justify-center shrink-0 select-none shadow-xs',
        bgColor,
        sizeClasses[size],
        className
      )}
      title={name}
    >
      {initials}
    </div>
  );
};
