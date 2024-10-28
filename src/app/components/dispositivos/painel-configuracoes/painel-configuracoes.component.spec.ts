import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelConfiguracoesComponent } from './painel-configuracoes.component';

describe('PainelConfiguracoesComponent', () => {
  let component: PainelConfiguracoesComponent;
  let fixture: ComponentFixture<PainelConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelConfiguracoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PainelConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
