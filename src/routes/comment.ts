import { ActionFunction, redirect } from 'remix';

import { commentService } from '../server/bootstrap.server';
import { getSession, SessionCookieProperties } from '../cookies';
import { checkBadRequest, checkUnauthorized } from '../utils/http-handlers';

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const userId = session.get(SessionCookieProperties.USER_ID) as string;
  checkUnauthorized(userId, 'Must be logged in to comment.');

  const formData = await request.formData();
  const parentId = +formData.get('parent')! as number;
  checkBadRequest(parentId, '"parent" is required.');
  const text = formData.get('text') as string;
  checkBadRequest(text, '"text" is required.');
  const goto = formData.get('goto') as string;

  await commentService.createComment(parentId, userId, text, userId);

  return redirect(goto || `/item?${parentId}`);
};
