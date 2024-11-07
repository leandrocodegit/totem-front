import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteDispositivoComponent } from './teste-dispositivo.component';

describe('TesteDispositivoComponent', () => {
  let component: TesteDispositivoComponent;
  let fixture: ComponentFixture<TesteDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesteDispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TesteDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
