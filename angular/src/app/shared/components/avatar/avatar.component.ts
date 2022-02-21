import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

/** Avatar. */
@Component({
  selector: 'sw-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  /** Avatar src. */
  @Input()
  public src: string | null = null;

  /** Image alt. */
  @Input()
  public alt: string | null = null;
}
