"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/submitButton";
import { FaGithub } from "react-icons/fa";
import { loginAction } from "@/app/actions/auth/actions";
export default function LoginDialog() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(()=>{
    setIsMounted(true)
  },[])
  if(!isMounted){
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex gap-2 w-80"><FaGithub />Github</Button>
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
                You are required to install Vercel app in your Github Account.
              </li>
              <li>
                You will be required to approve the permission which will allow
                Vercel to automatically create deployments for blog websites
                from Github.
              </li>
              <li>
                Deleting the site, doesn{"'"}t delete the repo created in
                Github, and the project created in Vercel.
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
    <form
      action={async () => {
        await loginAction() ;
      }}
    >
      <SubmitButton className="flex gap-2">
        <FaGithub /> Login with Github
      </SubmitButton>
    </form>
</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
