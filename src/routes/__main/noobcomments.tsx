import { MetaFunction } from 'remix';

import { MainLayout } from '../../layouts/main-layout';

export const meta: MetaFunction = () => {
  return { title: 'Noob Comments | Hacker News Clone' };
};

export function NoobCommentsPage(): JSX.Element {
  return <MainLayout>Hacker News API does not publicly provide this data!</MainLayout>;
}

export default NoobCommentsPage;
