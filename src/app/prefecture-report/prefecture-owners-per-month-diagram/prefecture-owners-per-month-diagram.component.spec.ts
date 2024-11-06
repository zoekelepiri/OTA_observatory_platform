import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefectureOwnersPerMonthDiagramComponent } from './prefecture-owners-per-month-diagram.component';

describe('PrefectureOwnersPerMonthDiagramComponent', () => {
  let component: PrefectureOwnersPerMonthDiagramComponent;
  let fixture: ComponentFixture<PrefectureOwnersPerMonthDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefectureOwnersPerMonthDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefectureOwnersPerMonthDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
