import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaFeatureDetailsComponent } from './ota-feature-details.component';

describe('OtaFeatureDetailsComponent', () => {
  let component: OtaFeatureDetailsComponent;
  let fixture: ComponentFixture<OtaFeatureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtaFeatureDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtaFeatureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
