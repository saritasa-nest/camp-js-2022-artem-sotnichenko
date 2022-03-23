/**
 * Asserts that value is not `null` or `undefined`.
 * @param value Value.
 * @param message Error message.
 */
export function assertNotNullish<T>(value: T | null | undefined, message?: string): asserts value is T {
  if (value == null) {
    throw new Error(message ?? 'The value is null.');
  }
}
