import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiscationsDetailsComponent } from './confiscations-details.component';

describe('ConfiscationsDetailsComponent', () => {
  let component: ConfiscationsDetailsComponent;
  let fixture: ComponentFixture<ConfiscationsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiscationsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiscationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
