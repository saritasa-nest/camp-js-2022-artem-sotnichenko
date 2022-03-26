import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  Unsubscribe,
  signOut as signOutFromFirebase,
} from 'firebase/auth';
import { User } from 'src/models/user';
import { FirebaseService } from './firebase.service';
import { userMapper } from '../mappers/user.mapper';

export namespace AuthService {
  export const auth = getAuth(FirebaseService.app);

  const provider = new GoogleAuthProvider();

  /**
   * Shows popup with google sign in.
   */
  export async function signInWithGoogle(): Promise<User | null> {
    const { user } = await signInWithPopup(auth, provider);
    return user ? userMapper.fromDto(user) : null;
  }

  /**
   * Sign out.
   */
  export async function signOut(): Promise<void> {
    await signOutFromFirebase(auth);
  }

  /**
   * Subscription on user login.
   * @param callback Callback that runs when user logs in.
   */
  export function subscribeToAuthChange(callback: (user: User | null) => unknown): Unsubscribe {
    return onAuthStateChanged(auth, userDto => callback(userDto !== null ? userMapper.fromDto(userDto) : null));
  }

  /**
   * Get user asynchronously.
   */
  export function getUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      try {
        const unsubscribe = subscribeToAuthChange(user => {
          unsubscribe();
          resolve(user);
        });
      } catch (error: unknown) {
        reject(error);
      }
    });
  }
}
