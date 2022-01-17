import { Component, forwardRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { ContentsItemType } from 'src/app/models/contents-item-type.enum';
import { ContentsItem } from 'src/app/models/contents-item.model';

@Component({
  selector: 'course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseContentComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseContentComponent),
      multi: true,
    },
  ],
})
export class CourseContentComponent
  implements OnInit, ControlValueAccessor, Validator
{
  ContentsItemType = ContentsItemType;
  public parentForm : FormGroup | any;

  public courseContentForm: FormArray = new FormArray([]);
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.parentForm = this.controlContainer.control;
  }

  addRow(value?: ContentsItem): void {
    this.courseContentForm.push(
      new FormGroup({
        name: new FormControl(value?.name, [Validators.required]),
        type: new FormControl(value?.type, [Validators.required]),
      }),
      { emitEvent: false }
    );
  }

  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    val?.forEach((row: ContentsItem) => {
      this.addRow(row);
    });
    console.log('courseContentForm: ', this.courseContentForm.value);
    this.parentForm.get('contents').setValue(val, { emitEvent: false });
    console.log('parentForm: ', this.parentForm.value);
    // val && this.courseContentForm?.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.courseContentForm?.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.courseContentForm?.disable()
      : this.courseContentForm?.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.courseContentForm?.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'courseContentForm fields are invalid',
          },
        };
  }
}
