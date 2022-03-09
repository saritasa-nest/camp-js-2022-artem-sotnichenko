import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmFormRoutingModule } from './film-form-routing.module';
import { FilmFormComponent } from './film-form.component';


@NgModule({
  declarations: [
    FilmFormComponent
  ],
  imports: [
    CommonModule,
    FilmFormRoutingModule
  ]
})
export class FilmFormModule { }
