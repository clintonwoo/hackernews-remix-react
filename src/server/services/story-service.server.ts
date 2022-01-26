import { debug } from 'debug';

import { StoryModel } from '../models';
import { HnCache } from '../database/cache';
import { HnDatabase } from '../database/database';

const logger = debug('app:NewsItem');
logger.log = console.log.bind(console);

let newPostIdCounter = 100;

export class StoryService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async getStory(id: number): Promise<StoryModel | void> {
    return this.cache.getStory(id) || this.db.getNewsItem(id) || this.db.fetchStory(id);
  }

  async getStories(ids: number[]): Promise<Array<StoryModel | void> | void> {
    return Promise.all(ids.map((id) => this.getStory(id)))
      .then((newsItems) => newsItems.filter((newsItem) => newsItem !== undefined))
      .catch((reason) => logger('Rejected News Items:', reason));
  }

  async hideStory(id: number, userId: string): Promise<StoryModel> {
    return this.db.hideNewsItem(id, userId);
  }

  async submitStory({ submitterId, title, text, url }): Promise<StoryModel> {
    const newsItem = new StoryModel({
      id: (newPostIdCounter += 1),
      submitterId,
      text,
      title,
      url,
    });

    return this.db.submitNewsItem(newsItem.id, newsItem);
  }
}
