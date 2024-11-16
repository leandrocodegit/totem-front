import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCoresComponent } from './lista-cores.component';

describe('ListaConfiguracoesComponent', () => {
  let component: ListaCoresComponent;
  let fixture: ComponentFixture<ListaCoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
