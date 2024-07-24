import { redirect } from "next/navigation";
import { getUser } from "@/utils/auth";
import LoginDialog from "./_components/LoginDialog";
import LoginSection from "./_components/LoginSection";
export default async function Page() {
  const { user, session } = await getUser();

  if (session || user) {
    return redirect("/");
  }
  return (
    <section className="md:grid grid-cols-2 min-h-screen">
      <section className="w-full bg-slate-100 flex items-center justify-center relative">
        <article className="space-y-5">
          <h3 className="text-xl text-center font-semibold">Sign Up to <span className="text-blue-700">Vihlog</span></h3>
          <LoginDialog />
        </article>
      </section>
      <LoginSection />
    </section>
  );
}
