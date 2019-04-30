import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';
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
  selector: 'oa1-index-index2-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.css'],
})
export class Oa1IndexIndex2YearsComponent {
  constructor(
    private router: Router,
    private modalService: NzModalService,
    public http: _HttpClient,
    public settings: SettingsService,
  ) {
  }
  PageSize = 5;
  PageIndex = 1;
  Total = 0;
  PageSizepl = 5;
  PageIndexpl = 1;
  Totalpl = 0;
  title = ['全部日报', '我发出的', '我收到的', '抄送我的'];
  oindex = 0;
  companyID = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";  //公司ID，暂时写死
  error = "";
  id = "";
  project = "";
  UserId = "f033b9f7-0566-4916-a56b-7f7866e8c4ee";
  lists = [];
  listsPl = [];
  Cid = "";
  spanClick(i: any) {
    this.oindex = i;
    this.DataBind();
    this.BandTotal();
  }


  DataBind() {
    this.http
      .post('http://localhost:55659/api/GetOA_WorkReportList', {
        userId: this.UserId,
        Type: 4,
        ReportType: this.oindex,
        pagesize: this.PageSize,
        pageIndex: this.PageIndex
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.lists = res.resData;
        }
      });
  }

  
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

  //绑定总条数
  BandTotal() {
    this.http
      .post('http://localhost:55659/api/GetOA_WorkReportListTotal', {
        userId: this.UserId,
        Type: 4,
        ReportType: this.oindex,
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


  name = "";
  datetime = "";
  content = "";

  hbdx = "";
  //点击切换
  GetXq(model) {
    this.plid = model.Id;
    this.name = model.name;
    this.datetime = model.datetime;
    this.content = model.content;
    this.GetUserNameById(model.NoticePersonId);
    this.Bindcomment(model.Id);
    this.BindcommentTotle(model.Id);
  }


  //根据ID获取用户姓名
  GetUserNameById(ids) {
    this.http
      .post('http://localhost:55659/api/GetUserNameById', {
        ids: ids
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.hbdx = res.resData;
        }
      });
  }

  //绑定评论
  Bindcomment(id) {
    this.http
      .post('http://localhost:55659/api/Getcomment', {
        id: id,
        pageIndex: this.PageIndexpl,
        pagesize: this.PageSizepl,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.listsPl = res.resData;
        }
      });
  }

  //绑定评论总数
  BindcommentTotle(id) {
    this.http
      .post('http://localhost:55659/api/GetcommentListTotle', {
        id: id,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.Totalpl = res.resData;
        }
      });
  }


  plid = "";
  plcontent = "";
  //提交评论
  Tjcomment() {
    this.http
      .post('http://localhost:55659/api/Addcomment', {
        dyId: this.plid,
        personid: this.UserId,
        content: this.plcontent
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.Bindcomment(this.plid);
          this.BindcommentTotle(this.plid);
          this.plcontent = "";
        }
      });

  }



  ngOnInit() {
    this.DataBind();
    this.BandTotal();
    this.Bindcsr();
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("day").style.height = (a-84) + "px";
    document.getElementById("conDiv").style.minHeight = (a-224) + "px";
  }


}
