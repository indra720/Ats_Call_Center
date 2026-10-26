import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  presentation?: 'modal' | 'sheet' | 'auto'; // auto selects bottom sheet on mobile, dialog on desktop
  className?: string;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  presentation = 'auto',
  className,
}) => {
  const isMobile = useIsMobile();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isSheet = presentation === 'sheet' || (presentation === 'auto' && isMobile);

  // Modern HTML Dialog showModal / close lifecycle
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Fallback light-dismiss for browsers lacking native closedby attribute per guidance
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (e.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInside =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInside) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw]',
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      {...({ closedby: 'any' } as any)}
      className={cn(
        'p-0 bg-transparent text-slate-800 m-auto focus:outline-none backdrop:bg-navy-950/60 backdrop:backdrop-blur-sm',
        isSheet
          ? 'w-full max-w-full m-0 fixed inset-x-0 bottom-0 top-auto rounded-t-3xl border-t border-slate-200 bg-white shadow-2xl animate-in slide-in-from-bottom duration-250 max-h-[92vh] flex flex-col'
          : cn('w-full rounded-2xl bg-white shadow-modal border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200', maxWidths[size]),
        className
      )}
    >
      {/* Mobile Drawer Drag Handle */}
      {isSheet && (
        <div className="w-full flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>
      )}

      {/* Header */}
      {(title || description) && (
        <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between bg-white sticky top-0 z-10">
          <div>
            {title && <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{title}</h3>}
            {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors ml-3"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Body */}
      <div className="p-5 overflow-y-auto flex-1 overscroll-contain no-scrollbar scrollbar-none">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-end gap-2.5 sticky bottom-0 z-10">
          {footer}
        </div>
      )}
    </dialog>
  );
};
