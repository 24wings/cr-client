import { NzNotificationService } from 'ng-zorro-antd';
import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'firm-index-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],  
})

export class FirmIndexBasicComponent implements OnInit{
  CompanyName: string;
  Introduce: string;
  CompanyTelephone: string;
  Mail: string;
  Website: string;
  Address: string;
  Type: string;
  Industry: string;
  HeadPerson: string;
  isok = false;
  HeadPhone: string;
  sss = false;
  menus: any[] = [];
  error = '';
  companyId = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";
  LoginAccount = "admin";
  constructor(
    public http: _HttpClient,
    public settings: SettingsService,
    public notification: NzNotificationService,
  ) {

  }
  
  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60
    document.getElementById("basic").style.height = a + "px";
    document.getElementById("basic-con").style.height = (a - 60) + "px";

    //绑定企业信息
    if (this.isUpdate()!="ok") {
      this.disabledtxt();
    }
    this.DataBind();
  }

  //修改企业信息
  saveBtn(): void{
    if (this.update() == true) {
      this.DataBind();
    }
  }


  //判断是否有修改权限
  isUpdate() {

    return "ok";
  }


  disabledtxt() {
    var arr = document.getElementsByClassName("disabledtxt");
    for (var i = 0; i < arr.length; i++) {
      arr[i].classList.add("disabled");
    }
    document.getElementById("btn").remove();
  }


  update() {
    this.http
      .post('http://localhost:55659/api/UpdateCompany', {
        CompanyId: this.companyId,
        LoginAccount: this.LoginAccount,
        Introduce: this.Introduce,
        CompanyName: this.CompanyName,
        CompanyTelephone: this.CompanyTelephone,
        Mail: this.Mail,
        Website: this.Website,
        Address: this.Address,
        Type: this.Type,
        Industry: this.Industry,
        HeadPerson: this.HeadPerson,
        HeadPhone: this.HeadPhone,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          this.notification.create("success", '温馨提示',
            this.error);
        }
        else {
          this.notification.create("success", '温馨提示',
            '保存成功！');
          this.isok = true;
        }
      });
    return this.isok;
  }

  DataBind() {
    this.http
      .post('http://localhost:55659/api/GetCompany', {
        id: this.companyId,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.menus = res.resData;
          this.Introduce = res.resData[0].introduce;
          this.CompanyName = res.resData[0].companyName;
          this.CompanyTelephone = res.resData[0].companyTelephone;
          this.Mail = res.resData[0].mail;
          this.Website = res.resData[0].website;
          this.Address = res.resData[0].address;
          this.Type = res.resData[0].type;
          this.Industry = res.resData[0].industry;
          this.HeadPerson = res.resData[0].headPerson;
          this.HeadPhone = res.resData[0].headPhone;
        }
      });
  }

  
}
