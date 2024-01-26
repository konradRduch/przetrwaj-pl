import { TestBed } from '@angular/core/testing';

import { MapBoundsService } from './map-bounds.service';

describe('MapBoundsService', () => {
  let service: MapBoundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapBoundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
