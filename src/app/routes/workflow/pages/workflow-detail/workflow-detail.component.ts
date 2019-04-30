import { Component ,OnInit} from "@angular/core";
import { NzFormatEmitEvent , NzTreeNode} from 'ng-zorro-antd';

@Component({selector:"workflow-detail",templateUrl:"./workflow-detail.component.html",
styleUrls:['./workflow-detail.component.css']

})
export class WorkflowDetailComponent{
    showOrg:boolean=true;
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


      dataSet1 = [
        {
          key    : '1',
          name   : 'John Brown',

        },
        {
          key    : '2',
          name   : 'Jim Green',
        },
        {
          key    : '3',
          name   : 'Joe Black',
        }
      ];



      defaultCheckedKeys = [ '0-0-0' ];
      defaultSelectedKeys = [];
      defaultExpandedKeys = [ '0-0', '0-0-0', '0-0-1' ];




    isVisible = false;

    isVisible1 = false;

    isVisible2 = false;

    isVisible3 = false;

    isVisible4 = false;

    isVisible5 = false;


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



    showModal1(): void {
        this.isVisible1 = true;
    }

    handleOk1(): void {
        console.log('Button ok clicked!');
        this.isVisible1 = false;
    }

    handleCancel1(): void {
        console.log('Button cancel clicked!');
        this.isVisible1 = false;
    }



    showModal2(): void {
        this.isVisible2 = true;
    }

    handleOk2(): void {
        console.log('Button ok clicked!');
        this.isVisible2 = false;
    }

    handleCancel2(): void {
        console.log('Button cancel clicked!');
        this.isVisible2 = false;
    }


    showModal3(): void {
        this.isVisible3 = true;
    }

    handleOk3(): void {
        console.log('Button ok clicked!');
        this.isVisible3 = false;
    }

    handleCancel3(): void {
        console.log('Button cancel clicked!');
        this.isVisible3 = false;
    }


    showModal4(): void {
        this.isVisible4 = true;
    }

    handleOk4(): void {
        console.log('Button ok clicked!');
        this.isVisible4 = false;
    }

    handleCancel4(): void {
        console.log('Button cancel clicked!');
        this.isVisible4 = false;
    }

    onClose(): void {
        console.log('tag was closed.');
      }
    
    afterClose(): void {
        console.log('after tag closed');
    }


    showModal5(): void {
        this.isVisible5 = true;
    }

    handleOk5(): void {
        console.log('Button ok clicked!');
        this.isVisible5 = false;
    }

    handleCancel5(): void {
        console.log('Button cancel clicked!');
        this.isVisible5 = false;
    }


    nodes = [ {
        title   : '0-0',
        key     : '0-0',
        expanded: true,
        children: [ {
          title   : '0-0-0',
          key     : '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        }, {
          title   : '0-0-1',
          key     : '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        }, {
          title : '0-0-2',
          key   : '0-0-2',
          isLeaf: true
        } ]
      }, {
        title   : '0-1',
        key     : '0-1',
        children: [
          { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
          { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
          { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
        ]
      }, {
        title : '0-2',
        key   : '0-2',
        isLeaf: true
      } ];
    
      nzEvent(event: NzFormatEmitEvent): void {
        console.log(event);
      }
    
      ngOnInit(): void {
      }



}