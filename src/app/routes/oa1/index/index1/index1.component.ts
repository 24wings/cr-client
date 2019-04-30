import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'oa1-index-index1',
  templateUrl: './index1.component.html',
  styleUrls: ['./index1.component.css'],
})
export class Oa1IndexIndex1Component implements OnInit{
  private router$: Subscription;
  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60
    document.getElementById("screenHeight").style.height = a + "px";
  }

  mode = '';
  title: string;
  user: any;
  menus: any[] = [
    {
      key: 'att',
      title: '上下班考勤',
    },
    {
      key: 'field',
      title: '外勤打卡',
    },
    {
      key: 'statistics',
      title: '考勤统计',
    },
    {
      key: 'wage',
      title: '工资条',
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
    this.router.navigateByUrl(`/oa1/index/index1/${item.key}`);
  }
}
