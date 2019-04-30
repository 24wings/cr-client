import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { Oa1RoutingModule } from './oa1-routing.module';
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
import { Oa1IndexIndex4arrange1Component } from './index/index4/meetArrange/arrange1/arrange1.component';
import { Oa1IndexIndex4arrange2Component } from './index/index4/meetArrange/arrange2/arrange2.component';
import { Oa1IndexIndex4meetingRoomComponent } from './index/index4/meetingRoom/meetingRoom.component';

const COMPONENTS = [
  Oa1IndexComponent];
const COMPONENTS_NOROUNT = [
  Oa1IndexHomeComponent,
  Oa1IndexIndex1Component,
  Oa1IndexIndex2Component,
  Oa1IndexIndex3Component,
  Oa1IndexIndex4Component,
  Oa1IndexIndex5Component,
  Oa1IndexIndex1AttComponent,
  Oa1IndexIndex1FieldComponent,
  Oa1IndexIndex1StatisticsComponent,
  Oa1IndexIndex1WageComponent,
  Oa1IndexIndex1FieldC1Component,
  Oa1IndexIndex1FieldC2Component,
  Oa1IndexIndex1BranchComponent,
  Oa1IndexIndex1MineComponent,
  Oa1IndexIndex2DayComponent,
  Oa1IndexIndex2ItemComponent,
  Oa1IndexIndex2MonthComponent,
  Oa1IndexIndex2WeeksComponent,
  Oa1IndexIndex2YearsComponent,
  Oa1IndexIndex2yearMiddleComponent,
  Oa1IndexIndex3repairOrderComponent,
  Oa1IndexIndex3workingHoursComponent,
  Oa1IndexIndex3theBriefingComponent,
  Oa1IndexIndex4meetArrangeComponent,
  Oa1IndexIndex4meetReservationComponent,
  Oa1IndexIndex4arrange1Component,
  Oa1IndexIndex4arrange2Component,
  Oa1IndexIndex4meetingRoomComponent
];

@NgModule({
  imports: [
    SharedModule,
    Oa1RoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class Oa1Module { }
