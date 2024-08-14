import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule,FormsModule ],
  templateUrl: './custom-textbox.component.html',
  styleUrls: ['./custom-textbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomTextboxComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CustomTextboxComponent,
      multi: true
    }
  ]
})
export class CustomTextboxComponent implements ControlValueAccessor, Validator {

  @Input() inputId: string = 'customTextbox';
  @Input() disabled: boolean = false;
  value: string = '';
  
  onChange = (value: string) => {};
  onTouched = () => {};
  private onValidationChange = () => {};

  writeValue(value: string): void {
    this.value = value || '';
    // this.onChange(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    console.log('registerOnChange called');
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
    console.log('registerOnTouched called');
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidationChange = fn;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
    this.onTouched();
    this.onValidationChange();
    console.log('Input event:', inputElement.value);
    console.log('Current value:', this.value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const errors = !control.value && control.touched ? { required: true } : null;
    console.log('Validation result in validate method:', errors);
    return errors;
  }
  
}

