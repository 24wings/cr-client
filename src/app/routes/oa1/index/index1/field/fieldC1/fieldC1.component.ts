import { SettingsService, _HttpClient } from '@delon/theme';
import { OnDestroy, Inject, Optional } from '@angular/core';
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
import {
  Component,
} from '@angular/core';

@Component({
  selector: 'oa1-index-index1-fieldC1',
  templateUrl: './fieldC1.component.html',
  styleUrls: ['./fieldC1.component.css'],
})
export class Oa1IndexIndex1FieldC1Component {
  PageSize = 5;
  PageIndex = 1;
  Total = 0;
  dateValue = '全部';
  scopeValue = '全部外勤';
  typeValue = '全部外勤';
  isSpinning = true;
  /////////////
  validateForm: FormGroup;
  error = '';
  type = 0;
  LoginAccount = "";
  menus: any[] = [];
  constructor(
    public http: _HttpClient,
    public settings: SettingsService,
  ) {
    this.LoginAccount = settings.user.name;
  }



  ngOnInit() {
    this.BandTotal();
    this.DataBind();
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("crew-con").style.height = (a-84) + "px";
  }

  //绑定总条数
  BandTotal() {
    this.isSpinning = true;
    this.http
      .post('http://localhost:55659/api/GetOutcardListTotal', {
        LoginAccount: this.LoginAccount,
        DateType: this.dateValue,
        Range: this.scopeValue,
        Type: this.typeValue,
        ng_name: "",
        ng_region: "",
        ng_department: "",
        ng_Customer: "",
        ng_title: "",
      })
      .subscribe((res: any) => {
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
    this.http
      .post('http://localhost:55659/api/GetOutcardList', {
        LoginAccount: this.LoginAccount,
        DateType: this.dateValue,
        Range: this.scopeValue,
        Type: this.typeValue,
        ng_name: "",
        ng_region: "",
        ng_department: "",
        ng_Customer: "",
        ng_title: "",
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
