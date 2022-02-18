import { Link, useLocation } from 'remix';

export interface IItemTitleProps {
  id: number;
  isRankVisible?: boolean;
  isUpvoteVisible?: boolean;
  rank?: number;
  title: string;
  url: string | undefined;
  upvoted: boolean;
}

export function ItemTitle(props: IItemTitleProps): JSX.Element {
  const { id, isRankVisible = true, isUpvoteVisible = true, rank, title, upvoted, url } = props;

  const loc = useLocation();

  const hostname: string | undefined = url ? new URL(url).hostname : undefined;

  return (
    <tr className="athing">
      <td style={{ textAlign: 'right', verticalAlign: 'top' }} className="title">
        <span className="rank">{isRankVisible && `${rank}.`}</span>
      </td>
      <td style={{ verticalAlign: 'top' }} className="votelinks">
        <div style={{ textAlign: 'center' }}>
          {isUpvoteVisible && (
            <Link
              className={upvoted ? 'nosee' : ' '}
              to={`/vote?id=${id}&how=up&goto=${loc.pathname + loc.search}`}
              style={{ cursor: 'pointer' }}
            >
              <div className="votearrow" title="upvote" />
            </Link>
          )}
        </div>
      </td>
      <td className="title">
        {url ? (
          <>
            <a className="storylink" href={url}>
              {title}
            </a>
            <span className="sitebit comhead">
              {' '}
              (
              <Link to={`/from?site=${hostname}`}>
                <span className="sitestr">{hostname}</span>
              </Link>
              )
            </span>
          </>
        ) : (
          <Link className="storylink" to={`/item?id=${id}`}>
            {title}
          </Link>
        )}
      </td>
    </tr>
  );
}
