import { PlanAdvantage } from './../../../../models/plan-advantage.model';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContentsItemType } from 'src/app/models/contents-item-type.enum';
import { Plan } from 'src/app/models/plan.model';

@Component({
  selector: 'course-plan',
  templateUrl: './course-plan.component.html',
  styleUrls: ['./course-plan.component.scss'],
})
export class CoursePlanComponent implements OnInit, OnChanges {
  ContentsItemType = ContentsItemType;

  public coursePlanForm: FormGroup | undefined;

  @Input() planList: Plan[] = [];

  constructor(private controlContainer: ControlContainer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.planList.currentValue) {
      console.log('planList: ', this.planList);
      this.planList.forEach((item) => {
        this.addRow(item);
      });
    }
  }

  ngOnInit() {
    this.coursePlanForm = <FormGroup>this.controlContainer.control;
  }

  get plans(): FormArray {
    return this.coursePlanForm?.get('plans') as FormArray;
  }

  public getPlanAdvantages(index: number): PlanAdvantage[] {
    let list = this.planList[index].advantages;
    return list ? list : [];
  }

  addRow(value?: Plan): void {
    this.plans?.push(
      new FormGroup({
        name: new FormControl(value?.name, [Validators.required]),
        price: new FormControl(value?.price, [Validators.required]),
        advantages: new FormControl(value?.advantages, [Validators.required]),
      })
    );
  }
}
