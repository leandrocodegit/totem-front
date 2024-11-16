import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConfiguracoesDispositivoComponent } from './lista-cores-dispositivo.component';

describe('ListaConfiguracoesDispositivoComponent', () => {
  let component: ListaConfiguracoesDispositivoComponent;
  let fixture: ComponentFixture<ListaConfiguracoesDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaConfiguracoesDispositivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConfiguracoesDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
