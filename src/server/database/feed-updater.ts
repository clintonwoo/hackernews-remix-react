import { debug } from 'debug';

import { FeedType } from '../models';
import type { HnCache } from './cache';
import type { HnDatabase } from './database';

const logger = debug('app:cache-warmer');
logger.log = console.log.bind(console);

const TWO_MINUTES = 1000 * 60 * 2;

/**
 * Updates the news feed story orders in memory
 */
async function updateFeed(db: HnDatabase, cache: HnCache, feedType: FeedType): Promise<void> {
  setTimeout(() => updateFeed(db, cache, feedType), TWO_MINUTES);

  try {
    const feed = await db.getFeed(feedType);

    if (feed) {
      cache[feedType] = feed;
      logger('Updated Feed ids for type: ', feedType);
    }
  } catch (err) {
    logger('Error building feed: ', err);
  }
}

export function watchFeeds(db: HnDatabase, cache: HnCache, delay: number): void {
  logger('Waiting ms before seeding the app with data:', delay);

  // Delay so we don't spam in dev
  setTimeout(() => {
    logger('Seeding cache');

    [FeedType.TOP, FeedType.NEW, FeedType.BEST, FeedType.SHOW, FeedType.ASK, FeedType.JOB].forEach(
      (feedType) => updateFeed(db, cache, feedType)
    );
  }, delay);
}
