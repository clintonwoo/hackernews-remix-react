import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';

import { MainLayout } from '../../layouts/main-layout';
import { commentService } from '../../server/bootstrap.server';
import { Comments } from '../../components/comments';
import { IComment } from '../../server/responses';
import { getSession, SessionCookieProperties } from '../../cookies';

export interface INewCommentsPageLoader {
  comments: IComment[];
}
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get(SessionCookieProperties.USER_ID);

  const comments = await commentService.getNewComments(userId);

  return { comments };
};

export const meta: MetaFunction = () => {
  return { title: 'New Comments | Hacker News Clone' };
};

export function NewCommentsPage(): JSX.Element {
  const { comments } = useLoaderData<INewCommentsPageLoader>();

  return (
    <MainLayout>
      <Comments comments={comments} shouldIndent={false} />
    </MainLayout>
  );
}

export default NewCommentsPage;
