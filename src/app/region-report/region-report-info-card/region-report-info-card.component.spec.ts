import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionReportInfoCardComponent } from './region-report-info-card.component';

describe('RegionReportInfoCardComponent', () => {
  let component: RegionReportInfoCardComponent;
  let fixture: ComponentFixture<RegionReportInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionReportInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionReportInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
