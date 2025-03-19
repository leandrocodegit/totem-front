import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCoresComponent } from './tab-cores.component';

describe('TabCoresComponent', () => {
  let component: TabCoresComponent;
  let fixture: ComponentFixture<TabCoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabCoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabCoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
