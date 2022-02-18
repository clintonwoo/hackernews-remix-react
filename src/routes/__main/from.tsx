import { MetaFunction } from 'remix';

import { MainLayout } from '../../layouts/main-layout';

export const meta: MetaFunction = () => {
  const params = new URLSearchParams(location.search);
  const site = params.get('site') || 'site';

  return { title: `Submissions from ${site} | Hacker News Clone` };
};

export function FrontPage(): JSX.Element {
  return <MainLayout>Hacker News API does not publicly provide this data!</MainLayout>;
}

export default FrontPage;
