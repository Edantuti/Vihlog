"use server";
import { lucia } from "@/utils/auth";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createFn(data: FormData) {
  if (!data.get("name") || !data.get("description")) return;
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  const vercel_token = cookies().get("vercel_tokens");
  if (!vercel_token) {
    redirect("https://vercel.com/integrations/lmao-testing/new");
  }
  const token = cookies().get("token");
  const access_token = JSON.parse(vercel_token.value).access_token;
  if (!sessionId) {
    redirect("/login");
  }
  const { user } = await lucia.validateSession(sessionId);
  if (!token || !user) {
    redirect("/login");
  }
  let response = await fetch(
    `https://api.github.com/repos/edantuti/sasta-blog-template/generate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: `application/vnd.github+json`,
      },
      body: JSON.stringify({
        name: data.get("name")?.toString(),
        description: data.get("description")?.toString(),
        include_all_branches: false,
        private: Boolean(data.get("visible")) || false,
      }),
    },
  );
  let res_data = await response.json();
  if (!response.ok) {
    console.error(res_data);
    return { error: res_data };
  }
  const repoID = res_data.id;
  const site = await db.sites.create({
    data: {
      userId: user.id,
      description: res_data.description,
      name: res_data.name,
      fullName: res_data.full_name,
      private:Boolean(data.get('visible')) || false
    },
  });
  response = await fetch(`https://api.vercel.com/v10/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      name: site.name.toLowerCase(),
      gitRepository: {
        repo: site.fullName,
        type: "github",
      },
      framework: "nextjs",
    }),
  });
  res_data = await response.json();
  if (!response.ok) {
    console.log(res_data);
    return { error: res_data };
  }
  const gitSource: {
    ref: string;
    repoId: string | number;
    type: "github";
    sha?: string;
  } = {
    ref: "main",
    repoId: repoID,
    type: "github",
  };

  response = await fetch(`https://api.vercel.com/v13/deployments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      name: site.name,
      gitSource: gitSource,
    }),
  });
  revalidatePath("/dashboard");
  return;
}

export async function editFn(siteName: string, data: FormData) {
  const token = cookies().get("token");
  const vercel_token = cookies().get("vercel_tokens");
  if (!vercel_token) {
    redirect("https://vercel.com/integrations/lmao-testing/new");
  }
  const access_token = JSON.parse(vercel_token.value);
  const site = await db.sites.findFirst({ where: { name: siteName } });
  if (!token) {
    redirect("/login");
  }
  if (!site) {
    redirect("/dashboard/sites/add");
  }
  const payload: { name?: string; description?: string; private?: boolean } =
    {};
  if (data.get("name")) {
    payload.name = data.get("name")!.toString();
  }
  if (data.get("description")) {
    payload.description = data.get("description")!.toString();
  }
  if (data.get("visible")) {
    payload.private = Boolean(data.get("visible")) || false;
  }
  let response = await fetch(`https://api.github.com/repos/${site!.fullName}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify(payload),
  });
  let res_data = await response.json();
  if (!response.ok) {
    console.log(res_data);
    return { error: res_data };
  }
  if (data.get("name")) {
    response = await fetch(
      `https://api.vercel.com/v9/projects/${site!.name.toLowerCase()}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access_token.access_token}`,
        },
        body: JSON.stringify({
          name: payload.name,
        }),
      },
    );
    res_data = await response.json();
    if (!response.ok) {
      console.log(res_data);
      return { error: res_data };
    }
  }
  await db.sites.update({
    where: { id: site.id },
    data: {
      name: res_data.name,
      fullName: res_data.full_name,
      description: res_data.description,
      private:Boolean(data.get('visible')) || false
    },
  });
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function getWithBlogFn() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  const token = cookies().get("token");
  if (!sessionId) return;
  const { user } = await lucia.validateSession(sessionId);
  if (!token || !user) return;
  const site = await db.sites.findMany({
    where: {
      userId: user.id,
    },
    include: {
      Blog: true,
    },
  });
  if (!site) return [];
  return site;
}
export async function getFn() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  const token = cookies().get("token");
  if (!sessionId) return;
  const { user } = await lucia.validateSession(sessionId);
  if (!token || !user) return;
  const site = await db.sites.findMany({
    where: {
      userId: user.id,
    },
  });
  if (!site) return [];
  return site;
}
//TODO:Transaction is to be implemented.
export async function deleteFn(id: string) {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  const token = cookies().get("token");
  if (!sessionId) return;
  const { user } = await lucia.validateSession(sessionId);
  if (!token || !user) return;
  await db.sites.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/dashboard");
}

export async function deploy(id: string) {
  const token = cookies().get("vercel_tokens");
  const site = await db.sites.findUnique({ where: { id: id } });
  const auth_token = cookies().get("token");
  if (!token) {
    redirect("https://vercel.com/integrations/lmao-testing/new");
  }
  if (!auth_token) {
    redirect("/login");
  }
  if (!site) {
    redirect("/dashboard/sites/add");
  }
  const access_token = JSON.parse(token.value).access_token;
  let response = await fetch(
    `https://api.vercel.com/v9/projects/${site.name}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  let res_data = await response.json();
  if (!response.ok) {
    console.log(res_data);
    return { error: res_data };
  }
  //gets the host url
  const deployments = res_data.latestDeployments[0].alias[0];
  redirect(`https://${deployments}`);
}
