import { debug } from 'debug';

import { ItemModel } from '../models';
import { HnCache } from '../database/cache';
import { HnDatabase } from '../database/database';

const logger = debug('app:NewsItem');
logger.log = console.log.bind(console);

export class ItemService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async upvoteItem(id: number, userId: string): Promise<ItemModel | undefined> {
    return this.db.upvoteItem(id, userId);
  }
}
