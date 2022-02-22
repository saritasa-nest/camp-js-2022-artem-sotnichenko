import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Main layout with header and content. */
@Component({
  selector: 'sw-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
