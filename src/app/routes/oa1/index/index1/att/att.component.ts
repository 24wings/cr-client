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
import { getMonth } from 'date-fns';

class Item{
  day:Date;
  msgs:{type:string,content:string}[];
}

@Component({
  selector: 'oa1-index-index1-att',
  templateUrl: './att.component.html',
  styleUrls: ['./att.component.css'],
  
})
export class Oa1IndexIndex1AttComponent{
  selectedValue = new Date();

  // 迟到 早退 调休 外勤 未打卡 事假 正常上下班

  //  warning 状态迟到 早退
  // success 正常上下班 
  // normal 调休 事假
  // error 未打卡
  // legwork 外勤
  // listDataMaps= [
  //   {
  //     day: 1,
  //     msgs: [
  //       { type: 'warning', content: '上班 8:46 迟到' },
  //       { type: 'success', content: '下班 6:00 正常' }]
  //   },
  //   {
  //     day: 2,
  //     msgs: [
  //       { type: 'success', content: '上班 8:44 正常' },
  //       { type: 'success', content: '下班 6:00 正常' },
  //     ]
  //   },
  //   {
  //     day: 3,
  //     msgs: [
  //       { type: 'normal', content: '事假' }]
  //   },
  //   {
  //     day: 4,
  //     msgs: [
  //       { type: 'warning', content: '1' },
  //       { type: 'success', content: '2' }]
  //   }
  //   ,
  //   {
  //     day: 5,
  //     msgs: [
  //       { type: 'error', content: '1' },
  //       { type: 'legwork', content: '2' }]
  //   }
  // ]


  time:any;

  data:any;


  log($event){
    this.listByDate($event)
    this.time=$event
  }

  visible: boolean;
  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }








  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }


  form: FormGroup;
  error = '';
  type = 0;

  companyID = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";  //公司ID，暂时写死
  id = "";
  project = "";
  UserId = "be2eea0f-04ea-4f66-a534-fb729229ef70";


  listDataMap:any;

  menus: any[] = [];
  LoginAccount = "";
  department = "";

  poporData:any;
  constructor(public http: _HttpClient, public settings: SettingsService, ) {

  }

    mode='month'

    ngOnInit() {
      this.listByDate();
    }

    listByDate(date?:Date){
      if(date==null){
      date= new Date();
      }

      this.http
      .post('http://localhost:55659/api/GetIncardList', {
        userId:this.UserId,
        year:date.getFullYear(),
        Month:date.getMonth()+1
      })
      .subscribe((res: any) => {
      this.listDataMap=  (res.resData as   Item[]).map(item=>{return {
        day:new  Date(item.day).getDate(),
        month:new Date(item.day).getMonth(),
        year:new Date(item.day).getFullYear(),
        timestamp:new Date(item.day).getTime(),
        msgs:item.msgs } })
       console.log(this.listDataMap)
      });
    }



    popor(msg){
     var type= new Date(msg.timestamp).getHours()>=12?"下午":"上午";
     var date= new Date(msg.timestamp)
     var yearMonthDay=  new Date(date.getFullYear(),date.getMonth(),date.getDate());
      this.http
      .post('http://localhost:55659/api/GetOutcardXq', {
        userId:this.UserId,
        date: yearMonthDay.getTime() /1000,
        type
    
      })
      .subscribe((res: any) => {
      
       this.poporData =res.resData
      //  if(th)
      console.log( this.poporData)
      });



    }





}



