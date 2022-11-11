import { InjectionToken } from '@angular/core';

export interface ValidationErrorsConfig {
  [key: string]: (error: any, field?: string) => string;
}

export const defaultErrors: ValidationErrorsConfig = {
  custom: error => error,
  required: (_, field) => `${field ?? 'Field'} is required`,
  max: ({ max }) => `Max value is ${max}`,
  maxlength: ({ requiredLength }) => `Max length is ${requiredLength}`,
  min: ({ min }) => `Min value is ${min}`,
  minlength: ({ requiredLength }) => `Min length is ${requiredLength}`,
  email: () => `Incorrect email`,
  notMatched: (_, field) => `The ${field ?? 'field'} and its confirm are not the same`,
};

export const VALIDATION_ERRORS_CONFIG = new InjectionToken<ValidationErrorsConfig>('VALIDATION_ERRORS_CONFIG', {
  providedIn: 'root',
  factory: () => defaultErrors,
});
