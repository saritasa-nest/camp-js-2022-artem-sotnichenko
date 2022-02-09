import { getFilmsAfterId } from '../entities/film';

import { FILMS_COUNT_PER_PAGE } from '../utils/constants';

import { SortType } from '../entities/film/types';

import { updatePaginationBySearchInput } from './pagination';
import { changeStore, getStore } from './store';

const input = document.querySelector<HTMLInputElement>('.search_input');

/**
 * Set up searching field.
 */
export const setUpSearchInput = (): void => {
  let timer: NodeJS.Timeout;
  if (input !== null) {
    input.addEventListener('input', event => {
      const substring = (event.target as HTMLTextAreaElement).value;
      clearTimeout(timer);
      timer = setTimeout(() => timeoutHandler(substring), 1500);
    });
  }
};

/**
 * Timer handler.
 * @param substringSearch Substring to search in.
 */
async function timeoutHandler(substringSearch: string): Promise<void> {
  // Get data from store to get restart pagination and get films.
  const {
    sortField,
    sortType,
  } = getStore();
  const films = await getFilmsAfterId({
    limit: FILMS_COUNT_PER_PAGE,
    orderBy: sortField,
    isDescending: sortType === SortType.Descending,
    startAfter: null,
    substringSearch,
  });

  // Update substring in store.
  changeStore({
    substringSearch,
  });
  updatePaginationBySearchInput(films);

}
