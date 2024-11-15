import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRapidasComponent } from './lista-rapidas.component';

describe('ListaRapidasComponent', () => {
  let component: ListaRapidasComponent;
  let fixture: ComponentFixture<ListaRapidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRapidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaRapidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
