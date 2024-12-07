import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarFirmwareComponent } from './atualizar-firmware.component';

describe('AtualizarFirmwareComponent', () => {
  let component: AtualizarFirmwareComponent;
  let fixture: ComponentFixture<AtualizarFirmwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarFirmwareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtualizarFirmwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
