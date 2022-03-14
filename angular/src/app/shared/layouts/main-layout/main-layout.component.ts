import { Component, ChangeDetectionStrategy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

/** Main layout with header and content. */
@Component({
  selector: 'sw-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('show', [
      state('void', style({
        opacity: 0,
      })),
      state('final', style({
        opacity: 1,
      })),
      transition('void => final', [animate('0.5s ease-in')]),
    ]),
  ],
})
export class MainLayoutComponent {}
