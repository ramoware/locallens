import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'local_lens_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export async function createSession(): Promise<string> {
  const sessionId = crypto.randomUUID();
  
  // Set cookie in the response
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
  
  return sessionId;
}

export async function getSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
  return sessionCookie?.value || null;
}

export async function getOrCreateSession(): Promise<string> {
  const existingSession = await getSessionId();
  if (existingSession) {
    return existingSession;
  }
  
  return await createSession();
}