import { signUp } from '../../firebase/auth';
import { clearError, setError } from '../auth';

const formEl = document.querySelector<HTMLFormElement>('.auth-form');
const emailEl = document.querySelector<HTMLInputElement>('.auth-form__email');
const passwordEl = document.querySelector<HTMLInputElement>('.auth-form__password');
const errorEl = document.querySelector<HTMLDivElement>('.auth-form__error');

formEl?.addEventListener('submit', async e => {
  e.preventDefault();

  const email = emailEl?.value;
  const password = passwordEl?.value;

  if (!email || !password) {
    return setError(errorEl, 'All fields should be filled.');
  }

  clearError(errorEl);
  try {
    await signUp(email, password);
    window.location.href = '/auth/login/';
  } catch (err: unknown) {
    setError(errorEl, (err as Error).message);
  }
});
