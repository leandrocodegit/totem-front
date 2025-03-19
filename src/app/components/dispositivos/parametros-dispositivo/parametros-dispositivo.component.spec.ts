import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosDispositivoComponent } from './parametros-dispositivo.component';

describe('ParametrosDispositivoComponent', () => {
  let component: ParametrosDispositivoComponent;
  let fixture: ComponentFixture<ParametrosDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrosDispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametrosDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
