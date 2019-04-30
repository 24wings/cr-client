import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'oa1-index-index3',
  templateUrl: './index3.component.html',
  styleUrls: ['./index3.component.css'],
})
export class Oa1IndexIndex3Component implements OnInit {
  private router$: Subscription;
  mode = '';
  title: string;
  user: any;
  menus: any[] = [
    {
      key: 'repairOrder',
      title: '我的工单',
    },
    {
      key: 'workingHours',
      title: '统计工时',
    },
    {
      key: 'theBriefing',
      title: '工单简报',
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
    this.router.navigateByUrl(`/oa1/index/index3/${item.key}`);
  }
  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60
    document.getElementById("screenHeight").style.height = a + "px";
    console.log(document.getElementById("em1").children)
  }
}

