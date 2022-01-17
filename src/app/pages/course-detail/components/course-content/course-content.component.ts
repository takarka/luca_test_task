import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
})
export class CourseContentComponent implements OnInit, OnChanges {
  ContentsItemType = ContentsItemType;

  public courseContentForm: FormGroup | undefined;

  @Input() contentList: ContentsItem[] = [];

  constructor(private controlContainer: ControlContainer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contentList.currentValue) {
      this.contentList.forEach((item) => {
        this.addRow(item);
      });
    }
  }

  ngOnInit() {
    this.courseContentForm = <FormGroup>this.controlContainer.control;
  }

  get contents(): FormArray {
    return this.courseContentForm?.get('contents') as FormArray;
  }

  addRow(value?: ContentsItem): void {
    this.contents.push(
      new FormGroup({
        name: new FormControl(value?.name, [Validators.required]),
        type: new FormControl(value?.type, [Validators.required]),
      }),
      { emitEvent: false }
    );
  }
}
