import { Component,OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { NzNotificationService, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { SettingsService, _HttpClient } from '@delon/theme';
import { OnDestroy, Inject, Optional } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';
import { retry, filter, concat } from 'rxjs/operators';
import { format } from '@delon/util';
import { getDay } from 'date-fns';
import { forEach } from '@angular/router/src/utils/collection';



@Component({
  selector: 'firm-index-tissue',
  templateUrl: './tissue.component.html',
  styleUrls: ['./tissue.component.css'],
})

export class FirmIndexTissueComponent implements OnInit{
  constructor(
    private router: Router,
    private modalService: NzModalService,
    public http: _HttpClient,
    public settings: SettingsService,
  ) {
  }



  companyID = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";  //公司ID，暂时写死
  error = "";
  id = "";
  project = "";
  UserId = "f033b9f7-0566-4916-a56b-7f7866e8c4ee";
  ctype = 0;
  department = "";

  //岗位集合
  items = []


  //nodes = [ {
  //  title   : '创联凯尔',
  //  key     : '100',
  //  expanded: true,
  //  children: [ {
  //    title   : '数字互动部',
  //    key     : '1001'
  //  }, {
  //    title   : '综合管理部',
  //    key     : '1002',
  //  }, {
  //    title   : '财务部',
  //    key     : '1003',
  //  } ]
  //} ];



  //------------------------------组织架构下拉框------------------------
  //获取初始节点
  nodes = [];
  BindTree() {
    this.http
      .post('http://localhost:55659/api/GetSYSCompanyFrameworkTree', {
        companyID: this.companyID
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.nodes = res.resData;
        }
      });
  }



  value: string;
  onExpandChange(event: Required<NzFormatEmitEvent>): void {
    if (event.node.getChildren().length === 0 && event.node.isExpanded) {
      this.http
        .post('http://localhost:55659/api/GetSYSCompanyFrameworkTreeChren', {
          companyID: this.companyID,
          parentId: event.node.key,
          type:1,        //当type==1的时候，只查询部门，不查询用户
        })
        .subscribe((res: any) => {
          //alert(res.Success);
          if (!res.Success) {
            this.error = res.Message;
            return;
          }
          else {
            event.node.addChildren(res.resData);
          }
        });
    }
  }
  //------------------------------组织架构下拉框------------------------


  
  

  // 编辑按钮
  ifCompile:boolean = false;

  // 编辑 模态框
  isVisible:boolean= false;

  // 编辑按钮的类型
  compileType:any;

  // 模态框标题
  modelTitle:any;

  // 需要编辑的那一选项的key 删除 增加 编辑 都取这个KEY
  compileKey:any;

  // 确定删除模态框

  isVisibles:boolean= false;

  // 岗位管理模态框
  isManage:boolean =false;

  // 修改人员管理的模态框
  isModifier:boolean =false;


  // 人员修改存放的id
  ModifierShowAffirm:any;

  // 人员修改存放名字
  position:any;
  position1:any;
  positionIndex:string;

  // 添加人员编辑框
  isAddStaff:boolean =false;
  isAddStaffText:any;


  
  deleteShowButton:boolean =false;



  nzEvent(e: NzFormatEmitEvent): void {
    this.compileKey = e.keys
    this.ifCompile = true;

  }


  // 编辑模态框需要关闭或者打开的时候调用 e为1时 是新增 为2时是编辑
  async isShowModel(e){
    if(e == 1){
      // 如果是1  就是增加
      this.modelTitle = "新增部门"
       
    } else if(e == 2){
      // 如果是2就是对某一个进行编辑
      this.modelTitle = "编辑部门"

    }
    this.ctype = e;
    this.isVisible =!this.isVisible
  }


  //新增/修改岗位确定按钮
  UpdateGw() {
    if (this.ctype==1) {
      this.http
        .post('http://localhost:55659/api/AddCompFrame', {
          companyId: this.companyID,
          id: this.compileKey[0],
          department: this.department,
        })
        .subscribe((res: any) => {
          if (!res.Success) {
            this.error = res.Message;
            return;
          }
          else {
            alert("添加成功");
            this.isVisible = !this.isVisible
          }
        });
    }
    else if (this.ctype==2) {
      this.http
        .post('http://localhost:55659/api/UpdateCompFrame', {
          companyId: this.companyID,
          id: this.compileKey[0],
          department: this.department,
        })
        .subscribe((res: any) => {
          if (!res.Success) {
            this.error = res.Message;
            return;
          }
          else {
            alert("修改成功");
            this.isVisible = !this.isVisible
          }
        });
    }
  }


  // 删除按钮 弹出或者关闭模态框
  isShowModels(){
    this.isVisibles = !this.isVisibles

  }


  // 确认删除
  handleOk() {
    this.http
      .post('http://localhost:55659/api/DeleteCompFrame', {
        compFrameId: this.compileKey[0],
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert(res.Message)
          return;
        }
        else {
          alert("删除成功")
          this.isVisibles = false;
        }
      })
  }



  //绑定部门下面包含的岗位
  BindGw() {
    this.http
      .post('http://localhost:55659/api/GetPostList', {
        departmentId: this.compileKey[0],
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.items = res.resData;
        }
      })
  }


  // 岗位管理模态框关闭或者打开
  isManageModel(id) {
    this.items = [];
    this.BindGw();
    this.isManage = !this.isManage;
  }


// 岗位管理模态框完成编辑确认 提交
  manageModelOk() {
   
  }

  //添加岗位
  addpost() {
    this.http
      .post('http://localhost:55659/api/AddPost', {
        id: "",
        CompanyId: this.companyID,
        JobPostId: this.compileKey[0],
        position: this.isAddStaffText,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert(res.Message);
          return;
        }
        else {
          alert("添加成功!");
          this.BindGw();
          this.isAddStaff = false;
        }
      });
  }


  //修改岗位
  updatepost() {
    this.http
      .post('http://localhost:55659/api/AddPost', {
        id: this.postId,
        CompanyId: this.companyID,
        JobPostId: this.compileKey[0],
        position: this.position1,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert(res.Message);
          return;
        }
        else {
          alert("添加成功!");
          this.BindGw();
          this.isModifier = false;
        }
      });
  }



  postId = "";

  // 双击出现编辑框
  isModifierShow(item, i) {
    if (item) {
      this.postId = item.id;
      this.ModifierShowAffirm = item.id;
      this.position1 = item.position;
      this.position = item.position;
      this.positionIndex = i;
      this.isModifier =! this.isModifier;
    }else{
      this.isModifier =! this.isModifier;
    }
   
  }

  // 取消修改
  isModifierShowAffirm(){
    this.isModifier =! this.isModifier;

  }

  // 确认第一次修改 只显示作用
  isModifierShowAffirmOk(){
    // 点击确定 改本地的数据 
    this.items[this.positionIndex].text = this.position1
    this.isModifier =! this.isModifier;
  }


 


  
  addStaff(e) {
    if(e){
      
      console.log(this.isAddStaffText)
      // this.isAddStaffText.push();
      this.items.push({text:this.isAddStaffText,id:"5"});
      
      this.isAddStaff =!this.isAddStaff
      
    }else{
      this.isAddStaff =!this.isAddStaff
    }
  }



  deletePost(id) {
    this.http
      .post('http://localhost:55659/api/deletePost', {
        id: id,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert(res.Message);
          return;
        }
        else {
          alert("删除成功!");
          this.BindGw();
        }
      });

  }

  // 显示删除按钮
  showBorder(i){
    var arr = this.items[i]
    arr["show"]="true"
    console.log(this.items)
  }

  // 隐藏删除按钮
  hideBorder(i){
    var arr = this.items[i]

    delete arr["show"];

    console.log(this.items)
  }





  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("tissue").style.height = a + "px";
    document.getElementById("tissue-con").style.height = (a-60) + "px";


    this.BindTree();

  } 


}

  



