import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  constructor(
    private readonly dataService: DataService,
    private router: Router
  ) {}
  courses$ = this.dataService.courses$;

  authorName(course: Course): string {
    let author = course?.author;
    return author ? author.firstName + ' ' + course.author.lastName : '';
  }

  detailCourse(courseId: string): void {
    this.router.navigate(['editor', courseId]);
  }
}
