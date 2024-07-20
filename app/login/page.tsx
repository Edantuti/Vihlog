import { redirect } from "next/navigation";
import { getUser } from "@/utils/auth";
import LoginDialog from "./_components/LoginDialog";
export default async function Page() {
  const { user, session } = await getUser();
  if (session || user) {
    return redirect("/");
  }
  return (
    <section className="md:grid grid-cols-2 min-h-screen">
      <section className="w-full bg-neutral-200 flex items-center justify-center">
        <article className="space-y-5">
          <h3 className="text-xl">Login</h3>
          <LoginDialog />
        </article>
      </section>
      <section className="w-full"></section>
    </section>
  );
}
