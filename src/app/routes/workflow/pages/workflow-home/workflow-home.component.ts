import { Component } from "@angular/core";

@Component({
    selector:"workflow-home",templateUrl:"./workflow-home.component.html",
    styleUrls: ['./workflow-home.css'],
})
export class WorkflowHomeComponent{


    checked = true;



    listOfData = [
        {
          key: '1',
          name: '财务-付款',
          age: 32,
          address: 'New York No. 1 Lake Park'
        },
        {
          key: '2',
          name: '财务-付款',
          age: 42,
          address: 'London No. 1 Lake Park'
        },
        {
          key: '3',
          name: '财务-付款',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        }
        ,
        {
          key: '4',
          name: '财务-付款',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        },
        {
          key: '5',
          name: '财务-付款',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        },
        {
          key: '6',
          name: '财务-付款',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        }
      ];



      isVisible = false;

      constructor() {}
    
      showModal(): void {
        this.isVisible = true;
      }
    
      handleOk(): void {
        console.log('Button ok clicked!');
        this.isVisible = false;
      }
    
      handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
      }





















}