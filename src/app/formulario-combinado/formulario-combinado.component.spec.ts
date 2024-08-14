import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCombinadoComponent } from './formulario-combinado.component';

describe('FormularioCombinadoComponent', () => {
  let component: FormularioCombinadoComponent;
  let fixture: ComponentFixture<FormularioCombinadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCombinadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioCombinadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
