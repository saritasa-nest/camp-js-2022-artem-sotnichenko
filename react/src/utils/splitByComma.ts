/**
 * Split string by comma and trim spaces.
 * @param string String.
 */
export function splitByComma(string: string): string[] {
  return string.split(',').map(item => item.trim());
}
