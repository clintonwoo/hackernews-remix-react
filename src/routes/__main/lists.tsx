import { Link, MetaFunction } from 'remix';

import { MainLayout } from '../../layouts/main-layout';

export const meta: MetaFunction = () => {
  return { title: 'Lists | Hacker News Clone' };
};

export function ListsPage(): JSX.Element {
  return (
    <MainLayout>
      <tr>
        <td>
          <table style={{ borderSpacing: '7px 0px' }}>
            <tbody>
              <tr>
                <td>
                  <Link to="/leaders">leaders</Link>
                </td>
                <td>Users with most karma.</td>
              </tr>
              <tr>
                <td>
                  <Link to="/front">front</Link>
                </td>
                <td>
                  Front page submissions for a given day (e.g.{' '}
                  <a href="/front?day=2016-06-20">2016-06-20</a>), ordered by time spent there.
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/best">best</Link>
                </td>
                <td>Highest-voted recent links.</td>
              </tr>
              <tr>
                <td>
                  <Link to="/active">active</Link>
                </td>
                <td>Most active current discussions.</td>
              </tr>
              <tr>
                <td>
                  <Link to="/bestcomments">bestcomments</Link>
                </td>
                <td>Highest-voted recent comments.</td>
              </tr>
              <tr>
                <td>
                  <Link to="/noobstories">noobstories</Link>
                </td>
                <td>Submissions from new accounts.</td>
              </tr>
              <tr>
                <td>
                  <Link to="/noobcomments">noobcomments </Link>
                </td>
                <td>Comments from new accounts.</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </MainLayout>
  );
}

export default ListsPage;
