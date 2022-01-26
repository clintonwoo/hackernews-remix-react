import { ActionFunction, redirect } from 'remix';

import { userService } from '../server/bootstrap.server';
import { checkUnauthorized, checkForbidden, checkBadRequest } from '../utils/http-handlers';
import { getSession, SessionCookieProperties } from '../cookies';

/**
 * xuser endpoint is to update the user information
 */
export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const formData = await request.formData();

  const currentUserId = session.get(SessionCookieProperties.USER_ID);
  checkUnauthorized(currentUserId, 'Must be logged in.');

  const id = formData.get('id') as string;
  checkBadRequest(id, '"id" must be provided.');
  checkForbidden(
    currentUserId && currentUserId === id,
    'User can only update their own profile data.'
  );

  const about = formData.get('about') as string;
  const email = formData.get('uemail') as string;

  await userService.updateUser({ id, about, email });

  return redirect(`/user?id=${id}`);
};
