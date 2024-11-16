import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicronizarDipositivosComponent } from './sicronizar-dipositivos.component';

describe('SicronizarDipositivosComponent', () => {
  let component: SicronizarDipositivosComponent;
  let fixture: ComponentFixture<SicronizarDipositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SicronizarDipositivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SicronizarDipositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
