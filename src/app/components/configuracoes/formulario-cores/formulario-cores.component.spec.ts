import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCorComponent } from './formulario-cores.component';

describe('FormularioConfiguracaoComponent', () => {
  let component: FormularioCorComponent;
  let fixture: ComponentFixture<FormularioCorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
