import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'firm-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class FirmIndexComponent implements OnInit {
  private router$: Subscription;

  mode = 'inline';
  title: string;
  user: any;
  menus: any[] = [
    {
      key: 'basic',
      title: '基本信息',
    },
    {
      key: 'product',
      title: '产品信息',
    },
    {
      key: 'tissue',
      title: '组织结构',
    },
    {
      key:"crew",
      title:"人员管理"
    },
    {
      key:"role",
      title:"角色管理"
    },
    {
      key:"dataLimit",
      title:"数据权限管理"
    }
  ];
  constructor(
    private router: Router,
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
    this.router.navigateByUrl(`/firm/index/${item.key}`);
  }

  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60
    document.getElementById("mainDiv").style.height = a + "px";
  }

}
