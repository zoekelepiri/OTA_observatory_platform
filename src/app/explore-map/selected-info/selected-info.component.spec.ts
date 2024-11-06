import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedInfoComponent } from './selected-info.component';

describe('SelectedInfoComponent', () => {
  let component: SelectedInfoComponent;
  let fixture: ComponentFixture<SelectedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
