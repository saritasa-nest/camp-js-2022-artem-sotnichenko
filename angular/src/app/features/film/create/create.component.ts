import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { filter, map } from 'rxjs';
import { Planet } from 'src/app/core/models/planet';
import { FilmDetailsService } from 'src/app/core/services/film-details.service';

@Component({
  selector: 'sw-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {

  public readonly planets$ = this.filmDetailsService.getAllPlanets();

  public readonly selectedPlanetIds = ['a'];

  public constructor(
    private readonly filmDetailsService: FilmDetailsService,
  ) { }

  ngOnInit(): void {
    this.planets$.subscribe(p => console.log(p));
  }

}
