import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail.component';

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [
    CommonModule,
    CourseDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CourseDetailModule {}
