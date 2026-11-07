import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Activity, AlertTriangle, Camera, ExternalLink, FileText, Folder, FolderOpen, Inbox, Mail, Megaphone, Mic, Newspaper,
  RefreshCw, Search, Star, Video,
} from "lucide-react";
import { adminEnabled, isAdmin } from "@/lib/server/admin-auth";
import { mailConfigured, adminEmail } from "@/lib/server/mail";
import { dataDir, readJson, readRecords } from "@/lib/server/store";
import type { Submission } from "@/lib/server/submissions";
import { driveRoot, lastMaintenanceRun, uploadFolders } from "@/lib/server/content-repo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Mail = { at: string; kind: string; ref?: string; to: string; status: string; attempt?: number; reason?: string };
type Monitor = { lastRun?: string; checks?: { name: string; ok: boolean; ms?: number; detail?: string }[]; incidents?: { key: string; since: string }[] };

const TYPES = ["all", "volunteer", "partner", "collaboration", "press", "newsletter"] as const;
const TYPE_LABEL: Record<(typeof TYPES)[number], string> = { all: "All", volunteer: "Volunteers", partner: "Partners", collaboration: "Collaborations", press: "Press", newsletter: "Newsletter" };
const TZ = process.env.SEF_TIMEZONE || "Africa/Douala";
const fmt = (iso?: string | null) => (iso ? new Date(iso).toLocaleString("en-GB", { timeZone: TZ, dateStyle: "medium", timeStyle: "short" }) : "—");
const short = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString("en-GB", { timeZone: TZ, weekday: "short", day: "numeric", month: "short" }) : "—");
const time = (iso?: string | null) => (iso ? new Date(iso).toLocaleTimeString("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit" }) : "");
const FOLDER_ICON: Record<string, typeof Camera> = { Photos: Camera, Videos: Video, "Blog Posts": FileText, News: Newspaper, Announcements: Megaphone, "Press Releases": Mic, Documents: Folder };
const FOLDER_LABEL: Record<string, string> = { "Blog Posts": "Blog posts", "Press Releases": "Press releases" };
const FOLDER_HINT: Record<string, string> = {
  Photos: "Story galleries · In pictures", Videos: "Media · Films", "Blog Posts": "Stories of Impact", News: "Media · timeline",
  Announcements: "Homepage banner", "Press Releases": "Media · Press", Documents: "Accountability · press kit",
};

function Card({ id, title, aside, children, className = "" }: { id?: string; title?: React.ReactNode; aside?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`card scroll-mt-24 p-6 ${className}`}>
      {(title || aside) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="font-display text-lg font-semibold text-plum">{title}</h2>}
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}

const Pill = ({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "purple" | "amber" | "red" | "plum" | "mist" }) => {
  const t = { teal: "bg-teal-50 text-teal-700", purple: "bg-purple-50 text-purple", amber: "bg-amber-50 text-amber-800", red: "bg-red-50 text-red-700", plum: "bg-plum text-white", mist: "bg-mist text-plum/70" }[tone];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${t}`}>{children}</span>;
};

function Stat({ icon: Icon, tone, label, value, sub }: { icon: typeof Camera; tone: "teal" | "purple" | "amber"; label: string; value: string; sub: string }) {
  const bg = { teal: "bg-teal-50 text-teal-700", purple: "bg-purple-50 text-purple", amber: "bg-amber-50 text-amber-800" }[tone];
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${bg}`}><Icon className="h-[18px] w-[18px]" aria-hidden /></span>
        <span className="text-sm font-medium text-plum/60">{label}</span>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-plum/60">{sub}</p>
    </div>
  );
}

function Login({ error }: { error?: string }) {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="card w-full max-w-sm p-8">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo-sm.png" alt="" width={360} height={329} className="h-12 w-auto" priority />
          <div>
            <p className="eyebrow">Syndy Emade Foundation</p>
            <h1 className="font-display text-xl font-semibold">Admin sign-in</h1>
          </div>
        </div>
        <form method="post" action="/api/admin/login" className="mt-6 space-y-4">
          <label className="label" htmlFor="pw">Password</label>
          <input id="pw" name="password" type="password" required autoComplete="current-password" className="input" autoFocus />
          {error && <p role="alert" className="text-sm text-red-700">{error === "locked" ? "Too many attempts. Try again in 15 minutes." : "That password isn’t right. Please try again."}</p>}
          <button className="btn-teal w-full">Sign in</button>
        </form>
        <p className="mt-5 text-center text-xs text-plum/50">Forgot the password? Change ADMIN_PASSWORD in Hostinger → Environment variables.</p>
      </div>
    </main>
  );
}

export default async function Admin({ searchParams }: { searchParams: { e?: string; type?: string; retried?: string; q?: string } }) {
  if (!adminEnabled()) notFound();
  if (!isAdmin()) return <Login error={searchParams.e} />;

  const [subs, mail, status, monitor, maint] = await Promise.all([
    readRecords<Submission>("submissions.jsonl"),
    readRecords<Mail>("email-log.jsonl"),
    readRecords<{ ref: string; admin?: boolean; ack?: boolean }>("submission-status.jsonl"),
    readJson<Monitor>("monitor-state.json", {}),
    lastMaintenanceRun(),
  ]);

  const filter = TYPES.includes(searchParams.type as (typeof TYPES)[number]) ? (searchParams.type as (typeof TYPES)[number]) : "all";
  const q = (searchParams.q ?? "").trim().toLowerCase();
  const list = subs
    .filter((s) => filter === "all" || s.type === filter)
    .filter((s) => !q || [s.name, s.email, s.ref, s.organisation, s.message].some((v) => v?.toLowerCase().includes(q)))
    .reverse().slice(0, 100);
  const st = new Map<string, { admin?: boolean; ack?: boolean }>();
  for (const x of status) st.set(x.ref, { ...st.get(x.ref), ...Object.fromEntries(Object.entries(x).filter(([, v]) => v !== undefined)) });
  const failed = [...st.entries()].filter(([, x]) => x.admin === false || x.ack === false);
  const week = Date.now() - 7 * 86400_000;
  const newThisWeek = subs.filter((s) => Date.parse(s.submittedAt) > week).length;
  const counts = Object.fromEntries(TYPES.map((t) => [t, t === "all" ? subs.length : subs.filter((s) => s.type === t).length]));

  // System status, combining the weekly run and this server's own state.
  const health = maint?.health ?? [];
  const pagesOk = health.length > 0 && health.every((h) => h.ok);
  const monitorRuns = maint?.monitor?.runs ?? 0;
  const incidents = monitor.incidents ?? [];
  const pending = maint?.pending ?? [];
  const driveCounts = new Map((maint?.drive ?? []).map((d) => [d.folder.replace(/-/g, " "), d]));
  const allGood = pagesOk && mailConfigured() && incidents.length === 0;

  const attention: { tone: "amber" | "red"; title: string; text: string; action?: React.ReactNode }[] = [];
  for (const i of incidents) attention.push({ tone: "red", title: `Site problem: ${i.key}`, text: `Detected ${fmt(i.since)} by the 15-minute monitor.` });
  if (!mailConfigured()) attention.push({ tone: "red", title: "The website can’t send email", text: "Add the SMTP settings in Hostinger → Environment variables." });
  if (failed.length) attention.push({ tone: "amber", title: `${failed.length} message(s) with a failed email`, text: "The visitor or you may not have received the confirmation.", action: <form method="post" action="/api/admin/retry"><button className="btn-outline !px-4 !py-2">Retry emails</button></form> });
  for (const p of pending) attention.push({ tone: "amber", title: `Waiting for approval: ${p.file}`, text: p.question, action: <a href={driveRoot} target="_blank" rel="noopener noreferrer" className="btn-outline !px-4 !py-2"><Star className="h-4 w-4" aria-hidden /> Star in Drive</a> });
  for (const i of maint?.issues ?? []) {
    const cut = i.search(/[.:]\s/);
    const [title, rest] = cut > 0 ? [i.slice(0, cut), i.slice(cut + 1).trim()] : [i, ""];
    attention.push({ tone: "amber", title, text: rest, action: /monitor/i.test(i) ? <a href="https://github.com/gflspace/Foundation/actions" target="_blank" rel="noopener noreferrer" className="btn-outline !px-4 !py-2"><ExternalLink className="h-4 w-4" aria-hidden /> Open GitHub</a> : undefined });
  }

  const hour = Number(new Date().toLocaleString("en-GB", { timeZone: TZ, hour: "2-digit", hour12: false }));
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-plum/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-sm.png" alt="Syndy Emade Foundation" width={360} height={329} className="h-10 w-auto" />
            <div><p className="eyebrow !tracking-[0.15em]">Syndy Emade Foundation</p><p className="font-display text-lg font-semibold leading-tight">Admin</p></div>
          </div>
          <nav aria-label="Dashboard sections" className="order-3 flex w-full gap-1 overflow-x-auto text-sm sm:order-none sm:w-auto">
            {[["#overview", "Overview"], ["#messages", "Messages"], ["#content", "Content"], ["#system", "System"]].map(([h, l], i) => (
              <a key={h} href={h} className={`whitespace-nowrap rounded-full px-4 py-2 font-medium ${i === 0 ? "bg-purple-50 text-purple" : "text-plum/60 hover:bg-mist hover:text-plum"}`}>{l}</a>
            ))}
          </nav>
          <div className="flex gap-2">
            <a href="/" target="_blank" className="btn-outline !px-4 !py-2"><ExternalLink className="h-4 w-4" aria-hidden /> View website</a>
            <form method="post" action="/api/admin/logout"><button className="btn-outline !px-4 !py-2">Sign out</button></form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        {/* Welcome */}
        <section id="overview" className="scroll-mt-24 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-plum via-purple to-teal-700 p-7 text-white sm:p-8">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-white/80">{greeting} 👋</p>
            <h1 className="mt-1 font-display text-3xl font-semibold">{allGood ? "Your website is healthy" : "Your website needs attention"}</h1>
            <p className="mt-2 text-white/85">
              {attention.length === 0 ? "Everything is working and nothing is waiting for you." : `${allGood ? "Everything on the site is working. " : ""}${attention.length} thing${attention.length > 1 ? "s need" : " needs"} a quick look below.`}
            </p>
          </div>
          <a href={driveRoot} target="_blank" rel="noopener noreferrer" className="btn bg-white text-plum hover:bg-mist"><FolderOpen className="h-4 w-4" aria-hidden /> Upload content</a>
        </section>

        {/* Key numbers */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Activity} tone="teal" label="Website status" value={allGood ? "All good" : "Check"} sub={`${health.filter((h) => h.ok).length}/${health.length || 5} pages load · email ${mailConfigured() ? "working" : "off"}`} />
          <Stat icon={Inbox} tone="purple" label="New messages" value={`${newThisWeek}`} sub={`this week · ${subs.length} in total`} />
          <Stat icon={Star} tone="amber" label="Waiting for you" value={`${pending.length}`} sub="files to approve in Drive" />
          <Stat icon={RefreshCw} tone="teal" label="Last maintenance" value={maint?.lastRun ? short(maint.lastRun).replace(/^\w+ /, "") : "—"} sub={maint?.nextRun ? `next: ${short(maint.nextRun)}, ${time(maint.nextRun)}` : "runs every Monday"} />
        </div>

        {/* Attention */}
        <Card title={<span className="flex items-center gap-2">Needs your attention {attention.length > 0 && <Pill tone="amber">{attention.length}</Pill>}</span>}>
          {attention.length === 0 ? (
            <p className="rounded-2xl bg-teal-50 px-4 py-3 text-sm text-teal-700">✓ Nothing needs your attention right now.</p>
          ) : (
            <ul className="space-y-3">
              {attention.map((a, i) => (
                <li key={i} className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 ${a.tone === "red" ? "bg-red-50" : "bg-amber-50"}`}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`mt-0.5 h-5 w-5 shrink-0 ${a.tone === "red" ? "text-red-700" : "text-amber-700"}`} aria-hidden />
                    <div><p className="text-sm font-semibold">{a.title}</p>{a.text && <p className="text-sm text-plum/70">{a.text}</p>}</div>
                  </div>
                  {a.action}
                </li>
              ))}
            </ul>
          )}
          {searchParams.retried && <p className="mt-3 text-sm text-teal-700">Retried {searchParams.retried} submission(s).</p>}
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Content */}
          <Card id="content" title="Add content to the website">
            <p className="-mt-2 mb-4 text-sm text-plum/60">Pick a folder, upload your files with a short note, then star ⭐ them in Drive to approve.</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {uploadFolders.map((f) => {
                const Icon = FOLDER_ICON[f.name] ?? Folder;
                const d = driveCounts.get(f.name);
                return (
                  <li key={f.url}>
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="flex h-full items-center gap-3 rounded-2xl border border-plum/10 bg-mist p-3.5 transition hover:border-purple/30 hover:bg-purple-50">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-purple"><Icon className="h-[18px] w-[18px]" aria-hidden /></span>
                      <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{FOLDER_LABEL[f.name] ?? f.name}</span><span className="block text-xs text-plum/60">{FOLDER_HINT[f.name] ?? f.destination}</span></span>
                      <span className="text-xs font-medium text-plum/50">{d ? `${d.files} file${d.files === 1 ? "" : "s"}` : ""}</span>
                    </a>
                  </li>
                );
              })}
              <li>
                <a href={driveRoot} target="_blank" rel="noopener noreferrer" className="flex h-full items-center gap-2 rounded-2xl border border-dashed border-plum/20 p-3.5 text-sm font-semibold text-teal-700 hover:bg-teal-50">
                  <ExternalLink className="h-4 w-4" aria-hidden /> Open the whole Drive folder
                </a>
              </li>
            </ul>
          </Card>

          {/* Maintenance */}
          <Card id="system" title="Weekly maintenance" aside={<Pill>Every Monday · 06:17</Pill>}>
            <p className="text-sm text-plum/70">{maint?.lastRun ? <>Last run {fmt(maint.lastRun)}. </> : null}{maint?.summary ?? "No run recorded yet."}</p>
            <ul className="mt-4 divide-y divide-plum/10 text-sm">
              {[
                ["Website pages", health.length ? `${health.filter((h) => h.ok).length} of ${health.length} load` : "Not checked yet", pagesOk],
                ["Email sending", mailConfigured() ? "Configured" : "Not configured", mailConfigured()],
                ["Google Drive", maint?.drive ? "Connected" : "Not checked yet", Boolean(maint?.drive)],
                ["15-minute monitor", monitorRuns ? `${monitorRuns} runs · ${maint?.monitor?.failed ?? 0} failed` : (monitor.lastRun ? `Last check ${fmt(monitor.lastRun)}` : "Not started yet"), monitorRuns > 0 && !(maint?.monitor?.failed)],
              ].map(([n, v, ok]) => (
                <li key={n as string} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="flex items-center gap-2.5"><span className={`h-2.5 w-2.5 rounded-full ${ok ? "bg-teal" : "bg-amber-400"}`} aria-hidden />{n as string}</span>
                  <span className={ok ? "text-teal-700" : "text-amber-800"}>{v as string}</span>
                </li>
              ))}
            </ul>
            {maint?.lastRun && (
              <details className="group mt-4">
                <summary className="btn-outline cursor-pointer list-none !px-4 !py-2">Read the full report</summary>
                <div className="mt-4 space-y-4 text-sm">
                  {maint.activity && (
                    <div>
                      <p className="font-semibold">Website activity, {short(maint.activity.from)} – {short(maint.activity.to)}</p>
                      <ul className="mt-2 space-y-1.5">
                        {maint.activity.groups.map((g) => (
                          <li key={g.category} className="flex justify-between gap-3"><span>{g.category.replace(/-/g, " ")}</span><span className={g.count ? "font-semibold text-teal-700" : "text-plum/50"}>{g.count ? `+${g.count}` : "no change"}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {health.length > 0 && (
                    <div><p className="font-semibold">Page checks</p><ul className="mt-2 space-y-1">{health.map((h) => <li key={h.url} className="flex justify-between gap-3"><a href={h.url} className="text-teal-700 underline-offset-2 hover:underline">{h.name}</a><span>{h.ok ? "✓ OK" : `✗ ${h.detail ?? "failed"}`}</span></li>)}</ul></div>
                  )}
                  {maint.published.length > 0 && <div><p className="font-semibold">Published</p><ul className="mt-2 list-disc pl-5">{maint.published.map((p, i) => <li key={i}><a className="text-teal-700" href={p.url}>{p.title}</a></li>)}</ul></div>}
                </div>
              </details>
            )}
          </Card>
        </div>

        {/* Messages */}
        <Card id="messages" title="Messages from the website" aside={
          <form className="flex w-full items-center gap-2 rounded-full border border-plum/15 bg-white px-4 py-2 sm:w-80" role="search">
            <Search className="h-4 w-4 text-plum/50" aria-hidden />
            <input type="hidden" name="type" value={filter} />
            <input name="q" defaultValue={searchParams.q} placeholder="Search name, email or reference" aria-label="Search messages" className="w-full bg-transparent text-sm outline-none placeholder:text-plum/40" />
          </form>}>
          <nav className="mb-4 flex flex-wrap gap-2" aria-label="Filter by type">
            {TYPES.map((t) => <a key={t} href={`/admin?type=${t}#messages`} className={`rounded-full px-3 py-1 text-xs font-semibold ${t === filter ? "bg-plum text-white" : "bg-mist text-plum/70 hover:text-plum"}`}>{TYPE_LABEL[t]} · {counts[t]}</a>)}
          </nav>
          {list.length === 0 ? (
            <div className="grid place-items-center rounded-2xl bg-mist px-6 py-10 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-purple"><Inbox className="h-6 w-6" aria-hidden /></span>
              <p className="mt-3 font-semibold">{q ? "No messages match your search" : "No messages yet"}</p>
              <p className="mt-1 max-w-md text-sm text-plum/60">Volunteer, partner and press requests from the website will appear here, each with its reference number.</p>
            </div>
          ) : (
            <ul className="divide-y divide-plum/10">
              {list.map((s) => {
                const x = st.get(s.ref);
                return (
                  <li key={s.ref} className="grid gap-2 py-4 sm:grid-cols-[1fr_2fr_auto] sm:gap-6">
                    <div>
                      <p className="font-semibold">{s.name || s.email}</p>
                      <a className="text-sm text-teal-700" href={`mailto:${s.email}`}>{s.email}</a>
                      {s.phone && <p className="text-sm text-plum/60">{s.phone}</p>}
                      {(s.organisation || s.location) && <p className="text-sm text-plum/60">{s.organisation || s.location}</p>}
                    </div>
                    <div className="text-sm">
                      <p className="flex flex-wrap items-center gap-2"><Pill tone="purple">{TYPE_LABEL[s.type as (typeof TYPES)[number]] ?? s.type}</Pill>{s.interest && <span className="text-plum/70">{s.interest}</span>}</p>
                      {s.message && <p className="mt-2 whitespace-pre-wrap text-plum/80">{s.message}</p>}
                    </div>
                    <div className="text-xs text-plum/60 sm:text-right">
                      <p>{fmt(s.submittedAt)}</p>
                      <p className="mt-1 font-mono">{s.ref}</p>
                      <p className="mt-1">{x ? `${x.admin === undefined ? "…" : x.admin ? "✓" : "✗"} you · ${x.ack === undefined ? "…" : x.ack ? "✓" : "✗"} reply sent` : "sending…"}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* Email log */}
        <section className="card p-6">
          <details>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-display text-base font-semibold"><Mail className="h-[18px] w-[18px]" aria-hidden /> Emails sent by the website</span>
              <span className="text-sm font-semibold text-teal-700">Show all ▾</span>
            </summary>
            <ul className="mt-4 space-y-2">
              {mail.length === 0 && <li className="text-sm text-plum/60">No emails sent yet.</li>}
              {mail.slice(-30).reverse().map((m, i) => (
                <li key={i} className="flex flex-wrap items-center gap-3 rounded-xl bg-mist px-4 py-2.5 text-sm">
                  <Pill tone={m.status === "sent" ? "teal" : m.status === "failed" ? "red" : "amber"}>{m.status[0].toUpperCase() + m.status.slice(1)}</Pill>
                  <span className="flex-1">{m.kind.replace(/-/g, " ")} → {m.to}{m.reason ? <span className="text-plum/50"> ({m.reason})</span> : null}</span>
                  <span className="text-xs text-plum/60">{fmt(m.at)}</span>
                </li>
              ))}
            </ul>
          </details>
          {mail.length > 0 && <p className="mt-3 text-sm text-plum/60">Latest: {mail[mail.length - 1].kind.replace(/-/g, " ")} → {mail[mail.length - 1].to}, {fmt(mail[mail.length - 1].at)}</p>}
        </section>

        <p className="pb-4 text-center text-xs text-plum/40">Records stored on the server in {dataDir()} · Admin inbox {adminEmail() || "—"}</p>
      </main>
    </div>
  );
}
