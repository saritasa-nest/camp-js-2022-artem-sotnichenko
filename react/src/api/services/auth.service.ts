import {
  GoogleAuthProvider, getAuth, signInWithPopup, User,
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';

export namespace AuthService {
  const auth = getAuth(FirebaseService.app);

  const provider = new GoogleAuthProvider();

  /**
   * Shows pop up with google sign in.
   */
  export async function signInWithGoogle(): Promise<User> {
    const userCredential = await signInWithPopup(auth, provider);
    const { user } = userCredential;

    return user;
  }
}
