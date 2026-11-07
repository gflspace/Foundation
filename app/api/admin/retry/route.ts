import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/server/admin-auth";
import { readRecords } from "@/lib/server/store";
import { retryFailed, type Submission } from "@/lib/server/submissions";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isAdmin()) return new NextResponse("Forbidden", { status: 403 });
  const n = await retryFailed(await readRecords<Submission>("submissions.jsonl"), await readRecords("submission-status.jsonl"));
  return NextResponse.redirect(new URL(`/admin?retried=${n}`, req.url), 303);
}
