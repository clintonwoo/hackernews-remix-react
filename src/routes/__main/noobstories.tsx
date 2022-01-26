import { MetaFunction } from 'remix';

import { MainLayout } from '../../layouts/main-layout';

export const meta: MetaFunction = () => {
  return { title: 'Noob Submissions | Hacker News Clone' };
};

export function NoobStoriesPage(): JSX.Element {
  return <MainLayout>Hacker News API does not publicly provide this data!</MainLayout>;
}

export default NoobStoriesPage;
