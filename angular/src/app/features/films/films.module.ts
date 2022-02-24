import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { FilmLineComponent } from './film-line/film-line.component';

/** Films module. */
@NgModule({
  declarations: [FilmsComponent, FilmLineComponent],
  imports: [
    CommonModule,
    SharedModule,
    FilmsRoutingModule,
  ],
})
export class FilmsModule { }
