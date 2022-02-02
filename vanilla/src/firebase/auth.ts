import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword, onAuthStateChanged, Unsubscribe } from 'firebase/auth';

import { app } from './init';

const auth = getAuth(app);

/**
 * Signs up user.
 * @param email User email.
 * @param password User password.
 */
export async function signUp(email: string, password: string): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Signs in user.
 * @param email User email.
 * @param password User password.
 */
export async function signIn(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Subscribtion on user login.
 * @param fn Callback that runs when user logs in.
 */
export function subsrcibeToAuthChange(fn: (user: User | null) => unknown): Unsubscribe {
  return onAuthStateChanged(auth, user => fn(user));
}

/** Get currenly logged in user. */
export function getUser(): User | null {
  return auth.currentUser;
}
