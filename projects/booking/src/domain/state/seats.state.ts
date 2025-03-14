import { inject, Injectable } from '@angular/core';

import { IFlight } from '../model/seats.model';
import { IPassenger } from '../model/passenger.model';
import { BehaviorSubject } from 'rxjs';
import { StateFactory } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class FlightState {
  private readonly _factory = inject(StateFactory);


  private readonly _outboundFlight$ = new BehaviorSubject<IFlight>({
    id: 'FL123',
    flightNumber: 'CM456',
    aircraft: 'Boeing 737-700',
    seats: {},
    type: 'outbound',
  });

  private readonly _returnFlight$ = new BehaviorSubject<IFlight>({
    id: 'FL124',
    flightNumber: 'CM457',
    aircraft: 'Boeing 737-700',
    seats: {},
    type: 'return',
  });

  private readonly _passengers$ = new BehaviorSubject<IPassenger | null>(null);

  store() {
    return {
      outboundFlight: this._factory.state(this._outboundFlight$),
      returnFlight: this._factory.state(this._returnFlight$),
      allPassengers: this._factory.state(this._passengers$),
    };
  }
}
