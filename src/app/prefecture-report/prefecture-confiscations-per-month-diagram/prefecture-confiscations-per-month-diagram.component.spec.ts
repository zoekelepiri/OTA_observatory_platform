import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefectureConfiscationsPerMonthDiagramComponent } from './prefecture-confiscations-per-month-diagram.component';

describe('PrefectureConfiscationsPerMonthDiagramComponent', () => {
  let component: PrefectureConfiscationsPerMonthDiagramComponent;
  let fixture: ComponentFixture<PrefectureConfiscationsPerMonthDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefectureConfiscationsPerMonthDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefectureConfiscationsPerMonthDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
