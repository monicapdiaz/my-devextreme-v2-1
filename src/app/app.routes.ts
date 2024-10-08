import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormularioComponent } from './formulario/formulario.component';
import { CustomTextboxComponent } from './custom-textbox/custom-textbox.component';
import { FormularioCombinadoComponent } from './formulario-combinado/formulario-combinado.component';

export const routes: Routes = [
  {
    path: '',
    component: FormularioComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'custom-textbox',
    component: CustomTextboxComponent,
  },
  {
    path: 'combinado',
    component: FormularioCombinadoComponent,
  },
];
