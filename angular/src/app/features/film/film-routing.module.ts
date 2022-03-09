import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmComponent } from './film.component';

const routes: Routes = [{ path: ':id', component: FilmComponent }];

/** Film routing. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmRoutingModule { }
