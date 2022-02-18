import { IComment } from '.';
import { StoryModel } from '../models';
import { IItem } from './item';

export interface IStory extends IItem {
  /** Count of comments on the post */
  readonly commentCount: number;

  /** List of comments */
  readonly comments: IComment[];

  /** Post creation time, number of ms since 1970 */
  readonly creationTime: number;

  readonly hiddenCount: number;

  /** ID of user who submitted */
  readonly submitterId: string;

  /** Body text */
  readonly text: string | null;

  /** Post title */
  readonly title: string;

  /** Number of upvotes */
  upvoteCount: number;

  readonly url?: string;

  readonly hidden?: boolean; // TODO: exists?

  readonly rank?: number;
}

export function ClientStory(
  {
    commentCount,
    comments,
    creationTime,
    hidden,
    hiddenCount,
    id,
    submitterId,
    text,
    title,
    type,
    upvoteCount,
    upvotes,
    url,
  }: StoryModel,
  userId: string | undefined
): IStory {
  return {
    commentCount,
    comments,
    creationTime,
    didUserUpvote: userId ? upvotes.has(userId) : false,
    hidden,
    hiddenCount,
    id,
    submitterId,
    text,
    title,
    type,
    upvoteCount,
    url,
  };
}
