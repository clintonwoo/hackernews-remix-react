import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';

import { commentService, newsItemService } from '../../server/bootstrap.server';
import { ItemWithComments } from '../../components/item-with-comments';
import { MainLayout } from '../../layouts/main-layout';
import {
  checkNotFound,
  checkBadRequest,
  getSearchParamsFromRequest,
  URLSearchParamFields,
} from '../../utils/http-handlers';
import type { StoryModel } from '../../server/models';
import { getSession, SessionCookieProperties } from '../../cookies';

export interface IItemPageLoader {
  newsItem: StoryModel;
}
export const loader: LoaderFunction = async ({ request }): Promise<IItemPageLoader> => {
  const searchParams = getSearchParamsFromRequest(request);
  const newsItemId = searchParams.get(URLSearchParamFields.ID);
  checkBadRequest(newsItemId, '"id" is required.');

  const newsItem = await newsItemService.getStory(+newsItemId);
  checkNotFound(newsItem, 'NewsItem not found');

  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get(SessionCookieProperties.USER_ID);

  const comments = await commentService.getCommentTree(newsItem.comments, userId);
  newsItem.comments = comments;

  return { newsItem };
};

export const meta: MetaFunction = ({ data }) => {
  if (data) {
    return { title: `${(data as IItemPageLoader).newsItem.title} | Hacker News Clone` };
  }

  return { title: 'Story not found | Hacker News Clone' };
};

export function ItemPage(): JSX.Element {
  const { newsItem } = useLoaderData<IItemPageLoader>();

  return (
    <MainLayout>
      <ItemWithComments newsItem={newsItem} />
    </MainLayout>
  );
}

export default ItemPage;
