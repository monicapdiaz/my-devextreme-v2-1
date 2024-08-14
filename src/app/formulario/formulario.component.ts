import { Component, ViewChild,CUSTOM_ELEMENTS_SCHEMA,AfterViewInit } from '@angular/core';
import { DxFormComponent,DxTemplateHost, WatcherHelper, NestedOptionHost,DxComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomTextboxComponent } from '../custom-textbox/custom-textbox.component';
import { DxFormModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';

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
    CustomTextboxComponent
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DxTemplateHost, WatcherHelper, NestedOptionHost]
})
export class FormularioComponent implements AfterViewInit{
  formData = {
    name: '',
    FirtsName: '',
    customTextbox: ''
  };

  @ViewChild('myForm') dxForm!: DxFormComponent;

  ngAfterViewInit() {
    setTimeout(() => {
      const devExpress = (window as any).DevExpress;
  
      if (devExpress && devExpress.ui) {
        devExpress.ui.dxForm.defaultOptions({
          options: {
            editors: {
              dxCustomTextbox: {
                component: CustomTextboxComponent
              }
            }
          }
        });
        console.log('DevExpress is available and editor registered');
      } else {
        console.error('DevExpress no está disponible');
      }
    }, 1000);
  }
  

  submitForm() {
    const formInstance = this.dxForm.instance;
    
  
    console.log('Form instance:', formInstance);
  
    const validationResult = formInstance.validate();
  
    console.log('Validation result:', validationResult);
    console.log('Broken Rules:', validationResult.brokenRules);
  
    if (validationResult.isValid) {
      notify('Form data submitted successfully!', 'success', 2000);
      console.log('Form data:', this.formData);
    } else {
      notify('Form validation failed!', 'error', 2000);
      console.log('Form is not valid');
    }
    
  }

 onFormValueChanged(e: any) {
  const formInstance = this.dxForm.instance;
  
  // Imprimir las reglas rotas
  console.log('Broken Rules on Value Change:', formInstance.option('brokenRules'));
  
  console.log('Form value changed:', e);
}

onCustomTextboxChange(value: string): void {
  console.log('Custom textbox value changed:', value);
}

}
