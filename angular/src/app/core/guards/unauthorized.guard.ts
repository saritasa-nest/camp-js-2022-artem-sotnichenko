import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

/** Whether user authorized to join. */
@Injectable({
  providedIn: 'root',
})
export class UnauthorizedGuard implements CanActivate {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  /** @inheritdoc */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthorized$.pipe(
      map(isAuthorized => (isAuthorized ? true : this.router.parseUrl('/auth'))),
      first(),
    );
  }
}
