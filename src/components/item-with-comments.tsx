import { StoryModel } from '../server/models';
import { CommentBox } from './comment-box';
import { Comments } from './comments';
import { ItemDetail } from './item-detail';
import { ItemTitle } from './item-title';

export interface INewsItemWithCommentsProps {
  loading?: boolean;
  newsItem: StoryModel;
}

/** Acts as the component for a page of a news item with all it's comments */
export function ItemWithComments(props: INewsItemWithCommentsProps): JSX.Element {
  const {
    newsItem: {
      commentCount,
      comments,
      creationTime,
      id,
      rank,
      submitterId,
      title,
      upvoteCount,
      url,
    },
  } = props;

  return (
    <tr>
      <td style={{ padding: '0px' }}>
        <table
          style={{
            border: '0px',
            padding: '0px',
            borderCollapse: 'collapse',
            borderSpacing: '0px',
          }}
          className="itemlist"
        >
          <tbody>
            <ItemTitle
              id={id}
              rank={rank}
              title={title}
              url={url}
              isRankVisible={false}
              upvoted={false}
            />
            <ItemDetail
              isPostScrutinyVisible
              commentCount={commentCount}
              id={id}
              submitterId={submitterId}
              upvoteCount={upvoteCount}
              creationTime={creationTime}
            />
            <tr key="morespace" className="morespace" style={{ height: '10px' }} />
            <CommentBox parentId={id} />
          </tbody>
        </table>
        <br />
        <br />
        <Comments comments={comments} shouldIndent />
        <br />
        <br />
      </td>
    </tr>
  );
}
