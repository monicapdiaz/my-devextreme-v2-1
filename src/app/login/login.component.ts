import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomTextboxComponent } from '../custom-textbox/custom-textbox.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CustomTextboxComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required, this.validateDate]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.comparePasswords.bind(this)]],
      customTextbox: ['', [Validators.required]]
    });
  }

  validateDate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const isValidDate = !isNaN(Date.parse(value));
    return isValidDate ? null : { invalidDate: true };
  }

  comparePasswords(control: AbstractControl): { [key: string]: any } | null {
    const password = this.loginForm?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordsNotMatch: true };
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login form data:', this.loginForm.value);
    } else {
      console.log('Login form is invalid');
    }
  }
}
