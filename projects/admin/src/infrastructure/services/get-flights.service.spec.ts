import { TestBed } from '@angular/core/testing';

import { GetFlightsService } from './get-flights.service';

describe('GetFlightsService', () => {
  let service: GetFlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFlightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
