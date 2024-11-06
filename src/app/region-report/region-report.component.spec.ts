import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionReportComponent } from './region-report.component';

describe('RegionReportComponent', () => {
  let component: RegionReportComponent;
  let fixture: ComponentFixture<RegionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
