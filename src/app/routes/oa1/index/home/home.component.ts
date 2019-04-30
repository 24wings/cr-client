import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'oa1-index-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class Oa1IndexHomeComponent implements OnInit{
  ngOnInit() {
      var a = document.getElementById("screenBody").offsetHeight - 60;
      document.getElementById("oaCon").style.height = (a-84) + "px";
  }
}
