import { Component, ViewChild, OnInit } from '@angular/core';
import { DxFormModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { DxFormComponent } from 'devextreme-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Asegúrate de importar esto

@Component({
  selector: 'app-formulario-combinado',
  standalone: true,
  imports: [

    DxFormModule,

  ],
  templateUrl: './formulario-combinado.component.html',
  styleUrl: './formulario-combinado.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormularioCombinadoComponent {
  title = 'my-devextreme-app';
  form: FormGroup;

  @ViewChild('myForm') dxForm!: DxFormComponent;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required]
    });
  }
 
 
  employee = {
    name: 'John Heart',
    position: 'CEO'
}

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
    console.log('Form data------------------>>>>>>>>>:', formInstance.option('formData',formInstance.option('formData')));

  } else {
    notify({
      message: 'Validation failed!',
      position: {
        my: 'center top',
        at: 'center top',
      },
      type: 'error',
    });
    console.log(this.form);
  }
}
}
