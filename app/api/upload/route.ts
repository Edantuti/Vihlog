import { NextRequest, NextResponse } from "next/server"
import { lucia } from "@/utils/auth";
import { cookies } from "next/headers";
import { db } from "@/utils/db";

async function POST(req:NextRequest){
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    const data = await req.json()
    if(!sessionId) return NextResponse.json({message:"Session Not Found"}, {status:400})
    const {user} = await lucia.validateSession(sessionId);
    if(!user) return NextResponse.json({message:"Invalid Session ID"}, {status:400})
    const token = await cookies().get("token")
    if(!token) return NextResponse.json({message:"Token Not Found"}, {status:404})
      console.log(token.value)
    const siteFullName = await db.blog.findFirst({
        where:{title:data.blogName, userId:user.id },select:{
            sites:{
                select:{
                    fullName:true
                }
            }
        }
    })
    const mdFormatMap = new Map<string,string>()
    mdFormatMap.set('data:image/jpeg',"jpeg")
    mdFormatMap.set('data:image/png',"png")
    mdFormatMap.set('data:image/octet-stream', "webp")
    const response = await fetch(
     `https://api.github.com/repos/${siteFullName?.sites.fullName}/contents/assets/${data.name}.${mdFormatMap.get(data.image.split(';')[0])}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        message:`Creating ${data.name}`,
        content:data.image.split(',')[1] 
      }),
    }
    )
    const res_data = await response.json();
    if(!response.ok){
        console.log(res_data)
        return NextResponse.json({message:"Some error"}, {status:500})
    }
    return NextResponse.json({url:res_data.content.download_url})
}

export {POST as POST}