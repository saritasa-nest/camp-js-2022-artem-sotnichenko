import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { FilmRowComponent } from './film-row/film-row.component';
import { FiltersComponent } from './filters/filters.component';

/** Films module. */
@NgModule({
  declarations: [FilmsComponent, FilmRowComponent, FiltersComponent],
  imports: [
    CommonModule,
    SharedModule,
    FilmsRoutingModule,
  ],
})
export class FilmsModule { }
