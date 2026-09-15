"use client";

import { ReactNode, useEffect } from "react";
import { XIcon } from "@/components/kotg/icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  widthClassName?: string;
};

export function Modal({ open, onClose, title, description, children, footer, widthClassName = "max-w-[550px]" }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-kotg-black/40 px-4 py-8">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative flex max-h-full w-full flex-col overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl ${widthClassName}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-kotg-display text-2xl text-kotg-black">{title}</h2>
            {description && <p className="mt-1 text-sm text-kotg-text-muted">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 text-kotg-black/60 hover:text-kotg-black"
          >
            <XIcon size={18} />
          </button>
        </div>
        <div className="mt-4 border-t border-kotg-border pt-6">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}
