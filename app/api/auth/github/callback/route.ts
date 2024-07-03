import { github, lucia } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db } from "@/utils/db";

//TODO: Creating a route for onboarding using both gmail and github possible

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.json(null, { status: 400 });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const githubUser: GitHubUser = await githubUserResponse.json();
    // Replace this with your own DB client.
    let existingUser = await db.user.findUnique({
      where: {
        github_id: githubUser.id,
      },
    });

    if (!existingUser) {
      //TODO: Required to make a onboarding route from here
      existingUser = await db.user.create({
        data: {
          id: generateId(15),
          name: githubUser.name,
          github_id: githubUser.id,
          email_verified: false,
          photo: githubUser.avatar_url,
        },
      });
    }
    const session = await lucia.createSession(existingUser.id, {
      accessToken: tokens.accessToken,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    cookies().set("token", tokens.accessToken);
  } catch (error) {
    console.error(error);
    if (error instanceof OAuth2RequestError) {
      return NextResponse.json(null, { status: 400 });
    }
    return NextResponse.json(null, { status: 500 });
  }
  return NextResponse.json(null, { status: 302, headers: { Location: "/" } });
}

interface GitHubUser {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
}
