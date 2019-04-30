import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzNotificationService, A } from 'ng-zorro-antd';
import { SettingsService, _HttpClient } from '@delon/theme';
import { OnDestroy, Inject, Optional } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { retry } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'firm-index-role2',
  templateUrl: './role2.component.html',
  styleUrls: ['./role2.component.css'],
})
export class FirmIndexRole2Component{
  PageSize = 5;
  PageIndex = 1;
  Total = 0;
  selectedValue = 'ALL';
  selectedValuePL = "";
  companyID = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";
  selectedmenus: any[] = [];
  userlistmenus: any[] = [];
  roledistributionUserList: any[] = [];
  isVisible = false;
  isVisiblePL = false;
  error = "";
  //记录需要分配角色的人员ID
  CheckBoxPLtxt = "";
  ////记录需要分配人员的角色ID
  CheckBoxtxt = "";
  //批量人员列表
  CheckBoxPL = [];
  userName = "";
  jobs = "";
  //人员列表
  CheckBox = [];
  userId = "";
  GJname = "";
  GJposition = "";
  GJdepartment = "";
  constructor(
    private router: Router,
    private notification: NzNotificationService,
    public http: _HttpClient,
    public settings: SettingsService,
    private routeInfo: ActivatedRoute,
    private modalService: NzModalService, ) {


  }


  ngOnInit() {
    this.BindSelect();
    this.BandTotal();
    this.DataBind();
  }

  BindSelect() {
    this.http
      .post('http://localhost:55659/api/Getrole', {
        companyId: this.companyID,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.selectedmenus = res.resData;
        }
      });
  }

  BindRoleUser() {
    this.http
      .post('http://localhost:55659/api/GetRoleUserList', {
        selectedValue: this.selectedValuePL,
        companyId: this.companyID,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.CheckBoxPL = res.resData;
          this.userlistmenus = res.resData;
        }
      });
  }

  selectedValuePLChange() {
    this.BindRoleUser();
  }


  showModal(m): void {
    this.userId = m.id;
    this.userName = m.name;
    this.jobs = m.position + "/" + m.department;
    this.http
      .post('http://localhost:55659/api/GeteditRoleUserList', {
        companyId: this.companyID,
        userId: this.userId
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.CheckBox = res.resData;
         // this.userlistmenus = res.resData;
        }
      });
    this.isVisible = true;
    this.isVisiblePL = false;
  }
  showModalPL(): void {
    this.isVisible = false;
    this.isVisiblePL = true;
    this.BindRoleUser();
  }


  //编辑保存
  handleOk(): void {
    this.CheckBoxtxt = "";
    for (var i = 0; i < this.CheckBox.length; i++) {
      if (this.CheckBox[i].checked == true || this.CheckBox[i].checked == 1) {
        this.CheckBoxtxt = this.CheckBoxtxt + this.CheckBox[i].value + ",";
      }
    }
    if (this.CheckBoxtxt.length > 0) {
      this.CheckBoxtxt = this.CheckBoxtxt.substring(0, this.CheckBoxtxt.length - 1);
    }
    //批量添加角色
    this.http
      .post('http://localhost:55659/api/Addroledistribution', {
        roleIds: this.CheckBoxtxt,
        userIds: this.userId,
        type: 2,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          alert("操作成功");
          this.isVisible = false;
        }
      });

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  //绑定角色分配列表
  DataBind() {
    this.http
      .post('http://localhost:55659/api/GetroledistributionUserList', {
        selectedValue: this.selectedValue,
        companyId: this.companyID,
        PageSize: this.PageSize,
        PageIndex : this.PageIndex,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.roledistributionUserList = res.resData;
        }
      });
  }


  //绑定总条数
  BandTotal() {
    this.http
      .post('http://localhost:55659/api/GetroledistributionUserTotle', {
        selectedValue: this.selectedValue,
        companyId: this.companyID,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.Total = res.resData;
        }
      });
  }



  selectedValueChange() {
    this.DataBind();
  }


  //更新总条数+绑定分页数据
  DataBindAll() {
    this.PageIndex = 1;
    this.BandTotal();
    this.DataBind();
  }


  //高级搜索
  selectsubmitForm() {
    alert(this.GJname);
    alert(this.GJposition);
    alert(this.GJdepartment);

    this.PageIndex = 1;
    this.BandTotal();
    this.DataBind();
  }


  handleOkPL(): void {
    this.CheckBoxPLtxt = "";
    if (this.selectedValuePL == "") {
      alert("请选择角色");
      return;
    }
    for (var i = 0; i < this.CheckBoxPL.length; i++) {
      if (this.CheckBoxPL[i].checked == true || this.CheckBoxPL[i].checked == 1) {
        this.CheckBoxPLtxt = this.CheckBoxPLtxt + this.CheckBoxPL[i].value + ",";
      }
    }
    if (this.CheckBoxPLtxt.length > 0) {
      this.CheckBoxPLtxt = this.CheckBoxPLtxt.substring(0, this.CheckBoxPLtxt.length - 1);
    }
    //批量添加角色
    this.http
      .post('http://localhost:55659/api/Addroledistribution', {
        roleIds: this.selectedValuePL,
        userIds: this.CheckBoxPLtxt,
        type:1,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          alert("操作成功");
          this.isVisiblePL = false;
        }
      });

  }



  handleCancelPL(): void {
    this.isVisiblePL = false;
  }


  log(value: string[]): void {
    console.log(value);
  }
}
