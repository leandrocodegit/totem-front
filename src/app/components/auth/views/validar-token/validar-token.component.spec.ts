import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarTokenComponent } from './validar-token.component';

describe('ValidarTokenComponent', () => {
  let component: ValidarTokenComponent;
  let fixture: ComponentFixture<ValidarTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarTokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidarTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
