import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesDispositivoComponent } from './informacoes-dispositivo.component';

describe('InformacoesDispositivoComponent', () => {
  let component: InformacoesDispositivoComponent;
  let fixture: ComponentFixture<InformacoesDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacoesDispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacoesDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
