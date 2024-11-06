import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageDetailsComponent } from './mortgage-details.component';

describe('MortgageDetailsComponent', () => {
  let component: MortgageDetailsComponent;
  let fixture: ComponentFixture<MortgageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortgageDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
