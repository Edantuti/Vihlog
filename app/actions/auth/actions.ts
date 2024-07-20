"use server"
import { redirect } from "next/navigation";
export async function loginAction(){
        await redirect("/api/auth/github");
}