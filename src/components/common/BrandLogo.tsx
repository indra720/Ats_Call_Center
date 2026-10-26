import React from 'react';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  variant = 'full',
  theme = 'dark',
  size = 'md',
}) => {
  const isLight = theme === 'light';

  return (
    <div className={cn('flex items-center gap-2 select-none font-sans', className)}>
      {/* 3D-effect Metallic / Neon Blue Icon Ring */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={size === 'sm' ? 28 : size === 'lg' ? 36 : 32}
          height={size === 'sm' ? 28 : size === 'lg' ? 36 : 32}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glowing ring */}
          <circle cx="18" cy="18" r="16" stroke="url(#blue_ring_grad)" strokeWidth="3" />
          <path
            d="M8 20C9.5 13 14 9 20 9C26 9 29 13.5 28 20"
            stroke="#00D2FF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M11 25L18 11L25 25"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M14 20H22" stroke="#00D2FF" strokeWidth="2.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="blue_ring_grad" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0362FA" />
              <stop offset="0.5" stopColor="#00D2FF" />
              <stop offset="1" stopColor="#0362FA" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      {variant !== 'icon' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span
              className={cn(
                'font-extrabold tracking-tight',
                isLight ? 'text-slate-900' : 'text-white',
                size === 'sm' ? 'text-sm' : 'text-[15px]'
              )}
            >
              ATS CALL CENTER
            </span>
          </div>
          <span
            className={cn(
              'text-[9px] tracking-widest font-bold uppercase mt-0.5',
              isLight ? 'text-slate-400' : 'text-[#8A99AD]'
            )}
          >
            AI CALLING & CRM
          </span>
        </div>
      )}
    </div>
  );
};
