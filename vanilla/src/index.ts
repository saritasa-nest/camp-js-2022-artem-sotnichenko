import { loadNextPage, setupPagination, updatePaginationButtons } from './films/pagination';
import { setupSorting } from './films/sort';
import { changeStore } from './films/store';

document.addEventListener('DOMContentLoaded', async() => {
  // Disable buttons before films are fetched.
  changeStore({
    isFirstPage: true,
    isLastPage: true,
  });
  updatePaginationButtons();

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
});
