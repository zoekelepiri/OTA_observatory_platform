import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefectureReportComponent } from './prefecture-report.component';

describe('PrefectureReportComponent', () => {
  let component: PrefectureReportComponent;
  let fixture: ComponentFixture<PrefectureReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefectureReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefectureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
