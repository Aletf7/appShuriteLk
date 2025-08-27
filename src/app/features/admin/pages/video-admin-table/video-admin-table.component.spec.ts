import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAdminTableComponent } from './video-admin-table.component';

describe('VideoAdminTableComponent', () => {
  let component: VideoAdminTableComponent;
  let fixture: ComponentFixture<VideoAdminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoAdminTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoAdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
