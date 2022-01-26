import { useLocation } from 'remix';

export interface IItemTitleProps {
  id: number;
  isRankVisible?: boolean;
  isUpvoteVisible?: boolean;
  rank?: number;
  title: string;
  url?: string;
  upvoted?: boolean;
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
            <a
              className={upvoted ? 'nosee' : ' '}
              href={`/vote?id=${id}&how=up&goto=${loc.pathname + loc.search}`}
              style={{ cursor: 'pointer' }}
            >
              <div className="votearrow" title="upvote" />
            </a>
          )}
        </div>
      </td>
      <td className="title">
        <a className="storylink" href={url || `item?id=${id}`}>
          {title}
        </a>
        {url && (
          <span className="sitebit comhead">
            {' '}
            (
            <a href={`from?site=${hostname}`}>
              <span className="sitestr">{hostname}</span>
            </a>
            )
          </span>
        )}
      </td>
    </tr>
  );
}
