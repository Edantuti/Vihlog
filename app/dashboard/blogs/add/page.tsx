import { Forms } from "./_components/forms";
import { getFn } from "@/app/actions/site/actions";

//TODO:Rework required
export default async function Page() {
  const sites = await getFn();
  return (
    <Forms sites={sites as { name: string; id: string; fullName: string }[]} />
  );
}
