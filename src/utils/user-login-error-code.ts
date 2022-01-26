import { USERID_MAX_LENGTH, USERID_MIN_LENGTH } from '../config';

export enum UserLoginErrorCode {
  INCORRECT_PASSWORD = 'pw',
  INVALID_ID = 'invalid_id',
  LOGGED_IN = 'loggedin',
  LOGGED_IN_REGISTER = 'user',
  LOGIN_UNSUCCESSFUL = 'unsuccessful',
  LOGIN_UPVOTE = 'up',
  USERNAME_TAKEN = 'id',
  SUBMIT = 'submit',
}

const userLoginErrorCodeMessages: Record<UserLoginErrorCode, string> = {
  [UserLoginErrorCode.INCORRECT_PASSWORD]: 'Incorrect password.',
  [UserLoginErrorCode.INVALID_ID]: `User ID must be between ${USERID_MIN_LENGTH} and ${USERID_MAX_LENGTH} characters.`,
  [UserLoginErrorCode.LOGGED_IN]: 'Logged in user must logout before logging in again.',
  [UserLoginErrorCode.LOGGED_IN_REGISTER]:
    'Logged in user must logout before registering a new user.',
  [UserLoginErrorCode.LOGIN_UNSUCCESSFUL]: 'Login unsuccessful.',
  [UserLoginErrorCode.LOGIN_UPVOTE]: 'You have to be logged in to vote.',
  [UserLoginErrorCode.USERNAME_TAKEN]: 'Username is taken.',
  [UserLoginErrorCode.SUBMIT]: 'You have to be logged in to submit.',
};

export function getErrorMessageForLoginErrorCode(code: UserLoginErrorCode): string {
  return userLoginErrorCodeMessages[code];
}
