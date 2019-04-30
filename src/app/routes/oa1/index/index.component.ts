import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzNotificationService, NzFormatEmitEvent } from 'ng-zorro-antd';
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
  selector: 'oa1-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class Oa1IndexComponent implements OnInit{
  private router$: Subscription;
  Ttitle = ""
  Ttype = -1;
  mode = 'inline';
  title: string;
  user: any;
  tzdx = [];
  xzgg_id = "";
  xzgg_title = "";
  xzgg_tzdx = [];
  xzgg_Explain = "";
  menus: any[] = [
    {
      key: 'home',
      title: '首页',
    },
    {
      key: 'index1',
      title: '考勤管理',
    },
    {
      key: 'index2',
      title: '工作汇报',
    },
    {
      key: 'index3',
      title: '任务工单',
    },
    {
      key: 'index4',
      title: '日程安排',
    },
    {
      key: 'index5',
      title: '公告',
    }
  ];

  constructor(
    private router: Router,
    private modalService: NzModalService,
    public http: _HttpClient,
    public settings: SettingsService,
  ) {
    this.router$ = this.router.events
      .subscribe(() => this.setActive());
  }

  companyID = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";  //公司ID，暂时写死
  error = "";
  id = "";
  project = "";
  UserId = "f033b9f7-0566-4916-a56b-7f7866e8c4ee";
  Name = "未知";
  Title = "";
  workingHours = 0;
  projectName = "";
  Assign = { id: "", name: "" };
  BeginTime = "";
  BeoverdueTime = "";
  Explain = "";
  WorkOrderSelect = [];
  
  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    this.menus.forEach(i => {
      i.selected = i.key === key;
    });
  }

  to(item: any) {
    this.router.navigateByUrl(`/oa1/index/${item.key}`);
  }
  toHome() {
    this.router.navigateByUrl(`/oa1/index/home`);
  }


  //绑定抄送人列表
  cyr = [];
  csr = [];
  cyrList = [];
  Bindcsr() {
    this.http
      .post('http://localhost:55659/api/GetUserALL', {
        companyId: this.companyID
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.cyrList = res.resData;
        }
      });
  }



  controlArray: Array<{ id: string, syHous: number, tjHous: number, mod: string }> = [];
  validateForm: FormGroup;
  //动态修改表单
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = (this.controlArray.length > 0) ? this.controlArray[this.controlArray.length - 1].id + 1 : 0;
    const control = {
      id: id.toString(),
      syHous:0,
      tjHous: 0,
      mod: "tt" + id,
    };
    const index = this.controlArray.push(control);
   // this.validateForm.addControl(this.controlArray[index - 1].id, new FormControl(null, Validators.required));
  }
  //删除行
  removeField(i: { id: string, syHous: number, tjHous: number, mod: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(i);
      this.controlArray.splice(index, 1);
      this.validateForm.removeControl(i.id);
    }
  }
  //绑定关联工单
  BindGd() {
    this.http
      .post('http://localhost:55659/api/GetOA_WorkOrderSelect', {
        companyID: this.companyID,
        userid: this.UserId
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.WorkOrderSelect = res.resData;
        }
      });
  }

  selectValue = { id: "", Title: "", House:0};
  syHous = 0;
  tjHous = 0;
  //工单下拉框绑定事件
  GzSelectChange() {
    this.syHous = this.selectValue.House;
  }




  
  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60
    document.getElementById("mainDiv").style.height = a + "px";

    this.Bindcsr();
    this.addField();
    this.BindGd();
    this.BindTree();

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
  // 新增汇报对话框
  isVisible1 = false;
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



  

  isVisible1c1 = false;
  showModal1c1(type): void {
    if (type == 0) {
      this.Ttitle = "发起日报";
    }
    else if (type == 1) {
      this.Ttitle = "发起周报";
    }
    else if (type == 2) {
      this.Ttitle = "发起月报";
    }
    else if (type == 3) {
      this.Ttitle = "发起年中总结";
    }
    else if (type == 4) {
      this.Ttitle = "发起年终总结";
    }
    else if (type == 5) {
      this.Ttitle = "发起项目汇报";
    }
    this.Ttype = type;

    this.isVisible1 = false;
    this.isVisible1c1 = true;
  }

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

  expandKeys = ['1-0'];
  value: string;
  onExpandChange(e: NzFormatEmitEvent): void {
    if (e.node.getChildren().length === 0 && e.node.isExpanded) {
      this.http
        .post('http://localhost:55659/api/GetSYSCompanyFrameworkTreeChren', {
          companyID: this.companyID,
          parentId: e.node.key,
        })
        .subscribe((res: any) => {
          //alert(res.Success);
          if (!res.Success) {
            this.error = res.Message;
            return;
          }
          else {
            e.node.addChildren(res.resData);
          }
        });
    }
  }


  //提交日报
  subTime1 = "";
  csr1 = [];
  hbdx = [];
  title1 = "";
  Explain1 = "";
  handleOk1c1(): void {
    this.http
      .post('http://localhost:55659/api/AddOA_WorkReport', {
        Id: "",
        CompanyId: this.companyID,
        ProjectId: "",
        subPersonId: this.UserId,
        type: this.Ttype,
        Title: this.title1,
        subTime: this.subTime1,
        content: this.Explain1,
        NoticePersonId: this.hbdx.join(";"),
        CCPersonId: this.csr1.join(";"),
        WorkorderDetailedId: this.selectValue.id,
        CompletedHouse: this.tjHous,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          alert(res.Message);
          return;
        }
        else {
          alert("操作成功")
          this.title1 = "";
          this.subTime1 = "";
          this.Explain1 = "";
          this.hbdx = [];
          this.csr1 = [];
          this.selectValue = { id: "", Title: "", House: 0 };
          this.tjHous = 0;
          this.syHous = 0;
          this.BindGd();
          this.isVisible1c1 = false;
        }
      });
  }
  handleCancel1c1(): void {
    console.log('Button cancel clicked!');
    this.isVisible1c1 = false;
  }
  // 新增任务对话框
  isVisible2 = false;
  showModal2(): void {
    this.isVisible2 = true;
  }

  noticePerson = "";
  noticePersonName = "";
  //保存工单
  handleOk2(): void {
    if (this.csr == []) {
      alert("请选择参与人");
    }
    //for (var i = 0; i < this.csr.length; i++) {
    //  this.noticePerson = this.noticePerson + this.csr[i]["id"] + ";";
    //  this.noticePersonName = this.noticePersonName + this.csr[i]["name"] + ";";
    //}
    //for (var i = 0; i < this.csr.length; i++) {
    //  this.noticePerson = this.noticePerson + this.csr[i]["id"] + ";";
    //}
    //this.noticePerson = this.noticePerson.substr(0, this.noticePerson.length - 1);
    //this.noticePerson = this.noticePerson.substr(0, this.noticePerson.length - 1);
    this.http
      .post('http://localhost:55659/api/AddOA_WorkOrder', {
        Id: this.id,
        companyId: this.companyID,
        projectId: this.project,
        UserId: this.UserId,
        Name: this.Name,
        Title: this.title,
        workingHours: this.workingHours,
        projectName: this.projectName,
        AssignId: this.Assign.id,
        AssignName: this.Assign.name,
        BeginTime: this.BeginTime,
        BeoverdueTime: this.BeoverdueTime,
        noticePerson: this.csr.join(";"),
        noticePersonName: this.noticePersonName,
        Explain: this.Explain
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          alert(res.Message);
          return;
        }
        else {
          alert("操作成功");
          this.isVisible2 = false;
        }
      });
  }


  handleCancel2(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
  }


  //上传信息
  fileList = [
    {
      uid: 1,
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },
    {
      uid: 2,
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    },
    {
      uid: 3,
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png'
    }
  ];
  // 新增日报-时间选择器
  date = null; // new Date();
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  //新增日报-select选择器
  listOfOption = [];
  multipleValue = [ 'a10', 'c12' ];

  // 新增公告对话框
  isVisible5 = false;
  showModal5(): void {
    this.isVisible5 = true;
  }

  //保存公告
  handleOk5(): void {
    if (this.xzgg_title=="") {
      alert("请输入标题");
      return;
    }
    else if (this.xzgg_tzdx == []) {
      alert("请选择通知对象");
      return;
    }
    else if (this.xzgg_Explain == "") {
      alert("请输入公告内容");
      return;
    }
    //保存公告
    this.http
      .post('http://localhost:55659/api/Addoa_notice', {
        Id: this.xzgg_id,
        CompanyId: this.companyID,
        PersonId: this.UserId,
        xzgg_title: this.xzgg_title,
        xzgg_tzdx: this.xzgg_tzdx.join(';'),
        xzgg_Explain: this.xzgg_Explain,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert(res.Message);
          return;
        }
        else {
          alert("操作成功");
          this.isVisible5 = false;
          this.xzgg_title = "";
          this.xzgg_tzdx = [];
          this.xzgg_Explain = "";
        }
      });

  }


  handleCancel5(): void {
    console.log('Button cancel clicked!');
    this.isVisible5 = false;
  }
}
