import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [MatButtonModule];

/** Material imports. */
@NgModule({
  declarations: [],
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES,
})
export class MaterialModule {}
