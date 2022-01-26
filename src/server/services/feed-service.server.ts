import { debug } from 'debug';

import { FeedType } from '../models';
import { sampleData } from '../sample-data';
import { HnCache } from '../database/cache';
import { HnDatabase } from '../database/database';
import { ClientStory, IStory } from '../responses';

const logger = debug('app:Feed');
logger.log = console.log.bind(console);

export class FeedService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  public async getForType(
    type: FeedType,
    first: number,
    skip: number,
    userId: string | undefined
  ): Promise<Array<IStory | undefined>> {
    logger('Get first', first, type, 'stories skip', skip);

    switch (type) {
      case FeedType.TOP: {
        // In this app the HN data is reconstructed in-memory
        const topStories = await Promise.all(
          this.cache.top
            .slice(skip, first + skip)
            .map((id) => this.cache.getStory(id) || this.db.fetchStory(id))
        );

        return topStories.map((id) => (id ? ClientStory(id, userId) : undefined));
      }

      case FeedType.NEW: {
        const newStories = await Promise.all(
          this.cache.new
            .slice(skip, first + skip)
            .map((id) => this.cache.getStory(id) || this.db.fetchStory(id))
        );

        return newStories.map((id) => (id ? ClientStory(id, userId) : undefined));
      }

      case FeedType.BEST: {
        const bestStories = await Promise.all(
          this.cache.best
            .slice(skip, first + skip)
            .map((id) => this.cache.getStory(id) || this.db.fetchStory(id))
        );

        return bestStories.map((id) => (id ? ClientStory(id, userId) : undefined));
      }

      case FeedType.SHOW: {
        const showStories = await Promise.all(
          this.cache.show
            .slice(skip, first + skip)
            .map((id) => this.cache.getStory(id) || this.db.fetchStory(id))
        );

        return showStories.map((id) => (id ? ClientStory(id, userId) : undefined));
      }

      case FeedType.ASK: {
        const askStories = await Promise.all(
          this.cache.ask
            .slice(skip, first + skip)
            .map((id) => this.cache.getStory(id) || this.db.fetchStory(id))
        );

        return askStories.map((id) => (id ? ClientStory(id, userId) : undefined));
      }

      case FeedType.JOB: {
        const jobStories = await Promise.all(
          this.cache.job
            .slice(skip, first + skip)
            .map((id) => this.cache.getStory(id) || this.db.fetchStory(id))
        );

        return jobStories.map((id) => (id ? ClientStory(id, userId) : undefined));
      }

      default:
        return sampleData.newsItems
          .slice(skip, skip + first)
          .map((id) => (id ? ClientStory(id, userId) : undefined));
    }
  }
}
