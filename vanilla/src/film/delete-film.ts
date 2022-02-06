import { showModal } from '../modal';

/**
 * Delete film.
 * @param filmId Film id.
 */
export function deleteFilm(filmId: string): void {
  showModal({
    title: 'Are you sure?',
    onConfirm() {
      console.log('yes');
    },
  });
}
