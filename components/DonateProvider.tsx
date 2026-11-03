"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { DonationForm } from "./DonationForm";

type Ctx = { open: (programme?: string) => void };
const DonateContext = createContext<Ctx>({ open: () => {} });
export const useDonate = () => useContext(DonateContext);

export function DonateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [programme, setProgramme] = useState<string | undefined>();
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((p?: string) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setProgramme(p);
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("button, input")?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <DonateContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="donate-title"
              className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-ivory p-6 shadow-2xl sm:rounded-3xl sm:p-8"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="absolute right-4 top-4 rounded-full p-2 text-navy/60 hover:bg-navy/5 hover:text-navy"
                aria-label="Close donation dialog"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="eyebrow">Give hope today</p>
              <h2 id="donate-title" className="mt-2 text-2xl sm:text-3xl">Make a donation</h2>
              <div className="mt-6">
                <DonationForm defaultProgramme={programme} compact />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DonateContext.Provider>
  );
}

export function DonateButton({
  children = "Donate",
  className = "btn-gold",
  programme,
}: {
  children?: ReactNode;
  className?: string;
  programme?: string;
}) {
  const { open } = useDonate();
  return (
    <button type="button" className={className} onClick={() => open(programme)}>
      {children}
    </button>
  );
}
