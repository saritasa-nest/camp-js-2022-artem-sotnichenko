import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

/** User profile. */
@Component({
  selector: 'sw-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  /** Current user. */
  public readonly user$: Observable<User | null>;

  public constructor(
    private readonly authService: AuthService,
  ) {
    this.user$ = this.authService.user$;
  }
}
