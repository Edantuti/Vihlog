import { db } from "@/utils/db";
import { redirect } from "next/navigation";
import { Forms } from "./_components/forms";
export default async function Page({ params }: { params: { slug: string } }) {
  const site = await db.sites.findFirst({
    where: { name: decodeURI(params.slug) },
  });
  if (!site) {
    redirect("/dashboard/sites/add");
  }
  return (
    <Forms
      site={site as { name: string; description: string }}
      params={params}
    />
  );
}
