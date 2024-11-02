import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAgendaDispositivoComponent } from './lista-agenda-dispositivo.component';

describe('ListaAgendaDispositivoComponent', () => {
  let component: ListaAgendaDispositivoComponent;
  let fixture: ComponentFixture<ListaAgendaDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAgendaDispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaAgendaDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
