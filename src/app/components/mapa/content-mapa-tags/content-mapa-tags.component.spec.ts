import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMapaTagsComponent } from './content-mapa-tags.component';

describe('ContentMapaTagsComponent', () => {
  let component: ContentMapaTagsComponent;
  let fixture: ComponentFixture<ContentMapaTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentMapaTagsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentMapaTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
