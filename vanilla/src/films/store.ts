import { OrderField, SortField, SortType } from '../entities/film/types';

interface Store {

  /** Id of last film on current page. */
  readonly lastId: string | null;

  /** Id of first film on current page. */
  readonly firstId: string | null;

  /** Is currently on the last page. */
  readonly isLastPage: boolean;

  /** Is currently on the first page. */
  readonly isFirstPage: boolean;

  /** Sort field. */
  readonly sortField: OrderField;

  /** Sort type (ascending, descending). */
  readonly sortType: string;
}

let store: Store = {
  lastId: null,
  firstId: null,
  isLastPage: false,
  isFirstPage: false,
  sortField: SortField.Title,
  sortType: SortType.Ascending,
};

/** Returns actual store.
 * @param fields Fields to update in store.
 */
export function changeStore(fields: Partial<Store>): void {
  store = {
    ...store,
    ...fields,
  };
}

/** Returns actual store. */
export function getStore(): Readonly<Store> {
  return Object.freeze({ ...store });
}
