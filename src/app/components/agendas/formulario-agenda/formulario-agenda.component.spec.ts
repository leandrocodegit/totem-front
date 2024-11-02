import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgendaComponent } from './formulario-agenda.component';

describe('FormularioAgendaComponent', () => {
  let component: FormularioAgendaComponent;
  let fixture: ComponentFixture<FormularioAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAgendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
