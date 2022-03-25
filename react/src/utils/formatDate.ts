/**
 * Format date.
 * @param date Date object.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date);
}
