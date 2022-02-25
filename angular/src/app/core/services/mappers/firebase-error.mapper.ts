import { Injectable } from '@angular/core';
import { FirebaseError } from 'firebase/app';

const errors = {
  'auth/invalid-email': 'Invalid email.',
  'auth/user-not-found': 'User not found.',
  'auth/wrong-password': 'Wrong password.',
  'auth/email-already-in-use': 'Email already in use.',
  'default': 'Unknown error.',
} as const;

/**
 * Mapper for user entities.
 */
@Injectable({ providedIn: 'root' })
export class FirebaseErrorMapper {
  /**
   * Maps AuthError to Error with human readable message.
   * @param error Auth error.
   */
  public map(error: FirebaseError): Error {
    return new Error(errors[error.code as keyof typeof errors] ?? `${errors.default} (${error.code})`);
  }
}
