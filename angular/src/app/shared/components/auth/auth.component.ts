import { Component, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

/**
 * Authorization form component.
 *
 * Wrapper that have social authorization buttons
 * and expect component of other authorization method (email+password) to be placed inside.
 */
@Component({
  selector: 'sw-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnDestroy {
  /** Auth form title. */
  @Input()
  public title = '';

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /** Handle sign in with google. */
  public onSignInWithGoogle(): void {
    this.authService
      .signInWithGoogle()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => this.router.navigate(['films']),
      });
  }
}
