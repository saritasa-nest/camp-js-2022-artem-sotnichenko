import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

const COMPONENTS = [
  BlankLayoutComponent,
  MainLayoutComponent,
  HeaderComponent,
  LogoComponent,
  AvatarComponent,
  ProfileComponent,
  SignInFormComponent,
  AuthFormComponent,
];

/** Shared module, for shared components and derectives. */
@NgModule({
  declarations: [...COMPONENTS],
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
  ],
})
export class SharedModule { }
