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
import { defer, map, mapTo, Observable, shareReplay } from 'rxjs';

import { SignInData } from '../models/sign-in-form';

import { User } from '../models/user';

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

  /** Whether is user authorized. */
  public readonly isAuthorized$: Observable<boolean>;

  public constructor(
    private readonly auth: Auth,
    private readonly userMapper: UserMapper,
  ) {
    this.user$ = authState(this.auth).pipe(
      map(user => user !== null ? this.userMapper.fromDto(user) : null),
      shareReplay(1),
    );
    this.isAuthorized$ = this.user$.pipe(
      map(user => user !== null),
    );
  }

  /** Sign in with google. */
  public signInWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return defer(() => signInWithPopup(this.auth, provider)).pipe(mapTo(void 0));
  }

  /**
   * Sign in with email and password.
   * @param options Email and password object.
   */
  public signInWithEmailAndPassword({ email, password }: SignInData): Observable<void> {
    return defer(() => signInWithEmailAndPassword(this.auth, email, password)).pipe(mapTo(void 0));
  }

  /**
   * Sign up with email and password.
   * @param options Email and password object.
   */
  public signUpWithEmailAndPassword({ email, password }: SignInData): Observable<void> {
    return defer(() => createUserWithEmailAndPassword(this.auth, email, password)).pipe(mapTo(void 0));
  }

  /** Sign out. */
  public signOut(): Observable<void> {
    return defer(() => signOut(this.auth));
  }
}
