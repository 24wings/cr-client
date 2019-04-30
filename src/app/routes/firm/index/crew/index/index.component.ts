import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnInit, OnDestroy, Inject, Optional } from '@angular/core';
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
  selector: 'firm-index-crew-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})



export class FirmIndexCrewIndexComponent implements OnInit{
  queryUserName = "";
  isSpinning = true;
  PageSize = 5;
  PageIndex = 1;
  Total = 0;
  companyId = "dbb22f21-92d2-4db9-aeb7-5711feff51cb"
  error = '';
  branchValue = 'ALL';
  branchList: any[] = [];
  dateList: any[] = [
    {
      key: 'ALL',
      title: '全部',
    },
    {
      key: '今天',
      title: '今天',
    },
    {
      key: '昨天',
      title: '昨天',
    },
    {
      key:"本周",
      title:"本周"
    },
    {
      key:"近三个月",
      title:"近三个月"
    },
    {
      key:"本月",
      title:"本月"
    },
    {
      key:"上月",
      title:"上月"
    }
  ];
  dateEntryValue = 'ALL';
  stateList: any[] = [
    {
      key: 'ALL',
      title: '全部',
    },
    {
      key: "0",
      title: "试用期"
    },
    {
      key: '1',
      title: '已转正'
    },
    {
      key:"2",
      title:"离职"
    }
    ,
    {
      key: "3",
      title: "退休"
    }
  ];
  jobStateValue = 'ALL';
  menus: any[] = [];
  lzname = "";
  lzuserid = "";
  department = "";
  position = "";
  jobValue1 = "";
  jobValue2 = "";
  PostList: any[] =[];
  constructor(
    public http: _HttpClient,
    public settings: SettingsService,
  ) {
    
  }

  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("crew").style.height = a + "px";
    document.getElementById("crew-con").style.height = (a - 60) + "px";
    this.BindbranchValue();
    this.BandTotal();
    this.DataBind();
  }

  //绑定所属部门
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
          this.branchList = res.resData;
        }
      });
  }

  //绑定岗位
  BindGwValue(departmentId) {
    this.PostList = [];
    if (departmentId == "") {
      return;
    }
    this.http
      .post('http://localhost:55659/api/GetPostList', {
        departmentId: departmentId,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.PostList = res.resData;
        }
      });
  }

  //绑定岗位
  BindGw() {
    this.PostList = [];
    this.jobValue2 = "";
    if (this.jobValue1 == "") {
      return;
    }
    this.http
      .post('http://localhost:55659/api/GetPostList', {
        departmentId: this.jobValue1,
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          this.PostList = res.resData;
        }
      });
  }


  
  //绑定总条数
  BandTotal() {
    this.isSpinning = true;
    this.http
      .post('http://localhost:55659/api/GetUserListCount', {
        companyId: this.companyId,
        branchValue: this.branchValue,
        dateEntryValue: this.dateEntryValue,
        jobStateValue: this.jobStateValue,
        username: this.queryUserName
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


  //绑定列表
  DataBind() {
    this.isSpinning = true;
    this.http
      .post('http://localhost:55659/api/GetUserList', {
        companyId: this.companyId,
        branchValue: this.branchValue,
        dateEntryValue: this.dateEntryValue,
        jobStateValue: this.jobStateValue,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize,
        username: this.queryUserName
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.Total = 0;
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


  // 转岗点击方法
  transfer = false;
  jobTransfer(m): void {
    this.lzname = m.name;
    this.lzuserid = m.id;
    this.department = m.department;
    this.position = m.position;
    this.BindGwValue(m.JobPostId);
    this.jobValue1 = m.JobPostId;
    this.jobValue2 = m.PostId;

    this.transfer = true;
  }
  jobOk(): void {
    if (this.jobValue1 == "ALL" || this.jobValue1 == "" || this.jobValue2 == "ALL" || this.jobValue2 == "") {
      alert("请选择部门/岗位")
      return;
    }

    this.http
      .post('http://localhost:55659/api/UpdateUserZG', {
        userid: this.lzuserid,
        JobPostId: this.jobValue1,
        PostId: this.jobValue2,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert("操作失败，请联系管理员");
          return;
        }
        else {
          this.transfer = false;
          this.DataBind();
        }
      });

  }
  jobCancel(): void {
    console.log('Button cancel clicked!');
    this.transfer = false;
  }




  // 转正
  prt = false;
  promotion(m): void {
    if (m.InworkType != "试用期") {
      alert(m.InworkType + "无法转正");
      return;
    }
    this.lzname = m.name;
    this.lzuserid = m.id;
    this.prt = true;
  }
  prtOk(): void {
    this.http
      .post('http://localhost:55659/api/UpdateUserLz', {
        userid: this.lzuserid,
        type: 1
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert("操作失败，请联系管理员");
          return;
        }
        else {
          this.prt = false;
          this.DataBind();
        }
      });
    this.prt = false;
  }
  prtCancel(m): void {
    this.prt = false;
  }

  // 退休
  ret = false;
  retired(m): void {
    if (m.InworkType == "退休") {
      alert("无法重复操作");
      return;
    }
    if (m.InworkType == "离职") {
      alert("离职人员无法退休操作");
      return;
    }
    this.lzname = m.name;
    this.lzuserid = m.id;
    this.ret = true;
  }
  //退休确认按钮
  retOk(): void {
    this.http
      .post('http://localhost:55659/api/UpdateUserLz', {
        userid: this.lzuserid,
        type: 3
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert("操作失败，请联系管理员");
          return;
        }
        else {
          this.ret = false;
          this.DataBind();
        }
      });
  }
  retCancel(): void {
    this.ret = false;
  }

  // 离职
  det = false;
  departure(m): void {
    if (m.InworkType == "离职") {
      alert("无法重复操作");
      return;
    }
    this.lzname = m.name;
    this.lzuserid = m.id;
    this.det = true;
  }
  detOk(): void {
    this.http
      .post('http://localhost:55659/api/UpdateUserLz', {
        userid: this.lzuserid,
        type: 2
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          alert("操作失败，请联系管理员");
          return;
        }
        else {
          this.det = false;
          this.DataBind();
        }
      });
  }
  detCancel(): void {
    this.det = false;
  }


  
}
