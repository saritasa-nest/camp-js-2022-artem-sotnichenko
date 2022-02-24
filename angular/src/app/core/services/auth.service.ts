import { Injectable } from '@angular/core';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  authState,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';
import { FirestoreError } from 'firebase/firestore';
import { catchError, defer, map, mapTo, Observable, shareReplay, throwError } from 'rxjs';

import { SignInData } from '../models/sign-in-form';
import { User } from '../models/user';

import { FirebaseErrorMapper } from './mappers/firebase-error.mapper';
import { UserMapper } from './mappers/user.mapper';

/**
 * Auth service.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Current user state. */
  public readonly user$: Observable<User | null>;

  /** Whether user is authorized. */
  public readonly isAuthorized$: Observable<boolean>;

  public constructor(
    private readonly auth: Auth,
    private readonly userMapper: UserMapper,
    private readonly firebaseErrorMapper: FirebaseErrorMapper,
  ) {
    this.user$ = authState(this.auth).pipe(
      map(user => user !== null ? this.userMapper.fromDto(user) : null),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
    this.isAuthorized$ = this.user$.pipe(
      map(user => user !== null),
    );
  }

  /** Sign in with google. */
  public signInWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return defer(() => signInWithPopup(this.auth, provider)).pipe(
      catchError((err: FirebaseError) => throwError(() => this.firebaseErrorMapper.map(err))),
      mapTo(void 0),
    );
  }

  /**
   * Sign in with email and password.
   * @param options Email and password object.
   */
  public signInWithEmailAndPassword({ email, password }: SignInData): Observable<void> {
    return defer(() => signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((err: FirestoreError) => throwError(() => this.firebaseErrorMapper.map(err))),
      mapTo(void 0),
    );
  }

  /**
   * Sign up with email and password.
   * @param options Email and password object.
   */
  public signUpWithEmailAndPassword({ email, password }: SignInData): Observable<void> {
    return defer(() => createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((err: FirestoreError) => throwError(() => this.firebaseErrorMapper.map(err))),
      mapTo(void 0),
    );
  }

  /** Sign out. */
  public signOut(): Observable<void> {
    return defer(() => signOut(this.auth));
  }
}
