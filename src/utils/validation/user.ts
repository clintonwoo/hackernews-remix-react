import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERID_MAX_LENGTH,
  USERID_MIN_LENGTH,
} from '../../config';
import { ValidationError, ValidationCode } from './validation-error';

export function validateUserId(id: string): boolean {
  if (id.length < USERID_MIN_LENGTH || id.length > USERID_MAX_LENGTH) {
    throw new ValidationError({
      code: ValidationCode.ID,
      message: `User ID must be between ${USERID_MIN_LENGTH} and ${USERID_MAX_LENGTH} characters.`,
    });
  }

  return true;
}

export function validateNewUser({ id, password }: { id: string; password: string }): boolean {
  if (id.length < USERID_MIN_LENGTH || id.length > USERID_MAX_LENGTH) {
    throw new ValidationError({
      code: ValidationCode.ID,
      message: `User ID must be between ${USERID_MIN_LENGTH} and ${USERID_MAX_LENGTH} characters.`,
    });
  }

  if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
    throw new ValidationError({
      code: ValidationCode.PASSWORD,
      message: `User password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`,
    });
  }

  return true;
}
