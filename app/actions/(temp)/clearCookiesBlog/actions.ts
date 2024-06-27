"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function clearBlogs(){
    cookies().set("sites","[]")
    revalidatePath("/")
    return;
}

export async function deleteFn(fullname:string){
    const token = cookies().get("token")
    if(!token) return;
    let response = await fetch(`https://api.github.com/repos/${fullname}`,{
        headers:{
            "Authorization":`Bearer ${token.value}`
        }
    })
    if(!response.ok) return;
    response = await fetch(`https://api.github.com/repos/${fullname}`,{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${token.value}`
        }
    })
    const getSites:{name:string, full_name:string, description:string}[] = JSON.parse(cookies().get("sites")?.value || "[]")
    cookies().set("sites", JSON.stringify(getSites.filter((value:{name:string, full_name:string, description:string})=>value.full_name!==fullname)))
    revalidatePath('/')
}