import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

/** Films table row. */
@Component({
  selector: 'sw-film-row',
  templateUrl: './film-row.component.html',
  styleUrls: ['./film-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmRowComponent {
  /** Title. */
  @Input()
  public title = '';

  /** Director. */
  @Input()
  public director = '';

  /** Producers. */
  @Input()
  public producers: readonly string[] = [];

  /** Release date. */
  @Input()
  public releaseDate: Date = new Date();
}
