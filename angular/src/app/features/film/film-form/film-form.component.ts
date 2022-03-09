import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { Planet } from 'src/app/core/models/planet';

/** Film form. */
@Component({
  selector: 'sw-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmFormComponent implements OnInit {
  /** Film. */
  @Input()
  public film?: Film;

  // /** All planets. */
  // @Input()
  // public allPlanets: readonly Planet[] = [];

  /** Selcted planets. */
  @Input()
  public selectedPlanetIds: Planet['id'][] = [];

  public planets = [{ name: 'test', id: '11' }];

  public planets$ = new BehaviorSubject<readonly {name: string; id: string;}[]>([]);

  // change data to use getter and setter
  @Input()
  public set allPlanets(planets: readonly Planet[]) {
    if (planets) {
      this.planets$.next(
        planets?.filter((planet): planet is Planet & {name: string;} => planet.name != null),
      );
    }
  }

  // public get allPlanets(): readonly Planet[] {
  //   return this.planets$.getValue();
  // }

  public constructor() {
    // console.log(this.allPlanets.filter((planet): planet is Planet & {name: string;} => planet.name != null));
    // this.planets = this.allPlanets.filter((planet): planet is Planet & {name: string;} => planet.name != null);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
