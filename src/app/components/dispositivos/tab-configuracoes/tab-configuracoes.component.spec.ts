import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabConfiguracoesComponent } from './tab-configuracoes.component';

describe('TabConfiguracoesComponent', () => {
  let component: TabConfiguracoesComponent;
  let fixture: ComponentFixture<TabConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabConfiguracoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
