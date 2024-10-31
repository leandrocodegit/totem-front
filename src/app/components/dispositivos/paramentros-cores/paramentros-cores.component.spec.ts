import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamentrosCoresComponent } from './paramentros-cores.component';

describe('ParamentrosCoresComponent', () => {
  let component: ParamentrosCoresComponent;
  let fixture: ComponentFixture<ParamentrosCoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamentrosCoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamentrosCoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
