import { ActionFunction, redirect } from 'remix';

import { getSession, SessionCookieProperties } from '../cookies';
import {
  checkBadRequest,
  getSearchParamsFromRequest,
  URLSearchParamFields,
  URLSearchParamHowValue,
} from '../utils/http-handlers';
import { UserLoginErrorCode } from '../utils/user-login-error-code';

export const loader: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get(SessionCookieProperties.USER_ID);

  const searchParams = getSearchParamsFromRequest(request);
  const id = searchParams.get(URLSearchParamFields.ID);
  const how = searchParams.get(URLSearchParamFields.HOW);
  const goto = searchParams.get(URLSearchParamFields.GOTO);

  if (!userId) {
    return redirect(`/login?how=${UserLoginErrorCode.LOGIN_UPVOTE}&goto=${goto}`);
  }

  checkBadRequest(id, 'item "id" is required to hide.');

  if (how === URLSearchParamHowValue.UNVOTE) {
    // Unhide the item
  } else {
    // Hide the item
  }

  return redirect(goto || `/item?id=${id}`);
};
