import { TestBed } from '@angular/core/testing';

import { RemoveFlightService } from './remove-flight.service';

describe('RemoveFlightService', () => {
  let service: RemoveFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
