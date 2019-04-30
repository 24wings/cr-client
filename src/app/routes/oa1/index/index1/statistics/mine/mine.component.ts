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
  selector: 'oa1-index-index1-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css'],

})

export class Oa1IndexIndex1MineComponent {
  form: FormGroup;
  error = '';
  type = 0;
  isSpinning = true;
  menus: any[] = [];
  LoginAccount = "";
  department = "";
  ShouldCQday = "--";
  ActualCQday = "--";
  Vacationday = "--";
  OutCardday = "--";
  ThismonthLate = "--";
  NoputCard = "--";
  SurplusBreakOffDay = "--";
  YearoptionList: any[] = [];
  MonthoptionList: any[] = [];
  year = new Date().getFullYear();
  Month = new Date().getMonth()+1;
  YearselectedValue = { label: this.year, value: this.year};
  MonthselectedValue = { label: this.Month, value: this.Month};
  compareFn = (o1: any, o2: any) => o1 && o2 ? o1.value === o2.value : o1 === o2;
  constructor(
    public http: _HttpClient,
    public settings: SettingsService,
  ) {
    this.LoginAccount = settings.user.name;
  }

  ngOnInit() {
    this.BindYear();
    this.BindMonth();
    this.DataBind();
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("crew-con").style.height = (a-84) + "px";
  }

  BindYear() {
    for (var i = 1999; i < 2050; i++) {
      this.YearoptionList.push({ label: i, value: i });
    };
   // this.YearselectedValue = { label: this.year, value: this.year };
  }

  BindMonth() {
    for (var i = 1; i <= 12; i++) {
      this.MonthoptionList.push({ label: i, value: i });
    };
   // this.MonthselectedValue = { label: this.Month, value: this.Month };
  }

  DataBind() {
    this.isSpinning = true;
    if (this.YearselectedValue != undefined) {
      this.year = this.YearselectedValue.value;
    }
    if (this.MonthselectedValue != undefined) {
      this.Month = this.MonthselectedValue.value;
    }
    this.http
      .post('http://localhost:55659/api/GetIncardStatistics', {
        LoginAccount: this.LoginAccount,
        year: this.year,
        Month: this.Month,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.ShouldCQday = res.resData.ShouldCQday;
          this.ActualCQday = res.resData.ActualCQday;
          this.Vacationday = res.resData.Vacationday;
          this.OutCardday = res.resData.OutCardday;
          this.ThismonthLate = res.resData.ThismonthLate;
          this.NoputCard = res.resData.NoputCard;
          this.SurplusBreakOffDay = res.resData.SurplusBreakOffDay;
          this.menus = res.resData.Putcards;
        }
        this.isSpinning = false;
      });
  }

  getSpanClass(str): string | null {
    if (str == "迟到" || str == "早退") {
      return "yellow-span";
    }
    else if (str == "外勤") {
      return "succ - span";
    }
    else if (str == "未打卡") {
      return "red-span";
    }
    return null;
  }
  //回到顶部方法
  
}
