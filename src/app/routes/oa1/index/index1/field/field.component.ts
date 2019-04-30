import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import { _HttpClient } from '@delon/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'oa1-index-index1-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class Oa1IndexIndex1FieldComponent implements OnInit {
  private router$: Subscription;

  mode = '';
  title: string;
  user: any;
  menus: any[] = [
    {
      key: 'fieldC1',
      title: '外勤记录',
    },
    {
      key: 'fieldC2',
      title: '外勤统计',
    },
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
    this.router.navigateByUrl(`/oa1/index/index1/field/${item.key}`);
  }
  ngOnInit() {
    var a = document.getElementById("screenBody").offsetHeight - 60;
    document.getElementById("crew-con").style.height = (a-84) + "px";
  }
  
}
