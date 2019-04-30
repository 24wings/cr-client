import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

const COMPONENTS = [
];
const COMPONENTS_NOROUNT = [
];

@NgModule({
  imports: [
    SharedModule,

  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class CompanyModule { }
