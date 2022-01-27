import { signUp } from '../../firebase/auth';
import { clearFormErrorText, setFormErrorText } from '../auth';

import { FORM_ERROR_EMPTY_FIELDS } from './../../utils/constants';

const formEl = document.querySelector<HTMLFormElement>('.auth-form');
const emailEl = document.querySelector<HTMLInputElement>('.auth-form__email');
const passwordEl = document.querySelector<HTMLInputElement>('.auth-form__password');
const errorEl = document.querySelector<HTMLDivElement>('.auth-form__error');

formEl?.addEventListener('submit', async e => {
  e.preventDefault();

  const email = emailEl?.value;
  const password = passwordEl?.value;

  if (!email || !password) {
    return setFormErrorText(errorEl, FORM_ERROR_EMPTY_FIELDS);
  }

  clearFormErrorText(errorEl);
  try {
    await signUp(email, password);
    window.location.href = '/auth/login/';
  } catch (err: unknown) {
    setFormErrorText(errorEl, (err as Error).message);
  }
});
