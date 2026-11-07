import "server-only";
import { appendFile, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

/**
 * Durable storage for operational records (form submissions, email log, monitor state).
 * Lives OUTSIDE the deployed app folder so redeploys never erase it:
 * SEF_DATA_DIR if set, otherwise ~/sef-data on the hosting account.
 */
export const dataDir = () => process.env.SEF_DATA_DIR || path.join(os.homedir(), "sef-data");

async function ensure(file: string) {
  await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
}

export async function appendRecord(name: string, record: unknown) {
  const file = path.join(dataDir(), name);
  await ensure(file);
  await appendFile(file, JSON.stringify(record) + "\n", { mode: 0o600 });
}

export async function readRecords<T = Record<string, unknown>>(name: string): Promise<T[]> {
  try {
    const text = await readFile(path.join(dataDir(), name), "utf8");
    return text.split("\n").filter(Boolean).flatMap((l) => { try { return [JSON.parse(l) as T]; } catch { return []; } });
  } catch {
    return [];
  }
}

export async function readJson<T>(name: string, fallback: T): Promise<T> {
  try { return JSON.parse(await readFile(path.join(dataDir(), name), "utf8")) as T; } catch { return fallback; }
}

/** Atomic write (temp file + rename) so a crash never leaves half a file. */
export async function writeJson(name: string, value: unknown) {
  const file = path.join(dataDir(), name);
  await ensure(file);
  const tmp = `${file}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(value, null, 2), { mode: 0o600 });
  await rename(tmp, file);
}
