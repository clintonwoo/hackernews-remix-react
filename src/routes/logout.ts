import { ActionFunction, redirect } from 'remix';

import { getSession, destroySession } from '../cookies';

export const loader: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect('/login', {
    headers: { 'Set-Cookie': await destroySession(session) },
  });
};
