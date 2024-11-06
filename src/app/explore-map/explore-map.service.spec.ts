import { TestBed } from '@angular/core/testing';

import { ExploreMapService } from './explore-map.service';

describe('ExploreMapService', () => {
  let service: ExploreMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
