import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefectureMortgagePerMonthDiagramComponent } from './prefecture-mortgage-per-month-diagram.component';

describe('PrefectureMortgagePerMonthDiagramComponent', () => {
  let component: PrefectureMortgagePerMonthDiagramComponent;
  let fixture: ComponentFixture<PrefectureMortgagePerMonthDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefectureMortgagePerMonthDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefectureMortgagePerMonthDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
