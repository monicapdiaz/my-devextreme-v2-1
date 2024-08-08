import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-textbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-textbox.component.html',
  styleUrls: ['./custom-textbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomTextboxComponent),
      multi: true
    }
  ]
})
export class CustomTextboxComponent implements ControlValueAccessor, Validator {
  @Input() inputId: string = 'customTextbox';
  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};
  private control!: AbstractControl;

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    return control.value ? null : { required: true };
  }

  hasError(errorCode: string): boolean {
    return this.control && this.control.hasError(errorCode) && this.control.touched;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.value = value;
    this.onChange(value);
  }
}
