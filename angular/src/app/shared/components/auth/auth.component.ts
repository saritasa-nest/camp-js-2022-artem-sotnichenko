import { Component, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

/** Auth component. */
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
