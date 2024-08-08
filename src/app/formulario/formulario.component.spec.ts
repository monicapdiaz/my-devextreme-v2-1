import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { DxFormModule, DxButtonModule } from 'devextreme-angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioComponent ],
      imports: [ DxFormModule, DxButtonModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submitForm method', () => {
    spyOn(component, 'submitForm');
    const button = fixture.debugElement.nativeElement.querySelector('dx-button');
    button.click();
    expect(component.submitForm).toHaveBeenCalled();
  });
});
