import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefecturePropertiesPerMonthDiagramComponent } from './prefecture-properties-per-month-diagram.component';

describe('PrefecturePropertiesPerMonthDiagramComponent', () => {
  let component: PrefecturePropertiesPerMonthDiagramComponent;
  let fixture: ComponentFixture<PrefecturePropertiesPerMonthDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefecturePropertiesPerMonthDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefecturePropertiesPerMonthDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
