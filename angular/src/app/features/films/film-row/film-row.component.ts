import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

/** Films table row. */
@Component({

  /**
   * Films table row is invalid with angular component wrapper.
   * @see Caniinclude https://caninclude.glitch.me/caninclude?child=tr&parent=div.
   */
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[sw-film-row]',
  templateUrl: './film-row.component.html',
  styleUrls: ['./film-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmRowComponent {
  /** Id. */
  @Input()
  public id = '';

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
