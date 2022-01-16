import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  subs = new Subscription();

  course: Course | undefined;

  public courseForm: FormGroup | undefined;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.activatedRouter.params.subscribe((params) => {
        const courseId = params['id'];
        this.getCourseData(courseId);
      })
    );

    this.courseForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      author: new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
      }),
    });
  }

  getCourseData(courseId: string) {
    this.dataService.getCourse(courseId).then((course) => {
      this.course = course;
      console.log('Course: ', this.course);
      this.courseForm?.patchValue(this.course);
    });
  }

  goBackToList(): void {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
