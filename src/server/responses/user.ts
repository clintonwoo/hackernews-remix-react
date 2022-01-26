export interface IUser {
  readonly id: string;

  readonly about: string;

  readonly creationTime: number;

  readonly dateOfBirth: number | null;

  readonly email: string | null;

  readonly firstName: string | null;

  readonly hides;

  readonly karma: number;

  readonly lastName: string | null;

  readonly likes;

  readonly posts;

  readonly hashedPassword: string | undefined;

  readonly passwordSalt: string | undefined;
}
