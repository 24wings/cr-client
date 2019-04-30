import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Oa1IndexComponent } from './index/index.component';
import { Oa1IndexIndex1Component } from './index/index1/index1.component';
import { Oa1IndexIndex2Component } from './index/index2/index2.component';
import { Oa1IndexIndex3Component } from './index/index3/index3.component';
import { Oa1IndexIndex4Component } from './index/index4/index4.component';
import { Oa1IndexIndex5Component } from './index/index5/index5.component';
import { Oa1IndexHomeComponent } from './index/home/home.component';
import { Oa1IndexIndex1AttComponent } from './index/index1/att/att.component';
import { Oa1IndexIndex1FieldComponent } from './index/index1/field/field.component';
import { Oa1IndexIndex1StatisticsComponent } from './index/index1/statistics/statistics.component';
import { Oa1IndexIndex1WageComponent } from './index/index1/wage/wage.component';
import { Oa1IndexIndex1FieldC1Component } from './index/index1/field/fieldC1/fieldC1.component';
import { Oa1IndexIndex1FieldC2Component } from './index/index1/field/fieldC2/fieldC2.component';
import { Oa1IndexIndex1BranchComponent } from './index/index1/statistics/branch/branch.component';
import { Oa1IndexIndex1MineComponent } from './index/index1/statistics/mine/mine.component';
import { Oa1IndexIndex2DayComponent } from './index/index2/day/day.component';
import { Oa1IndexIndex2ItemComponent } from './index/index2/item/item.component';
import { Oa1IndexIndex2MonthComponent } from './index/index2/month/month.component';
import { Oa1IndexIndex2WeeksComponent } from './index/index2/weeks/weeks.component';
import { Oa1IndexIndex2YearsComponent } from './index/index2/years/years.component';
import { Oa1IndexIndex2yearMiddleComponent } from './index/index2/yearMiddle/yearMiddle.component';
import { Oa1IndexIndex3repairOrderComponent } from './index/index3/repairOrder/repairOrder.component';
import { Oa1IndexIndex3workingHoursComponent } from './index/index3/workingHours/workingHours.component';
import { Oa1IndexIndex3theBriefingComponent } from './index/index3/theBriefing/theBriefing.component';
import { Oa1IndexIndex4meetArrangeComponent } from './index/index4/meetArrange/meetArrange.component';
import { Oa1IndexIndex4meetReservationComponent } from './index/index4/meetReservation/meetReservation.component';
// import { Oa1IndexIndex4arrange1Component } from './index/index4/meetArrange/arrange1/arrange1.component';
// import { Oa1IndexIndex4arrange2Component } from './index/index4/meetArrange/arrange2/arrange2.component';
import { Oa1IndexIndex4meetingRoomComponent } from './index/index4/meetingRoom/meetingRoom.component';

 
const routes: Routes = [

  {
    path: 'index',
    component: Oa1IndexComponent,
    children: [
      { path: '', redirectTo: 'home'},
      {
        path: 'home',
        component: Oa1IndexHomeComponent,
        data: { titleI18n: 'OA' },
      },
      {
        path: 'index1',
        component: Oa1IndexIndex1Component,
        data: { titleI18n: 'OA' },
        children: [
          { path: '', redirectTo: 'att' },
          {
            path: 'att',
            component: Oa1IndexIndex1AttComponent,
            data: { titleI18n: 'OA' },
          },
          {
            path: 'field',
            component: Oa1IndexIndex1FieldComponent,
            data: { titleI18n: 'OA' },
            children: [
              { path: '', redirectTo: 'fieldC1' },
              {
                path: 'fieldC1',
                component: Oa1IndexIndex1FieldC1Component,
                data: { titleI18n: 'OA' },
              },
              {
                path: 'fieldC2',
                component: Oa1IndexIndex1FieldC2Component,
                data: { titleI18n: 'OA' },
              }
            ]
          },
          {
            path: 'statistics',
            component: Oa1IndexIndex1StatisticsComponent,
            data: { titleI18n: 'OA' },
            children: [
              { path: '', redirectTo: 'mine' },
              {
                path: 'branch',
                component: Oa1IndexIndex1BranchComponent,
                data: { titleI18n: 'OA' },
              },
              {
                path: 'mine',
                component: Oa1IndexIndex1MineComponent,
                data: { titleI18n: 'OA' },
              }
            ]
          },
          {
            path: 'wage',
            component: Oa1IndexIndex1WageComponent,
            data: { titleI18n: 'OA' },
          }
        ]
      },
      {
        path: 'index2',
        component: Oa1IndexIndex2Component,
        data: { titleI18n: 'OA' },
        children:[
          { path: '', redirectTo: 'day' },
          {
            path: 'day',
            component: Oa1IndexIndex2DayComponent,
            data: { titleI18n: 'OA' },
          },
          {
            path: 'item',
            component: Oa1IndexIndex2ItemComponent,
            data: { titleI18n: 'OA' },
          },
          {
            path: 'month',
            component: Oa1IndexIndex2MonthComponent,
            data: { titleI18n: 'OA' },
          },
          {
            path: 'weeks',
            component: Oa1IndexIndex2WeeksComponent,
            data: { titleI18n: 'OA' },
          },
          {
            path: 'years',
            component: Oa1IndexIndex2YearsComponent,
            data: { titleI18n: 'OA' },
          },
          {
            path: 'yearMiddle',
            component: Oa1IndexIndex2yearMiddleComponent,
            data: { titleI18n: 'OA' },
          }
        ]
      },
      {
        path: 'index3',
        component: Oa1IndexIndex3Component,
        data: { titleI18n: '任务工单' },
        children:[
          { path: '', redirectTo: 'repairOrder' },
          {
            path: 'repairOrder',
            component: Oa1IndexIndex3repairOrderComponent,
            data: { titleI18n: '我的工单' },
          },
          {
            path: 'workingHours',
            component: Oa1IndexIndex3workingHoursComponent,
            data: { titleI18n: '统计工时' },
          },
          {
            path: 'theBriefing',
            component: Oa1IndexIndex3theBriefingComponent,
            data: { titleI18n: '工单简报' },
          }
        ]
      },
      {
        path: 'index4',
        component: Oa1IndexIndex4Component,
        data: { titleI18n: '日程安排' },
        children:[
          { path: '', redirectTo: 'meetArrange' },
          {
            path: 'meetArrange',
            component: Oa1IndexIndex4meetArrangeComponent,
            data: { titleI18n: 'OA' },
            // children: [
            //   { path: '', redirectTo: 'arrange1' },
            //   {
            //     path: 'arrange1',
            //     component: Oa1IndexIndex4arrange1Component,
            //     data: { titleI18n: 'OA' },
            //   },
            //   {
            //     path: 'arrange2',
            //     component: Oa1IndexIndex4arrange2Component,
            //     data: { titleI18n: 'OA' },
            //   }
            // ]
          },
          {
            path: 'meetReservation',
            component: Oa1IndexIndex4meetReservationComponent,
            data: { titleI18n: 'OA' },
          },
          {
            path: 'meetingRoom',
            component: Oa1IndexIndex4meetingRoomComponent,
            data: { titleI18n: 'OA' },
          }
        ]
      },
      {
        path: 'index5',
        component: Oa1IndexIndex5Component,
        data: { titleI18n: '公告' },
      }
    ],
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Oa1RoutingModule { }
