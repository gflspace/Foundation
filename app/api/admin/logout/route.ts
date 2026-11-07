import { seeOther } from "@/lib/server/redirect";
import { NextResponse } from "next/server";
import { COOKIE } from "@/lib/server/admin-auth";

export async function POST(req: Request) {
  const res = seeOther("/admin");
  res.cookies.set(COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
