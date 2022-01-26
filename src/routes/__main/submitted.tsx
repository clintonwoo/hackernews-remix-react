import { MetaFunction } from 'remix';

import { MainLayout } from '../../layouts/main-layout';

export const meta: MetaFunction = ({ location }) => {
  const params = new URLSearchParams(location.search);

  return { title: `${params.get('id')}'s submissions | Hacker News Clone` };
};

export function SubmittedPage(): JSX.Element {
  return <MainLayout>Hacker News API does not publicly provide this data!</MainLayout>;
}

export default SubmittedPage;
