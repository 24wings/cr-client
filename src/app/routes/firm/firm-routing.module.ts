import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  { 
    path: 'index', 
    component: FirmIndexComponent,
    children:[
      {path:"",redirectTo:"basic"},
      {
        path:"basic",
        component:FirmIndexBasicComponent,
        data: { titleI18n: '基本信息' },
      },
      {
        path:"product",
        component:FirmIndexProductComponent,
        data: { titleI18n: '产品管理' },
      },
      {
        path:"tissue",
        component:FirmIndexTissueComponent,
        data: { titleI18n: '组织结构' },
      },
      {
        path:"crew",
        component:FirmIndexCrewComponent,
        data: { titleI18n: '人员管理' },
        children:[
          {path:"",redirectTo:"crewIndex",data: { titleI18n: '人员管理' },},
          {
            path:"crewAdd",
            component:FirmIndexCrewAddComponent,
            children:[
              {path:"",redirectTo:"crewAddInfo"},
              {
                path:"crewAddInfo",
                component:FirmIndexCrewInfoComponent,
                data: { titleI18n: '人员管理' },
              },
              {
                path:"crewAddIntegral",
                component:FirmIndexCrewIntegralComponent,
                data: { titleI18n: '人员管理' },
              }
            ]
          },
          {
            path:"crewIndex",
            component:FirmIndexCrewIndexComponent,
            data: { titleI18n: '人员管理' },
          }
        ]
      },
      {
        path:"role",
        component:FirmIndexRoleComponent,
        data: { titleI18n: '角色管理' },
        children:[
          {path:"",redirectTo:"role1"},
          {
            path:"role1",
            component:FirmIndexRole1Component,
            data: { titleI18n: '角色管理' },
          },
          {
            path:"role2",
            component:FirmIndexRole2Component,
            data: { titleI18n: '角色管理' },
          }
        ]
      },
      {
        path:"dataLimit",
        component:FirmIndexDataLimitComponent,
        data: { titleI18n: '数据权限管理' },
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirmRoutingModule { }
