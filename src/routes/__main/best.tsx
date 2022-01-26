import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
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

export interface IBestPageLoader {
  stories: (IStory | void)[];
}
export const loader: LoaderFunction = async ({ request }): Promise<IBestPageLoader> => {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get(SessionCookieProperties.USER_ID);

  const searchParams = getSearchParamsFromRequest(request);
  const pageNumber: number = getPageNumberFromSearchParams(searchParams);

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * (pageNumber - 1);

  return { stories: await feedService.getForType(FeedType.BEST, first, skip, userId) };
};

export const meta: MetaFunction = () => {
  return { title: 'Top Links | Hacker News Clone' };
};

export function BestPage(): JSX.Element {
  const { stories } = useLoaderData<IBestPageLoader>();
  const pageNumber: number = usePageNumber();

  return (
    <MainLayout>
      <NewsFeed stories={stories} pageNumber={pageNumber} postsPerPage={POSTS_PER_PAGE} />
    </MainLayout>
  );
}

export default BestPage;
