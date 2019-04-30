import {
  Component,
  OnInit
} from '@angular/core';
import { _HttpClient } from '@delon/theme';


@Component({
  selector: 'oa1-index-index3-workingHours',
  templateUrl: './workingHours.component.html',
  styleUrls: ['./workingHours.component.css'],
})
export class Oa1IndexIndex3workingHoursComponent implements OnInit{
  constructor(private http: _HttpClient) {}
  // salesData: any[] = [
  //   {x: "1月", y: 352},
  //   {x: "2月", y: 1054},
  //   {x: "3月", y: 813},
  //   {x: "13月", y: 352},
  //   {x: "15月", y: 352},
  //   {x: "16月", y: 352},
  //   {x: "17月", y: 352},
  //   {x: "4月", y: 469},
  //   {x: "5月", y: 315},
  //   {x: "6月", y: 692},
  //   {x: "7月", y: 610},
  //   {x: "8月", y: 516},
  //   {x: "9月", y: 697},
  //   {x: "10月", y: 1140},
  //   {x: "11月", y: 635},
  //   {x: "12月", y: 1071}];

  
  salesData=[

  // {x: "2018-8", y1: 44, y2: 96},
  // {x: "2018-10", y1: 64, y2: 94},
  // {x: 1552720512513, y1: 12, y2: 91},
  // {x: 1552718712513, y1: 22, y2: 84},
  // {x: 1552733112513, y1: 87, y2: 65},
  // {x: 1552722312513, y1: 101, y2: 62},
  // {x: 1552711512513, y1: 47, y2: 61},
  // {x: 1552702512513, y1: 52, y2: 60},
  // {x: 1552736712513, y1: 49, y2: 56},
  // {x: 1552725912513, y1: 52, y2: 54},
  // {x: 1552713312513, y1: 96, y2: 54},
  // {x: 1552727712513, y1: 106, y2: 51}, 
  // {x: 1552706112513, y1: 29, y2: 49},
  // {x: 1552707912513, y1: 36, y2: 41},
  // {x: 1552704312513, y1: 75, y2: 40},
  // {x: 1552724112513, y1: 22, y2: 40},
  // {x: 1552731312513, y1: 44, y2: 31},
  // {x: 1552715112513, y1: 43, y2: 28},
  // {x: 1552734912513, y1: 42, y2: 10},
  ]

// {
//   "x": "Computers",
//   "y": [
//     54,
//     0,
//     879
//   ],
//   "tooltip": "This is a tooltip"
// }

  ngOnInit(){
    this.http.get('/chart').subscribe((res: any) => {
      // this.salesData = res.offlineChartData;
      // console.log(res.offlineChartData)
      this.salesData = res.salesData;
      console.log(res.salesData)
    });
    
  }
}



