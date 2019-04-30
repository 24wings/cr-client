import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FirmRoutingModule } from './firm-routing.module';
import { FirmIndexComponent } from './index/index.component';
import { FirmIndexBasicComponent } from './index/basic/basic.component';
import { FirmIndexProductComponent } from './index/product/product.component';
import { FirmIndexTissueComponent } from './index/tissue/tissue.component';
import { FirmIndexCrewComponent } from './index/crew/crew.component';
import { FirmIndexCrewAddComponent } from './index/crew/add/add.component';
import { FirmIndexCrewIndexComponent } from './index/crew/index/index.component';
import { FirmIndexCrewInfoComponent } from './index/crew/add/info/info.component';
import { FirmIndexCrewIntegralComponent } from './index/crew/add/integral/integral.component';
import { FirmIndexRoleComponent } from './index/role/role.component';
import { FirmIndexRole1Component } from './index/role/role1/role1.component';
import { FirmIndexRole2Component } from './index/role/role2/role2.component';
import { FirmIndexDataLimitComponent } from './index/dataLimit/dataLimit.component';

const COMPONENTS = [
  FirmIndexComponent];
const COMPONENTS_NOROUNT = [
  FirmIndexBasicComponent,
  FirmIndexProductComponent,
  FirmIndexTissueComponent,
  FirmIndexCrewComponent,
  FirmIndexCrewAddComponent,
  FirmIndexCrewIndexComponent,
  FirmIndexCrewInfoComponent,
  FirmIndexCrewIntegralComponent,
  FirmIndexRoleComponent,
  FirmIndexRole1Component,
  FirmIndexRole2Component,
  FirmIndexDataLimitComponent];

@NgModule({
  imports: [
    SharedModule,
    FirmRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class FirmModule { }
