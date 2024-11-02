import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConfiguracoesComponent } from './card-configuracoes.component';

describe('CardConfiguracoesComponent', () => {
  let component: CardConfiguracoesComponent;
  let fixture: ComponentFixture<CardConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardConfiguracoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
