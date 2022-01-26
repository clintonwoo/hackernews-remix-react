import { isValidStoryUrl } from '../../utils/is-valid-url';

let newPostIdCounter = 100;

export class StoryModel {
  /** News item ID */
  public readonly id: number;

  /** Count of comments on the post */
  public readonly commentCount: number;

  /** List of comments */
  public readonly comments;

  /** Post creation time, number of ms since 1970 */
  public readonly creationTime: number;

  /** IDs of users who hid the post */
  public readonly hides: string[];

  public readonly hiddenCount: number;

  /** ID of user who submitted */
  public readonly submitterId: string;

  /** Body text */
  public readonly text: string | null;

  /** Post title */
  public readonly title: string;

  /** Number of upvotes */
  public upvoteCount: number;

  public readonly upvotes: Set<string>;

  public readonly url?: string;

  public readonly hidden?: boolean; // TODO: exists?

  public readonly rank?: number;

  public readonly type: string;

  constructor(fields) {
    if (!fields.id) {
      throw new Error(`Error instantiating News Item, id is required: ${fields.id}`);
    } else if (!fields.submitterId) {
      throw new Error(`Error instantiating News Item, submitterId is required: ${fields.id}`);
    } else if (!fields.title) {
      throw new Error(`Error instantiating News Item, title is required: ${fields.id}`);
    } else if (fields.url && !isValidStoryUrl(fields.url)) {
      throw new Error(`Error instantiating News Item ${fields.id}, invalid URL: ${fields.url}`);
    }

    this.id = fields.id || (newPostIdCounter += 1);
    this.commentCount = fields.commentCount || 0;
    this.comments = fields.comments || [];
    this.creationTime = fields.creationTime || +new Date();
    this.hides = fields.hides || [];
    this.hiddenCount = this.hides.length;
    this.submitterId = fields.submitterId;
    this.text = fields.text || null;
    this.title = fields.title;
    this.type = fields.type;
    this.upvoteCount = fields.upvoteCount || 1;
    this.upvotes = fields.upvotes || new Set([fields.submitterId]);
    this.url = fields.url;
  }
}
