import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const {
    nextUrl: { searchParams, origin },
  } = request;
  const cookie = cookies();
  const id = searchParams.get("id");
  const isScanned = cookie.get(id ?? "");
  if (!isScanned) {
    await fetch(`${process.env.NEXT_PUBLIC_API}/qr-code/scan?id=${id}`);

    cookie.set(id!, "yes");
  }

  return NextResponse.redirect(new URL("/", origin));
}
