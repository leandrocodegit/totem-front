import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAgendasComponent } from './tabela-agendas.component';

describe('TabelaAgendasComponent', () => {
  let component: TabelaAgendasComponent;
  let fixture: ComponentFixture<TabelaAgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaAgendasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
