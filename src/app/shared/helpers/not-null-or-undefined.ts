export function isNotNullOrUndefined<T>(value: T): boolean {
  return value !== undefined && value !== null;
}
