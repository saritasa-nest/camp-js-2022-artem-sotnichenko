import { ERROR_FORM_ELEMENTS_ARE_NULL } from '../utils/constants';

/**
 * Shows error message.
 * @param errorElement Error DOM element.
 * @param text Message.
 */
export function setFormErrorText(errorElement: HTMLElement | null, text: string): void {
  if (errorElement !== null) {
    errorElement.textContent = text;
  }
}

/**
 * Clears error message.
 * @param errorElement Error DOM element.
 */
export function clearFormErrorText(errorElement: HTMLElement | null): void {
  if (errorElement !== null) {
    errorElement.textContent = '';
  }
}

interface FormElements {

  /** Form element. */
  readonly formElement: HTMLFormElement;

  /** Error box element. */
  readonly errorElement: HTMLDivElement;

  /** Email input element. */
  readonly emailElement: HTMLInputElement;

  /** Password input element. */
  readonly passwordElement: HTMLInputElement;
}

/** Return elements of form. */
export function getFormElements(): FormElements {
  const formElement = document.querySelector<HTMLFormElement>('.auth-form');
  const errorElement = document.querySelector<HTMLDivElement>('.auth-form__error');
  const emailElement = document.querySelector<HTMLInputElement>('.auth-form__email');
  const passwordElement = document.querySelector<HTMLInputElement>('.auth-form__password');

  if (formElement === null || errorElement === null || emailElement === null || passwordElement === null) {
    throw new Error(ERROR_FORM_ELEMENTS_ARE_NULL);
  }

  return {
    formElement,
    errorElement,
    emailElement,
    passwordElement,
  };
}
