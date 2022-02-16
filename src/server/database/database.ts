import { debug } from 'debug';
import { child, get, DatabaseReference } from '@firebase/database';

import type { HnCache } from './cache';
import { CommentModel, FeedType, StoryModel, UserModel } from '../models';
import { sampleData } from '../sample-data';
import { HN_API_URL } from '../config.server';

const logger = debug('app:Database');
logger.log = console.log.bind(console);

let newCommentIdCounter = 100_000_000;

// https://github.com/HackerNews/API

export class HnDatabase {
  db: DatabaseReference;
  cache: HnCache;

  constructor(db: DatabaseReference, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async fetchStory(id: number): Promise<StoryModel | void> {
    logger('Fetching item:', `${HN_API_URL}/item/${id}.json`);

    return get(child(this.db, `item/${id}`))
      .then((itemSnapshot) => {
        const item = itemSnapshot.val();

        if (item !== null) {
          const newsItem = new StoryModel({
            id: item.id,
            commentCount: item.descendants,
            comments: item.kids,
            creationTime: item.time * 1000,
            submitterId: item.by,
            title: item.title,
            upvoteCount: item.score,
            url: item.url,
          });

          this.cache.setStory(newsItem.id, newsItem);
          logger('Saved item in cache:', item.id);

          return newsItem;
        }

        throw item;
      })
      .catch((reason) => logger('Fetching post failed:', reason));
  }

  async fetchComment(id: number): Promise<CommentModel | void> {
    logger('Fetching comment:', `${HN_API_URL}/item/${id}.json`);

    return get(child(this.db, `item/${id}`))
      .then((itemSnapshot) => {
        const item = itemSnapshot.val();

        if (item !== null && !item.deleted && !item.dead) {
          const comment = new CommentModel({
            id: item.id,
            comments: item.kids,
            creationTime: item.time * 1000,
            parent: item.parent,
            submitterId: item.by,
            text: item.text,
          });

          this.cache.setComment(comment.id, comment);
          logger('Created Comment:', item.id);

          return comment;
        }

        throw item;
      })
      .catch((reason) => logger('Fetching comment failed:', reason));
  }

  async fetchUser(id: string): Promise<UserModel | void> {
    logger('Fetching user:', `${HN_API_URL}/user/${id}.json`);

    return get(child(this.db, `user/${id}`))
      .then((itemSnapshot) => {
        const item = itemSnapshot.val();

        if (item !== null && !item.deleted && !item.dead) {
          const user = new UserModel({
            about: item.about,
            creationTime: item.created * 1000,
            id: item.id,
            karma: item.karma,
            posts: item.submitted,
          });

          this.cache.setUser(user.id, user);
          logger('Created User:', item.id, item);

          return user;
        }

        throw item;
      })
      .catch((reason) => logger('Fetching user failed:', reason));
  }

  async getFeed(feedType: FeedType): Promise<number[] | void> {
    logger('Fetching', `/${feedType}stories.json`);

    return get(child(this.db, `${feedType}stories`))
      .then((feedSnapshot) => feedSnapshot.val())
      .then((feed) => feed.filter((newsItem) => newsItem !== undefined && newsItem !== null))
      .catch((reason) => logger('Fetching news feed failed:', reason));
  }

  /*                  BEGIN NEWS ITEMS                      */

  getNewsItem(id: number): StoryModel | undefined {
    return sampleData.newsItems.find((newsItem) => newsItem.id === id);
  }

  createNewsItem(newsItem: StoryModel): StoryModel {
    sampleData.newsItems.push(newsItem);

    return newsItem;
  }

  //                  ITEM MUTATIONS

  async upvoteItem(id: number, userId: string): Promise<StoryModel | undefined> {
    // Upvote the News Item in the DB
    const item = this.cache.getStory(id);

    if (item && !item.upvotes.has(userId)) {
      item.upvotes.add(userId);
      item.upvoteCount += 1;
      this.cache.setStory(id, item);
    }

    return item;
  }

  async unvoteItem(id: number, userId: string): Promise<StoryModel | undefined> {
    const item = this.cache.getStory(id);

    if (item && !item.upvotes.has(userId)) {
      item.upvotes.delete(userId);
      item.upvoteCount -= 1;
      this.cache.setStory(id, item);
    }

    return item;
  }

  async hideNewsItem(id: number, userId: string): Promise<StoryModel> {
    logger('Hiding News Item id by userId:', id, userId);

    const newsItem = this.cache.getStory(id);
    const user = this.cache.getUser(userId);

    if (user && !user.hides.includes(id) && newsItem && !newsItem.hides.includes(userId)) {
      user.hides.push(id);
      this.cache.setUser(userId, user);

      newsItem.hides.push(userId);
      this.cache.setStory(id, newsItem);

      logger('Hid News Item id by userId:', id, userId);
    } else {
      throw new Error(`Data error, user has already hidden ${id} by ${userId}`);
    }

    return newsItem;
  }

  async submitNewsItem(id: number, newsItem: StoryModel): Promise<StoryModel> {
    // Submit the News Item in the DB
    if (this.cache.setStory(id, newsItem)) {
      // FeedSingleton.new.unshift(id);
      // FeedSingleton.new.pop();
      return newsItem;
    }

    throw new Error('Unable to submit News Item.');
  }

  /*                  END NEWS ITEMS                      */

  /*                  BEGIN COMMENTS                      */

  async createComment(parent: number, submitterId: string, text: string) {
    return new CommentModel({ parent, submitterId, text, id: newCommentIdCounter++ });
  }

  /*                  END COMMENTS                        */

  /*                     BEGIN FEED                         */

  async getNewNewsItems(first: number, skip: number): Promise<StoryModel[]> {
    return sampleData.newsItems.slice(skip, skip + first);
  }

  async getTopNewsItems(first: number, skip: number): Promise<StoryModel[]> {
    return sampleData.newsItems.slice(skip, skip + first);
  }

  async getHotNews(): Promise<StoryModel[]> {
    return sampleData.newsItems;
  }

  async getNewsItems(): Promise<StoryModel[]> {
    return sampleData.newsItems;
  }

  /*                     END FEED                         */

  /*                   BEGIN USERS                        */

  async getUser(id: string): Promise<UserModel | undefined> {
    return sampleData.users.find((user) => user.id === id);
  }

  async getUsers(): Promise<UserModel[]> {
    return sampleData.users;
  }

  async createUser(user: UserModel): Promise<UserModel> {
    sampleData.users.push(user);

    return user;
  }

  /*                    END USERS                         */
}
