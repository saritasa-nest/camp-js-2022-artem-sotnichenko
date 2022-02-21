import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Films table component. */
@Component({
  selector: 'sw-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsComponent {}
