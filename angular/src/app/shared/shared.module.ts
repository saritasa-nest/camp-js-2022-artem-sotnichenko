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
import { HeaderComponent } from './components/header/header.component';
import { EntitiesSelectComponent } from './components/entities-select/entities-select.component';

const EXPORTED_DECLARATIONS = [
  LogoComponent,
  AvatarComponent,
  ProfileComponent,
  SignInFormComponent,
  BlankLayoutComponent,
  MainLayoutComponent,
  EntitiesSelectComponent,
];

/** Shared module, for shared components and derectives. */
@NgModule({
  declarations: [
    HeaderComponent,
    ...EXPORTED_DECLARATIONS,
    EntitiesSelectComponent,
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...EXPORTED_DECLARATIONS,
  ],
})
export class SharedModule { }
