import { loadNextPage, setupPagination, updatePaginationButtons } from './films/pagination';
import { setupSorting } from './films/sort';
import { changeStore } from './films/store';
import { setUpSearchInput } from './films/searching';

document.addEventListener('DOMContentLoaded', async() => {
  // Disable buttons before films are fetched.
  changeStore({
    isFirstPage: true,
    isLastPage: true,
  });
  updatePaginationButtons();

  // setup store before first load
  changeStore({
    isFirstPage: false,
    isLastPage: false,
  });
  await loadNextPage();

  // Disable "prev" button.
  changeStore({
    isFirstPage: true,
  });
  updatePaginationButtons();

  setupPagination();
  setupSorting();
  setUpSearchInput();
});
