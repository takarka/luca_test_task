import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  PlanAdvantagesComponent,
  CoauthorsComponent,
  CourseContentComponent,
  CoursePlanComponent,
  DurationComponent,
} from './components';
import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseContentComponent,
    CoursePlanComponent,
    DurationComponent,
    CoauthorsComponent,
    PlanAdvantagesComponent,
  ],
  imports: [
    CommonModule,
    CourseDetailRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  providers: [MatDatepickerModule],
})
export class CourseDetailModule {}
