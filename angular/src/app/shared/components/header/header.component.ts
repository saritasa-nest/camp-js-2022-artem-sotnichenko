import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DestroyService } from 'src/app/core/services/destroy.service';

/** App header. */
@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class HeaderComponent {

  /** Authoriazation state. */
  public readonly isAuthorized$: Observable<boolean>;

  public constructor(
    private readonly destroy$: DestroyService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.isAuthorized$ = this.authService.isAuthorized$;
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
