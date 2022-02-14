import { signIn } from '../../firebase/auth';
import { clearFormErrorText, getFormElements, setFormErrorText } from '../auth';

import { FORM_ERROR_EMPTY_FIELDS } from './../../utils/constants';

const {
  formElement,
  errorElement,
  emailElement,
  passwordElement,
} = getFormElements();

formElement.addEventListener('submit', async event => {
  event.preventDefault();

  const email = emailElement.value;
  const password = passwordElement.value;

  if (email === '' || password === '') {
    return setFormErrorText(errorElement, FORM_ERROR_EMPTY_FIELDS);
  }

  clearFormErrorText(errorElement);
  try {
    await signIn(email, password);
    window.location.href = '/';
  } catch (err: unknown) {
    setFormErrorText(errorElement, (err as Error).message);
  }
});
