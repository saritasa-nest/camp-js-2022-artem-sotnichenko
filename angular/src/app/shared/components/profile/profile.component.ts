import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'sw-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  /** Current user. */
  public readonly user$: Observable<User | null>;

  private readonly destroy$ = new Subject();

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.user$ = this.authService.user$;
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.complete();
  }

  /** Signs out user. */
  public onSignOut(): void {
    this.authService
      .signOut()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => this.router.navigate(['/']),
      });
  }
}
