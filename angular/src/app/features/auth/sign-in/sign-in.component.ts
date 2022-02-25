import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SignInData } from 'src/app/core/models/sign-in-form';
import { AuthService } from 'src/app/core/services/auth.service';
import { DestroyService } from 'src/app/core/services/destroy.service';

/** Sign in page. */
@Component({
  selector: 'sw-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class SignInComponent {
  /** Error messages. */
  public readonly errorMessage$ = new Subject<string>();

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

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
