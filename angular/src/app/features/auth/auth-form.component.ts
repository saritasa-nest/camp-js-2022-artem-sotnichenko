import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DestroyService } from 'src/app/core/services/destroy.service';

/**
 * Authorization form component.
 *
 * Wrapper that have social authorization buttons on the top
 * and expect component of other authorization method (email+password) to be placed inside.
 */
@Component({
  selector: 'sw-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AuthFormComponent {
  /** Auth form title. */
  @Input()
  public title = '';

  /** Error messages. */
  public readonly errorMessage$ = new Subject<string>();

  public constructor(
    private readonly destroy$: DestroyService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  /** Handle sign in with google. */
  public onSignInWithGoogle(): void {
    this.authService
      .signInWithGoogle()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (e: Error) => this.errorMessage$.next(e.message),
        complete: () => this.router.navigate(['films']),
      });
  }
}
