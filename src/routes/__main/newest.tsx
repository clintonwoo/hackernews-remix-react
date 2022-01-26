import { LoaderFunction, useLoaderData } from 'remix';

import { feedService } from '../../server/bootstrap.server';
import { FeedType } from '../../server/models';
import { MainLayout } from '../../layouts/main-layout';
import { NewsFeed } from '../../components/news-feed';
import { POSTS_PER_PAGE } from '../../config';
import { usePageNumber } from '../../utils/hooks';
import { getSearchParamsFromRequest } from '../../utils/http-handlers';
import { getPageNumberFromSearchParams } from '../../utils/news-page-number';
import { getSession, SessionCookieProperties } from '../../cookies';
import type { IStory } from '../../server/responses';

export interface INewestPageLoader {
  stories: (void | IStory)[];
}
export const loader: LoaderFunction = async ({ request }): Promise<INewestPageLoader> => {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get(SessionCookieProperties.USER_ID);

  const searchParams = getSearchParamsFromRequest(request);
  const pageNumber: number = getPageNumberFromSearchParams(searchParams);

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * (pageNumber - 1);

  return { stories: await feedService.getForType(FeedType.NEW, first, skip, userId) };
};

export const meta = () => ({
  title: 'New Links | Hacker News Clone',
});

export function NewestPage(): JSX.Element {
  const { stories } = useLoaderData<INewestPageLoader>();
  const pageNumber: number = usePageNumber();

  return (
    <MainLayout>
      <NewsFeed stories={stories} pageNumber={pageNumber} postsPerPage={POSTS_PER_PAGE} />
    </MainLayout>
  );
}

export default NewestPage;
