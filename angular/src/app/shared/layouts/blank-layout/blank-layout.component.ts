import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Blank layout with centered content. */
@Component({
  selector: 'sw-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlankLayoutComponent {}
