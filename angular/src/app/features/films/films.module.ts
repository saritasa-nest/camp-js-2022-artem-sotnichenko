import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';

/** Films module. */
@NgModule({
  declarations: [FilmsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FilmsRoutingModule,
  ],
})
export class FilmsModule { }
