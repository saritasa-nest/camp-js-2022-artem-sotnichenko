import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Site logo. */
@Component({
  selector: 'sw-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {}
