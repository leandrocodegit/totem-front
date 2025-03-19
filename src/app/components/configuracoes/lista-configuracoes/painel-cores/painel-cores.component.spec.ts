import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelCoresComponent } from './painel-cores.component';

describe('PainelCoresComponent', () => {
  let component: PainelCoresComponent;
  let fixture: ComponentFixture<PainelCoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelCoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PainelCoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
