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
  selector: 'oa1-index-index1-wage',
  templateUrl: './wage.component.html',
  styleUrls: ['./wage.component.css'],
  providers: [SocialService],
})


export class Oa1IndexIndex1WageComponent{
  form: FormGroup;
  error = '';
  type = 0;
  isSpinning = true;
  menus: any[] = []; 
  LoginAccount = "";
  department = "";
  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    public msg: NzMessageService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public settings: SettingsService,
  ) {
    this.LoginAccount = settings.user.name;
    modalSrv.closeAll();
  }

  ngOnInit() {
    this.isSpinning = true;
    this.http
      .post('http://localhost:55659/api/GetOA_Wages', {
        LoginAccount: this.LoginAccount,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.department = res.Message.split("|")[1];
          this.menus = res.resData;
        }
        this.isSpinning = false;
      });
      var a = document.getElementById("screenBody").offsetHeight - 60;
      document.getElementById("crew-con").style.height = (a-84) + "px";
  }



}











