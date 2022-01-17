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
import { Author } from '../../../../models/author.model';

@Component({
  selector: 'coauthors',
  templateUrl: './coauthors.component.html',
  styleUrls: ['./coauthors.component.scss'],
})
export class CoauthorsComponent implements OnInit, OnChanges {
  public coauthorsForm: FormGroup | undefined;

  @Input() coauthorList: Author[] = [];

  constructor(private controlContainer: ControlContainer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.coauthorList.currentValue) {
      this.coauthorList.forEach((item) => {
        this.addRow(item);
      });
    }
  }

  ngOnInit() {
    this.coauthorsForm = <FormGroup>this.controlContainer.control;
  }

  get coauthors(): FormArray {
    return this.coauthorsForm?.get('coauthors') as FormArray;
  }

  addRow(value?: Author): void {
    this.coauthors?.push(
      new FormGroup({
        firstName: new FormControl(value?.firstName, [Validators.required]),
        lastName: new FormControl(value?.lastName, [Validators.required]),
      })
    );
  }

  removeRow(index: number): void {
    this.coauthors?.removeAt(index);
  }
}
