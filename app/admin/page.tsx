import { notFound } from "next/navigation";
import { adminEnabled, isAdmin } from "@/lib/server/admin-auth";
import { mailConfigured, adminEmail } from "@/lib/server/mail";
import { dataDir, readJson, readRecords } from "@/lib/server/store";
import type { Submission } from "@/lib/server/submissions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Mail = { at: string; kind: string; ref?: string; to: string; status: string; attempt?: number; reason?: string };
type Monitor = { lastRun?: string; checks?: { name: string; ok: boolean; ms?: number; detail?: string }[]; incidents?: { key: string; since: string }[] };

const TYPES = ["all", "volunteer", "partner", "collaboration", "press", "newsletter"] as const;
const fmt = (iso?: string) => (iso ? new Date(iso).toLocaleString("en-GB", { timeZone: process.env.SEF_TIMEZONE || "Africa/Douala", dateStyle: "medium", timeStyle: "short" }) : "—");

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-plum/10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 text-sm">{children}</div>
    </section>
  );
}

function Login({ error }: { error?: string }) {
  return (
    <main className="mx-auto mt-24 max-w-sm rounded-2xl bg-white p-8 shadow ring-1 ring-plum/10">
      <h1 className="text-xl font-semibold">Foundation administration</h1>
      <form method="post" action="/api/admin/login" className="mt-6 space-y-4">
        <label className="block text-sm font-medium" htmlFor="pw">Password</label>
        <input id="pw" name="password" type="password" required autoComplete="current-password" className="w-full rounded-xl border border-plum/20 px-4 py-2.5" />
        {error && <p role="alert" className="text-sm text-red-700">{error === "locked" ? "Too many attempts. Try again in 15 minutes." : "Incorrect password."}</p>}
        <button className="w-full rounded-full bg-plum px-5 py-2.5 font-semibold text-white">Sign in</button>
      </form>
    </main>
  );
}

export default async function Admin({ searchParams }: { searchParams: { e?: string; type?: string; retried?: string } }) {
  if (!adminEnabled()) notFound();
  if (!isAdmin()) return <Login error={searchParams.e} />;

  const [subs, mail, status, monitor] = await Promise.all([
    readRecords<Submission>("submissions.jsonl"),
    readRecords<Mail>("email-log.jsonl"),
    readRecords<{ ref: string; admin?: boolean; ack?: boolean }>("submission-status.jsonl"),
    readJson<Monitor>("monitor-state.json", {}),
  ]);
  const filter = TYPES.includes(searchParams.type as (typeof TYPES)[number]) ? searchParams.type! : "all";
  const list = subs.filter((s) => filter === "all" || s.type === filter).reverse().slice(0, 100);
  const st = new Map<string, { admin?: boolean; ack?: boolean }>();
  for (const x of status) st.set(x.ref, { ...st.get(x.ref), ...Object.fromEntries(Object.entries(x).filter(([, v]) => v !== undefined)) });
  const failed = [...st.entries()].filter(([, x]) => x.admin === false || x.ack === false);
  const week = Date.now() - 7 * 86400_000;
  const counts = Object.fromEntries(TYPES.slice(1).map((t) => [t, subs.filter((s) => s.type === t).length]));

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Syndy Emade Foundation</p>
          <h1 className="text-2xl font-semibold">Website administration</h1>
        </div>
        <form method="post" action="/api/admin/logout"><button className="rounded-full border border-plum/20 px-4 py-2 text-sm">Sign out</button></form>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Website health">
          {monitor.lastRun ? (
            <>
              <p className="text-plum/70">Last check: {fmt(monitor.lastRun)}</p>
              <ul className="mt-3 space-y-1.5">
                {monitor.checks?.map((c) => (
                  <li key={c.name} className="flex justify-between gap-2"><span>{c.ok ? "🟢" : "🔴"} {c.name}</span><span className="text-plum/60">{c.ms ? `${c.ms} ms` : c.detail}</span></li>
                ))}
              </ul>
              {!!monitor.incidents?.length && <p className="mt-3 font-medium text-red-700">{monitor.incidents.length} open incident(s)</p>}
            </>
          ) : <p className="text-plum/70">No monitoring run recorded on this server yet.</p>}
        </Card>
        <Card title="Communications">
          <p>Mail sending: {mailConfigured() ? <strong className="text-teal-700">configured</strong> : <strong className="text-red-700">not configured</strong>}</p>
          <p className="mt-1">Administrator inbox: {adminEmail() || "—"}</p>
          <p className="mt-1">Submissions with a failed email: {failed.length}</p>
          {failed.length > 0 && <form method="post" action="/api/admin/retry" className="mt-2"><button className="rounded-full bg-plum px-4 py-1.5 text-xs font-semibold text-white">Retry failed emails</button></form>}
          {searchParams.retried && <p className="mt-2 text-teal-700">Retried {searchParams.retried} submission(s).</p>}
          <p className="mt-3 text-plum/70">New this week: {subs.filter((s) => Date.parse(s.submittedAt) > week).length} submissions</p>
        </Card>
        <Card title="Totals">
          <ul className="space-y-1">{Object.entries(counts).map(([k, v]) => <li key={k} className="flex justify-between capitalize"><span>{k}</span><span>{v}</span></li>)}</ul>
          <p className="mt-3 text-xs text-plum/60">Records stored in {dataDir()}</p>
        </Card>
      </div>

      <Card title="Applications and messages">
        <nav className="mb-4 flex flex-wrap gap-2">
          {TYPES.map((t) => <a key={t} href={`/admin?type=${t}`} className={`rounded-full px-3 py-1 capitalize ${t === filter ? "bg-plum text-white" : "bg-mist"}`}>{t}</a>)}
        </nav>
        {list.length === 0 ? <p className="text-plum/70">No submissions yet.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="text-xs uppercase text-plum/60"><tr><th className="py-2">Received</th><th>Reference</th><th>Type</th><th>Name / email</th><th>Interest</th><th>Message</th><th>Emails</th></tr></thead>
              <tbody>
                {list.map((s) => {
                  const x = st.get(s.ref);
                  return (
                    <tr key={s.ref} className="border-t border-plum/10 align-top">
                      <td className="py-2 pr-3 whitespace-nowrap">{fmt(s.submittedAt)}</td>
                      <td className="pr-3 font-mono text-xs">{s.ref}</td>
                      <td className="pr-3 capitalize">{s.type}</td>
                      <td className="pr-3">{s.name}<br /><a className="text-teal-700" href={`mailto:${s.email}`}>{s.email}</a>{s.phone && <><br />{s.phone}</>}{(s.organisation || s.location) && <><br /><span className="text-plum/60">{s.organisation || s.location}</span></>}</td>
                      <td className="pr-3">{s.interest}</td>
                      <td className="max-w-xs whitespace-pre-wrap pr-3">{s.message}</td>
                      <td className="whitespace-nowrap">{x ? `${x.admin === undefined ? "…" : x.admin ? "✓" : "✗"} admin · ${x.ack === undefined ? "…" : x.ack ? "✓" : "✗"} reply` : "…"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Email delivery log (latest 30)">
        {mail.length === 0 ? <p className="text-plum/70">No emails attempted yet.</p> : (
          <ul className="space-y-1 font-mono text-xs">
            {mail.slice(-30).reverse().map((m, i) => <li key={i}>{fmt(m.at)} · {m.status.toUpperCase()} · {m.kind} · {m.ref ?? ""} → {m.to}{m.reason ? ` (${m.reason})` : ""}</li>)}
          </ul>
        )}
      </Card>
    </main>
  );
}
