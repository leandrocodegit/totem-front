import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDispositivoComponent } from './detalhes-dispositivo.component';

describe('DetalhesDispositivoComponent', () => {
  let component: DetalhesDispositivoComponent;
  let fixture: ComponentFixture<DetalhesDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesDispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
