import { Error } from '../../enums/error.enum';
import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGES } from '../constants/error-messages';

export function getErrorMessage(error: Error): string {
  return ERROR_MESSAGES[error] ?? DEFAULT_ERROR_MESSAGE;
}
