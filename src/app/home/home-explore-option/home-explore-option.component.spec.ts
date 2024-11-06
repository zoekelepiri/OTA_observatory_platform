import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExploreOptionComponent } from './home-explore-option.component';

describe('HomeExploreOptionComponent', () => {
  let component: HomeExploreOptionComponent;
  let fixture: ComponentFixture<HomeExploreOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeExploreOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeExploreOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
