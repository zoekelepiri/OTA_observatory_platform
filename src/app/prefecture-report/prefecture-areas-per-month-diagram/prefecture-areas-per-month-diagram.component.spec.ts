import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefectureAreasPerMonthDiagramComponent } from './prefecture-areas-per-month-diagram.component';

describe('PrefectureAreasPerMonthDiagramComponent', () => {
  let component: PrefectureAreasPerMonthDiagramComponent;
  let fixture: ComponentFixture<PrefectureAreasPerMonthDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefectureAreasPerMonthDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefectureAreasPerMonthDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
