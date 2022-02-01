import { ERROR_FORM_ELEMENTS_ARE_NULL } from '../utils/constants';

/**
 * Shows error message.
 * @param errorEl Error DOM element.
 * @param text Message.
 */
export function setFormErrorText(errorEl: HTMLElement | null, text: string): void {
  if (errorEl !== null) {
    errorEl.textContent = text;
  }
}

/**
 * Clears error message.
 * @param errorEl Error DOM element.
 */
export function clearFormErrorText(errorEl: HTMLElement | null): void {
  if (errorEl !== null) {
    errorEl.textContent = '';
  }
}

interface FormElements {

  /** Form element. */
  readonly formEl: HTMLFormElement;

  /** Error box element. */
  readonly errorEl: HTMLDivElement;

  /** Email input element. */
  readonly emailEl: HTMLInputElement;

  /** Password input element. */
  readonly passwordEl: HTMLInputElement;
}

/** Return elements of form. */
export function getFormElements(): FormElements {
  const formEl = document.querySelector<HTMLFormElement>('.auth-form');
  const errorEl = document.querySelector<HTMLDivElement>('.auth-form__error');
  const emailEl = document.querySelector<HTMLInputElement>('.auth-form__email');
  const passwordEl = document.querySelector<HTMLInputElement>('.auth-form__password');

  if (formEl === null || errorEl === null || emailEl === null || passwordEl === null) {
    throw new Error(ERROR_FORM_ELEMENTS_ARE_NULL);
  }

  return {
    formEl,
    errorEl,
    emailEl,
    passwordEl,
  };
}
