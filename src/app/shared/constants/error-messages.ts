import { AuthErrorCodes } from 'firebase/auth';

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong!';

export const ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCodes.INVALID_EMAIL]: 'Incorrect email or password',
  [AuthErrorCodes.USER_DELETED]: `We couldn’t find an account matching the email and password you entered.
    Please check your email and password and try again.`,
  [AuthErrorCodes.INVALID_PASSWORD]: 'The password is invalid or the user does not have a password.',
  [AuthErrorCodes.EMAIL_EXISTS]: 'The provided email is already in use by an existing user.',
};
