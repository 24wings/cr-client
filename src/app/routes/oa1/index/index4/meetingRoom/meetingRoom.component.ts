import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';
import { SettingsService, _HttpClient } from '@delon/theme';
import { OnDestroy, Inject, Optional } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
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
  selector: 'oa1-index-index4-meetingRoom',
  templateUrl: './meetingRoom.component.html',
  styleUrls: ['./meetingRoom.component.css'],
})
export class Oa1IndexIndex4meetingRoomComponent implements OnInit{
  confirmModal: NzModalRef;
  constructor(private modal: NzModalService,
    private modalService: NzModalService,
    public http: _HttpClient,
    public settings: SettingsService, ) { }

  selecthysname = "";
  id = "";
  facilities = "";
  hysname = "";
  hysaddress = "";
  maxperson = 0;
  error = "";
  userId= "f033b9f7-0566-4916-a56b-7f7866e8c4ee";
  companyID = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";  //公司ID，暂时写死
  //会议室列表
  ConferenceRoomList = [];
  DataBind() {
    this.http
      .post('http://localhost:55659/api/GetConferenceRoom', {
        companyID: this.companyID,
        open: "ALL",
        name: this.selecthysname,
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

  ngOnInit(): void {
    this.DataBind();
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("con").style.height = (a-84) + "px";
  }

  selectedValue = '1';
  isVisible = false;
  // 新增角色按钮
  showModal(a, model) {
    //a=1:修改
    if (a == 1) {
      this.id = model.id;
      this.hysname = model.ConferenceName;
      this.hysaddress = model.ConferenceAddress;
      this.maxperson = model.MaxNumber;
      this.selectedValue = "" + model.Open + "";
      this.facilities = model.facilities;
    }
    else {
      this.id = "";
      this.hysname = "";
      this.hysaddress = "";
      this.maxperson = 0;
      this.selectedValue = "1";
      this.facilities = "";
    }
    this.isVisible = true;
  }

  //确认添加按钮
  handleOk(): void {
    this.http
      .post('http://localhost:55659/api/AddConferenceRoom', {
        id:this.id,
        companyID: this.companyID,
        conferencename: this.hysname,
        conferenceaddress: this.hysaddress,
        facilities: this.facilities,
        maxnumber: this.maxperson,
        open: this.selectedValue,
        InputPerson: this.userId,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          alert(res.Message);
          return;
        }
        else {
          alert("操作成功");
          this.isVisible = false;
          this.DataBind();
        }
      });
    
  }
  //取消按钮
  handleCancel(): void {
    this.isVisible = false;
  }
 
  // 删除按钮
  showConfirm(id): void {
    this.confirmModal = this.modal.confirm({
      nzOkText: '是',
      nzCancelText: '否',
      nzTitle: '删除会议室',
      nzContent: '<b style="color: red;">是否删除该会议室？</b>',
      nzOnOk: () => this.DeleteConferenceRoom(id),
    });
  }

  //删除会议室
  DeleteConferenceRoom(id) {
    this.http
      .post('http://localhost:55659/api/DeleteConferenceRoom', {
        id: id,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          alert(res.Message);
          return;
        }
        else {
          alert("操作成功");
          this.isVisible = false;
          this.DataBind();
        }
      });


  }



  //搜索会议室
  Selecthys() {
    alert(12)
  }



}



