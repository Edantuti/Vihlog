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

export default async function Home() {
  const { user } = await getUser();

  return (
    <>
      <header className="flex h-16 items-center justify-between  border-b px-36 dark:bg-slate-950">
        <Heading className="text-black">Blog</Heading>

        {user && (
          <div className="flex gap-2">
            <Button variant={"secondary"} className="px-4 py-1">
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
    </>
  );
}
