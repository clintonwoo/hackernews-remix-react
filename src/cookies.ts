import { createCookieSessionStorage } from 'remix';

export enum SessionCookieProperties {
  USER_ID = 'userId',
}

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  // a Cookie from `createCookie` or the same CookieOptions to create one
  cookie: {
    name: '__session',
    secrets: ['insecure_example'],
    sameSite: 'strict',
    maxAge: 604_800, // one week
  },
});
