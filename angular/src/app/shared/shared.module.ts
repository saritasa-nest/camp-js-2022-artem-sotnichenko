import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ProfileComponent } from './components/profile/profile.component';

const COMPONENTS = [
  BlankLayoutComponent,
  MainLayoutComponent,
  HeaderComponent,
  LogoComponent,
  AvatarComponent,
  ProfileComponent,
];

/** Shared module, for shared components and derectives. */
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    ...COMPONENTS,
  ],
})
export class SharedModule { }
