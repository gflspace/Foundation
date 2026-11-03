/**
 * Shield + "SE" monogram. Recreated from the brand brief (§3.1); swap in the
 * official vector file when the Foundation provides it.
 */
export const SHIELD_PATH = "M20 2.5 34.5 7.8v11.4c0 9-5.9 15.3-14.5 18.3C11.4 34.5 5.5 28.2 5.5 19.2V7.8Z";

export function LogoMark({ className = "h-10 w-10", onDark = true }: { className?: string; onDark?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d={SHIELD_PATH} fill={onDark ? "#0F172A" : "#FDF8F0"} stroke="#D4AF37" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 6.2 31.2 10.3v8.9c0 7-4.5 11.9-11.2 14.4-6.7-2.5-11.2-7.4-11.2-14.4v-8.9Z" fill="none" stroke="#6D28D9" strokeWidth="0.9" opacity="0.9" />
      <text x="20" y="24.6" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="13" letterSpacing="-0.5" fill="#D4AF37">SE</text>
    </svg>
  );
}

export function Logo({ dark = false, sub = "Foundation" }: { dark?: boolean; sub?: string }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark onDark={!dark} />
      <span className="leading-none">
        <span className={`block font-display text-lg font-semibold ${dark ? "text-navy" : "text-white"}`}>Syndy Emade</span>
        <span className={`block text-[0.65rem] font-semibold uppercase tracking-[0.3em] ${dark ? "text-gold-700" : "text-gold"}`}>{sub}</span>
      </span>
    </span>
  );
}
