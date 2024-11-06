import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDealingDetailsComponent } from './property-dealing-details.component';

describe('PropertyDealingDetailsComponent', () => {
  let component: PropertyDealingDetailsComponent;
  let fixture: ComponentFixture<PropertyDealingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDealingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyDealingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
