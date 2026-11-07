import { readFile } from "node:fs/promises";
import path from "node:path";
import registry from "@/ops/content-registry.json";

/** Google Drive content repository (private: shown only inside /admin). */
export const driveRoot = `https://drive.google.com/drive/folders/${registry.root.driveId}`;

export const uploadFolders = registry.folders.map((f) => ({
  name: f.path.replace(/-/g, " "),
  url: `https://drive.google.com/drive/folders/${f.driveId}`,
  destination: f.destination,
}));

export type HealthCheck = { name: string; url: string; ok: boolean; status?: number; detail?: string };
export type DriveFolderCount = { folder: string; files: number; new: number };
export type MonitorWeek = { from: string; to: string; runs: number; failed: number; openIssues: { title: string; url: string }[] };

export type ActivityGroup = { category: string; count: number; items: { title: string; url: string }[] };

export type MaintenanceRun = {
  /** Bumped when a report is corrected and re-sent for the same run. */
  revision?: number;
  lastRun: string | null;
  summary: string;
  health?: HealthCheck[];
  drive?: DriveFolderCount[];
  monitor?: MonitorWeek;
  activity?: { from: string; to: string; groups: ActivityGroup[] };
  nextRun?: string;
  processed: { file: string; folder: string; outcome: string }[];
  pending: { file: string; question: string }[];
  published: { title: string; url: string }[];
  issues: string[];
};

/** Written by the weekly maintenance job (ops/maintenance/last-run.json, committed + deployed). */
export async function lastMaintenanceRun(): Promise<MaintenanceRun | null> {
  try {
    const raw = await readFile(path.join(process.cwd(), "ops/maintenance/last-run.json"), "utf8");
    // Links to the Foundation's own pages always point at the address the site runs on now,
    // so reports keep working after a move (old preview address, then the real domain).
    return JSON.parse(raw, (key, value) => (key === "url" && typeof value === "string" ? siteLink(value) : value));
  } catch {
    return null;
  }
}

const OWN_HOST = /^https?:\/\/(?:[a-z0-9-]+\.hostingersite\.com|(?:www\.)?syndyemadefoundation\.org)(?=\/|$)/i;

/** Rewrite a link to one of the Foundation's own site addresses onto the current site address. */
export function siteLink(url: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.syndyemadefoundation.org").replace(/\/+$/, "");
  return url.replace(OWN_HOST, base);
}
