import { Component, NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { RouterModule } from "@angular/router";
import { WorkflowHomeComponent } from "./pages/workflow-home/workflow-home.component";
import { WorkFlowComponent } from "./workflow.component";
import { TemplateComponent } from "./pages/template/template.component";
import { TemplateTypeComponent } from "./pages/template-type/template-type.component";
import { WorkflowDetailComponent } from "./pages/workflow-detail/workflow-detail.component";
import { TemplateDetailComponent } from "./pages/template-detail/template-detail.component";


@NgModule({
    imports:[SharedModule,RouterModule.forChild([

        {path:"",component:WorkFlowComponent,children:[
            {path:"",redirectTo:"/workflow/home",pathMatch:"full"},
            {path:"home",children:[
               {path:"", component:WorkflowHomeComponent},
               {path:"detail",component:WorkflowDetailComponent}
            ]},
            {path:"template",children:[
                {path:"",component:TemplateComponent},
                {path:"detail",component:TemplateDetailComponent}

            ]},
            {path:"template-type",component:TemplateTypeComponent}
        ]}
    ])],
    declarations:[WorkflowHomeComponent,
        WorkFlowComponent,
        TemplateComponent,
        TemplateTypeComponent,
        WorkflowDetailComponent,
        TemplateDetailComponent
    ]
})
export class WorkflowModule{

}