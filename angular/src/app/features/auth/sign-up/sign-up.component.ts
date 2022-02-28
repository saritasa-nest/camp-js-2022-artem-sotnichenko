import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SignInData } from 'src/app/core/models/sign-in-form';
import { AuthService } from 'src/app/core/services/auth.service';
import { DestroyService } from 'src/app/core/services/destroy.service';

/** Sign up page. */
@Component({
  selector: 'sw-sign-in',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class SignUpComponent {
  /** Error messages. */
  public readonly errorMessage$ = new Subject<string>();

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  /**
   * Handles sign up.
   * @param form Form.
   */
  public onFormChange(form: SignInData): void {
    this.authService
      .signUpWithEmailAndPassword(form)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (e: Error) => this.errorMessage$.next(e.message),
      });
  }
}
