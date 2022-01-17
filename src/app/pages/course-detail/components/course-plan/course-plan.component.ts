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
import { ContentsItemType } from '../../../../models/contents-item-type.enum';
import { Plan } from '../../../../models/plan.model';

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

  getPlanAdvantagesControl(index: number): FormArray {
    return this.plans?.at(index)?.get('advantages') as FormArray;
  }

  addRow(value?: Plan): void {
    this.plans?.push(
      new FormGroup({
        name: new FormControl(value?.name, [Validators.required]),
        price: new FormControl(value?.price, [Validators.required]),
        advantages: new FormArray(this.setAdvantages(value?.advantages)),
      })
    );
  }

  removeRow(index: number): void {
    this.plans?.removeAt(index);
  }

  setAdvantages(advantages: PlanAdvantage[] | undefined): FormGroup[] {
    let list: FormGroup[] = [];
    advantages?.forEach((item) => {
      list.push(
        new FormGroup({
          title: new FormControl(item?.title, [Validators.required]),
          available: new FormControl(item?.available, [Validators.required]),
        })
      );
    });
    return list;
  }
}
