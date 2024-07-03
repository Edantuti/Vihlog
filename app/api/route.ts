import { NextResponse, NextRequest } from "next/server";

async function GET(req: NextRequest) {
  return NextResponse.json({ testing: "testing" });
}

export { GET as GET };
