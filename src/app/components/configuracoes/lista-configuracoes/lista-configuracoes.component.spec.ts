import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConfiguracoesComponent } from './lista-configuracoes.component';

describe('ListaConfiguracoesComponent', () => {
  let component: ListaConfiguracoesComponent;
  let fixture: ComponentFixture<ListaConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaConfiguracoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
