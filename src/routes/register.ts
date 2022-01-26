import invariant from 'invariant';
import { ActionFunction, redirect } from 'remix';

import { userService } from '../server/bootstrap.server';
import { getSession, commitSession, destroySession, SessionCookieProperties } from '../cookies';

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const currentUserId = session.get(SessionCookieProperties.USER_ID);
  if (!currentUserId) {
    try {
      const formData = await request.formData();
      const id = formData.get('id') as string;
      const password = formData.get('password') as string;
      invariant(id, 'id field is required.');
      invariant(password, 'password field is required.');

      await userService.registerUser({ id, password });

      session.set(SessionCookieProperties.USER_ID, id);

      return redirect(`/user?id=${id}`, {
        headers: { 'Set-Cookie': await commitSession(session) },
      });
    } catch (err) {
      return redirect(`/login?how=${(err as any).code}`, {
        headers: { 'Set-Cookie': await destroySession(session) },
      });
    }
  } else {
    return redirect('/login?how=user', {
      headers: { 'Set-Cookie': await destroySession(session) },
    });
  }
};
