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




@Component({
  selector: 'firm-index-dataLimit',
  templateUrl: './dataLimit.component.html',
  styleUrls: ['./dataLimit.component.css'],  
})

export class FirmIndexDataLimitComponent implements OnInit{
  constructor(
    private modalService: NzModalService,
    public http: _HttpClient,
    public settings: SettingsService, ) { }


  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60
    document.getElementById("basic").style.height = a + "px";
    document.getElementById("basic-con").style.height = (a - 60) + "px";

    this.BindJs();

  } 


  menus: any[] = [];
  error = "";
  companyId = "dbb22f21-92d2-4db9-aeb7-5711feff51cb"
  title = [];
  oindex = 0;
  spanClick(i:any) {
    this.oindex = i;
  }



  // 多选框
  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    { label: '查看', value: '查看', checked: true },
    { label: '编辑', value: '编辑', checked: false },
    { label: '删除', value: '删除', checked: false }
  ];

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne.forEach(item => item.checked = true);
    } else {
      this.checkOptionsOne.forEach(item => item.checked = false);
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false; 
    } else {
      this.indeterminate = true;
    }
  }



  //绑定角色
  BindJs() {
    this.http
      .post('http://localhost:55659/api/Getrole', {
        companyId: this.companyId,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.title = res.resData;
        }
      });
  }
}
