import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  if (password === correctPassword) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
