import { Component } from "@angular/core";


@Component({selector:"template-detail",templateUrl:"./template-detail.component.html",
styleUrls:["./template-detail.component.css"]
})
export class TemplateDetailComponent{

    isVisible = false;
    isVisible1 = false;




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

    showModal1(): void {
        this.isVisible1 = true;
    }

    handleOk1(): void {
        console.log('Button ok clicked!');
        this.isVisible1 = false;
    }

    handleCancel1(): void {
        console.log('Button cancel clicked!');
        this.isVisible1= false;
    }
}