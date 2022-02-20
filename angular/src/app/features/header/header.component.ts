import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DestroyableComponent, takeUntilDestroy } from 'src/app/utils/destroyable';

/** App header. */
@DestroyableComponent()
@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  /** Current user. */
  public readonly user$: Observable<User | null>;

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.user$ = this.authService.user$;
  }

  /** Signs out user. */
  public onSignOut(): void {
    this.authService
      .signOut()
      .pipe(takeUntilDestroy(this))
      .subscribe(() => this.router.navigate(['/']));
  }
}
