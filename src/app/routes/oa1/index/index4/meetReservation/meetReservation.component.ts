import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzNotificationService, NzFormatEmitEvent } from 'ng-zorro-antd';
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
  selector: 'oa1-index-index4-meetReservation',
  templateUrl: './meetReservation.component.html',
  styleUrls: ['./meetReservation.component.css'],
})
export class Oa1IndexIndex4meetReservationComponent implements OnInit{
  constructor(
    private modalService: NzModalService,
    public http: _HttpClient,
    public settings: SettingsService, ) { }

  // 日期选中
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  isSpinning = true;
  BeginTime = { time: "0", i: 0 };
  EndTime = {time: "0", i:0 };
  companyID = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";  //公司ID，暂时写死
  error = "";
  date = new Date();
  year = 0;
  Month = 0;
  day = 0;
  title = "";
  project = "";
  content = "";
  department = "";
  UserIds = "";
  UserNames = "";
  HeadPortrait = "";
  noticePerson = "";


  //开始时间
  TimeList = [
    { time:"9:00",i:18 },
    { time: "9:30", i: 19 },
    { time: "10:00", i: 20 },
    { time: "10:30", i: 21 },
    { time: "11:00", i: 22 },
    { time: "11:30", i: 23 },
    { time: "12:00", i: 24 },
    { time: "12:30", i: 25 },
    { time: "13:00", i: 26 },
    { time: "13:30", i: 27 },
    { time: "14:00", i: 28 },
    { time: "14:30", i: 29 },
    { time: "15:00", i: 30 },
    { time: "15:30", i: 31 },
    { time: "16:00", i: 32 },
    { time: "16:30", i: 33 },
    { time: "17:00", i: 34 },
    { time: "17:30", i: 35 },
    { time: "18:00", i: 36 },
  ] ;

  //会议室列表
  ConferenceRoomList = [];
  selectedValue1 = { id: '', ConferenceName: '' };
  //绑定会议室下拉框
  BindConferenceRoomList() {
    this.http
      .post('http://localhost:55659/api/GetConferenceRoom', {
        companyID: this.companyID,
        open:1
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.ConferenceRoomList = res.resData;
        }
      });
  }


  //部门列表
  partmentList = [];
  selectedValue2 = { id: '', department: '' };
  //绑定部门下拉框
  Bindpartment() {
    this.http
      .post('http://localhost:55659/api/GetdepartmentList', {
        companyId: this.companyID,
        open: 1
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.partmentList = res.resData;
        }
      });
  }


  //参与人;抄送人
  cyr = [];
  csr = [];
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

  
  //会议室预订确认按钮
  handleOk() {
    this.UserIds = "";
    this.UserNames = "";
    this.HeadPortrait = "";
    this.noticePerson = "";
    this.year = this.date.getUTCFullYear();
    this.Month = this.date.getUTCMonth() + 1;
    this.day = this.date.getUTCDate();
    if (this.selectedValue1.id == "") {
      alert("请选择会议室");
      return;
    }
    if (this.BeginTime.i == 0 || this.EndTime.i == 0) {
      alert("请选择开始时间和结束时间");
      return;
    }
    if (this.BeginTime.i >= this.EndTime.i) {
      alert("结束时间必须大于开始时间");
      return;
    }
    if (this.cyr == []) {
      alert("请选择参与人");
    }
    //会议室预订
    this.http
      .post('http://localhost:55659/api/AddBookConference', {
        id:"",
        companyId: this.companyID,
        ConferenceRoomId: this.selectedValue1.id,
        ConferenceRoomName: this.selectedValue1.ConferenceName,
        date: this.year + "-" + this.Month + "-" + this.day,
        BeginTime: this.BeginTime.time,
        EndTime: this.EndTime.time,
        Title: this.title,
        project: this.project,
        content: this.content,
        department: this.selectedValue2.department,
        UserIds: this.cyr.join(';'),
        //UserNames: this.UserNames,
        //HeadPortrait: this.HeadPortrait,
        noticePerson: this.csr.join(';'),
        fqr:'f033b9f7-0566-4916-a56b-7f7866e8c4ee',
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          alert(res.Message)
          return;
        }
        else {
          alert("预订成功！");
          this.isVisible = false;
          this.DataBind();
          //清空数据
          this.selectedValue1 = { id: '', ConferenceName: '' };
          this.title = "";
          this.BeginTime = { time: "0", i: 0 };
          this.EndTime = { time: "0", i: 0 };
          this.project = "";
          this.selectedValue2 = { id: '', department: '' };
          this.cyr = [];
          this.csr = [];
          this.content = "";
        }
      });
  }

  
  facil = [{ facilities: "空", MaxNumber: "0" }];
  //获取会议室设施
  Getfacilities(id) {
    this.http
      .post('http://localhost:55659/api/Getconferenceroomfacilities', {
        id: id,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert(res.Message)
          return;
        }
        else {
          this.facil = res.resData;
        }
      });

  }

  xqlist=[]

  //获取会议详情
  Getxq(value, childId): void {
    if (value) {
      //this.http
      //  .post('http://localhost:55659/api/GetBookConferenceXq', {
      //    childId: childId,
      //  })
      //  .subscribe((res: any) => {
      //    if (!res.Success) {
      //      alert(res.Message)
      //      return;
      //    }
      //    else {
      //      this.xqlist = res.resData;
      //    }
      //  });

    }
  }

  BindList = [];
  //绑定会议室列表
  DataBind() {
    this.isSpinning = true;
    this.year = this.date.getUTCFullYear();
    this.Month = this.date.getUTCMonth() + 1;
    this.day = this.date.getUTCDate();
    //获取会议室预订列表
    this.http
      .post('http://localhost:55659/api/GetBookConferenceList', {
        companyId: this.companyID,
        date: this.year + "-" + this.Month + "-" + this.day,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert(res.Message)
          return;
        }
        else {
          this.BindList = res.resData;
          this.isSpinning = false;
        }
      });

  }



  ngOnInit(): void {
    this.BindConferenceRoomList();
    this.Bindpartment();
    this.BindTree();
    this.Bindcsr();
    this.DataBind();
    
    var a = document.getElementById("screenBody").offsetHeight - 60;
      document.getElementById("con").style.height = (a-84) + "px";
  }



  isVisible = false;
  showModal() {
    this.isVisible = true;
  }


  handleCancel(): void {
    this.isVisible = false;
  }

 

  //selectedValue1 = 'lucy';
  


  
  selectedValue3 = 'lucy';
  // 开始时间和结束时间
  startValue: Date = null;
  endValue: Date = null;
  endOpen: boolean = false;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endOpen);
  }

  handleEndOpenChange(open: boolean): void {
    console.log(open);
    this.endOpen = open;
  }
  // 抄送选择器所需方法
  listOfOption = [];
  




  //------------------------------组织架构下拉框------------------------
  //获取初始节点
  nodes = [];
  BindTree() {
    this.http
      .post('http://localhost:55659/api/GetSYSCompanyFrameworkTree', {
        companyID: this.companyID
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.nodes = res.resData;
        }
      });
  }

  expandKeys = ['1-0'];
  value: string;
  onExpandChange(e: NzFormatEmitEvent): void {
    if (e.node.getChildren().length === 0 && e.node.isExpanded) {
      this.http
        .post('http://localhost:55659/api/GetSYSCompanyFrameworkTreeChren', {
          companyID: this.companyID,
          parentId: e.node.key,
        })
        .subscribe((res: any) => {
          //alert(res.Success);
          if (!res.Success) {
            this.error = res.Message;
            return;
          }
          else {
            e.node.addChildren(res.resData);
          }
        });
    }
  }

  
}



