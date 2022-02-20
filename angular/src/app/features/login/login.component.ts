import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DestroyableComponent, takeUntilDestroy } from 'src/app/utils/destroyable';

/** Login component. */
@DestroyableComponent()
@Component({
  selector: 'sw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
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
