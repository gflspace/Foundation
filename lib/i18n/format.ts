/** Replace {name} placeholders. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => (k in values ? String(values[k]) : `{${k}}`));
}

/** "2019-07-11" → "11 July 2019"; "2019-07" → "July 2019"; "2019" → "2019" (in the given locale). */
export function formatDate(locale: string, iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!m) return String(y);
  const date = new Date(Date.UTC(y, m - 1, d || 1, 12));
  // English dates are day-first ("11 July 2019"), matching the site copy.
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale, d ? { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" } : { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}
