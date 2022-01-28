// Explicitly not adding readonly because changing values in `changeFunction`,
// and return freezed object in get function `getStore`
interface Store {

  /** Id of last film on current page. */
  lastId: string | null;

  /** Id of first film on current page. */
  firstId: string | null;

  /** Is currently on the last page. */
  isLastPage: boolean;

  /** Is currently on the first page. */
  isFirstPage: boolean;

  /** Sort field. */
  sortField: string;

  /** Sort type (ascending, descending). */
  sortType: string;
}

const store: Store = {
  lastId: null,
  firstId: null,
  isLastPage: false,
  isFirstPage: false,
  sortField: 'title',
  sortType: 'ascending',
};

/** Returns actual store.
 * @param fields Fields to update in store.
 */
export function changeStore(fields: Partial<Store>): void {
  store.lastId = fields.lastId ?? (fields.lastId === null ? null : store.lastId);
  store.firstId = fields.firstId ?? (fields.firstId === null ? null : store.firstId);
  store.isLastPage = fields.isLastPage ?? store.isLastPage;
  store.isFirstPage = fields.isFirstPage ?? store.isFirstPage;
  store.sortField = fields.sortField ?? store.sortField;
  store.sortType = fields.sortType ?? store.sortType;
}

/** Returns actual store. */
export function getStore(): Readonly<Store> {
  return Object.freeze({ ...store });
}
