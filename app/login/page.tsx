import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/submitButton";
import { FaGithub } from "react-icons/fa";
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
          <Dialog>
            <DialogTrigger>
              <Button className="flex gap-2">Github</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-lg">Requirements</DialogTitle>
                <DialogDescription className="space-y-2">
                  <p className="text-base">
                    You need to enable the following things:-
                  </p>
                  <ul className="list-decimal list-inside space-y-0.5">
                    <li>
                      You are required to install Vercel app in your Github
                      Account.
                    </li>
                    <li>
                      You will be required to approve the permission which will
                      allow Vercel to automatically create deployments for blog
                      websites from Github.
                    </li>
                    <li>
                      Deleting the site, doesn't delete the repo created in
                      Github, and the project created in Vercel.
                    </li>
                  </ul>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <form
                  action={async () => {
                    "use server";
                    await redirect("/api/auth/github");
                  }}
                >
                  <SubmitButton className="flex gap-2">
                    <FaGithub /> Login with Github
                  </SubmitButton>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </article>
      </section>
      <section className="w-full"></section>
    </section>
  );
}
// <Grid columns="2" gap="3" width="auto">
//   <Flex
//     justify={"center"}
//     align={"center"}
//     className="h-screen bg-gray-400"
//   >
//     <Flex
//       width="20rem"
//       height="30rem"
//       direction={"column"}
//       justify={"start"}
//       align="center"
//       className=""
//     >
//       <Heading as="h1">Login</Heading>
//     </Flex>
//   </Flex>
// </Grid>
