import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtaFeaturesComponent } from './ota-features.component';

describe('OtaFeaturesComponent', () => {
  let component: OtaFeaturesComponent;
  let fixture: ComponentFixture<OtaFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtaFeaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtaFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
