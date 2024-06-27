import { github } from '@/utils/auth';
import { generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function GET(req: NextRequest, res: NextResponse) {
  const state = generateState();
  
  const url = await github.createAuthorizationURL(state,{
    scopes:['repo','delete_repo']
  })

  return NextResponse.json(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      'Set-Cookie': serializeCookie('github_oauth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 10,
        sameSite:"lax",
        path: '/',
      }),
    },
  });
}

export { GET as GET };
