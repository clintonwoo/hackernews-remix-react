import { ErrorBoundaryComponent, Link, LoaderFunction, MetaFunction, useActionData } from 'remix';
import { ActionFunction, Form, redirect } from 'remix';

import { newsItemService } from '../../server/bootstrap.server';
import { MainLayout } from '../../layouts/main-layout';
import { getSession, SessionCookieProperties } from '../../cookies';
import { isValidStoryUrl } from '../../utils/is-valid-url';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const currentUserId = session.get(SessionCookieProperties.USER_ID);
  if (!currentUserId) {
    return redirect('/login?how=submit&goto=submit');
  }

  return null;
};

export const meta: MetaFunction = () => {
  return { title: 'Submit | Hacker News Clone' };
};

export interface ISubmitPageAction {
  title?: boolean;
  textOrUrl?: boolean;
  text?: boolean;
  url?: boolean;
}
export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const submitterId = session.get(SessionCookieProperties.USER_ID);
  if (!submitterId) {
    return redirect('/login?how=submit&goto=submit');
  }

  const formData = await request.formData();
  const title = formData.get('title');
  const text = formData.get('text');
  const url = formData.get('url');

  const errors: ISubmitPageAction = {};
  if (!title) errors.title = true;
  if (!text && !url) errors.textOrUrl = true;
  if (url && !isValidStoryUrl(url as string)) errors.url = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  const newsItem = await newsItemService.submitStory({ submitterId, title, text, url });

  return redirect(`/item?id=${newsItem.id}`);
};

function SubmitPage(): JSX.Element {
  const actionData = useActionData<ISubmitPageAction>();

  return (
    <MainLayout title="Submit" isNavVisible={false} isFooterVisible={false}>
      <tr>
        <td>
          <Form method="post">
            <input type="hidden" name="fnid" value="GvyHFpy11L26dCAIgGQ9rv" />
            <input type="hidden" name="fnop" value="submit-page" />
            {actionData?.textOrUrl && <div>URL or Text is required.</div>}
            {actionData?.url && <div>URL is not correctly formatted.</div>}
            <table style={{ border: '0' }}>
              <tbody>
                <tr>
                  <td>title</td>
                  <td>
                    <input type="text" name="title" defaultValue="" size={50} />
                    <span style={{ marginLeft: '10px' }} />
                  </td>
                </tr>
                <tr>
                  <td>url</td>
                  <td>
                    <input type="text" name="url" defaultValue="" size={50} />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <b>or</b>
                  </td>
                </tr>
                <tr>
                  <td>text</td>
                  <td>
                    <textarea name="text" rows={4} cols={49} />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td>
                    <input type="submit" value="submit" />
                  </td>
                </tr>
                <tr style={{ height: '20px' }} />
                <tr>
                  <td />
                  <td>
                    Leave url blank to submit a question for discussion. If there is no url, the
                    text (if any) will appear at the top of the thread.
                    <br />
                    <br />
                    You can also submit via{' '}
                    <Link to="/bookmarklet" rel="nofollow">
                      <u>bookmarklet</u>
                    </Link>
                    .
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        </td>
      </tr>
    </MainLayout>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div>
      <div>Something went wrong.</div>
      <div>{error.message}</div>
    </div>
  );
};

export default SubmitPage;
