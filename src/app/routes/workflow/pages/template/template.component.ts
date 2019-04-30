import { Component } from "@angular/core";

@Component({
    selector:"app-template",
    templateUrl:"./template.component.html",
    styleUrls: ['./template.component.css'],})
export class TemplateComponent{
    isVisible = false;
    


    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        console.log('Button ok clicked!');
        this.isVisible = false;
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible= false;
    }



    

}