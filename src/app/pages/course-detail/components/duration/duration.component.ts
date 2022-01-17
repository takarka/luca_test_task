import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { DurationUnit } from 'src/app/models/duration-unit.enum';

@Component({
  selector: 'duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationComponent),
      multi: true,
    },
  ],
})
export class DurationComponent implements OnInit, ControlValueAccessor {
  DurationUnit = DurationUnit;

  public durationForm: FormGroup = new FormGroup({
    value: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit() {}

  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    val && this.durationForm.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.durationForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.durationForm.disable() : this.durationForm.enable();
  }
}
