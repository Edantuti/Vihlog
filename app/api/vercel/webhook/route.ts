import { db } from "@/utils/db";
import { getUser } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  //TODO: Requires a Fix
  const data = await req.json();
  if (data.type === "deployment.created") {
    const site = await db.sites.findFirst({
      where: {
        name: data.payload.name,
      },
    });
    await db.sites.update({
      data: {
        deploy: false,
      },
      where: {
        id: site!.id,
      },
    });
    revalidatePath("/");
  }
  if (data.type === "deployment.succeeded") {
    const site = await db.sites.findFirst({
      where: {
        name: data.payload.name,
      },
    });
    await db.sites.update({
      data: {
        deploy: true,
      },
      where: {
        id: site!.id,
      },
    });
    revalidatePath("/");
  }
  return NextResponse.json(null);
}
