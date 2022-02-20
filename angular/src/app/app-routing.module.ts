import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthorizedOnlyGuard } from './core/guards/unauthorized-only.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
    canActivate: [UnauthorizedOnlyGuard],
  },

  { path: '', redirectTo: '/films', pathMatch: 'full' },
  {
    path: 'films',
    loadChildren: () => import('./features/films/films.module').then(m => m.FilmsModule),
  },
];

/** App routing. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
