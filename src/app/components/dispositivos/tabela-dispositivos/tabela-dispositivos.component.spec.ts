import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDispositivosComponent } from './tabela-dispositivos.component';

describe('TabelaDispositivosComponent', () => {
  let component: TabelaDispositivosComponent;
  let fixture: ComponentFixture<TabelaDispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaDispositivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
