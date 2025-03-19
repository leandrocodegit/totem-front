import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaParametrosComponent } from './lista-parametros.component';

describe('ListaParametrosComponent', () => {
  let component: ListaParametrosComponent;
  let fixture: ComponentFixture<ListaParametrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaParametrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
