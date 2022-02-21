import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DestroyableComponent, takeUntilDestroy } from 'src/app/core/utils/destroyable';

/** Auth component. */
@DestroyableComponent()
@Component({
  selector: 'sw-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  public constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  /** Handle sign in with google. */
  public onSignInWithGoogle(): void {
    this.authService
      .signInWithGoogle()
      .pipe(takeUntilDestroy(this))
      .subscribe(() => this.router.navigate(['films']));
  }
}
