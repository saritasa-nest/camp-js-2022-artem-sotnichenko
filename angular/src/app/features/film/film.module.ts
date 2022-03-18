import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { FilmRoutingModule } from './film-routing.module';
import { FilmComponent } from './film.component';

/** Film module. */
@NgModule({
  declarations: [FilmComponent],
  imports: [
    CommonModule,
    FilmRoutingModule,
    SharedModule,
  ],
})
export class FilmModule { }
