import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankLayoutComponent } from '../layouts/blank-layout/blank-layout.component';

import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [{ path: '', component: AuthComponent }],
  },
];

/** Auth routing. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
