import { NextResponse } from "next/server";
import { verifyProfile } from "@/lib/verify/check";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { platformSlug?: string; username?: string } | null;
  const platformSlug = body?.platformSlug;
  const username = body?.username;

  if (!platformSlug || !username || typeof username !== "string") {
    return NextResponse.json({ status: "format_invalid" }, { status: 400 });
  }

  const status = await verifyProfile(platformSlug, username);
  return NextResponse.json({ status });
}
