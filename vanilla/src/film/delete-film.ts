import { deleteFilm as deleteFilmFromDb } from '../entities/film/fetch';
import { showModal } from '../modal';

/**
 * Delete film.
 * @param filmId Film id.
 */
export function deleteFilm(filmId: string): void {
  showModal({
    title: 'Are you sure?',
    async onConfirm() {
      await deleteFilmFromDb(filmId);
      window.location.href = '/';
    },
  });
}
