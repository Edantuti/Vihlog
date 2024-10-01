import { getUser, logout } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Heading, Text, Box } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FlipWords } from "@/components/ui/flip-words";

export default async function Home() {
  const { user } = await getUser();

  return (
    <>
      <header className="flex h-16 items-center justify-between  border-b px-36 dark:bg-slate-950">
        <Heading className="text-black">Vihlog</Heading>

        {user && (
          <div className="flex gap-2">
            <Button asChild variant={"secondary"} className="px-4 py-1">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <form action={logout}>
              <Button variant={"outline"}>Logout</Button>
            </form>
          </div>
        )}
        {!user && (
          <Link href="/login">
            <Button variant={"outline"}>Sign in</Button>
          </Link>
        )}
      </header>
      <AuroraBackground>
        <div className="text-6xl">
          Build and manage your
          <FlipWords
            words={["awesome", "elegant", "fantastic", "fabulous"]}
          />{" "}
          <br />
          blogging websites with <span className="text-blue-700">Vihlog</span>
        </div>
      </AuroraBackground>
      <footer className="h-16 bg-neutral-100 mx-auto border-t flex items-center justify-center">
        <p className="text-center">Copyright &copy; 2024 by Edantuti</p>
      </footer>
    </>
  );
}
