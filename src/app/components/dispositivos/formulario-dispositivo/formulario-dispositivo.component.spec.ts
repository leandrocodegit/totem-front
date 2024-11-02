import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDispositivoComponent } from './formulario-dispositivo.component';

describe('FormularioDispositivoComponent', () => {
  let component: FormularioDispositivoComponent;
  let fixture: ComponentFixture<FormularioDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
