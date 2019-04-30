import { Component,OnInit} from '@angular/core';
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
import { retry } from 'rxjs/operators';


@Component({
  selector: 'firm-index-crew-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})

export class FirmIndexCrewAddComponent implements OnInit {
  private router$: Subscription;
  expandForm = false;
  equipment = false;
  edu = false;
  other = false;
  train = false;
  isVisible = false;
  error = "";
  mode = 'inline';
  title: string;
  user: any;
  companyID = "dbb22f21-92d2-4db9-aeb7-5711feff51cb";  //公司ID，暂时写死
  branchList: any[] = [];
  PostList: any[] = [];
  //1：新增 ，2：修改，3：查看
  model = 3;
  //用户基本信息
  userid = "";          //用户ID
  name = "";        //姓名
  JobPostId = "";   //部门ID
  PostId = "";      //职位ID
  department = "";  //部门名称
  position = "";    //职位名称
  JobNumber = "";   //工号
  year = new Date().getFullYear();
  Month = new Date().getMonth()+1;
  day = new Date().getDay();
  RzDate = this.year + "-" + this.Month + "-" + this.day;       //入职日期
  ZzDate = "";        //转正日期
  LoginAccount = "";  //登陆账号
  phone = "";         //手机号
  Telephone = "";     //电话号码
  QQNumber = "";      //QQ号码
  WeiXinNumber = "";   //微信号码
  sex = "1";      //性别
  Enable = "1";    //是否启用
  SuperUser = "0";   //是否超级用户
  //技能信息
  SKll = "";    //专业技能信息
  //使用设备信息
  equipmentid = "";      //设备使用ID
  eName = "";            //设备名称
  eNumber = 1;          //设备数量
  No = "";              //设备编号
  Remarks = "";         //备注
  //工作经历
  Workid = "";
  work_CompanyName = "";
  work_department = "";
  work_position = "";
  work_BeginDate = "1995-1-1";
  work_EndDate = "1995-1-1";
  //教育经历
  Eduid = "";
  EduSchoolName = "";
  Educourtyard = "";
  Edumajor = "";
  EduBeginDate = "1995-1-1";
  EduEedDate = "1995-1-1";
  //培训经历
  traid = "";
  traSchoolName = "";
  tramajor = "";
  tracontent = "";
  traBeginDate = "1995-1-1";
  traEndDate = "1995-1-1";
  //其他信息
  DocumentType = "0";
  DocumentNumber = "";
  HYStatus = "0";
  address = "";
  birth = "1970-1-1";
  mail= "";
  urgentPerson1Name = "";
  urgentPerson1Phone = "";
  urgentPerson1relationship = "";
  urgentPerson1Address = "";
  urgentPerson2Name = "";
  urgentPerson2Phone = "";
  urgentPerson2relationship = "";
  urgentPerson2Address = "";
  DocumentTypeText = "0";
  HYStatusText = "0";
  urgentPerson1Text = "";
  DocumentNumberText = "";
  addressText = "";
  urgentPerson2Text = "";
  birthText = "1990-1-1";
  mailText = "";
  menus: any[] = [
    {
      key: 'crewAddInfo',
      title: '基本信息',
    },
    {
      key: 'crewAddIntegral',
      title: '员工积分',
    },
  ];
  Equipmentmenus: any[] = [];
  Workmenus: any[] = [];
  Educationmenus: any[] = [];
  trainexperiencemenus: any[] = [];
  constructor(
    private router: Router,
    private notification: NzNotificationService,
    public http: _HttpClient,
    public settings: SettingsService,
    private routeInfo: ActivatedRoute,
    private modalService: NzModalService,
  ) {
    this.router$ = this.router.events
      .subscribe(() => this.setActive());
  }
  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    this.menus.forEach(i => {
      i.selected = i.key === key;
    });
  }

  to(item: any) {
    this.router.navigateByUrl(`/firm/index/crew/crewAdd/${item.key}`);
  }
  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("crew-add").style.height = a + "px";
    document.getElementById("crew-con").style.height = (a - 100) + "px";
    //获取model， model:1 新增，2 修改 3 查看
    this.model = this.routeInfo.snapshot.queryParams['model'];
    this.userid = this.routeInfo.snapshot.queryParams['userid'] == undefined ? "" : this.routeInfo.snapshot.queryParams['userid'];
    this.JobPostId = this.routeInfo.snapshot.queryParams['jobPostId'] == undefined ? "" : this.routeInfo.snapshot.queryParams['jobPostId'];
    this.PostId = this.routeInfo.snapshot.queryParams['postId'] == undefined ? "" : this.routeInfo.snapshot.queryParams['postId'];
    this.BindbranchValue();
    alert(this.JobPostId )
    //绑定用户基本信息
    if (this.userid != "") {
      
      this.BindGwValue(this.JobPostId);
      this.BindUser();
      this.BindEquipment();
      this.BingWork();
      this.BingEducation();
      this.Bingtrainexperience();
      this.BindUserOthon();
      
    }
  } 



  //绑定所属部门
  BindbranchValue() {
    this.http
      .post('http://localhost:55659/api/GetdepartmentList', {
        companyId: this.companyID,
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
  BindGw() {
    this.PostList = [];
    this.PostId = "";
    if (this.JobPostId == "") {
      return;
    }
    this.http
      .post('http://localhost:55659/api/GetPostList', {
        departmentId: this.JobPostId,
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







  
  //保存员工基本信息
  UserSave(): void{
    this.http
      .post('http://localhost:55659/api/AddUser', {
        companyID: this.companyID,
        userid: this.userid,
        name: this.name,
        JobPostId: this.JobPostId,
        PostId: this.PostId,
        department: this.department,
        position: this.position,
        JobNumber: this.JobNumber,
        RzDate: this.RzDate,
       // ZzDate: this.ZzDate,
        LoginAccount: this.LoginAccount,
        phone: this.phone,
        Telephone: this.Telephone,
        QQNumber: this.QQNumber,
        WeiXinNumber: this.WeiXinNumber,
        sex: this.sex,
        Enable: this.Enable,
        SuperUser: this.SuperUser,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.userid = res.Message;
          this.BindUser();
          this.notification.create("success", '温馨提示',
            "操作成功");
         
        }
      });
  }
  //绑定员工基本信息
  BindUser() {
    this.http
      .post('http://localhost:55659/api/GetUser', {
        userid: this.userid,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.LoginAccount = res.resData[0].loginAccount;
          this.JobNumber = res.resData[0].jobNumber;
          this.name = res.resData[0].name;
          this.RzDate = res.resData[0].rzdatetime;
          this.ZzDate = res.resData[0].zzdatetime;
          this.phone = res.resData[0].phone;
          this.Telephone = res.resData[0].telephone;
          this.QQNumber = res.resData[0].qqNumber;
          this.WeiXinNumber = res.resData[0].weiXinNumber;
          this.sex = "" + res.resData[0].sex + "";
          this.Enable = "" + res.resData[0].enable + "";
          this.SuperUser = "" + res.resData[0].superUser + "";
          this.SKll = res.resData[0].Skll;
        }
      });
  }


  //保存其他信息
  SaveUserOthon() {
    if (this.userid == "") {
      this.notification.create("success", '温馨提示',
        "请先保存基本信息");
      return;
    }
    //数据非空验证
    if (this.DocumentType == "" ||
      this.DocumentNumber == "" ||
      this.HYStatus == "" ||
      this.address == "" ||
      this.birth == "" ||
      this.mail == "" ||
      this.urgentPerson1Name == "" ||
      this.urgentPerson1Phone == "" ||
      this.urgentPerson1relationship == "" ||
      this.urgentPerson1Address == "" ||
      this.urgentPerson2Name == "" ||
      this.urgentPerson2Phone == "" ||
      this.urgentPerson2relationship == "" ||
      this.urgentPerson2Address == "" )
    {
      this.notification.create("success", '温馨提示',
        "请录入完整信息");
      return;
    }
    this.http
      .post('http://localhost:55659/api/UpdateUserOthon', {
        userid: this.userid,
        DocumentType: this.DocumentType,
        DocumentNumber: this.DocumentNumber,
        HYStatus: this.HYStatus,
        address: this.address,
        birth: this.birth,
        mail: this.mail,
        urgentPerson1Name: this.urgentPerson1Name,
        urgentPerson1Phone: this.urgentPerson1Phone,
        urgentPerson1relationship: this.urgentPerson1relationship,
        urgentPerson1Address: this.urgentPerson1Address,
        urgentPerson2Name: this.urgentPerson2Name,
        urgentPerson2Phone: this.urgentPerson2Phone,
        urgentPerson2relationship: this.urgentPerson2relationship,
        urgentPerson2Address: this.urgentPerson2Address,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.notification.create("success", '温馨提示',
            "操作成功");
          this.BindUserOthon();
        }
      });
  }
  //绑定其他信息
  BindUserOthon() {
    this.http
      .post('http://localhost:55659/api/GetUserOthon', {
        userid: this.userid,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.DocumentTypeText = "" + res.resData[0].DocumentType + "";
          this.HYStatusText = "" + res.resData[0].HYStatus + "";
          this.urgentPerson1Text = res.resData[0].urgentPerson1;
          this.DocumentNumberText = res.resData[0].DocumentNumber;
          this.addressText = res.resData[0].address;
          this.urgentPerson2Text = res.resData[0].urgentPerson2;
          this.birthText = res.resData[0].birthDate;
          this.mailText = res.resData[0].mail;
        }
      });
  }
  //编辑其他信息
  Updateother() {
    this.other = !this.other;
    if (this.model != 1) {
      this.DocumentType = this.DocumentTypeText;
      this.DocumentNumber = this.DocumentNumberText;
      this.HYStatus = this.HYStatusText;
      this.birth = this.birthText;
      this.address = this.addressText;
      this.mail = this.mailText;
      this.urgentPerson1Name = this.urgentPerson1Text.split('|')[0].replace("姓名：", "");
      this.urgentPerson1Phone = this.urgentPerson1Text.split('|')[1].replace("电话：", "");
      this.urgentPerson1relationship = this.urgentPerson1Text.split('|')[2].replace("关系：", "");
      this.urgentPerson1Address = this.urgentPerson1Text.split('|')[3].replace("所在地：", "");
      this.urgentPerson2Name = this.urgentPerson2Text.split('|')[0].replace("姓名：", "");
      this.urgentPerson2Phone = this.urgentPerson2Text.split('|')[1].replace("电话：", "");
      this.urgentPerson2relationship = this.urgentPerson2Text.split('|')[2].replace("关系：", "");
      this.urgentPerson2Address = this.urgentPerson2Text.split('|')[3].replace("所在地：", "");
    }
  }
  //编辑取消
  QXUserOthon() {
    this.other = false;
  }



  //保存专业技能
  SkllSave(): void {
    if (this.userid == "") {
      this.notification.create("success", '温馨提示',
        "请先保存基本信息");
      return;
    }

    this.http
      .post('http://localhost:55659/api/AddUserSkll', {
        userid: this.userid,
        Skll: this.SKll,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.notification.create("success", '温馨提示',
            "操作成功");
        }
      });

  }


  //保存培训经历
  trainexperienceSave() {
    if (this.userid == "") {
      this.notification.create("success", '温馨提示',
        "请先保存基本信息");
      return;
    }
    //数据非空验证
    if (this.traSchoolName == "" ||
      this.tramajor == "" ||
      this.tracontent == "" ||
      this.traBeginDate == "" ||
      this.traEndDate == "")
    {
      this.notification.create("success", '温馨提示',
        "请录入完整信息");
      return;
    }
    

    this.http
      .post('http://localhost:55659/api/AddTrainExperience', {
        id: this.traid,
        userId: this.userid,
        traSchoolName: this.traSchoolName,
        tramajor: this.tramajor,
        tracontent: this.tracontent,
        traBeginDate: this.traBeginDate,
        traEndDate: this.traEndDate,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.notification.create("success", '温馨提示',
            "操作成功");
          this.Bingtrainexperience();
        }
      });
  }
  //绑定培训经历
  Bingtrainexperience() {
    this.http
      .post('http://localhost:55659/api/GetTrainExperience', {
        userId: this.userid,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.trainexperiencemenus = res.resData;
        }
      });
  }
  //删除培训经历
  Deletetrainexperience(id) {
    this.modalService.confirm({
      nzTitle: '<i>删除</i>',
      nzContent: '<b>确定删除?</b>',
      nzOnOk: () => this.http
        .post('http://localhost:55659/api/DeleteTrainExperience', {
          id: id,
        })
        .subscribe((res: any) => {
          if (!res.Success) {
            this.notification.create("success", '温馨提示',
              "操作失败，请联系管理员");
            return;
          }
          else {
            this.notification.create("success", '温馨提示',
              "删除成功");
            this.Bingtrainexperience();
          }
        })
    });
  }
  //编辑培训经历按钮
  Updatetrainexperience(m) {
    this.train = true;
    this.traid = m.id;
    this.traSchoolName = m.SchoolName;
    this.tramajor = m.major;
    this.tracontent = m.content;
    this.traBeginDate = m.d1;
    this.traEndDate = m.d2;
  }
  //添加培训经历按钮
  Addtrainexperience() {
    this.train = true;
    this.traid = "";
    this.traSchoolName = "";
    this.tramajor = "";
    this.tracontent = "";
    this.traBeginDate = "";
    this.traEndDate = "";
  }





  //保存教育背景
  Saveeducation() {
    if (this.userid == "") {
      this.notification.create("success", '温馨提示',
        "请先保存基本信息");
      return;
    }
    if (this.EduBeginDate >= this.EduEedDate) {
      this.notification.create("success", '温馨提示',
        "开始时间无法大于结束时间");
      return;
    }
    //数据非空验证
    if (
      this.EduSchoolName == "" ||
      this.Educourtyard == "" ||
      this.Edumajor == "" ||
      this.EduBeginDate == "" ||
      this.EduEedDate == ""
    ) {
      this.notification.create("success", '温馨提示',
        "请录入完整数据");
      return;
    }
    this.http
      .post('http://localhost:55659/api/AddEducation', {
        Eduid: this.Eduid,
        userId: this.userid,
        EduSchoolName: this.EduSchoolName,
        Educourtyard: this.Educourtyard,
        Edumajor: this.Edumajor,
        EduBeginDate: this.EduBeginDate,
        EduEedDate: this.EduEedDate,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.notification.create("success", '温馨提示',
            "操作成功");
          this.BingEducation();
        }
      });


  }
  //删除教育背景
  Deleteeducation(id) {
    this.modalService.confirm({
      nzTitle: '<i>删除</i>',
      nzContent: '<b>确定删除?</b>',
      nzOnOk: () => this.http
        .post('http://localhost:55659/api/DeleteEducation', {
          id: id,
        })
        .subscribe((res: any) => {
          if (!res.Success) {
            this.notification.create("success", '温馨提示',
              "操作失败，请联系管理员");
            return;
          }
          else {
            this.notification.create("success", '温馨提示',
              "删除成功");
            this.BingEducation();
          }
        })
    });
  }
  //编辑教育背景
  Updateeducation(m) {
    this.edu = true;
    this.Eduid = m.id;
    this.EduSchoolName = m.SchoolName;
    this.Educourtyard = m.courtyard;
    this.Edumajor = m.major;
    this.EduBeginDate = m.d1;
    this.EduEedDate = m.d2;
  }
  //绑定教育背景
  BingEducation() {
    this.http
      .post('http://localhost:55659/api/GetEducation', {
        userId: this.userid,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.Educationmenus = res.resData;
        }
      });
  }
  //添加教育背景按钮
  Addedu() {
    this.edu = true;
    this.Eduid = "";
    this.EduSchoolName = "";
    this.Educourtyard = "";
    this.Edumajor = "";
    this.EduBeginDate = "";
    this.EduEedDate = "";
  }


  
  //保存使用设备
  equipmentSave() {
    if (this.userid == "") {
      this.notification.create("success", '温馨提示',
        "请先保存基本信息");
      return;
    }
    if (
      this.eName==""||
      this.eNumber<=0||
      this.No==""||
      this.Remarks==""
    )
    {
      this.notification.create("success", '温馨提示',
        "请录入完整信息");
      return;
    }
    this.http
      .post('http://localhost:55659/api/Addequipment', {
        equipmentid: this.equipmentid,
        CompanyId: this.companyID,
        UserId: this.userid,
        eName: this.eName,
        eNumber: this.eNumber,
        No: this.No,
        Remarks: this.Remarks,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.notification.create("success", '温馨提示',
            "操作成功");
          this.BindEquipment();
        }
      });
  }
  //绑定使用设备
  BindEquipment() {
    this.http
      .post('http://localhost:55659/api/GetEquipment', {
        userId: this.userid,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.Equipmentmenus = res.resData;
        }
      });

  }
  //编辑设备信息
  UpdateEquipment(m) {
    this.equipment = true;
    this.equipmentid = m.id;
    this.eName = m.eName;
    this.eNumber = m.eNumber;
    this.No = m.No;
    this.Remarks = m.Remarks;
  }
  //删除设备
  DeleteEquipment(id) {
    this.modalService.confirm({
      nzTitle: '<i>删除</i>',
      nzContent: '<b>确定删除?</b>',
      nzOnOk: () => this.http
        .post('http://localhost:55659/api/DeleteEquipment', {
          id: id,
        })
        .subscribe((res: any) => {
          if (!res.Success) {
            this.notification.create("success", '温馨提示',
              "操作失败，请联系管理员");
            return;
          }
          else {
            this.notification.create("success", '温馨提示',
              "删除成功");
            this.BindEquipment();
          }
        })
    });
  }
  //添加使用设备按钮
  Addequipment() {
    this.equipment = true;
    this.equipmentid = "";
    this.eName = "";
    this.eNumber = 1;
    this.No = "";
    this.Remarks = "";
  }



  //保存工作经历
  SaveWork() {
    if (this.userid == "") {
      this.notification.create("success", '温馨提示',
        "请先保存基本信息");
      return;
    }
    if (this.work_BeginDate >= this.work_EndDate) {
      this.notification.create("success", '温馨提示',
        "开始时间无法大于结束时间");
      return;
    }
    if (
      this.work_CompanyName==""||
      this.work_department==""||
      this.work_position==""||
      this.work_BeginDate==""||
      this.work_EndDate==""
    )
    {
      this.notification.create("success", '温馨提示',
        "请录入完整信息");
      return;
    }
    this.http
      .post('http://localhost:55659/api/AddWork', {
        Workid: this.Workid,
        userId: this.userid,
        work_CompanyName: this.work_CompanyName,
        work_department: this.work_department,
        work_position: this.work_position,
        work_BeginDate: this.work_BeginDate,
        work_EndDate: this.work_EndDate,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.notification.create("success", '温馨提示',
            "操作成功");
          this.BingWork();
        }
      });
  }
  //绑定工作经历
  BingWork() {
    this.http
      .post('http://localhost:55659/api/GetWork', {
        userId: this.userid,
      })
      .subscribe((res: any) => {
        if (!res.Success) {
          this.notification.create("success", '温馨提示',
            "操作失败，请联系管理员");
          return;
        }
        else {
          this.Workmenus = res.resData;
        }
      });
  }
  //编辑工作经历
  UpdateWork(m) {
    this.expandForm = true;
    this.Workid = m.id;
    this.work_CompanyName = m.CompanyName;
    this.work_department = m.department;
    this.work_position = m.position;
    this.work_BeginDate = m.d1;
    this.work_EndDate = m.d2;
  }
  //删除工作经历
  DeleteWork(id) {
    this.modalService.confirm({
      nzTitle: '<i>删除</i>',
      nzContent: '<b>确定删除?</b>',
      nzOnOk: () => this.http
        .post('http://localhost:55659/api/DeleteWork', {
          id: id,
        })
        .subscribe((res: any) => {
          if (!res.Success) {
            this.notification.create("success", '温馨提示',
              "操作失败，请联系管理员");
            return;
          }
          else {
            this.notification.create("success", '温馨提示',
              "删除成功");
            this.BingWork();
          }
        })
    });


  }
  //添加工作经历按钮
  AddexpandForm() {
    this.expandForm = true;
    this.Workid = "";
    this.work_CompanyName = "";
    this.work_department = "";
    this.work_position = "";
    this.work_BeginDate = "";
    this.work_EndDate = "";
  }



  showModal(): void {
    this.isVisible = true;
  }

  
}
