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
import { Plan } from 'src/app/models/plan.model';

@Component({
  selector: 'plan-advantages',
  templateUrl: './plan-advantages.component.html',
  styleUrls: ['./plan-advantages.component.scss'],
})
export class PlanAdvantagesComponent implements OnInit {
  public advantagesForm: FormGroup | undefined;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.advantagesForm = <FormGroup>this.controlContainer.control;
  }

  get advantages(): FormArray {
    return this.advantagesForm?.get('advantages') as FormArray;
  }

  addRow(value?: PlanAdvantage): void {
    this.advantages?.push(
      new FormGroup({
        title: new FormControl(value?.title, [Validators.required]),
        available: new FormControl(value?.available, [Validators.required]),
      })
    );
  }

  removeRow(index: number): void {
    this.advantages?.removeAt(index);
  }
}
