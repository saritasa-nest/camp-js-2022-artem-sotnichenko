import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthorizedOnlyGuard } from './core/guards/unauthorized-only.guard';

const routes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  {
    path: 'films',
    loadChildren: () => import('./features/films/films.module').then(m => m.FilmsModule),
  },
  {
    path: 'auth/signin',
    loadChildren: () => import('./features/sign-in/sign-in.module').then(m => m.SignInModule),
    canActivate: [UnauthorizedOnlyGuard],
  },
  {
    path: 'auth/signup',
    loadChildren: () => import('./features/sign-up/sign-up.module').then(m => m.SignUpModule),
    canActivate: [UnauthorizedOnlyGuard],
  },
];

/** App routing. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
