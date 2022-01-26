import { NewsFeed } from '../../components/news-feed';
import { MainLayout } from '../../layouts/main-layout';
import { FeedType } from '../../server/models';
import { POSTS_PER_PAGE } from '../../config';
import { feedService } from '../../server/bootstrap.server';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { usePageNumber } from '../../utils/hooks';
import { getSearchParamsFromRequest } from '../../utils/http-handlers';
import { getPageNumberFromSearchParams } from '../../utils/news-page-number';
import { getSession, SessionCookieProperties } from '../../cookies';
import type { IStory } from '../../server/responses';

import sGif from '../../../public/static/s.gif';

export interface IJobsPageLoader {
  stories: (IStory | void)[];
}
export const loader: LoaderFunction = async ({ request }): Promise<IJobsPageLoader> => {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get(SessionCookieProperties.USER_ID);

  const searchParams = getSearchParamsFromRequest(request);
  const pageNumber: number = getPageNumberFromSearchParams(searchParams);

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * (pageNumber - 1);

  return {
    stories: await feedService.getForType(FeedType.JOB, first, skip, userId),
  };
};

export const meta: MetaFunction = () => {
  return { title: 'jobs | Hacker News Clone' };
};

export function JobsPage(): JSX.Element {
  const { stories } = useLoaderData<IJobsPageLoader>();
  const pageNumber: number = usePageNumber();

  return (
    <MainLayout>
      <NewsFeed
        isJobListing
        isRankVisible={false}
        isUpvoteVisible={false}
        stories={stories}
        pageNumber={pageNumber}
        postsPerPage={POSTS_PER_PAGE}
        notice={
          <>
            <tr key="noticetopspacer" style={{ height: '20px' }} />
            <tr key="notice">
              <td />
              <td>
                <img alt="" src={sGif} height="1" width="14" />
              </td>
              <td>
                These are jobs at startups that were funded by Y Combinator. You can also get a job
                at a YC startup through{' '}
                <a href="https://triplebyte.com/?ref=yc_jobs">
                  <u>Triplebyte</u>
                </a>
                .
              </td>
            </tr>
            <tr key="noticebottomspacer" style={{ height: '20px' }} />
          </>
        }
      />
    </MainLayout>
  );
}

export default JobsPage;
