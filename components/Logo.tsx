export function Logo({ dark = false, sub = "Foundation" }: { dark?: boolean; sub?: string }) {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <circle cx="20" cy="20" r="19" fill="none" stroke="#D97706" strokeWidth="1.5" />
        <path d="M20 8c-4 6-8 9-8 14a8 8 0 0 0 16 0c0-5-4-8-8-14Z" fill="#059669" />
        <path d="M20 16c-2 3-4 4.5-4 7a4 4 0 0 0 8 0c0-2.5-2-4-4-7Z" fill="#FBBF24" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-lg font-semibold ${dark ? "text-navy" : "text-white"}`}>Syndy Emade</span>
        <span className={`block text-[0.65rem] font-semibold uppercase tracking-[0.3em] ${dark ? "text-gold-600" : "text-gold-400"}`}>
          {sub}
        </span>
      </span>
    </span>
  );
}
