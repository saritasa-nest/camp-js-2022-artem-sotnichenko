import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlankLayoutComponent } from '../layouts/blank-layout/blank-layout.component';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [{ path: '', component: LoginComponent }],
  },
];

/** Login routing. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
