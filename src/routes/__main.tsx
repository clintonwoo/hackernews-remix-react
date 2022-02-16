import { LoaderFunction, Outlet, useLoaderData } from 'remix';

import { getSession, SessionCookieProperties } from '../cookies';
import { userService } from '../server/bootstrap.server';
import { MeContext } from '../utils/context';

import newsCss from '../assets/news.css';

export const links = () => [{ rel: 'stylesheet', href: newsCss, type: 'text/css' }];

export interface IMainLoader {
  me: { id: string; karma: number } | undefined;
}
export const loader: LoaderFunction = async (req) => {
  const session = await getSession(req.request.headers.get('Cookie'));

  const loggedInUserId = session.get(SessionCookieProperties.USER_ID);

  const loggedInUser = loggedInUserId ? await userService.getUser(loggedInUserId) : undefined;

  const me = loggedInUser && { id: loggedInUser.id, karma: loggedInUser.karma };

  return { me };
};

export default function Main() {
  const { me } = useLoaderData<IMainLoader>();

  return (
    <MeContext.Provider value={me}>
      <Outlet />
    </MeContext.Provider>
  );
}
