import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { Film } from 'src/app/core/models/film';
import { FilmService } from 'src/app/core/services/film/film.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject, combineLatest, ignoreElements, map, merge, mergeMap, Observable, Subject, takeUntil, tap } from 'rxjs';
import { FilmCursor, FilterOptions, PagesStatus, PaginationDirection } from 'src/app/core/services/film/utils/types';
import { FILMS_PER_PAGE } from 'src/app/core/utils/constants';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { DestroyService } from 'src/app/core/services/destroy.service';

/** Films table component. */
@Component({
  selector: 'sw-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('show', [
      state('void', style({
        opacity: 0,
      })),
      state('visible', style({
        opacity: 1,
      })),
      transition('void => visible', [animate('0.5s ease-in')]),
    ]),
  ],
  providers: [DestroyService],
})
export class FilmsComponent {

  /** Films. */
  public readonly films$: Observable<readonly Film[]>;

  /** Films fetch cursor. */
  private readonly cursor$ = new BehaviorSubject<FilmCursor | null>(null);

  /** Whether it is last page of films. */
  public readonly pagesStatus$ = new Subject<PagesStatus>();

  /** Cursor to fetch films backward of it. */
  private backwardCursor: FilmCursor | null = null;

  /** Cursor to fetch films forward of it. */
  private forwardCursor: FilmCursor | null = null;

  public constructor(
    @Self() private readonly destroy$: DestroyService,
    private readonly filmService: FilmService,
    private readonly paginationService: PaginationService,
  ) {
    const defaultCursor = this.filmService.getCursor();
    const filmsCount = FILMS_PER_PAGE;

    const currentCursor$ = this.cursor$.pipe(
      map(cursor => cursor === null ? defaultCursor : cursor),
    );

    const films$ = currentCursor$.pipe(
      mergeMap(cursor => this.paginationService.getFilms(filmsCount, cursor)),
    );

    const cursors$ = combineLatest([currentCursor$, films$]).pipe(
      map(([cursor, films]) => this.paginationService.getCursors(filmsCount, films, cursor)),
    );

    this.films$ = combineLatest([currentCursor$, films$]).pipe(
      map(([cursor, films]) => this.paginationService.getFilmsPage(filmsCount, films, cursor)),
    );

    // Side effects handling
    const setPagesStatusSideEffect$ = combineLatest([currentCursor$, films$]).pipe(
      tap(([cursor, films]) => {
        const pagesStatus = this.paginationService.getPagesStatus(filmsCount, films, cursor);
        this.pagesStatus$.next(pagesStatus);
      }),
    );

    const setCursorsSideEffect$ = cursors$.pipe(
      tap(cursors => {
        this.forwardCursor = cursors.forward;
        this.backwardCursor = cursors.backward;
      }),
    );

    merge(
      setPagesStatusSideEffect$,
      setCursorsSideEffect$,
    ).pipe(
      ignoreElements(),
      takeUntil(this.destroy$),
    )
      .subscribe();
  }

  /**
   * Handle page change.
   * @param paginationDirection Pagination direction.
   */
  public onChangePage(paginationDirection: PaginationDirection): void {
    if (paginationDirection === PaginationDirection.Next) {
      this.cursor$.next(this.forwardCursor);
    } else {
      this.cursor$.next(this.backwardCursor);
    }
  }

  /**
   * Handle filter options change.
   * @param filterOptions Sort options.
   */
  public onChangeFilterOptions(filterOptions: FilterOptions): void {
    const { searchText, sortOptions } = filterOptions;

    if (sortOptions !== null) {
      this.cursor$.next(this.filmService.getCursor({
        searchText: null,
        sortOptions,
      }));
    } else {
      this.cursor$.next(this.filmService.getCursor({
        searchText,
        sortOptions: null,
      }));
    }
  }

  /**
   * Film track function for ngFor.
   * @param index Index in array.
   * @param film Film.
   */
  public trackFilm(index: number, film: Film): Film['id'] {
    return film.id;
  }
}
