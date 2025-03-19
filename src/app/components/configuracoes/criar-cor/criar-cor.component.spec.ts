import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCorComponent } from './criar-cor.component';

describe('CriarCorComponent', () => {
  let component: CriarCorComponent;
  let fixture: ComponentFixture<CriarCorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarCorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarCorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
