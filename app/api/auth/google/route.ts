import { google } from '@/utils/auth';
import { generateCodeVerifier, generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function GET(req: NextRequest, res: NextResponse) {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  cookies().set('codeVerifier', codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ['profile', 'email'],
  });

  return NextResponse.json(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      'Set-Cookie': serializeCookie('google_oauth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 10,
        path: '/',
      }),
    },
  });
}

export { GET as GET };
