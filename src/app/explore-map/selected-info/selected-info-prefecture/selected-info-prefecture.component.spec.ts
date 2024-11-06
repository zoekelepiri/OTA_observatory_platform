import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedInfoPrefectureComponent } from './selected-info-prefecture.component';

describe('SelectedInfoPrefectureComponent', () => {
  let component: SelectedInfoPrefectureComponent;
  let fixture: ComponentFixture<SelectedInfoPrefectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedInfoPrefectureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedInfoPrefectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
