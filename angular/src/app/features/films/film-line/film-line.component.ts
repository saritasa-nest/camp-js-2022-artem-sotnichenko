import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

/** Films table row. */
@Component({
  selector: 'sw-film-line',
  templateUrl: './film-line.component.html',
  styleUrls: ['./film-line.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmLineComponent {
  /** Title. */
  @Input()
  public title: string;

  /** Director. */
  @Input()
  public director: string;

  /** Producers. */
  @Input()
  public producers: string[];

  /** Release date. */
  @Input()
  public releaseDate: Date;

  public constructor() {}
}
