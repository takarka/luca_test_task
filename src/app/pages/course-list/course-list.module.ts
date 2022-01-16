import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CourseListRoutingModule } from './course-list-routing.module';
import { CourseListComponent } from './course-list.component';

@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    CourseListRoutingModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
})
export class CourseListModule {}
