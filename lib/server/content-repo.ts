import { readFile } from "node:fs/promises";
import path from "node:path";
import registry from "@/ops/content-registry.json";

/** Google Drive content repository (private: shown only inside /admin). */
export const driveRoot = `https://drive.google.com/drive/folders/${registry.root.driveId}`;

const UPLOAD = ["Photos", "Videos", "Blog-Posts", "News", "Announcements", "Press-Releases", "Documents"];
export const uploadFolders = registry.folders
  .filter((f) => f.path.startsWith("01-INCOMING-CONTENT/") && UPLOAD.includes(f.path.split("/")[1]))
  .map((f) => ({ name: f.path.split("/")[1].replace(/-/g, " "), url: `https://drive.google.com/drive/folders/${f.driveId}`, destination: f.destination }));

export type MaintenanceRun = {
  lastRun: string | null;
  summary: string;
  processed: { file: string; folder: string; outcome: string }[];
  pending: { file: string; question: string }[];
  published: { title: string; url: string }[];
  issues: string[];
};

/** Written by the daily maintenance job (ops/maintenance/last-run.json, committed + deployed). */
export async function lastMaintenanceRun(): Promise<MaintenanceRun | null> {
  try {
    return JSON.parse(await readFile(path.join(process.cwd(), "ops/maintenance/last-run.json"), "utf8"));
  } catch {
    return null;
  }
}
