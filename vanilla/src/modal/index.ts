interface ModalOptions {

  /** Modal title. */
  title: string;

  /** Confirm callback. */
  onConfirm?: () => void;

  /** Decline callback. */
  onDecline?: () => void;
}

/**
 *
 * @param opts Modal options.
 * @returns Close modal callback.
 */
export function showModal({
  title,
  onConfirm,
  onDecline,
}: ModalOptions): () => void {
  const modalEl = document.createElement('div');
  modalEl.classList.add('modal');
  modalEl.innerHTML = `
<div class='modal__content'>
  <h2 class='modal__title'>${title}</h2>
  <div class='modal__buttons'>
    <button class='modal__confirm is-small'>Confirm</button>
    <button class='modal__decline is-small is-secondary'>Decline</button>
  </div>
</div>
`;

  modalEl.querySelector('.modal__content')?.addEventListener('click', e => {
    e.stopPropagation();
  });

  modalEl.addEventListener('click', () => closeModal(modalEl));

  modalEl.querySelector('.modal__decline')?.addEventListener('click', e => {
    if (onDecline) {
      onDecline();
    }
    closeModal(modalEl);
  });
  modalEl.querySelector('.modal__confirm')?.addEventListener('click', e => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal(modalEl);
  });

  document.body.append(modalEl);

  return () => closeModal(modalEl);
}

/**
 * Closes modal.
 * @param modalEl Modal element.
 */
function closeModal(modalEl: HTMLElement): void {
  modalEl.remove();
}
