import invariant from 'invariant';
import { Link, LoaderFunction, useLoaderData, useCatch, MetaFunction } from 'remix';
import * as React from 'react';

import { convertNumberToTimeAgo } from '../../utils/convert-number-to-time-ago';
import { BlankLayout } from '../../layouts/blank-layout';
import { MainLayout } from '../../layouts/main-layout';
import { userService } from '../../server/bootstrap.server';
import { MeContext } from '../../utils/context';
import {
  checkNotFound,
  getSearchParamsFromRequest,
  URLSearchParamFields,
} from '../../utils/http-handlers';

export interface IUserPageLoader {
  user: {
    id: string;
    about: string;
    creationTime: number;
    email: string;
    karma: number;
  };
}
export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = getSearchParamsFromRequest(request);
  const userId = searchParams.get(URLSearchParamFields.ID);
  invariant(userId, '"id" must be provided.');

  const rawUser = await userService.getUser(userId);
  checkNotFound(rawUser, 'No such user.');

  const user = {
    id: rawUser.id,
    about: rawUser.about,
    creationTime: rawUser.creationTime,
    email: rawUser.email,
    karma: rawUser.karma,
  };

  return { user };
};

export const meta: MetaFunction = ({ location }) => {
  const params = new URLSearchParams(location.search);

  return { title: `Profile: ${params.get('id')} | Hacker News Clone` };
};

function UserPage(): JSX.Element {
  const { user } = useLoaderData<IUserPageLoader>();
  const me = React.useContext(MeContext);

  let about = user.about || '';
  let email = user.email || '';

  const onAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    about = e.target.value;
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    email = e.target.value;
  };

  if (!!me && user.id === me.id) {
    return (
      <MainLayout isFooterVisible={false}>
        <tr>
          <td>
            <form className="profileform" method="post" action="/xuser">
              <input type="hidden" name="id" value={user.id} />
              <input type="hidden" name="hmac" value="71104445c3c41b4167c38db67a656e610d5fbad9" />
              <table style={{ border: '0px' }}>
                <tbody>
                  <tr className="athing">
                    <td style={{ verticalAlign: 'top' }}>user:</td>
                    <td>
                      <Link
                        className="hnuser"
                        style={{ color: '#3c963c' }}
                        to={`/user?id=${user.id}`}
                      >
                        {user.id}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>created:</td>
                    <td>{convertNumberToTimeAgo(user.creationTime)}</td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>karma:</td>
                    <td>{user.karma}</td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>about:</td>
                    <td>
                      <textarea
                        cols={60}
                        defaultValue={about}
                        name="about"
                        onChange={onAboutChange}
                        rows={5}
                        style={{ fontSize: '-2' }}
                        wrap="virtual"
                      />
                      <Link to="/formatdoc" tabIndex={-1} style={{ color: '#afafaf' }}>
                        help
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>email:</td>
                    <td>
                      <input
                        type="text"
                        name="uemail"
                        defaultValue={email}
                        onChange={onEmailChange}
                        size={60}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>showdead:</td>
                    <td>
                      <select defaultValue="no" name="showd">
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>noprocrast:</td>
                    <td>
                      <select defaultValue="no" name="nopro">
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>maxvisit:</td>
                    <td>
                      <input type="text" name="maxv" defaultValue="20" size={16} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>minaway:</td>
                    <td>
                      <input type="text" name="mina" defaultValue="180" size={16} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>delay:</td>
                    <td>
                      <input type="text" name="delay" defaultValue="0" size={16} />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link to="/changepw">
                        <u>change password</u>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link to={`/submitted?id=${user.id}`}>
                        <u>submissions</u>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link to={`/threads?id=${user.id}`}>
                        <u>comments</u>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link to="/hidden">
                        <u>hidden</u>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link to={`/upvoted?id=${user.id}`}>
                        <u>upvoted submissions</u>
                      </Link>
                      {' / '}
                      <Link to={`/upvoted?id=${user.id}&comments=t`}>
                        <u>comments</u>
                      </Link>
                      &nbsp;&nbsp;
                      <span style={{ fontStyle: 'italic' }}>(private)</span>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link to={`/favorites?id=${user.id}`}>
                        <u>favorite submissions</u>
                      </Link>
                      {' / '}
                      <Link to={`/favorites?id=${user.id}&amp;comments=t`}>
                        <u>comments</u>
                      </Link>
                      &nbsp;&nbsp;
                      <span style={{ fontStyle: 'italic' }}>(shared)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <input type="submit" value="update" />
            </form>
            <br />
            <br />
          </td>
        </tr>
      </MainLayout>
    );
  }

  return (
    <MainLayout isFooterVisible={false}>
      <tr>
        <td>
          <table style={{ border: '0' }}>
            <tbody>
              <tr className="athing">
                <td style={{ verticalAlign: 'top' }}>user:</td>
                <td>
                  <a href={`user?id=${user.id}`} className="hnuser">
                    {user.id}
                  </a>
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }}>created:</td>
                <td>{convertNumberToTimeAgo(user.creationTime)}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }}>karma:</td>
                <td>{user.karma}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }}>about:</td>
                <td dangerouslySetInnerHTML={{ __html: user.about }} />
              </tr>
              <tr>
                <td />
                <td>
                  <a href={`submitted?id=${user.id}`}>
                    <u>submissions</u>
                  </a>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href={`threads?id=${user.id}`}>
                    <u>comments</u>
                  </a>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href={`favorites?id=${user.id}`}>
                    <u>favorites</u>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
        </td>
      </tr>
    </MainLayout>
  );
}

export function CatchBoundary() {
  const error = useCatch();

  return <BlankLayout>{error.data}</BlankLayout>;
}

export default UserPage;
