import { debug } from 'debug';

import { createResponseComment, IComment } from '../responses';
import type { HnCache } from '../database/cache';
import type { HnDatabase } from '../database/database';

const logger = debug('app:Comment');
logger.log = console.log.bind(console);

export class CommentService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async getComment(id: number, userId: string | undefined): Promise<IComment | void> {
    const dbComment = await (this.cache.getComment(id) ||
      this.db.fetchComment(id).catch((reason) => logger('Rejected comment:', reason)));

    return dbComment ? createResponseComment(dbComment, userId) : undefined;
  }

  async getComments(ids: number[], userId: string | undefined): Promise<Array<IComment> | void> {
    return Promise.all(ids.map((commentId) => this.getComment(commentId, userId)))
      .then((comments): IComment[] =>
        comments.filter((comment): comment is IComment => comment !== undefined)
      )
      .catch((reason) => logger('Rejected comments:', reason));
  }

  async getCommentTree(ids: number[], userId: string | undefined): Promise<Array<IComment> | void> {
    return Promise.all(
      ids.map(async (commentId) => {
        if (Number.isNaN(Number(commentId))) {
          return commentId; // commentId is already resolved to comment previously
        }

        const comment = await this.getComment(commentId, userId);

        if (comment?.comments?.length) {
          comment.comments = await this.getCommentTree(comment.comments, userId);
        }

        return comment;
      })
    )
      .then((comments): IComment[] =>
        comments.filter((comment): comment is IComment => comment !== undefined)
      )
      .catch((reason) => logger('Rejected comments:', reason));
  }

  async getNewComments(userId: string | undefined): Promise<IComment[]> {
    return this.cache.newComments.map((comment) =>
      createResponseComment({ ...comment, comments: [] }, userId)
    );
  }

  async createComment(
    parent: number,
    submitterId: string,
    text: string,
    userId: string
  ): Promise<IComment | undefined> {
    const comment = await this.db.createComment(parent, submitterId, text);

    this.cache.setComment(comment.id, comment);

    const parentComment = this.cache.getComment(comment.parent);
    if (parentComment) {
      parentComment.comments.push(comment.id);
      this.cache.setComment(parentComment.id, parentComment);
    }

    return comment ? createResponseComment(comment, userId) : undefined;
  }
}
