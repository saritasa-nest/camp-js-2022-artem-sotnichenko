
import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignInData } from 'src/app/core/models/sign-in-form';

/** Sign in form. */
@Component({
  selector: 'sw-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent {
  /** Text shown on submit button. */
  @Input()
  public buttonText = 'Submit';

  /** Change event. */
  @Output()
  public readonly formChange = new EventEmitter<SignInData>();

  /** Sign form with validation rules. */
  public signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  /** Email error string or null if there are no errors. */
  public get emailError(): string | null {
    const email = this.signInForm.get('email');
    if (email === null) {
      return null;
    }
    if (email.errors?.['required']) {
      return 'Email is required.';
    }
    if (email.errors?.['email']) {
      return 'Email should be valid.';
    }
    return null;
  }

  /** Password error string or null if there are no errors. */
  public get passwordError(): string | null {
    const password = this.signInForm.get('password');

    if (password === null) {
      return null;
    }
    if (password.errors?.['required']) {
      return 'Password is required.';
    }
    if (password.errors?.['minlength']) {
      return `Password should be ${password.errors?.['minlength'].requiredLength} letter long.`;
    }
    return null;
  }

  public constructor(
    private readonly fb: FormBuilder,
  ) {}

  /** Emits `formChange` event. */
  public onSubmit(): void {
    if (this.signInForm.valid) {
      this.formChange.emit({
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
      });
    }
  }
}
