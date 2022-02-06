/**
 * Format date to "Month Day, Year" format.
 * @param date Date object to format.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
}
