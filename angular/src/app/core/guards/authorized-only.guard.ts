import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

/** Allows only authorized users to enter route, otherwise redirects to auth route. */
@Injectable({
  providedIn: 'root',
})
export class AuthorizedOnlyGuard implements CanActivate {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  /** @inheritdoc */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthorized$.pipe(
      map(isAuthorized => (isAuthorized ? true : this.router.parseUrl('/auth'))),
    );
  }
}
