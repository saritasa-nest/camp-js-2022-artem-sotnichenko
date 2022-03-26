/* eslint-disable import/export */
/** Query direction. */
export enum QueryDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export namespace QueryDirection {
  const TO_READABLE_MAP: Readonly<Record<QueryDirection, string>> = {
    [QueryDirection.Ascending]: 'Ascending',
    [QueryDirection.Descending]: 'Descending',
  };

  /**
   * Maps query direction to human-readable value.
   * @param queryDirection Query direction.
   */
  export function toReadable(queryDirection: QueryDirection): string {
    return TO_READABLE_MAP[queryDirection];
  }
}
