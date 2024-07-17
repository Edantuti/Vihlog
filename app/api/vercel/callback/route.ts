import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");
  if (!code) {
    return NextResponse.json(null, { status: 400 });
  }
  if (!next) {
    return NextResponse.json(null, { status: 400 });
  }
  const tokens = await fetch("https://api.vercel.com/v2/oauth/access_token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.VERCEL_CLIENT_ID!,
      client_secret: process.env.VERCEL_CLIENT_SECRET!,
      code: code,
      redirect_uri: `${process.env.BACKEND_URL}/api/vercel/callback`,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const res_data = await tokens.json();
  if (!tokens.ok) {
    console.log("ERROR");
    console.log(res_data);
    return NextResponse.json(res_data, { status: 400 });
  }
  cookies().set("vercel_tokens", JSON.stringify(res_data));
  await fetch(next);
  return NextResponse.json(null, {
    status: 302,
    headers: { Location: "/dashboard" },
  });
}
