import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedInfoRegionComponent } from './selected-info-region.component';

describe('SelectedInfoRegionComponent', () => {
  let component: SelectedInfoRegionComponent;
  let fixture: ComponentFixture<SelectedInfoRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedInfoRegionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedInfoRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
