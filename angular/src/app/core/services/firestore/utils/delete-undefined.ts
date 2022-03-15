/**
 * Delete fields that are undefined.
 * Don't work deeply.
 * @param data Data object.
 */
export function deleteUndefinedShallow<T>(data: T): T {
  const newData: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      newData[key] = value;
    }
  }
  return newData as T;
}
