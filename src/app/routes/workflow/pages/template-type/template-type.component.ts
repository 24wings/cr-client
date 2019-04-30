import { Component } from "@angular/core";

@Component({
    selector:"template-type",
    templateUrl:"./template-type.component.html",
    styleUrls:["./template-type.component.css"]


})
export class TemplateTypeComponent{

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

    dataSet = [
        {
          key    : '1',
          name   : 'John Brown',
          age    : 32,
          address: 'New York No. 1 Lake Park'
        },
        {
          key    : '2',
          name   : 'Jim Green',
          age    : 42,
          address: 'London No. 1 Lake Park'
        },
        {
          key    : '3',
          name   : 'Joe Black',
          age    : 32,
          address: 'Sidney No. 1 Lake Park'
        }
      ];
}