"use server";
import { lucia } from "@/utils/auth";
import { cookies } from "next/headers";
import TurnDownService from "turndown";
import { db } from "@/utils/db";
import { notFound, redirect } from "next/navigation";
import matter from "gray-matter";
import showdown from "showdown";
import { revalidatePath } from "next/cache";

export async function editFn(blogId: string, content: string, data: FormData) {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  const token = cookies().get("token");
  if (!sessionId) return;
  const { user } = await lucia.validateSession(sessionId);
  if (!user || !token) return;
  if (!data.get("title") || !content) return;
  const blog = await db.blog.findUnique({
    where: { id: blogId },
    include: { sites: true },
  });
  if (!blog) {
    return;
  }
  const fileContent = await fetch(
    `https://api.github.com/repos/${blog.sites.fullName}/contents/blog/${blog.title}.mdx`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    },
  );

  const file = await fileContent.json();
  if (!fileContent.ok) {
    console.log(file);
    return { error: file };
  }
  const title = data.get("title")?.toString() ?? blog.title;
  const description = data.get("description")?.toString() ?? blog.description;
  const turndown = new TurnDownService();
  const mdContent = turndown.turndown(content);
  const IDK = blogTemplate(
    title,
    description,
    blog.createdAt.getTime(),
    new Date().getTime(),
    mdContent,
  );
  if (title === blog.title) {
    const res = await fetch(
      `https://api.github.com/repos/${blog.sites.fullName}/contents/blog/${blog.title}.mdx`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          message: `Updating ${blog.title}`,
          content: IDK,
          sha: file.sha,
        }),
      },
    );
    let res_data = await res.json();
    if (!res.ok) {
      console.log(res_data);
      return { error: res_data };
    }
    await db.blog.update({
      where: { id: blogId },
      data: {
        title: title,
        description: description,
      },
    });
    return;
  }
  let response = await fetch(
    `https://api.github.com/repos/${blog.sites.fullName}/contents/blog/${blog.title}.mdx`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        message: `Deleting ${blog.title}`,
        sha: file.sha,
      }),
    },
  );
  if (!response.ok) {
    return { error: "Something went wrong" };
  }
  await db.blog.update({
    where: { id: blogId },
    data: {
      title: title,
      description: description,
    },
  });

  response = await fetch(
    `https://api.github.com/repos/${blog.sites.fullName}/contents/blog/${title}.mdx`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        message: `Creating ${title}`,
        content: IDK,
      }),
    },
  );
  let res_data = await response.json();
  if (!response.ok) {
    console.log(res_data);
    return { error: res_data };
  }
}
export async function retrieveFn(blogId: string) {
  const blog = await db.blog.findUnique({
    where: { id: blogId },
    include: { sites: true },
  });
  const token = cookies().get("token");
  if (!token) {
    redirect("/login");
  }
  if (!blog) {
    return notFound();
  }
  const response = await fetch(
    `https://api.github.com/repos/${blog.sites.fullName}/contents/blog/${blog.title}.mdx`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    },
  );
  const res_data = await response.json();
  if (!response.ok) {
    console.log(res_data);
    return;
  }
  const content = decodeURIComponent(escape(atob(res_data.content)));
  const {
    data,
    content: blogContent,
  }: { data: { [key: string]: any }; content: string } = matter(content);
  const converter = new showdown.Converter();
  const da = converter.makeHtml(blogContent);
  return { data, content: da };
}
//TODO:Rewrite required
export async function deleteFn(blogId: string) {
  //TODO: Add transaction to this database transaction
  const blog = await db.blog.findUnique({
    where: { id: blogId },
    include: { sites: true },
  });
  const token = cookies().get("token");
  if (!blog || !token) return;
  //TODO: Check this out
  console.log(
    `https://api.github.com/repos/${blog.sites.fullName}/contents/blog/${blog.title}.mdx`,
  );
  let response = await fetch(
    `https://api.github.com/repos/${blog.sites.fullName}/contents/blog/${blog.title}.mdx`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    },
  );
  let res_data = await response.json();
  if (!response.ok) {
    console.log(res_data);
    return { error: res_data };
  }
  response = await fetch(
    `https://api.github.com/repos/${blog.sites.fullName}/contents/blog/${blog.title}.mdx`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        message: `Deleting ${blog.title}`,
        sha: res_data.sha,
      }),
    },
  );
  res_data = await response.json();
  if (!response.ok) {
    console.log(res_data);
    return { error: res_data };
  }
  await db.blog.delete({ where: { id: blogId } });
  revalidatePath("/dashboard/blogs");
}

export async function createFn(data: FormData) {
  if (!data.get("name") || !data.get("description") || !data.get("site"))
    return;
  const site: { id: string; fullName: string } = JSON.parse(
    data.get("site")!.toString(),
  );
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return;
  const { user } = await lucia.validateSession(sessionId);
  const token = cookies().get("token");
  const content = blogTemplate(
    data.get("name")!.toString(),
    data.get("description")!.toString(),
    new Date().getTime(),
    new Date().getTime(),
    `# Hello world \nLooking forward to this.`,
  );

  const response = await fetch(
    `https://api.github.com/repos/${site.fullName}/contents/blog/${data.get("name")!.toString()}.mdx`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token!.value}`,
      },
      body: JSON.stringify({
        message: `Creating ${data.get("name")!.toString()}`,
        content: content,
      }),
    },
  );
  const res_data = await response.json();
  if (!response.ok) {
    console.error(res_data);
    return { error: res_data };
  }
  await db.blog.create({
    data: {
      title: data.get("name")!.toString(),
      description: data.get("description")!.toString(),
      sitesId: site.id,
      userId: user!.id,
    },
  });
  revalidatePath("/dashboard/blogs");
  return;
}

function blogTemplate(
  title: string,
  description: string | null,
  time: number,
  updated_time: number,
  content: string,
) {
  const data = `---
title: "${title}"
description: "${description}"
time: ${time}
updated_time: ${updated_time}
---
${content}
  `;

  return btoa(unescape(encodeURIComponent(data)));
}
