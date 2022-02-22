import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LogoComponent } from './components/logo/logo.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { HeaderComponent } from './components/header/header.component';

const COMPONENTS = [
  LogoComponent,
  AvatarComponent,
  ProfileComponent,
  SignInFormComponent,
  AuthFormComponent,
];

const LAYOUTS = [
  BlankLayoutComponent,
  MainLayoutComponent,
];

/** Shared module, for shared components and derectives. */
@NgModule({
  declarations: [
    HeaderComponent,
    ...COMPONENTS,
    ...LAYOUTS,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    ...COMPONENTS,
    ...LAYOUTS,
  ],
})
export class SharedModule { }
