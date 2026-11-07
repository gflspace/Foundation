import { NextResponse } from "next/server";
import { COOKIE } from "@/lib/server/admin-auth";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set(COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
