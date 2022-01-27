/**
 * Shows error message.
 * @param errorEl Error DOM element.
 * @param text Message.
 */
export function setFormErrorText(errorEl: HTMLElement | null, text: string): void {
  if (errorEl) {
    errorEl.textContent = text;
  }
}

/**
 * Clears error message.
 * @param errorEl Error DOM element.
 */
export function clearFormErrorText(errorEl: HTMLElement | null): void {
  if (errorEl) {
    errorEl.textContent = '';
  }
}

interface FormElements {

  /** Form element. */
  formEl: HTMLFormElement | null;

  /** Error box element. */
  errorEl: HTMLDivElement | null;

  /** Email input element. */
  emailEl: HTMLInputElement | null;

  /** Password input element. */
  passwordEl: HTMLInputElement | null;
}

/** Return elements of form. */
export function getFormElements(): FormElements {
  return {
    formEl: document.querySelector<HTMLFormElement>('.auth-form'),
    errorEl: document.querySelector<HTMLDivElement>('.auth-form__error'),
    emailEl: document.querySelector<HTMLInputElement>('.auth-form__email'),
    passwordEl: document.querySelector<HTMLInputElement>('.auth-form__password'),
  };
}
