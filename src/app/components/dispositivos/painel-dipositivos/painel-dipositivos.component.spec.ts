import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelDipositivosComponent } from './painel-dipositivos.component';

describe('PainelDipositivosComponent', () => {
  let component: PainelDipositivosComponent;
  let fixture: ComponentFixture<PainelDipositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelDipositivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PainelDipositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
