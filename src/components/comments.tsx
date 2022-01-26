import * as React from 'react';

import { IComment } from '../server/responses';
import { Comment } from './comment';

function countChildrenComments(comments: IComment[]): number {
  return (
    comments.length +
    comments.reduce((count, comment) => {
      if (comment.comments) count += countChildrenComments(comment.comments);
      return count;
    }, 0)
  );
}

/**
 * Recursively flattens tree into flat array and calls the callback on each item
 */
function renderCommentTreeAsFlatArray(
  array: any[],
  comments: IComment[],
  level: number,
  shouldIndent: boolean,
  collapsedComments: ICollapsedComments,
  toggleCollapseComment: (id: number) => void
): React.ReactNode {
  for (const comment of comments) {
    if (typeof comment === 'number') continue;

    const isCollapsed = collapsedComments[comment.id];
    const children = comment.comments;

    array.push(
      <Comment
        key={comment.id}
        collapsedChildrenCommentsCount={isCollapsed ? countChildrenComments(children) : undefined}
        submitterId={comment.submitterId}
        text={comment.text}
        toggleCollapseComment={toggleCollapseComment}
        creationTime={comment.creationTime}
        id={comment.id}
        indentationLevel={level}
        isCollapsed={isCollapsed}
      />
    );

    if (!isCollapsed && Array.isArray(children) && children.length > 0) {
      renderCommentTreeAsFlatArray(
        array,
        children,
        level + (shouldIndent ? 1 : 0),
        shouldIndent,
        collapsedComments,
        toggleCollapseComment
      );
    }
  }

  return array;
}

export interface ICommentsProps {
  comments: IComment[];
  shouldIndent: boolean;
}

export interface ICollapsedComments {
  [key: number]: boolean;
}

export function Comments(props: ICommentsProps): JSX.Element {
  const { comments, shouldIndent } = props;

  const [collapsedComments, setCollapsedComments] = React.useState<ICollapsedComments>({});

  const toggleCollapseComment = React.useCallback(
    (id: number) => {
      setCollapsedComments({ ...collapsedComments, [id]: !collapsedComments[id] });
    },
    [collapsedComments, setCollapsedComments]
  );

  return (
    <table className="comment-tree" style={{ border: '0' }}>
      <tbody>
        {renderCommentTreeAsFlatArray(
          [],
          comments,
          0,
          shouldIndent,
          collapsedComments,
          toggleCollapseComment
        )}
      </tbody>
    </table>
  );
}
