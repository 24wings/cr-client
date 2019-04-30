import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'oa1-index-index4',
  templateUrl: './index4.component.html',
  styleUrls: ['./index4.component.css'],
})
export class Oa1IndexIndex4Component implements OnInit{
  private router$: Subscription;
  mode = '';
  title: string;
  user: any;
  menus: any[] = [
    {
      key: 'meetArrange',
      title: '会议安排',
    },
    {
      key: 'meetReservation',
      title: '会议预定',
    },
    {
      key: 'meetingRoom',
      title: '会议室管理',
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
    this.router.navigateByUrl(`/oa1/index/index4/${item.key}`);
  }
  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60
    document.getElementById("screenHeight").style.height = a + "px";
    console.log(document.getElementById("em1").children)
  }
}
