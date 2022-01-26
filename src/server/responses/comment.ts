import { IItem } from './item';

import { CommentModel } from '../models';

export interface IComment extends IItem {
  readonly comments: IComment[];

  readonly creationTime: number;

  readonly didUserUpvote: boolean;

  readonly parent: number;

  readonly submitterId: string;

  readonly text: string;
}

export function createResponseComment(
  { id, comments, creationTime, upvotes, parent, submitterId, text, type }: CommentModel,
  userId: string | undefined
): IComment {
  return {
    id,
    comments: comments as any,
    creationTime,
    didUserUpvote: userId ? upvotes.has(userId) : false,
    parent,
    submitterId,
    text,
    type,
  };
}
