import { initializeApp } from '@firebase/app';
import { getDatabase, ref } from '@firebase/database';

import { dev, HN_API_VERSION, HN_DB_URI } from './config.server';
import { HnCache } from './database/cache';
import { watchFeeds } from './database/feed-updater';
import { HnDatabase } from './database/database';
import { CommentService } from './services/comment-service.server';
import { FeedService } from './services/feed-service.server';
import { ItemService } from './services/item-service.server';
import { StoryService } from './services/story-service.server';
import { UserService } from './services/user-service.server';

const FIVE_SECONDS = 1000 * 5;

// Seed the in-memory data using the HN api
const delay = dev ? FIVE_SECONDS : 0;

const firebaseApp = initializeApp({ databaseURL: HN_DB_URI });
const firebaseDb = getDatabase(firebaseApp);
const firebaseRef = ref(firebaseDb, HN_API_VERSION);

const cache = new HnCache();
const db = new HnDatabase(firebaseRef, cache);
watchFeeds(db, cache, delay);

export const commentService = new CommentService(db, cache);
export const feedService = new FeedService(db, cache);
export const itemService = new ItemService(db, cache);
export const newsItemService = new StoryService(db, cache);
export const userService = new UserService(db, cache);
