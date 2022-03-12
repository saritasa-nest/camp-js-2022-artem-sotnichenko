import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';

import { FilmComponent } from './film-details/film.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent, pathMatch: 'full' },
  { path: ':id', component: FilmComponent, pathMatch: 'full' },
];

/** Film routing. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmRoutingModule { }
