interface ModalOptions {

  /** Modal title. */
  readonly title: string;

  /** Confirm callback. */
  readonly onConfirm?: () => void;

  /** Decline callback. */
  readonly onDecline?: () => void;
}

/**
 * Show modal.
 * @param opts Modal options.
 * @returns Close modal callback.
 */
export function showModal({
  title,
  onConfirm,
  onDecline,
}: ModalOptions): () => void {
  const modalElement = document.createElement('div');
  modalElement.classList.add('modal');
  modalElement.innerHTML = `
<div class='modal__content'>
  <h2 class='modal__title'>${title}</h2>
  <div class='modal__buttons'>
    <button type='button' class='modal__confirm is-small'>Confirm</button>
    <button type='button' class='modal__decline is-small is-secondary'>Decline</button>
  </div>
</div>
`;

  modalElement.querySelector('.modal__content')?.addEventListener('click', e => {
    e.stopPropagation();
  });

  modalElement.addEventListener('click', () => closeModal(modalElement));

  modalElement.querySelector('.modal__decline')?.addEventListener('click', () => {
    if (onDecline) {
      onDecline();
    }
    closeModal(modalElement);
  });

  modalElement.querySelector('.modal__confirm')?.addEventListener('click', () => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal(modalElement);
  });

  document.body.append(modalElement);

  return () => closeModal(modalElement);
}

/**
 * Closes modal.
 * @param modalElement Modal element.
 */
function closeModal(modalElement: HTMLElement): void {
  modalElement.remove();
}
