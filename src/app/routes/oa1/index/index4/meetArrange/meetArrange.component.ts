import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';
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
import { retry, filter, concat } from 'rxjs/operators';
import { format } from '@delon/util';
import { getDay } from 'date-fns';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'oa1-index-index4-meetArrange',
  templateUrl: './meetArrange.component.html',
  styleUrls: ['./meetArrange.component.css'],
})
export class Oa1IndexIndex4meetArrangeComponent implements OnInit{
  PageSize = 5;
  PageIndex = 1;
  Total = 0;
  error = "";
  title = ['待进行', '已结束'];
  oindex = 0;
  spanClick(i: any) {
    this.oindex = i;
    this.BandTotal();
    this.DateBind();
  }

  constructor(
    private modalService: NzModalService,
    public http: _HttpClient,
    public settings: SettingsService, ) { }

  BookConferenceXq = [];
  //绑定总条数
  BandTotal() {
    this.http
      .post('http://localhost:55659/api/GetBookConferenceXqTotle', {
        userId: 'f033b9f7-0566-4916-a56b-7f7866e8c4ee',
        type: this.oindex,
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
  //获取会议详情
  DateBind(): void {
    this.http
      .post('http://localhost:55659/api/GetBookConferenceXq', {
        userId: 'f033b9f7-0566-4916-a56b-7f7866e8c4ee',
        PageSize: this.PageSize,
        pageindex: this.PageIndex,
        type: this.oindex,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert(res.Message)
          return;
        }
        else {
          this.BookConferenceXq = res.resData;
        }
      });
  }

  ngOnInit() {
    this.BandTotal();
    this.DateBind();
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("crew-con").style.height = (a-84) + "px";
    document.getElementById("conDiv").style.minHeight = (a-186) + "px";
  }

}



