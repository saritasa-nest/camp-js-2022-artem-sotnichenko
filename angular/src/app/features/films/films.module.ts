import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { FilmLineComponent } from './film-line/film-line.component';
import { FiltersComponent } from './filters/filters.component';

/** Films module. */
@NgModule({
  declarations: [FilmsComponent, FilmLineComponent, FiltersComponent],
  imports: [
    CommonModule,
    SharedModule,
    FilmsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class FilmsModule { }
