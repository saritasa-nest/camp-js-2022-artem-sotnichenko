import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword } from 'firebase/auth';

import { app } from './init';

const auth = getAuth(app);

/**
 * Signs up user.
 * @param email User email.
 * @param password User password.
 */
export async function signUp(email: string, password: string): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;
  return user;
}

/**
 * Signs in user.
 * @param email User email.
 * @param password User password.
 */
export async function signIn(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;
  return user;
}
