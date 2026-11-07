import { NextResponse } from "next/server";

/**
 * 303 redirect with a relative Location. Behind Hostinger's proxy `req.url` is the internal
 * address (0.0.0.0:3000), so absolute redirects built from it send the browser nowhere.
 */
export const seeOther = (path: string) => new NextResponse(null, { status: 303, headers: { Location: path } });
