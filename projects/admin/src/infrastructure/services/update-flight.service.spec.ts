import { TestBed } from '@angular/core/testing';

import { UpdateFlightService } from './update-flight.service';

describe('UpdateFlightService', () => {
  let service: UpdateFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
