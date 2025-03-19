import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelCorComponent } from './label-cor.component';

describe('LabelCorComponent', () => {
  let component: LabelCorComponent;
  let fixture: ComponentFixture<LabelCorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelCorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabelCorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
