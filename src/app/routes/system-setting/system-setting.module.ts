import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { SelectOptionPageComponent } from "./pages/select-option-page/select-option.component";
import { RouterModule } from "@angular/router";
import { SettingOptionPageComponent } from "./pages/setting-option-page/setting-option-page.component";
import { SystemSettingComponent } from "./system-setting.component";

@NgModule({
    imports:[SharedModule,
    RouterModule.forChild([
        {path:"",component:SystemSettingComponent,children:[
            {path:"", redirectTo:"/system-setting/select-option",pathMatch:"full"},
            {path:"select-option",component:SelectOptionPageComponent},
        {path:"setting-option",component:SettingOptionPageComponent}
        ]}
    ])
    ],
    exports:[],
    declarations:[
        SystemSettingComponent,
        SelectOptionPageComponent,
        
        SettingOptionPageComponent]
})
export class SystemSettingModule{

}