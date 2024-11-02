import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMapaComponent } from './card-mapa.component';

describe('CardMapaComponent', () => {
  let component: CardMapaComponent;
  let fixture: ComponentFixture<CardMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMapaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
