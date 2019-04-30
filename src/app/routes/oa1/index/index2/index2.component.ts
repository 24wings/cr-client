import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'oa1-index-index2',
  templateUrl: './index2.component.html',
  styleUrls: ['./index2.component.css'],
})
export class Oa1IndexIndex2Component  implements OnInit{
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
      key: 'day',
      title: '日报',
    },
    {
      key: 'weeks',
      title: '周报',
    },
    {
      key: 'month',
      title: '月报',
    },
    {
      key: 'yearMiddle',
      title: '年中总结',
    },
    {
      key: 'years',
      title: '年终总结',
    },
    {
      key: 'item',
      title: '项目汇报',
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
    this.router.navigateByUrl(`/oa1/index/index2/${item.key}`);
  }
}
