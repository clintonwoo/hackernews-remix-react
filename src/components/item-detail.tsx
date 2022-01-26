import { Link } from 'remix';

import { convertNumberToTimeAgo } from '../utils/convert-number-to-time-ago';

export interface IItemDetailProps {
  commentCount: number;
  creationTime: number;
  hidden?: boolean;
  id: number;
  isFavoriteVisible?: boolean;
  isJobListing?: boolean;
  isPostScrutinyVisible?: boolean;
  submitterId: string;
  upvoteCount: number;
}

const HIDE_BUTTON_STYLE = { cursor: 'pointer' };

export function ItemDetail(props: IItemDetailProps): JSX.Element {
  const {
    commentCount,
    creationTime,
    hidden,
    id,
    isFavoriteVisible = true,
    isJobListing = false,
    isPostScrutinyVisible = false,
    submitterId,
    upvoteCount,
  } = props;

  return isJobListing ? (
    <tr>
      <td colSpan={2} />
      <td className="subtext">
        <span className="age">
          <Link to={`/item?id=${id}`}>{convertNumberToTimeAgo(creationTime)}</Link>
        </span>
      </td>
    </tr>
  ) : (
    <tr>
      <td colSpan={2} />
      <td className="subtext">
        <span className="score">{upvoteCount} points</span>
        {' by '}
        <Link className="hnuser" to={`/user?id=${submitterId}`}>
          {submitterId}
        </Link>{' '}
        <span className="age">
          <Link to={`/item?id=${id}`}>{convertNumberToTimeAgo(creationTime)}</Link>
        </span>
        {' | '}
        {hidden ? (
          <Link to={`/hide?id=${id}&how=un&goto=news`} style={HIDE_BUTTON_STYLE}>
            unhide
          </Link>
        ) : (
          <Link to={`/hide?id=${id}&how=up&goto=news`} style={HIDE_BUTTON_STYLE}>
            hide
          </Link>
        )}
        {isPostScrutinyVisible && (
          <span>
            {' | '}
            <a href="https://hn.algolia.com/?query=Sublime%20Text%203.0&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0">
              past
            </a>
            {' | '}
            <a href="https://www.google.com/search?q=Sublime%20Text%203.0">web</a>
          </span>
        )}
        {' | '}
        <Link to={`/item?id=${id}`}>
          {commentCount === 0
            ? 'discuss'
            : commentCount === 1
            ? '1 comment'
            : `${commentCount} comments`}
        </Link>
        {isFavoriteVisible && ' | favorite'}
      </td>
    </tr>
  );
}
