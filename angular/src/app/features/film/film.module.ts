import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { FilmRoutingModule } from './film-routing.module';
import { FilmComponent } from './details/film.component';
import { FilmFormComponent } from './film-form/film-form.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

/** Film module. */
@NgModule({
  declarations: [
    FilmComponent,
    FilmFormComponent,
    CreateComponent,
    UpdateComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    FilmRoutingModule,
    SharedModule,
  ],
})
export class FilmModule { }
