import { ActionFunction, redirect } from 'remix';

import { itemService } from '../server/bootstrap.server';
import {
  checkBadRequest,
  getSearchParamsFromRequest,
  URLSearchParamFields,
  URLSearchParamHowValue,
} from '../utils/http-handlers';
import { UserLoginErrorCode } from '../utils/user-login-error-code';
import { getSession, SessionCookieProperties } from '../cookies';

/**
 * vote endpoint is to vote up a news item or comment
 */
export const loader: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  const searchParams = getSearchParamsFromRequest(request);
  const id = searchParams.get(URLSearchParamFields.ID);
  const how = searchParams.get(URLSearchParamFields.HOW);
  const goto = searchParams.get(URLSearchParamFields.GOTO);

  const currentUserId = session.get(SessionCookieProperties.USER_ID);
  if (!currentUserId) {
    return redirect(`/login?how=${UserLoginErrorCode.LOGIN_UPVOTE}goto=${goto}`);
  }

  checkBadRequest(id, '"id" must be provided.');

  if (how === URLSearchParamHowValue.UNVOTE) {
    // Unvote
    return;
  } else {
    await itemService.upvoteItem(+id, currentUserId);
    return redirect(goto || '/');
  }
};
