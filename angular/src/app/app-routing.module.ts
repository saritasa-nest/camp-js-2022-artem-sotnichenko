import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizedGuard } from './core/guards/authorized.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthorizedGuard],
  },

  { path: '', redirectTo: '/films', pathMatch: 'full' },
  {
    path: 'films',
    loadChildren: () => import('./features/films/films.module').then(m => m.FilmsModule),

    // canActivate: [UnauthorizedGuard],
  },
];

/** App routing. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
