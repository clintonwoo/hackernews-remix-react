import { passwordIterations } from '../config.server';
import { StoryModel, UserModel } from '../models';
import { validateNewUser } from '../../utils/validation/user';
import { createHash, createSalt } from '../../utils/hash-password.server';
import type { HnCache } from '../database/cache';
import type { HnDatabase } from '../database/database';

export class UserService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async getUser(id: string): Promise<UserModel | void> {
    return this.cache.getUser(id) || this.db.fetchUser(id);
  }

  async getPostsForUser(id: string): Promise<StoryModel[]> {
    return this.db.getNewsItems().filter((newsItem) => newsItem.submitterId === id);
  }

  async validatePassword(id: string, password: string): Promise<boolean> {
    const user = this.cache.getUser(id);
    if (user) {
      return (
        (await createHash(password, user.passwordSalt!, passwordIterations)) === user.hashedPassword
      );
    }

    return false;
  }

  async registerUser(user: { id: string; password: string }): Promise<UserModel> {
    // Check if user is valid
    validateNewUser(user);

    // Check if user already exists
    if (this.cache.getUser(user.id)) {
      throw new Error('Username is taken.');
    }

    // Go ahead and create the new user
    const passwordSalt = createSalt();
    const hashedPassword = await createHash(user.password, passwordSalt, passwordIterations);

    const newUser = new UserModel({
      hashedPassword,
      id: user.id,
      passwordSalt,
    });

    // Store the new user
    this.cache.setUser(user.id, newUser);

    return newUser;
  }

  async updateUser(user: { id: string; about: string; email: string }): Promise<UserModel> {
    const foundUser = this.cache.getUser(user.id);
    if (!foundUser) {
      throw new Error('User not found.');
    }

    if (user.email) foundUser.email = user.email;
    if (user.about) foundUser.about = user.about;

    this.cache.setUser(user.id, foundUser);

    return foundUser;
  }
}
