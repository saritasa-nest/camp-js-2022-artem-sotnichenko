import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SignInData } from 'src/app/core/models/sign-in-form';
import { AuthService } from 'src/app/core/services/auth.service';

/** Sign in page. */
@Component({
  selector: 'sw-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  /** Error messages. */
  public readonly errorMessage$ = new Subject<string>();

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
   * Handles sign in.
   * @param form Form.
   */
  public onFormChange(form: SignInData): void {
    this.authService
      .signInWithEmailAndPassword(form)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (e: Error) => this.errorMessage$.next(e.message),
        complete: () => this.router.navigate(['/']),
      });
  }
}
