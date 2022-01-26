/**
 * The base model for Jobs, Stories, Comments, Polls and Poll Options in the HN API
 */
export interface IItem {
  readonly id: number;

  readonly by?: string;

  readonly dead?: boolean;

  readonly deleted?: boolean;

  readonly didUserUpvote: boolean;

  readonly kids?: number[];

  readonly time?: number;

  readonly type: string;
}
