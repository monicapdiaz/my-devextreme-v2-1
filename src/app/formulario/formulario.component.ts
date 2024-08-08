import { Component, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { DxFormModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomTextboxComponent } from '../custom-textbox/custom-textbox.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Asegúrate de importar esto

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DxFormModule,
    DxButtonModule,
    DxTemplateModule,
    RouterModule,
    CustomTextboxComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Asegúrate de que esto sea un array de esquemas
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {

  title = 'my-devextreme-app';
  form: FormGroup;

  @ViewChild('myForm') dxForm!: DxFormComponent;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      customTextbox: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordEditorOptions: any = {
    mode: 'password',
    valueChangeEvent: 'keyup',
    onValueChanged: () => {
      const editor = this.dxForm.instance.getEditor('confirmPassword');
      if (editor) {
        // Handle validation manually or trigger form validation
        this.dxForm.instance.validate();
      }
    },
    buttons: [
      {
        name: 'password',
        location: 'after',
        options: {
          stylingMode: 'text',
          icon: 'eyeopen',
          onClick: () => this.changePasswordMode('password'),
        },
      },
    ],
  };

  confirmPasswordEditorOptions: any = {
    mode: 'password',
    valueChangeEvent: 'keyup',
    buttons: [
      {
        name: 'password',
        location: 'after',
        options: {
          icon: 'eyeopen',
          stylingMode: 'text',
          onClick: () => this.changePasswordMode('confirmPassword'),
        },
      },
    ],
  };

  passwordComparison = () => this.form.get('password')?.value;

  changePasswordMode = (name: string) => {
    const editor = this.dxForm.instance.getEditor(name);
    if (editor) {
      editor.option(
        'mode',
        editor.option('mode') === 'text' ? 'password' : 'text'
      );
    }
  };
  submitForm() {
    const formInstance = this.dxForm.instance;
    if (formInstance.validate().isValid) {
      notify({
        message: 'Form data submitted successfully!',
        position: {
          my: 'center top',
          at: 'center top',
        },
      });
      console.log('Form data:', formInstance.option('formData'));
    } else {
      notify({
        message: 'Form validation failed!',
        position: {
          my: 'center top',
          at: 'center top',
        },
        type: 'error',
      });
      console.log('Form is not valid');
    }
  }
  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  validateDate(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const isValidDate = !isNaN(date.getTime());
    return isValidDate ? null : { invalidDate: true };
  }

  onFormValueChanged(e: any) {
    console.log('Form value changed:', e);
  }
}
