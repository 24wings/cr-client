import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
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
  selector: 'oa1-index-index1-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class Oa1IndexIndex1BranchComponent {
  PageSize = 5;
  PageIndex = 1;
  Total = 0;
  branchValue = 'ALL';
  form: FormGroup;
  error = '';
  type = 0;
  JobPostId = "";
  SC = "";
  isSpinning = true;
  companyId ="dbb22f21-92d2-4db9-aeb7-5711feff51cb"
  menus: any[] = [];
  departmentList: any[] = [];
  YearoptionList: any[] = [];
  MonthoptionList: any[] = [];
  year = new Date().getFullYear();
  Month = new Date().getMonth() + 1;
  YearselectedValue = { label: this.year, value: this.year };
  MonthselectedValue = { label: this.Month, value: this.Month };
  compareFn = (o1: any, o2: any) => o1 && o2 ? o1.value === o2.value : o1 === o2;
  constructor(
    public http: _HttpClient,
    public settings: SettingsService,
  ) {

  }


  ngOnInit() {
    this.BindYear();
    this.BindMonth();
    this.BindbranchValue();
    this.DataBindAll();
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("crew-con").style.height = (a-84) + "px";
  }

  BindYear() {
    for (var i = 1999; i < 2050; i++) {
      this.YearoptionList.push({ label: i, value: i });
    };
  }

  BindMonth() {
    for (var i = 1; i <= 12; i++) {
      this.MonthoptionList.push({ label: i, value: i });
    };
  }

  BindbranchValue() {
    this.http
      .post('http://localhost:55659/api/GetdepartmentList', {
        companyId: this.companyId,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.departmentList = res.resData;
        }
      });
  }

  //绑定总条数
  BandTotal() {
    this.isSpinning = true;
    this.JobPostId = this.branchValue;
    if (this.YearselectedValue != undefined) {
      this.year = this.YearselectedValue.value;
    }
    if (this.MonthselectedValue != undefined) {
      this.Month = this.MonthselectedValue.value;
    }
    this.http
      .post('http://localhost:55659/api/GetdepartmentIncardStatisticsTotle', {
        companyID: this.companyId,
        JobPostId: this.JobPostId,
        year: this.year,
        Month: this.Month,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.Total = 0;
          return;
        }
        else {
          this.Total = res.resData;
        }
        this.isSpinning = false;
      });
  }

  //绑定分页数据
  DataBind() {
    this.isSpinning = true;
    this.JobPostId = this.branchValue;
    if (this.YearselectedValue != undefined) {
      this.year = this.YearselectedValue.value;
    }
    if (this.MonthselectedValue != undefined) {
      this.Month =this.MonthselectedValue.value;
    }
    this.http
      .post('http://localhost:55659/api/GetdepartmentIncardStatistics', {
        companyID: this.companyId,
        JobPostId: this.JobPostId,
        year: this.year,
        Month: this.Month,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.menus = res.resData;
        }
        this.isSpinning = false;
      });
  }

  //更新总条数+绑定分页数据
  DataBindAll() {
    this.PageIndex = 1;
    this.BandTotal();
    this.DataBind();
  }


}
