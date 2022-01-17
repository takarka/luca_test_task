import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { ContentsItem } from 'src/app/models/contents-item.model';
import { Course } from 'src/app/models/course.model';
import { Plan } from 'src/app/models/plan.model';
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

  get coauthorList(): Author[] {
    let list = this.course?.coauthors;
    return list ? list : [];
  }
  get contentList(): ContentsItem[] {
    let list = this.course?.contents;
    return list ? list : [];
  }
  get planList(): Plan[] {
    let list = this.course?.plans;
    return list ? list : [];
  }

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
      coauthors: new FormArray([]),
      contents: new FormArray([]),
      plans: new FormArray([]),
      sales: new FormGroup({
        start: new FormControl(''),
        end: new FormControl(''),
      }),
      duration: new FormControl(''),
    });

    this.subs.add(
      this.courseForm.valueChanges.subscribe((updatedCourse: Course) => {
        console.log('courseForm changed: ', updatedCourse);
        if (updatedCourse?.id) {
          this.dataService.updateCourse(updatedCourse.id, updatedCourse);
        }
      })
    );
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
