import { PageService } from './../../services/page-title.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../../services/data/data.service';
import { Course } from './../../models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  constructor(
    private pageService: PageService,
    private readonly dataService: DataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.pageService.emitCurrentPageTitle('Каталог курсов');
    this.pageService.emitCurrentPageLoading(false);
  }
  courses$ = this.dataService.courses$;

  authorName(course: Course): string {
    let author = course?.author;
    return author ? author.firstName + ' ' + course.author.lastName : '';
  }

  detailCourse(courseId: string): void {
    this.router.navigate(['editor', courseId]);
  }
}
