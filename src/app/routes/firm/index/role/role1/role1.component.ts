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
  selector: 'firm-index-role1',
  templateUrl: './role1.component.html',
  styleUrls: ['./role1.component.css'],
})
export class FirmIndexRole1Component{
  constructor(
    private modalService: NzModalService,
    public http: _HttpClient,
    public settings: SettingsService,) {}
  isVisible = false;
  isVisibleS = false;
  isVisibleE = false;
  menus: any[] = [];
  error = "";
  companyId = "dbb22f21-92d2-4db9-aeb7-5711feff51cb"
  roleName = "";
  Explain = "";
  ID = "";
  tt = "";
  ngOnInit() {
    this.DataBind();


  }

  //绑定角色列表
  DataBind() {
    this.http
      .post('http://localhost:55659/api/Getrole', {
        companyId: this.companyId,
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
      });
  }


  // 新增角色按钮
  showModal(i,type) {
    if (type == 0) {
      this.tt = "新增角色";
      this.ID = "";
      this.roleName = "";
      this.Explain = "";
    }
    else if (type == 1) {
      this.tt = "修改角色";
      this.ID = i.ID;
      this.roleName = i.roleName;
      this.Explain = i.Explain;
    }
    this.isVisible = true;
  }

  //确认添加按钮
  handleOk(): void {
    this.http
      .post('http://localhost:55659/api/Addrole', {
        ID: this.ID,
        companyId: this.companyId,
        roleName: this.roleName,
        Explain: this.Explain
      })
      .subscribe((res: any) => {
        //alert(res.Success);
        if (!res.Success) {
          this.error = res.Message;
          return;
        }
        else {
          alert("操作成功");
          this.isVisible = false;
          this.DataBind();
        }
      });
  }



  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  // 超级管理员编辑按钮
  showModalS(): void {
    this.isVisibleS = true;
  }

  // 删除
  showDeleteConfirm(ID): void {
    this.modalService.confirm({
      nzTitle     : '删除角色',
      nzContent   : '<b style="color: red;">是否确定删除该角色？</b>',
      nzOkText    : '是',
      nzOkType: 'danger',
      nzOnOk: () => this.http
        .post('http://localhost:55659/api/Deleterole', {
          id: ID,
        })
        .subscribe((res: any) => {
          if (!res.Success) {
            this.error = res.Message;
            return;
          }
          else {
            alert("删除成功");
            this.DataBind();
          }
        }),
      nzCancelText: '否',
      nzOnCancel  : () => console.log('Cancel')
    });
  }
}
