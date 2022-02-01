import { signIn } from '../../firebase/auth';
import { clearFormErrorText, getFormElements, setFormErrorText } from '../auth';

import { FORM_ERROR_EMPTY_FIELDS } from './../../utils/constants';

const {
  formEl,
  errorEl,
  emailEl,
  passwordEl,
} = getFormElements();

formEl.addEventListener('submit', async e => {
  e.preventDefault();

  const email = emailEl.value;
  const password = passwordEl.value;

  if (email === '' || password === '') {
    return setFormErrorText(errorEl, FORM_ERROR_EMPTY_FIELDS);
  }

  clearFormErrorText(errorEl);
  try {
    await signIn(email, password);
    window.location.href = '/';
  } catch (err: unknown) {
    setFormErrorText(errorEl, (err as Error).message);
  }
});
