import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SignInForm } from 'src/app/core/models/sign-in-form';
import { AuthService } from 'src/app/core/services/auth.service';

/** Sign up page. */
@Component({
  selector: 'sw-sign-in',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  /** Error messages. */
  public errorMessage$ = new Subject<string>();

  private errors: Record<string, string> = {
    'auth/invalid-email': 'Invalid email.',
    'default': 'Unknown error.',
  };

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Handles sign up.
   * @param form Form.
   */
  public onFormChange(form: SignInForm): void {
    this.authService
      .signUpWithEmailAndPassword(form)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: e => this.handleError(e.code as string),
        complete: () => this.router.navigate(['/']),
      });
  }

  private handleError(code: string): void {
    console.log(code);
    this.errorMessage$.next(this.errors[code] ?? this.errors['default']);
  }
}
