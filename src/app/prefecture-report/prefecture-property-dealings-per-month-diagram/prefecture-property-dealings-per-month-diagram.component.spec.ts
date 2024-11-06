import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefecturePropertyDealingsPerMonthDiagramComponent } from './prefecture-property-dealings-per-month-diagram.component';

describe('PrefecturePropertyDealingsPerMonthDiagramComponent', () => {
  let component: PrefecturePropertyDealingsPerMonthDiagramComponent;
  let fixture: ComponentFixture<PrefecturePropertyDealingsPerMonthDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefecturePropertyDealingsPerMonthDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefecturePropertyDealingsPerMonthDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
