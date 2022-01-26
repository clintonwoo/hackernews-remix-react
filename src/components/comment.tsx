import * as React from 'react';
import { Link } from 'remix';

import { convertNumberToTimeAgo } from '../utils/convert-number-to-time-ago';

import sGif from '../../public/static/s.gif';

export interface ICommentProps {
  collapsedChildrenCommentsCount: number | undefined;
  creationTime: number;
  id: number;
  indentationLevel: number;
  isCollapsed: boolean;
  submitterId: string;
  text: string;
  toggleCollapseComment: (id: number) => void;
}

export function Comment(props: ICommentProps): JSX.Element {
  const {
    creationTime,
    collapsedChildrenCommentsCount,
    id,
    indentationLevel,
    isCollapsed,
    submitterId,
    text,
    toggleCollapseComment,
  } = props;

  const collapseComment = React.useCallback(() => {
    toggleCollapseComment(id);
  }, [toggleCollapseComment, id]);

  return (
    <tr className="athing comtr " id={id.toString()}>
      <td>
        <table style={{ border: '0' }}>
          <tbody>
            <tr>
              <td className="ind">
                <img
                  alt=""
                  src={sGif}
                  height="1"
                  width={indentationLevel * 40} /* Width varies depending on comment level */
                />
              </td>
              <td style={{ verticalAlign: 'top' }} className="votelinks">
                <div style={{ textAlign: 'center' }}>
                  <a
                    id={`up_${id}`}
                    href={`vote?id=${id}&how=up&auth=4eb97bf0d2568aa743691210b904f0c5182bb0fc&goto=item?id=${id}`}
                  >
                    <div className="votearrow" title="upvote" />
                  </a>
                </div>
              </td>
              <td className="default">
                <div style={{ marginTop: '2px', marginBottom: '-10px' }}>
                  <span className="comhead">
                    <Link className="hnuser" to={`/user?id=${submitterId}`}>
                      {submitterId}
                    </Link>
                    <span className="age">
                      {' '}
                      <Link to={`/item?id=${id}`}>{convertNumberToTimeAgo(creationTime)}</Link>
                    </span>{' '}
                    <span id="unv_15238246" />
                    <span className="par" />{' '}
                    <span className="togg" id="24" onClick={collapseComment}>
                      {isCollapsed
                        ? `[${
                            collapsedChildrenCommentsCount
                              ? `${collapsedChildrenCommentsCount + 1} more`
                              : '+'
                          }] `
                        : '[-]'}
                    </span>
                    <span className="storyon" />
                  </span>
                </div>
                <br />
                <div key="help" className="comment">
                  <span className="c00">
                    {!isCollapsed && (
                      <>
                        <div dangerouslySetInnerHTML={{ __html: text }} />
                        <div className="reply">
                          <p style={{ fontSize: '1' }}>
                            <Link to={`/reply?id=${id}&goto=item?id=${id}`}>reply</Link>
                          </p>
                        </div>
                      </>
                    )}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
