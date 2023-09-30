import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControlDirective} from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reusable-input',
  templateUrl: './reusable-input.component.html', 
})
export class ReusableInputComponent implements ControlValueAccessor, OnInit {
  @ViewChild(FormControlDirective, {static: true}) formControlDirective!: FormControlDirective;

  @Input() public label!: string;
  @Input() public formControl!: FormControl;
  @Input() public formControlName!: string;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
  }
  /* get hold of FormControl instance no matter formControl or    formControlName is given. If formControlName is given, then this.controlContainer.control is the parent FormGroup (or FormArray) instance. */
  get control() {
    return this.formControl ||     this.controlContainer.control.get(this.formControlName);
  }



  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }
}
