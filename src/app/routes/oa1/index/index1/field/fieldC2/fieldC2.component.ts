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
  selector: 'oa1-index-index1-fieldC2',
  templateUrl: './fieldC2.component.html',
  styleUrls: ['./fieldC2.component.css'],
})
export class Oa1IndexIndex1FieldC2Component {
  typeValue = '部门统计';
  dateValue = '全部';
  SC = "";
  isSpinning = true;
  /////////////
  validateForm: FormGroup;
  error = '';
  type = 0;
  LoginAccount = "";
  companyID = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";
  ng_department = "";
  menus: any[] = [];
  constructor(
    public http: _HttpClient,
    public settings: SettingsService,
  ) {
    
  }


  ngOnInit() {
    this.DataBind();
  }

  DataBind() {
    this.isSpinning = true;
    this.http
      .post('http://localhost:55659/api/GetOutcardListStatistics', {
        companyID: this.companyID,
        Type: this.typeValue,
        DateType: this.dateValue,
        ng_department: this.SC,
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

  

}
