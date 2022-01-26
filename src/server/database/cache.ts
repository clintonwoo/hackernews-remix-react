import { debug } from 'debug';
import LRU from 'lru-cache';

import { StoryModel, UserModel, CommentModel, FeedType, ItemModel } from '../models';
import { sampleData } from '../sample-data';

const logger = debug('app:Cache');
logger.log = console.log.bind(console);

const STORY_MAX_AGE = 60 * 1000; // 60 seconds in milliseconds

// The cache is a singleton

export class HnCache {
  isReady = false;

  /* Feeds - Arrays of post ids in descending rank order */
  [FeedType.TOP]: number[] = sampleData.top;

  [FeedType.NEW]: number[] = sampleData.new;

  [FeedType.BEST]: number[] = [];

  [FeedType.SHOW]: number[] = [];

  [FeedType.ASK]: number[] = [];

  [FeedType.JOB]: number[] = [];

  newComments: CommentModel[] = sampleData.comments;

  /*                  BEGIN NEWS ITEMS                      */

  getStory(id: number): StoryModel | undefined {
    return this.itemCache.get(id.toString()) as StoryModel | undefined;
  }

  setStory(id: number, newsItem: StoryModel): boolean {
    return this.itemCache.set(id.toString(), newsItem as ItemModel, STORY_MAX_AGE);
  }

  /*                  END NEWS ITEMS                      */

  /*                   BEGIN USERS                        */

  getUser(id: string): UserModel | undefined {
    return this.userCache.get(id);
  }

  getUsers(): Array<LRU.Entry<string, UserModel>> {
    return this.userCache.dump();
  }

  setUser(id: string, user: UserModel): UserModel {
    logger('Cache set user:', user);

    this.userCache.set(id, user);

    return user;
  }

  /*                    END USERS                         */

  /*                   BEGIN COMMENTS                        */

  getComment(id: number): CommentModel | undefined {
    return this.itemCache.get(id.toString()) as CommentModel | undefined;
  }

  setComment(id: number, comment: CommentModel): CommentModel {
    this.itemCache.set(id.toString(), comment);

    logger('Cache set comment:', comment);

    return comment;
  }

  /*                    END COMMENTS                         */

  /*                   BEGIN BASE ITEM                       */

  getItem(id: number): ItemModel | undefined {
    return this.itemCache.get(id.toString()) as ItemModel | undefined;
  }

  setItem(id: number, item: ItemModel): ItemModel {
    this.itemCache.set(id.toString(), item);

    logger('Cache set item:', item);

    return item;
  }

  /*                    END BASE ITEM                        */

  /*                   BEGIN CACHES                         */

  userCache = new LRU<string, UserModel>({
    max: 500,
    ttl: 1000 * 60 * 60 * 2, // 2 hour cache: ms * s * m
  });

  /** Jobs, Stories, Comments, Polls and Poll Options are "items" in the HN API  */
  itemCache = new LRU<string, ItemModel>({
    max: 20_000,
    ttl: 1000 * 60 * 5, // 5 min cache: ms * s * m
  });

  /*                   END CACHES                         */
}
