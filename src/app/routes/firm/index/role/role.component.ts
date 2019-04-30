import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'firm-index-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})

export class FirmIndexRoleComponent implements OnInit{
  private router$: Subscription;
  mode = '';
  title: string;
  user: any;
  menus: any[] = [
    {
      key: 'role1',
      title: '角色列表',
    },
    {
      key: 'role2',
      title: '员工角色分配',
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
    this.router.navigateByUrl(`/firm/index/role/${item.key}`);
  }
  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60
    document.getElementById("screenHeight").style.height = a + "px";
  }

  
}
