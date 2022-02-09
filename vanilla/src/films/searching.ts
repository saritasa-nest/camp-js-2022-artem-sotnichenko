import { getFilmsAfterId } from '../entities/film';

import { FILMS_COUNT_PER_PAGE } from '../utils/constants';

import { SortType } from '../entities/film/types';

import { updatePaginationBySearchInput } from './pagination';
import { changeStore, getStore } from './store';

const input = <HTMLInputElement> document.querySelector('.search_input');
const sortSelect = <HTMLSelectElement> document.querySelector('.sort__select');

/**
 * Set up searching field.
 */
export const setUpSearchInput = (): void => {
  let timer: NodeJS.Timeout;
  if (input !== null) {
    input.addEventListener('input', event => {
      const substring = (event.target as HTMLTextAreaElement).value;

      // If user type smth in search field you should disable it.
      sortSelect.disabled = substring.length !== 0;

      clearTimeout(timer);
      timer = setTimeout(() => updateFilmsBySearchInput(substring), 1500);
    });
  }
};

/**
 * Update films in table by searching substring in titles.
 * @param substringSearch Substring to search in.
 */
async function updateFilmsBySearchInput(substringSearch: string): Promise<void> {
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

  // To fetch films with updated substring search in store.
  changeStore({
    substringSearch,
  });
  updatePaginationBySearchInput(films);
}
