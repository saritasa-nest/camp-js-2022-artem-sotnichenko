import { getFilmsAfterId } from '../entities/film';

import { FILMS_COUNT_PER_PAGE } from '../utils/constants';

import { SortType } from '../entities/film/types';

import { updatePaginationBySearchInput } from './pagination';
import { changeStore, getStore } from './store';

const input = document.querySelector<HTMLInputElement>('.search__input');
const sortSelect = document.querySelector<HTMLSelectElement>('.sort__select');

const searchHandler = debounceSearch(updateFilmsBySearchInput, 1500);

/**
 * Set up searching field.
 */
export const setUpSearchInput = (): void => {
    input?.addEventListener('input', event => searchHandler(event));
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

/**
 * Freeze call in given time to save resource.
 * @param funct Function to freeze.
 * @param delay Time in ms, ti wait before new call.
 */
function debounceSearch(funct: (this: void, stringToSearch: string) => Promise<void>, delay: number): (event: Event) => void {
  let timer: NodeJS.Timeout | null;
  return (event: Event) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    const substringSearch = (event.target as HTMLTextAreaElement).value;
    timer = setTimeout(() => funct(substringSearch), delay);

    // If user type smth in search field you should disable it.
    if (sortSelect) {
      sortSelect.disabled = substringSearch.length !== 0;
    }
  };

}
