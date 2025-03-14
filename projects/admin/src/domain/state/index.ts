import { inject, Injectable } from '@angular/core';
import { ReservationState } from './reservation.state';
import { RouteState } from './route.state';
import { FlightState } from "./flight.state";
@Injectable({
  providedIn: 'root',
})
export class StateIndex {
  private readonly _reservation = inject(ReservationState);
  private readonly _flight = inject(FlightState);
  private readonly _routes = inject(RouteState);

  get reservationStateIndex() {
    return this._reservation.store();
  }

  get routeStateIndex() {
    return this._routes.store();
  }
  get flights() {
    return this._flight.store();
  }
}
