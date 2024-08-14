import { Component,OnInit  } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomTextboxComponent } from './custom-textbox/custom-textbox.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'my-devextreme-app';

  ngOnInit() {
    // Esperar un poco para asegurarse de que el script de DevExtreme se haya cargado
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
    }, 1000); // Esperar 1 segundo
  }
}
