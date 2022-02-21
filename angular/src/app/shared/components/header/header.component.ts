import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

/** App header. */
@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  /** Authoriazation state. */
  public readonly isAuthorized$: Observable<boolean>;

  private readonly destroy$ = new Subject();

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.isAuthorized$ = this.authService.isAuthorized$;
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
