import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzNotificationService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { SettingsService, _HttpClient } from '@delon/theme';
import { OnDestroy, Inject, Optional } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
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
  selector: 'oa1-index-index3-repairOrder',
  templateUrl: './repairOrder.component.html',
  styleUrls: ['./repairOrder.component.css'],
})
export class Oa1IndexIndex3repairOrderComponent implements OnInit{
  confirmModal: NzModalRef;
  constructor(private modal: NzModalService,
    private modalService: NzModalService,
    public http: _HttpClient,
    public settings: SettingsService, ) { }


  PageSize = 5;
  PageIndex = 1;
  Total = 0;
  error = "";
  userId = "f033b9f7-0566-4916-a56b-7f7866e8c4ee";
  companyID = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";  //公司ID，暂时写死

  title = ['我接收的工单', '我指派的工单'];
  oindex = 0;
  spanClick(i:any) {
    this.oindex = i;
    this.DataBind(i);
    this.BandTotal(i);
  }

  WorkOrderList = [];
  //绑定我收到的工单和我指派的工单
  DataBind(i) {
    this.http
      .post('http://localhost:55659/api/GetOA_WorkOrderList', {
        companyID: this.companyID,
        userId: this.userId,
        type: i,
        pageindex: this.PageIndex,
        pagesize: this.PageSize,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.WorkOrderList = res.resData;
        }
      });
  }

  //绑定总条数
  BandTotal(i) {
    this.http
      .post('http://localhost:55659/api/GetOA_WorkOrderTotle', {
        companyID: this.companyID,
        userId: this.userId,
        type: i,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.Total = 0;
          return;
        }
        else {
          this.Total = res.resData;
        }
      });
  }


  //绑定抄送人列表
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


  //标题
  titleR = "";
  //开始时间
  BeginTimeDateR = "";
  //完成状态
  WctypeR = 0;
  //项目名称
  projectNameR = "";
  //总工时
  workingHoursR = 0;
  //已用工时
  UseworkingHoursR = 0;
  //剩余时间
  SurplusHoursR = 0;
  //超时时间
  BeoverdueTimeDateR = "";
  //指派人
  AssignNameR = "";
  //通知对象
  noticePersonNameR = "";
  //工单内容
  ExplainR = "";
  //工单对象
  modelR;
  //点击事件
  onClick(model) {
    this.titleR = model.Title;
    this.WctypeR = model.Wctype;
    this.BeginTimeDateR = model.BeginTimeDate;
    this.projectNameR = model.projectName;
    this.workingHoursR = model.workingHours;
    this.UseworkingHoursR = model.UseworkingHours;
    this.SurplusHoursR = model.SurplusHours;
    this.BeoverdueTimeDateR = model.BeoverdueTimeDate;
    this.AssignNameR = model.AssignName;
    this.noticePersonNameR = model.noticePersonName;
    this.ExplainR = model.Explain;
    this.modelR = model;
  }

  //修改工单数据
  idU = "";
  titleU = "";
  projectU = "";
  workingHoursU = "";
  AssignU = { id: "", name: "" };
  BeginTimeU = "";
  BeoverdueTimeU = "";
  ExplainU = "";

  //修改工单
  isVisible = false;
  updateOrder(model) {
    this.idU = model.Id;
    this.titleU = model.Title;
    this.projectU = model.projectId;
    this.workingHoursU = model.workingHours;
    this.AssignU = { id: model.AssignId, name: model.AssignName };
    this.BeginTimeU = model.BeginTimeDateU;
    this.BeoverdueTimeU = model.BeoverdueTimeDateU;
    this.ExplainU = model.Explain;
    this.isVisible = true;

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;

  }


  //取消工单
  showConfirm(modelR, i): void {
    var str = "";
    if (i == -1) {
      str = "取消";
    }
    else if (i==2) {
      str = "完成";
    }
    this.confirmModal = this.modal.confirm({
      nzOkText: '是',
      nzCancelText: '否',
      nzTitle: str+'工单',
      nzContent: '<b style="color: red;">是否' + str+'该工单？</b>',
      nzOnOk: () => this.QxWorkOrder(modelR,i),
    });
  }
  QxWorkOrder(modelR,i) {
    alert(modelR.Id)
    this.http
      .post('http://localhost:55659/api/UpdateQxOA_WorkOrder', {
        Id: modelR.Id,
        i: i
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          alert(res.Message);
          return;
        }
        else {
          alert("操作成功");
          this.isVisible = false;
        }
      });

  }


  noticePerson = "";
  noticePersonName = "";
  Name = "";
  projectName = "";
  //保存修改的工单
  saveOrder() {
    for (var i = 0; i < this.csr.length; i++) {
      this.noticePerson = this.noticePerson + this.csr[i]["id"] + ";";
      this.noticePersonName = this.noticePersonName + this.csr[i]["name"] + ";";
    }
    for (var i = 0; i < this.csr.length; i++) {
      this.noticePerson = this.noticePerson + this.csr[i]["id"] + ";";
    }
    this.noticePerson = this.noticePerson.substr(0, this.noticePerson.length - 1);
    this.noticePerson = this.noticePerson.substr(0, this.noticePerson.length - 1);

    this.http
      .post('http://localhost:55659/api/AddOA_WorkOrder', {
        Id: this.idU,
        companyId: this.companyID,
        projectId: this.projectU,
        UserId: this.userId,
        Name: this.Name,
        Title: this.titleU,
        workingHours: this.workingHoursU,
        projectName: this.projectName,
        AssignId: this.AssignU.id,
        AssignName: this.AssignU.name,
        BeginTime: this.BeginTimeU,
        BeoverdueTime: this.BeoverdueTimeU,
        noticePerson: this.noticePerson,
        noticePersonName: this.noticePersonName,
        Explain: this.ExplainU
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          alert(res.Message);
          return;
        }
        else {
          alert("操作成功");
          this.DataBind(this.oindex);
          this.isVisible = false;
        }
      });

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



  ngOnInit() {
    this.DataBind(this.oindex);
    this.BandTotal(this.oindex);
    this.Bindcsr();
    this.BindTree();
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("crew-con").style.height = (a-84) + "px";
  }


}



