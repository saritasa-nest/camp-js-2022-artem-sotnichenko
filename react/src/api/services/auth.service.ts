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
import { UserDto } from '../dtos/user.dto';
import { UserMapper } from '../mappers/user.mapper';

/**
 * Mapper for nullable user.
 * @param userDto User DTO.
 */
function mapNullableUser(userDto: UserDto | null): User | null {
  return userDto != null ? UserMapper.fromDto(userDto) : null;
}

export namespace AuthService {
  export const auth = getAuth(FirebaseService.app);

  const provider = new GoogleAuthProvider();

  /**
   * Shows pop up with google sign in.
   */
  export async function signInWithGoogle(): Promise<void> {
    await signInWithPopup(auth, provider);
  }

  /**
   * Sign out.
   */
  export async function signOut(): Promise<void> {
    await signOutFromFirebase(auth);
  }

  /**
   * Subscription on user login.
   * @param cb Callback that runs when user logs in.
   */
  export function subscribeToAuthChange(cb: (user: User | null) => unknown): Unsubscribe {
    return onAuthStateChanged(auth, user => cb(mapNullableUser(user)));
  }
}
