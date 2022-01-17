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
import { ContentsItem } from '../../../../models/contents-item.model';

@Component({
  selector: 'course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit, OnChanges {
  ContentsItemType = ContentsItemType;

  public courseContentForm: FormGroup | undefined;

  @Input() contentList: ContentsItem[] | undefined;

  constructor(private controlContainer: ControlContainer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contentList.currentValue) {
      this.contentList?.forEach((item) => {
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
    this.contents?.push(
      new FormGroup({
        name: new FormControl(value?.name, [Validators.required]),
        type: new FormControl(value?.type, [Validators.required]),
      })
    );
  }

  removeRow(index: number): void {
    this.contents?.removeAt(index);
  }
}
