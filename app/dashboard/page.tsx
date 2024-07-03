import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import CardSite from "@/components/cardSites";
import { getFn } from "../actions/site/actions";

export default async function Page() {
  const sites = await getFn();
  return (
    <>
      <h1 className="my-4 text-xl font-medium">Dashboard</h1>
      <section className="space-y-5">
        <div className="my-2 flex items-center justify-between">
          <h2 className="text-lg font-medium">Sites</h2>
          <Link href="dashboard/sites/add">
            <Button>New +</Button>
          </Link>
        </div>
        {!sites ||
          (!sites.length && (
            <section className="flex h-40 w-full items-center justify-center rounded border">
              <p className="text-center text-base">0 Sites</p>
            </section>
          ))}
        {sites && sites.length > 0 && (
          <section className="flex w-full items-center">
            {sites &&
              sites.map(
                (data: {
                  userId: string;
                  id: string;
                  description: string;
                  name: string;
                  fullName: string;
                }) => (
                  <CardSite
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    description={data.description}
                    fullname={data.fullName}
                  />
                ),
              )}
          </section>
        )}
      </section>
    </>
  );
}
