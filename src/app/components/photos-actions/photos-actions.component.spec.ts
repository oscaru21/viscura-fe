import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosActionsComponent } from './photos-actions.component';

describe('PhotosActionsComponent', () => {
  let component: PhotosActionsComponent;
  let fixture: ComponentFixture<PhotosActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
