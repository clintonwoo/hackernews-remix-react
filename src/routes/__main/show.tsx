import { Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix';

import { NewsFeed } from '../../components/news-feed';
import { POSTS_PER_PAGE } from '../../config';
import { FeedType } from '../../server/models';
import { MainLayout } from '../../layouts/main-layout';
import { feedService } from '../../server/bootstrap.server';
import { usePageNumber } from '../../utils/hooks';
import { getSearchParamsFromRequest } from '../../utils/http-handlers';
import { getPageNumberFromSearchParams } from '../../utils/news-page-number';
import { getSession, SessionCookieProperties } from '../../cookies';
import type { IStory } from '../../server/responses';

export interface IShowPageLoader {
  stories: (void | IStory)[];
}
export const loader: LoaderFunction = async ({ request }): Promise<IShowPageLoader> => {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get(SessionCookieProperties.USER_ID);

  const searchParams = getSearchParamsFromRequest(request);
  const pageNumber: number = getPageNumberFromSearchParams(searchParams);

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * (pageNumber - 1);

  return { stories: await feedService.getForType(FeedType.SHOW, first, skip, userId) };
};

export const meta: MetaFunction = () => {
  return { title: 'Show | Hacker News Clone' };
};

export function ShowHNPage(): JSX.Element {
  const { stories } = useLoaderData<IShowPageLoader>();
  const pageNumber: number = usePageNumber();

  return (
    <MainLayout>
      <NewsFeed
        stories={stories}
        pageNumber={pageNumber}
        postsPerPage={POSTS_PER_PAGE}
        notice={
          <>
            <tr key="noticetopspacer" style={{ height: '5px' }} />
            <tr key="notice">
              <td colSpan={2} />
              <td>
                Please read the{' '}
                <Link to="/showhn">
                  <u>rules</u>
                </Link>
                . You can also browse the{' '}
                <Link to="/shownew">
                  <u>newest</u>
                </Link>{' '}
                Show HNs.
              </td>
            </tr>
            <tr key="noticebottomspacer" style={{ height: '10px' }} />
          </>
        }
      />
    </MainLayout>
  );
}

export default ShowHNPage;
