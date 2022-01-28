const store: Store = {
  lastId: null,
  firstId: null,
  isLastPage: false,
  isFirstPage: false,
  sortField: 'title',
  sortType: 'ascending',
};

interface Store {
  lastId: string | null;
  firstId: string | null;
  isLastPage: boolean;
  isFirstPage: boolean;
  sortField: string;
  sortType: string;
}

export function changeStore(fields: Partial<Store>): void {
  store.lastId = fields.lastId ?? (fields.lastId === null ? null : store.lastId);
  store.firstId = fields.firstId ?? (fields.firstId === null ? null : store.firstId);
  store.isLastPage = fields.isLastPage ?? store.isLastPage;
  store.isFirstPage = fields.isFirstPage ?? store.isFirstPage;
  store.sortField = fields.sortField ?? store.sortField;
  store.sortType = fields.sortType ?? store.sortType;
  console.log('store', store);
}

export function getStore(): Readonly<Store> {
  return Object.freeze({ ...store });
}
