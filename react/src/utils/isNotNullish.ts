/**
 * Not nullish type guard.
 * @param value Value.
 */
export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value != null;
}
