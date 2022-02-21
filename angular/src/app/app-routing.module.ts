import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthorizedOnlyGuard } from './core/guards/unauthorized-only.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
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
